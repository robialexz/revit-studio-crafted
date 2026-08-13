// Fixează compatibility_date în wrangler.json generat de Nitro.
// Nitro scrie data curentă ("latest"), care eșuează la deploy dacă versiunea
// de wrangler/workerd disponibilă nu cunoaște încă ziua de azi.
// Cloudflare recomandă oricum fixarea datei pentru runde de deploy reproductibile.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const PINNED_COMPATIBILITY_DATE = process.env.COMPATIBILITY_DATE || "2026-07-01";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wranglerPath = resolve(root, ".output/server/wrangler.json");

const wrangler = JSON.parse(readFileSync(wranglerPath, "utf8"));
wrangler.compatibility_date = PINNED_COMPATIBILITY_DATE;
writeFileSync(wranglerPath, JSON.stringify(wrangler, null, 2) + "\n");
console.log(`[postbuild] compatibility_date pinned to ${PINNED_COMPATIBILITY_DATE}`);
