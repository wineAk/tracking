import type { Route } from "./+types/layout";
import { Outlet, redirect } from "react-router";
import { linkList } from "@/config/link-list";
import TypographyH1 from "@/components/typography/h1";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createMetaTitle } from "@/lib/createTitle";

export function meta({ data }: Route.MetaArgs) {
  const version = data?.version ?? "";
  const cl_code = data?.cl_code ?? "";
  const title = createMetaTitle({ title: `${version} - ${cl_code}` });
  return [{ title: title }];
}

export async function clientLoader({ params }: Route.ComponentProps) {
  const { version, cl_code } = params;
  const links = linkList();
  const prodLink = links.prod.find((link) => link.version === version && link.cl_code === cl_code);
  const testLink = links.test.find((link) => link.version === version && link.cl_code === cl_code);
  const link = prodLink || testLink;
  if (!link || link === undefined) throw redirect("/");
  return link;
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  if (!loaderData) return null;
  const { type, version, script, cl_code, cl_company } = loaderData;
  const isProd = type === "prod";
  const theme = isProd ? "default" : "red";
  return (
    <>
      <main className="h-dvh pt-16" data-theme={theme}>
        <ScrollArea type="always" className="h-[calc(100vh-var(--spacing)*16)] [&>[data-slot='scroll-area-viewport']>div]:h-full">
          <article className="h-full max-w-screen-lg mx-auto p-6 flex flex-col gap-6">
            <section className="pt-6">
              <TypographyH1 className="flex items-center justify-center gap-2">
                <span>Web行動解析 {version}</span>
                <Badge>{isProd ? "本番" : "テスト"}環境</Badge>
              </TypographyH1>
              <p className="text-center">
                {cl_code} : {cl_company}
              </p>
            </section>
            <Outlet context={{ data: loaderData }} />
          </article>
        </ScrollArea>
      </main>
      <script src={script}></script>
    </>
  );
}
