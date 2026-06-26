import type { WikipediaResponse } from "../types/wikipedia";
import type { WtfJson } from "../types/wtf_wikipedia";
import wtf from "wtf_wikipedia";
import wikipediaList from "../config/wikipedia-list";

const errorObject = {
  found: false,
  title: "",
  text: "",
  summary: "",
  json: {} as WtfJson,
};

export async function fetchWikipediaList() {
  const items: FetchWikipedia[] = [];
  for (const name of wikipediaList()) {
    items.push(await fetchWikipedia(name));
  }
  return items;
}

export async function fetchWikipedia(name: string) {
  try {
    const ja = await fetchFromWikipedia("ja", name);
    if (ja.found && ja.summary.length > 0) {
      return { ...ja, name, lang: "ja" };
    }

    const en = await fetchFromWikipedia("en", name);
    if (en.found && en.summary.length > 0) {
      return { ...en, name, lang: "en" };
    }

    return { ...errorObject, title: name, name, lang: "-" };
  } catch {
    return { ...errorObject, title: name, name, lang: "-" };
  }
}

export type FetchWikipedia = Awaited<ReturnType<typeof fetchWikipedia>>;

async function fetchFromWikipedia(domain: string, name: string) {
  const query = new URLSearchParams({
    format: "json",
    action: "query",
    prop: "revisions",
    rvprop: "content",
    titles: name,
    origin: "*",
  });
  const url = `https://${domain}.wikipedia.org/w/api.php?${query.toString()}`;
  const res = await fetch(url);
  const apiData: WikipediaResponse = await res.json();
  const pages = apiData.query.pages;
  const pageId = Object.keys(pages)[0];
  const page = Object.values(pages)[0];

  if (pageId !== "-1" && page?.revisions?.length > 0) {
    const wikitext = page.revisions[0]["*"];
    const doc = wtf(wikitext);
    const title = page.title ?? name;
    const text = wikitext ? doc.text() : "";
    const summary = text.length > 140 ? truncateText(text) : text;
    const json = doc.json() as WtfJson;
    return { found: true, title, text, summary, json };
  }

  return { ...errorObject, found: false };
}

const truncateText = (text: string) => `${text.slice(0, 140)}...`;
