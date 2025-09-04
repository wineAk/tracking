import 'dotenv/config';
import type { Config } from "@react-router/dev/config";
import { copyFile } from 'node:fs/promises';
import path from 'node:path';
const directory = process.env.VITE_REPOSITORY_NAME;

export default {
  // Config options...
  basename: `/${directory}`,
  // 404 対策
  async buildEnd(args): Promise<void> {
    if (!args.viteConfig.isProduction) return;
    const buildPath = args.viteConfig.build.outDir;
    await copyFile(path.join(buildPath, 'index.html'), path.join(buildPath, '404.html'));
  },
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
