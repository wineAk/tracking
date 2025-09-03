import { Link, useLocation } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import { type FetchWikipedia } from "@/lib/fetchWikipedia";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cards({ data }: { data: FetchWikipedia[] }) {
  // 自身のパスを得る
  const path = useLocation().pathname;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(({ title, summary, lang, found }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="h-5 min-w-5 rounded-full p-0 tabular-nums">{lang}</Badge>
              {found ? title : title.replace("_", " ")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground break-all">{summary}</div>
          </CardContent>
          {found && (
            <CardFooter className="mt-auto ml-auto">
              <Button asChild>
                <Link to={`${path}/${title}`}>
                  <span>詳細</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </section>
  );
}
