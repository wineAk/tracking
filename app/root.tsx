import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import Header from "@/components/header";
import Fallback from "@/components/fallback";
import { ThemeProvider } from "@/components/theme/provider";
import { ColorProvider } from "@/components/color/provider";

import type { Route } from "./+types/root";
import "./app.css";

const directory = import.meta.env.VITE_REPOSITORY_NAME;
const siteName = import.meta.env.VITE_SITE_NAME;
const storageKey = "vite-ui-theme";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: `/${directory}/favicon.ico`,
    type: "image/x-icon",
  },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: `${siteName}` }];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey={storageKey}>
      <ColorProvider defaultColor="default">
        <html lang="ja" className="min-w-xs">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('${storageKey}') || 'dark';
                  const root = document.documentElement;
                  if (theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    root.classList.add(systemTheme);
                  } else {
                    root.classList.add(theme);
                  }
                } catch (e) {
                  // localStorage が利用できない場合はデフォルトでsystem
                  document.documentElement.classList.add('system');
                }
              })();
            `,
              }}
            />
          </head>
          <body data-color="default">
            <Header />
            {children}
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </ColorProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <main className="h-dvh bg-background">
      <Fallback />
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
