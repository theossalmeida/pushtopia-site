import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
const publicFiles = new Set(["/", "/index.html", "/styles.css", "/script.js", "/config.js", "/assets/pushtopia-dog-happy.png"]);
const server = createServer(async (request, response) => {
  const requested = new URL(request.url || "/", "http://localhost").pathname;
  if (!publicFiles.has(requested)) { response.writeHead(404); response.end("Not found"); return; }
  const file = resolve(root, requested === "/" ? "index.html" : `.${requested}`);
  try { const info = await stat(file); if (!info.isFile()) throw new Error("not a file"); response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" }); createReadStream(file).pipe(response); } catch { response.writeHead(404); response.end("Not found"); }
});
server.listen(4173, "127.0.0.1", () => console.log("Pushtopia dev server: http://localhost:4173"));
