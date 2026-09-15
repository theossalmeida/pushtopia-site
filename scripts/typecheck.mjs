import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const source = await readFile(resolve(fileURLToPath(new URL(".", import.meta.url)), "../script.js"), "utf8");
new Function(source);
console.log("Typecheck passed: browser script parses successfully.");
