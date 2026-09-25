import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const dist = resolve(root, "dist");
try {
  const env = await readFile(resolve(root, ".env"), "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
} catch {}
const publicConfig = `window.PUSHTOPIA_CONFIG = ${JSON.stringify({
  betaDownloadUrl: process.env.PUSHTOPIA_BETA_DOWNLOAD_URL || "",
  loginUrl: process.env.PUSHTOPIA_LOGIN_URL || "",
  githubClientId: process.env.PUSHTOPIA_GITHUB_CLIENT_ID || ""
})};\n`;
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(resolve(root, "assets"), resolve(dist, "assets"), { recursive: true });
for (const file of ["index.html", "styles.css", "badges.css", "script.js"]) await cp(resolve(root, file), resolve(dist, file));
await writeFile(resolve(dist, "config.js"), publicConfig);
console.log(`Built static site in ${dist}`);
