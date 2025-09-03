import type { Route } from "./+types/view";
import { Suspense } from "react";
import { Await, useOutletContext } from "react-router";
import Fallback from "@/components/fallback";
import Main from "@/components/wikipedia/main";
import View from "@/components/wikipedia/view";
import { createMetaTitle } from "@/lib/createTitle";
import { fetchWikipedia } from "@/lib/fetchWikipedia";
import { type LinkListItemType } from "@/config/link-list";

export function meta({data, matches}: Route.MetaArgs) {
  const subtitle = data?.subtitle ?? "";
  // 2つ目のレイヤーから取得
  const version = matches[1]?.data?.version;
  const cl_code = matches[1]?.data?.cl_code;
  const title = createMetaTitle({ subtitle, title: `${version} - ${cl_code}` });
  return [{ title: title }];
}

export async function clientLoader({ params }: Route.ComponentProps) {
  const { name } = params;
  const { title } = await fetchWikipedia(name);
  const wikipediaPromise = fetchWikipedia(name);
  return { subtitle: title, wikipedia: wikipediaPromise };
}

export default function Wikipedia({ loaderData }: Route.ComponentProps) {
  const { wikipedia } = loaderData;
  const { data } = useOutletContext<{ data: LinkListItemType }>();
  const { version, cl_code, cl_company } = data;
  return (
    <Main title={`Web行動解析 ${version}`} subtitle={`${cl_code} : ${cl_company}`}>
      <Suspense fallback={<Fallback />}>
        <Await resolve={wikipedia}>{(data) => <View data={data} />}</Await>
      </Suspense>
    </Main>
  );
}
