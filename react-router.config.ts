import 'dotenv/config';
import type { Config } from "@react-router/dev/config";
const directory = process.env.VITE_REPOSITORY_NAME;

export default {
  // Config options...
  basename: `/${directory}`,
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
