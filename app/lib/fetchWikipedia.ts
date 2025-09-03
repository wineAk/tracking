import type { WikipediaResponse } from "@/types/wikipedia";
import type { WtfJson } from "@/types/wtf_wikipedia";
import wtf from "wtf_wikipedia";
import wikipediaList from "@/config/wikipedia-list";

const errorObject = {
  found: false,
  title: "",
  text: "",
  summary: "",
  json: {} as WtfJson,
  html: undefined,
};

export async function fetchWikipediaList() {
  const wikipediaPromise = Promise.all(wikipediaList().map(fetchWikipedia));
  return { wikipedia: wikipediaPromise };
}

export async function fetchWikipedia(name: string) {
  try {
    const ja = await fetchFromWikipedia("ja", name);
    if (ja.found && ja.summary.length > 0) {
      return { ...ja, lang: "ja" };
    }
    const en = await fetchFromWikipedia("en", name);
    if (en.found && en.summary.length > 0) {
      return { ...en, lang: "en" };
    }
    return { ...errorObject, title: name, lang: "-" };
  } catch (e) {
    return { ...errorObject, title: name, lang: "-" };
  }
}

export type FetchWikipedia = Awaited<ReturnType<typeof fetchWikipedia>>;

// ja/en/error判定の共通処理
async function fetchFromWikipedia(domain: string, name: string) {
  const WikipediaApiQuery = [
    "format=json",
    "action=query",
    "prop=revisions",
    "rvprop=content",
    "titles=",
  ].join("&");
  const url = `https://${domain}.wikipedia.org/w/api.php?${WikipediaApiQuery}${name}&origin=*`;
  const res = await fetch(url);
  const apiData: WikipediaResponse = await res.json();
  const pages = apiData.query.pages;
  const pageId = Object.keys(pages)[0];
  const page = Object.values(pages)[0];
  if (pageId !== "-1" && page && page.revisions && page.revisions.length > 0) {
    const wikitext = page.revisions[0]["*"];
    const doc = wtf(wikitext);
    const title = page.title ?? name; // nameは必ずstring
    const text = wikitext ? doc.text() : "";
    const summary = text.length > 140 ? truncateText(text) : text;
    const json = doc.json() as WtfJson;
    const htmlUrl = `https://${domain}.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(name)}`;
    const htmlRes = await fetch(htmlUrl);
    const html = htmlRes.ok ? await htmlRes.text() : undefined;
    return { found: true, title, text, summary, json, html };
  }
  return { ...errorObject, found: false };
}

// テキストを140文字に切り詰める
const truncateText = (text: string) => text.slice(0, 140) + "...";
