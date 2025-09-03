import { Link, Outlet } from "react-router";

const directory = import.meta.env.VITE_REPOSITORY_NAME;

export default function Layout() {
  return (
    <>
      <main className="h-full max-w-screen-lg mx-auto p-6 pt-16">
        <Outlet />
      </main>
      <script src={`/${directory}/tracking.js?v=2.0.0`}></script>
    </>
  );
}
