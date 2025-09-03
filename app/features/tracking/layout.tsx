import type { Route } from "./+types/layout";
import { Outlet, redirect } from "react-router";
import { linkList } from "@/config/link-list";
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
  const { script } = loaderData;
  return (
    <>
      <Outlet context={{ data: loaderData }} />
      <script src={script}></script>
    </>
  );
}
