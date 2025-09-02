import { Link, Outlet } from "react-router";

import logoDark from "@/images/logo-dark.svg";
import logoLight from "@/images/logo-light.svg";

export default function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="h-full max-w-screen-lg mx-auto p-6 pt-16">
        <Outlet />
      </main>
      <script src={`${import.meta.env.BASE_URL}tracking.js?v=2.0.0`}></script>
    </>
  );
}

function Header() {
  return (
    <nav className="h-16 w-full p-4 fixed z-10 bg-background/50 backdrop-blur-sm border-b">
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
