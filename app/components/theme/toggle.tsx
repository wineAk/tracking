import { Moon, Sun, SunMoon } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useTheme, type Theme } from "./provider";

export function ThemeToggle() {
  const themeList: Theme[] = ["light", "dark", "system"];
  const { setTheme } = useTheme();
  return (
    <NavigationMenu className="[&>div:last-child]:left-auto [&>div:last-child]:right-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">
            <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
            <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[100px] space-y-4">
              {themeList.map((type) => {
                const Icon = type === "light" ? Sun : type === "dark" ? Moon : SunMoon;
                return (
                  <NavigationMenuLink key={type} asChild className="cursor-pointer">
                    <li onClick={() => setTheme(type)}>
                      <div className="flex flex-row items-center gap-2">
                        {Icon && <Icon className="h-[1.2rem] w-[1.2rem]" />}
                        <span>{type}</span>
                      </div>
                    </li>
                  </NavigationMenuLink>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
