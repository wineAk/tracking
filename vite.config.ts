import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const directory = env.VITE_REPOSITORY_NAME;
  const isDev = mode === "development";
  return {
    base: isDev ? `/${directory}` : `/${directory}/`,
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});
