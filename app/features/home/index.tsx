import type { Route } from "./+types/index";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import TypographyH2 from "@/components/typography/h2";
import { linkList, type LinkListItemType } from "@/config/link-list";

export default function Index() {
  const links = linkList();
  const { prod, test } = links;
  return (
    <section className="space-y-8">
      {Cards({ type: "prod", linksItem: prod })}
      {Cards({ type: "test", linksItem: test })}
    </section>
  );
}

type CardsProps = {
  type: "prod" | "test";
  linksItem: LinkListItemType[];
};

function Cards({ type, linksItem }: CardsProps) {
  const isProd = type === "prod";
  const title = isProd ? "本番" : "テスト";
  return (
    <div className="space-y-4" data-color={type}>
      <TypographyH2>{title}</TypographyH2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {linksItem.map(({ version, cl_code, cl_company, description }) => {
          const href = `/${version}/${cl_code}`;
          return (
            <Card key={href}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Web行動解析 {version}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>登録番号</TableHead>
                      <TableCell>{cl_code}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>会社名</TableHead>
                      <TableCell>{cl_company}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>その他</TableHead>
                      <TableCell>{description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="mt-auto ml-auto">
                <Button asChild>
                  <Link to={href}>
                    <span>切り替え</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
