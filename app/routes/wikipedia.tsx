import type { Route } from "./+types/wikipedia";
import { Suspense, useRef, useEffect, useState } from "react";
import { Await } from "react-router";
import { fetchWikipedia, type FetchWikipedia } from "@/lib/fetchWikipedia";
import Fallback from "@/components/fallback";

export function meta({ data }: Route.MetaArgs) {
  const title = `W - ${data?.title ?? "Wikipedia"}`;
  return [
    { title },
    { name: "description", content: `${title} - Wikipediaの解説ページ` },
  ];
}

export async function clientLoader({ params }: Route.ComponentProps) {
  const { name } = params;
  const { title } = await fetchWikipedia(name);
  const wikipediaPromise = fetchWikipedia(name);
  return { title, wikipedia: wikipediaPromise };
}

export default function Wikipedia({ loaderData }: Route.ComponentProps) {
  const { wikipedia } = loaderData;
  return (
    <article className="h-full">
      <Suspense fallback={<Fallback />}>
        <Await resolve={wikipedia}>{(data) => <Resolve data={data} />}</Await>
      </Suspense>
    </article>
  );
}

function Resolve({ data }: { data: FetchWikipedia }) {
  const { html } = data;
  const [height, setHeight] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (
        typeof event.data === "object" &&
        event.data?.type === "setHeight" &&
        typeof event.data.height === "number"
      ) {
        if (iframeRef.current) {
          setHeight(event.data.height);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return (
    <section className="py-8">
      <div className="relative" style={{ height }}>
        <div
          className="absolute inset-0 z-1 bg-neutral-300/10 pointer-events-all cursor-not-allowed -my-2 -mx-4 rounded-lg"
          aria-label="オーバーレイ"
        />
        <iframe
          ref={iframeRef}
          srcDoc={`
          <style>html,body{margin:0;padding:0;box-sizing:border-box;}</style>
          <body>
            <script>
              function sendHeight() {
                window.parent.postMessage({type:'setHeight',height:document.documentElement.scrollHeight}, '*');
              }
              window.addEventListener('load', sendHeight);
              window.addEventListener('resize', sendHeight);
              const observer = new MutationObserver(sendHeight);
              observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
              sendHeight();
            </script>
            ${html}
          </body>
        `}
          className="w-full border-none"
          style={{ height }}
          title="Wikipedia Content"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </section>
  );
}
