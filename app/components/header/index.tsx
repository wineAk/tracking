import { Link } from "react-router";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { linkList, type LinkListItemType } from "@/config/link-list";

import logoDark from "@/images/logo-dark.svg";
import logoLight from "@/images/logo-light.svg";

export default function Header() {
  const links = linkList();
  const { prod, test } = links;
  return (
    <header className="h-16 w-full p-4 fixed z-10 bg-background/50 backdrop-blur-sm border-b">
      <nav className="h-full flex items-center justify-between max-w-screen-lg mx-auto">
        <Link to="/" className="h-full flex">
          <img src={logoLight} alt="React Router" className="block w-full dark:hidden" />
          <img src={logoDark} alt="React Router" className="hidden w-full dark:block" />
        </Link>
        <NavigationMenu className="[&>div:last-child]:left-auto [&>div:last-child]:right-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>切り替え</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  {NavigationMenuItems({ title: "本番", linksItem: prod })}
                  {NavigationMenuItems({ title: "テスト", linksItem: test })}
                  <p className="text-xs text-muted-foreground p-2">テスト環境は test-new.saaske.com から確認できます</p>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}

type NavigationMenuItemsProps = {
  title: string;
  linksItem: LinkListItemType[];
};

function NavigationMenuItems({ title, linksItem }: NavigationMenuItemsProps) {
  return (
    <li>
      <p className="text-sm font-medium p-2">{title}</p>
      {linksItem.map(({ version, cl_code, cl_company }) => {
        const href = `/${version}/${cl_code}`;
        return (
          <NavigationMenuLink asChild key={href}>
            <Link to={href}>
              <div className="font-medium">Web行動解析 {version}</div>
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
