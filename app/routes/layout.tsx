import { Link, Outlet } from "react-router";

import logoDark from "@/images/logo-dark.svg";
import logoLight from "@/images/logo-light.svg";

export default function Layout() {
  return (
    <>
      <header className="pb-16">
        <Header />
      </header>
      <main className="max-w-screen-lg mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
}

function Header() {
  return (
    <nav className="h-16 w-full p-4 fixed bg-background/50 backdrop-blur-sm border-b">
      <Link to="/test_wikipedia/" className="h-full flex">
        <img
          src={logoLight}
          alt="React Router"
          className="block w-full dark:hidden"
        />
        <img
          src={logoDark}
          alt="React Router"
          className="hidden w-full dark:block"
        />
      </Link>
    </nav>
  );
}
