import type { Route } from "./+types/index";
import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TypographyH2 from "@/components/typography/h2";
import Main from "@/components/wikipedia/main";
import { linkList, type LinkListItemType } from "@/config/link-list";

export default function Index() {
  const links = linkList();
  const { prod, test } = links;
  return (
    <Main title="HOME">
      <section className="space-y-8">
        {Cards({ title: "本番", linksItem: prod })}
        {Cards({ title: "テスト", linksItem: test })}
      </section>
    </Main>
  );
}

type CardsProps = {
  title: string;
  linksItem: LinkListItemType[];
};

function Cards({ title, linksItem }: CardsProps) {
  return (
    <div className="space-y-4">
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
                <Button variant="ghost" asChild>
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
