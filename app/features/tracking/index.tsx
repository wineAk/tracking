import type { Route } from "./+types/index";
import { Suspense } from "react";
import { Await, useOutletContext } from "react-router";
import Fallback from "@/components/fallback";
import Main from "@/components/wikipedia/main";
import Cards from "@/components/wikipedia/cards";
import { fetchWikipediaList } from "@/lib/fetchWikipedia";
import { type LinkListItemType } from "@/config/link-list";

export async function clientLoader() {
  const { wikipedia } = await fetchWikipediaList();
  return { wikipedia };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { wikipedia } = loaderData;
  const { data } = useOutletContext<{ data: LinkListItemType }>();
  const { version, cl_code, cl_company } = data;
  return (
    <Main title={`Web行動解析 ${version}`} subtitle={`${cl_code} : ${cl_company}`}>
      <Suspense fallback={<Fallback />}>
        <Await resolve={wikipedia}>{(data) => <Cards data={data} />}</Await>
      </Suspense>
    </Main>
  );
}
