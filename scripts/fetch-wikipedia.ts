import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchWikipediaList } from "../src/lib/wikipedia";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const outputPath = resolve(root, "src/data/wikipedia.json");

const data = {
  generatedAt: new Date().toISOString(),
  items: await fetchWikipediaList(),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);

console.log(`Fetched ${data.items.length} Wikipedia entries to ${outputPath}`);
