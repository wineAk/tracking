import type { Route } from "./+types/view";
import { Suspense } from "react";
import { Await } from "react-router";
import { Fallback } from "@/components/fallback";
import View from "@/components/wikipedia/view";
import { createMetaTitle } from "@/lib/createTitle";
import { fetchWikipedia } from "@/lib/fetchWikipedia";

export function meta({ data, matches }: Route.MetaArgs) {
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
  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={wikipedia}>{(data) => <View data={data} />}</Await>
    </Suspense>
  );
}
