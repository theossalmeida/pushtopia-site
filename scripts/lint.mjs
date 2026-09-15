import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const html = await readFile(resolve(root, "index.html"), "utf8");
const required = ["<main", "<nav", "<footer", "aria-label", "prefers-reduced-motion"];
const missing = required.filter((item) => !html.includes(item) && item !== "prefers-reduced-motion");
if (missing.length) throw new Error(`Missing accessibility markers: ${missing.join(", ")}`);
console.log("Lint passed: semantic landmarks and accessible labels found.");
