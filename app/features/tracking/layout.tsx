import type { Route } from "./+types/layout";
import { Outlet, redirect } from "react-router";
import { linkList } from "@/config/link-list";
import TypographyH1 from "@/components/typography/h1";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createMetaTitle } from "@/lib/createTitle";
import { useEffect, useRef } from "react";
import { useColor, type Color } from "@/components/color/provider";

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
  const { setColor } = useColor();
  setColor(type);

  // スクリプト読み込み用のref
  const scriptLoadedRef = useRef(false);
  useEffect(() => {
    // 既に読み込まれてる場合はスキップ
    if (scriptLoadedRef.current) return;
    // スクリプトタグを動的に作成
    const scriptElement = document.createElement("script");
    scriptElement.id = "ssk_tracking";
    scriptElement.src = script;
    scriptElement.async = true; // 非同期読み込み
    scriptElement.defer = true; // DOM構築後に実行
    // 読み込み成功時の処理
    scriptElement.onload = () => {
      console.log("✅ スクリプト読み込み成功:", script);
      scriptLoadedRef.current = true;
    };
    // エラー時の処理
    scriptElement.onerror = (error) => {
      console.error("❌ スクリプト読み込み失敗:", script, error);
    };
    // bodyの末尾に追加
    document.body.append(scriptElement);
    // クリーンアップ関数
    return () => {
      // コンポーネントアンマウント時にスクリプトを削除
      const existingScript = document.querySelector("#ssk_tracking");
      if (existingScript) {
        document.body.removeChild(existingScript);
        scriptLoadedRef.current = false;
      }
    };
  }, [script]); // scriptが変わった時のみ実行

  return (
    <>
      <main className="h-dvh">
        <ScrollArea
          type="always"
          className="
            h-dvh
            [&>[data-slot='scroll-area-viewport']>div]:h-full
            [&>[data-slot='scroll-area-scrollbar']]:pt-16
          "
        >
          <article className="h-full max-w-screen-lg mx-auto p-6  pt-16 flex flex-col gap-6">
            <section className="pt-6">
              <TypographyH1 className="flex items-center justify-center gap-2">
                <span>Web行動解析 {version}</span>
                <Badge>{isProd ? "本番" : "テスト"}環境</Badge>
              </TypographyH1>
              <p className="text-center">
                {cl_code} : {cl_company}
              </p>
            </section>
            <Outlet context={{ data: loaderData }} key={`${version}-${cl_code}`} />
          </article>
        </ScrollArea>
      </main>
    </>
  );
}
