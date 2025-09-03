import type { Route } from "./+types/index";
import { Suspense } from "react";
import { Await } from "react-router";
import Fallback from "@/components/fallback";
import Cards from "@/components/wikipedia/cards";
import { fetchWikipediaList } from "@/lib/fetchWikipedia";

export async function clientLoader() {
  const { wikipedia } = await fetchWikipediaList();
  return { wikipedia };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { wikipedia } = loaderData;
  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={wikipedia}>{(data) => <Cards data={data} />}</Await>
    </Suspense>
  );
}
