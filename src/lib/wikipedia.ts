import type { WikipediaResponse } from "../types/wikipedia";
import type { WtfJson } from "../types/wtf_wikipedia";
import wtf from "wtf_wikipedia";
import wikipediaList from "../config/wikipedia-list";

const USER_AGENT = "tracking/1.0 (https://github.com/wineAk/tracking)";
const REQUEST_DELAY_MS = 500;
const MAX_RETRIES = 4;
const INITIAL_RETRY_DELAY_MS = 1000;

const errorObject = {
  found: false,
  title: "",
  text: "",
  summary: "",
  json: {} as WtfJson,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWikipediaList() {
  const items: FetchWikipedia[] = [];
  const names = wikipediaList();

  for (const name of names) {
    items.push(await fetchWikipedia(name));

    if (name !== names.at(-1)) {
      await sleep(REQUEST_DELAY_MS);
    }
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

    console.error(`Wikipedia entry not found: "${name}"`);
    return { ...errorObject, title: name, name, lang: "-" };
  } catch (err) {
    console.error(`Failed to fetch Wikipedia entry "${name}":`, err);
    return { ...errorObject, title: name, name, lang: "-" };
  }
}

export type FetchWikipedia = Awaited<ReturnType<typeof fetchWikipedia>>;

async function fetchWikipediaApi(url: string): Promise<WikipediaResponse> {
  let retryDelay = INITIAL_RETRY_DELAY_MS;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });
    const body = await res.text();

    if (
      res.status === 429
      || body.startsWith("You are making too many requests")
    ) {
      if (attempt < MAX_RETRIES) {
        console.warn(
          `Wikipedia rate limited, retrying in ${retryDelay}ms (${attempt + 1}/${MAX_RETRIES})`,
        );
        await sleep(retryDelay);
        retryDelay *= 2;
        continue;
      }

      throw new Error("Wikipedia API rate limit exceeded");
    }

    if (!res.ok) {
      if (attempt < MAX_RETRIES && res.status >= 500) {
        console.warn(
          `Wikipedia API ${res.status}, retrying in ${retryDelay}ms (${attempt + 1}/${MAX_RETRIES})`,
        );
        await sleep(retryDelay);
        retryDelay *= 2;
        continue;
      }

      throw new Error(`Wikipedia API error: ${res.status} ${body.slice(0, 100)}`);
    }

    try {
      return JSON.parse(body) as WikipediaResponse;
    } catch {
      if (attempt < MAX_RETRIES) {
        console.warn(
          `Wikipedia returned non-JSON, retrying in ${retryDelay}ms (${attempt + 1}/${MAX_RETRIES})`,
        );
        await sleep(retryDelay);
        retryDelay *= 2;
        continue;
      }

      throw new Error(`Wikipedia API returned non-JSON: ${body.slice(0, 100)}`);
    }
  }

  throw new Error("Wikipedia API request failed");
}

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
  const apiData = await fetchWikipediaApi(url);
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
