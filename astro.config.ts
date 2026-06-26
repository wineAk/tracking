import "dotenv/config";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const repositoryName = process.env.VITE_REPOSITORY_NAME || "tracking";

export default defineConfig({
  output: "static",
  base: `/${repositoryName}`,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      tsconfigPaths: true,
    },
  },
});
