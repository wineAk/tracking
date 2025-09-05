import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { linkList, type LinkListItemType } from "@/config/link-list";
import { ThemeToggle } from "@/components/theme/toggle";

import logoDark from "@/images/logo-dark.svg";
import logoLight from "@/images/logo-light.svg";

export default function Header() {
  const links = linkList();
  const { prod, test } = links;
  return (
    <header className="h-16 min-w-xs w-full p-4 fixed z-10 bg-background/50 backdrop-blur-sm border-b">
      <nav className="h-full flex items-center justify-between gap-4 max-w-screen-lg mx-auto">
        <Link to="/" className="h-full flex">
          <img src={logoLight} alt="React Router" className="block w-full dark:hidden" />
          <img src={logoDark} alt="React Router" className="hidden w-full dark:block" />
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu
            className="
              [&>div:last-child]:fixed sm:[&>div:last-child]:absolute
              [&>div:last-child]:top-12.5 sm:[&>div:last-child]:top-full
              [&>div:last-child]:left-4 sm:[&>div:last-child]:left-auto
              [&>div:last-child]:right-4 sm:[&>div:last-child]:right-0
            "
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer">切り替え</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <nav className="sm:w-[300px] space-y-4">
                    <ul>{NavigationMenuItems({ type: "prod", linksItem: prod })}</ul>
                    <ul>{NavigationMenuItems({ type: "test", linksItem: test })}</ul>
                    <Separator />
                    <ul className="text-xs text-muted-foreground p-2 mb-2">
                      <li>テスト環境は test-new.saaske.com から可能</li>
                      <li>ブランチの切り替え・クーロン設定が必要</li>
                    </ul>
                  </nav>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

type NavigationMenuItemsProps = {
  type: "prod" | "test";
  linksItem: LinkListItemType[];
};

function NavigationMenuItems({ type, linksItem }: NavigationMenuItemsProps) {
  const isProd = type === "prod";
  const title = isProd ? "本番" : "テスト";
  return (
    <li data-color={type}>
      <p className="text-sm font-medium p-2">{title}</p>
      {linksItem.map(({ version, cl_code, cl_company }) => {
        const href = `/${version}/${cl_code}`;
        return (
          <NavigationMenuLink asChild key={href}>
            <Link to={href}>
              <div className="font-medium space-x-2">
                <Badge className="h-2.5 w-2.5 rounded-full p-0" />
                <span>Web行動解析 {version}</span>
              </div>
              <div className="text-muted-foreground">
                {cl_code}：{cl_company}
              </div>
            </Link>
          </NavigationMenuLink>
        );
      })}
    </li>
  );
}
