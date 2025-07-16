import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  ...prefix("/test_wikipedia", [
    index("routes/home.tsx"),
  ]),
] satisfies RouteConfig;
