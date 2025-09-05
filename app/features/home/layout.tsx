import type { Route } from "./+types/layout";
import { Outlet } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypographyH1 from "@/components/typography/h1";

export default function Layout() {
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
              <TypographyH1 className="flex items-center justify-center gap-2">HOME</TypographyH1>
            </section>
            <Outlet />
          </article>
        </ScrollArea>
      </main>
    </>
  );
}
