import type { Route } from "./+types/home";

import { Suspense } from "react";
import { Await, Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";

import { fetchWikipedia, type FetchWikipedia } from "@/lib/fetchWikipedia";
import Spinner from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "W - 検索ページ" },
    { name: "description", content: "Wikipediaの検索ページ" },
  ];
}

const wikipediaList = [
  // コード
  "JavaScript",
  "JavaScriptライブラリ",
  "TypeScript",
  "JSX_(JavaScript)",
  "Node.js",
  "React",
  "Vite",
  "React_Router",
  "Tailwind_CSS",
  // ツール
  "Npm_(パッケージ管理ツール)",
  "GitHub",
  "GitHub_Pages",
  "Visual_Studio_Code",
  "Cursor_(code_editor)",
].sort((a, b) => a.localeCompare(b));

export async function clientLoader() {
  const wikipediaPromise = Promise.all(wikipediaList.map(fetchWikipedia));
  return { wikipedia: wikipediaPromise };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { wikipedia } = loaderData;
  return (
    <article>
      <Suspense fallback={<Fallback />}>
        <Await resolve={wikipedia}>{(data) => <Resolve data={data} />}</Await>
      </Suspense>
    </article>
  );
}

function Fallback() {
  return (
    <section className="flex justify-center items-center h-24">
      <Spinner />
    </section>
  );
}

function Resolve({ data }: { data: FetchWikipedia[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(({ title, summary, lang }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">{lang}</Badge>
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground break-all">
              {summary}
            </div>
          </CardContent>
          <CardFooter className="mt-auto ml-auto">
            <Button variant="ghost" asChild>
              <Link to={`/test_wikipedia/${title}`}>
                <span>詳細</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
