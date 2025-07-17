import type { Route } from "./+types/wikipedia";
import type {
  WtfParagraph,
  WtfListItem,
  WtfReference,
  WtfLink,
  WtfTemplate,
} from "@/types/wtf_wikipedia";

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
import React from "react";

export function meta({ data }: Route.MetaArgs) {
  const title = `W - ${data?.wikipedia?.title}`;
  return [
    { title },
    { name: "description", content: `${title} - Wikipediaの解説ページ` },
  ];
}

export async function clientLoader({ params }: Route.ComponentProps) {
  const { name } = params;
  const wikipedia = await fetchWikipedia(name);
  return { wikipedia };
}

export default function Wikipedia({ loaderData }: Route.ComponentProps) {
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

function Resolve({ data }: { data: FetchWikipedia }) {
  const { html } = data;
  return (
    <iframe
      srcDoc={html}
      sandbox="allow-same-origin"
      className="w-full min-h-[calc(100vh-(0.25rem*(16+6+6)))] border bg-white"
      title="Wikipedia Content"
    />
  );
}

/*
function Resolve_({ data }: { data: FetchWikipedia }) {
  console.log("👘 - wikipedia.tsx - Resolve - data:", data);
  const { title, json, lang } = data;
  console.log("👘 - wikipedia.tsx - Resolve - json:", json);
  const sectionsRow =
    json.sections &&
    json.sections.map((section) => {
      const { depth, title, paragraphs, lists, references, templates } =
        section;
      // 見出し
      const titleRow = renderSectionHeading(depth, title);
      // 段落
      const paragraphsRow = renderSectionParagraphs(paragraphs);
      // 参考文献
      const referencesRow = renderSectionReferences(references);
      // リスト
      const listsRow = renderSectionLists(lists?.[0] ?? []);
      // 外部リンク
      const templatesRow = renderSectionTemplates(templates);

      return (
        <div key={title} className="space-y-2">
          {titleRow}
          {paragraphsRow}
          {referencesRow}
          {listsRow}
          {templatesRow}
        </div>
      );
    });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">{lang}</Badge>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{sectionsRow}</CardContent>
      </Card>
    </>
  );
}

// 見出し
function renderSectionHeading(depth: number, title?: string) {
  const headingTags = ["h2", "h3", "h4", "h5", "h6"];
  const headingClasses = [
    "border-b text-xl font-semibold", // h2
    "text-lg font-semibold", // h3
    "text-base font-semibold", // h4
    "text-sm font-semibold", // h5
    "text-xs font-semibold", // h6
  ];
  const headingIdx = Math.min(depth, headingTags.length - 1);
  const HeadingTag = headingTags[headingIdx];
  const headingClassName = headingClasses[headingIdx];
  return title && title.length > 0
    ? React.createElement(HeadingTag, { className: headingClassName }, title)
    : null;
}

// 段落
function renderSectionParagraphs(paragraphs?: WtfParagraph[]) {
  return (
    paragraphs &&
    paragraphs.map((paragraph) => {
      const { sentences } = paragraph;
      return (
        <p key={sentences.map((sentence) => sentence.text).join("")}>
          {sentences.map((sentence) => sentence.text).join("")}
        </p>
      );
    })
  );
}

// 参考文献
function renderSectionReferences(references?: WtfReference[]) {
  if (!references) return null;
  return (
    <ul className="list-disc list-inside space-y-1">
      {references.map((reference, referenceIndex) => {
        const {
          url,
          title,
          work,
          website,
          publisher,
          author,
          first,
          last,
          date,
          accessdate,
          language,
          template,
          type,
          agency,
          newspaper,
          data,
          inline,
        } = reference;
        if (type === "cite news" || type === "cite web") {
          return (
            <li key={`${referenceIndex}`} className="space-x-1">
              <span>
                {last}, {first}
              </span>
              <span>({date})</span>
              <a href={url} className="underline text-sky-500">
                {title}
              </a>
              <span>{work}</span>
              <span>{accessdate}</span>
            </li>
          );
        }
      })}
    </ul>
  );
}

// リスト
function renderSectionLists(lists?: WtfListItem[]) {
  if (!lists) return null;
  return (
    <ul className="list-disc list-inside space-y-1">
      {lists.map((list, listIndex) => {
        const { text, links } = list;
        return (
          <li key={`${listIndex}`}>
            <Link
              to={links?.[0]?.page ?? ""}
              className="underline text-sky-500"
            >
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
// 外部リンク
function renderSectionTemplates(templates?: WtfTemplate[]) {
  if (!templates) return null;
  return (
    <ul className="list-disc list-inside space-y-1">
      {templates.map((_template, templateIndex) => {
        const { template, list } = _template;
        if (!list) return null;
        return (
          <li key={`${templateIndex}`}>
            <Link to={list?.[0] ?? ""} className="underline text-sky-500">
              {template}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
*/
