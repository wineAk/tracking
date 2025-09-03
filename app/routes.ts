import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "features/home/layout.tsx", [
    index("features/home/index.tsx"),
  ]),
  route("/:version/:cl_code", "features/tracking/layout.tsx", [
    index("features/tracking/index.tsx"),
    route(":name", "features/tracking/view.tsx"),
  ]),
] satisfies RouteConfig;
