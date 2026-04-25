import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "www");

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const mustCopy = ["index.html", "styles.css", "app.js"];
for (const name of mustCopy) {
  cpSync(join(root, name), join(outDir, name), { force: true });
}

const assetExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".ico"]);
for (const name of readdirSync(root)) {
  const lower = name.toLowerCase();
  const dot = lower.lastIndexOf(".");
  const ext = dot >= 0 ? lower.slice(dot) : "";
  if (assetExt.has(ext)) {
    cpSync(join(root, name), join(outDir, name), { force: true });
  }
}

console.log("Prepared web assets in ./www");
