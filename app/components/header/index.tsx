import { Link } from "react-router";

import logoDark from "@/images/logo-dark.svg";
import logoLight from "@/images/logo-light.svg";

export default function Header() {
  return (
    <header className="h-16 w-full p-4 fixed z-10 bg-background/50 backdrop-blur-sm border-b">
      <nav className="h-full flex items-center justify-between max-w-screen-lg mx-auto">
        <Link to="/" className="h-full flex">
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
    </header>
  );
}