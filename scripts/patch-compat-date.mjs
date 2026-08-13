// Postbuild: ajustează output-ul Nitro pentru deploy-ul Cloudflare.
//
// 1. Fixează compatibility_date în wrangler.json generat de Nitro.
//    Nitro scrie data curentă ("latest"), care eșuează la deploy dacă
//    versiunea de wrangler/workerd disponibilă nu cunoaște încă ziua de azi.
// 2. Injectează handler-ul `scheduled` (cron) pentru retry-ul automat al
//    notificărilor de lead. Nitro cloudflare-module nu generează handler
//    scheduled; handler-ul injectat face un apel HTTP intern către
//    /retry-notifications cu secretul CRON_SECRET din bindings.
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const PINNED_COMPATIBILITY_DATE = process.env.COMPATIBILITY_DATE || "2026-07-01";
const CRON_SCHEDULE = "*/5 * * * *";
const BASE_URL = (process.env.VITE_SITE_URL || "https://nodbim.com").replace(/\/+$/, "");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wranglerPath = resolve(root, ".output/server/wrangler.json");
const indexPath = resolve(root, ".output/server/index.mjs");
const scheduledPath = resolve(root, ".output/server/scheduled.mjs");

// 1. compatibility_date + cron trigger
const wrangler = JSON.parse(readFileSync(wranglerPath, "utf8"));
wrangler.compatibility_date = PINNED_COMPATIBILITY_DATE;
if (!wrangler.triggers?.crons?.includes(CRON_SCHEDULE)) {
  wrangler.triggers = {
    ...(wrangler.triggers ?? {}),
    crons: [...(wrangler.triggers?.crons ?? []), CRON_SCHEDULE],
  };
}
writeFileSync(wranglerPath, JSON.stringify(wrangler, null, 2) + "\n");
console.log(`[postbuild] compatibility_date pinned to ${PINNED_COMPATIBILITY_DATE}`);

// 2. scheduled handler (cron) — self-fetch către endpoint-ul intern protejat.
const scheduledModule =
  `// Generat automat de scripts/patch-compat-date.mjs — nu edita manual.
// Handler-ul ` +
  "`scheduled`" +
  ` al Worker-ului Cloudflare: la fiecare rulare
// cron apelează endpoint-ul intern de retry al notificărilor, autentificat
// cu secretul CRON_SECRET din bindings (env).
const BASE_URL = ${JSON.stringify(BASE_URL)};

export const scheduled = async (_event, env) => {
  const secret = env?.CRON_SECRET;
  if (!secret) {
    console.error("[cron] CRON_SECRET lipsește din bindings — retry-ul notificărilor este inactiv.");
    return;
  }
  try {
    const res = await fetch(BASE_URL + "/retry-notifications", {
      headers: { authorization: "Bearer " + secret },
    });
    if (!res.ok) {
      console.error("[cron] /retry-notifications a răspuns cu statusul", res.status);
    }
  } catch (error) {
    console.error("[cron] Apelul intern a eșuat:", error);
  }
};
`;

writeFileSync(scheduledPath, scheduledModule);
console.log(`[postbuild] scheduled handler scris în ${scheduledPath}`);

const indexContent = readFileSync(indexPath, "utf8");
if (!indexContent.includes(`export { scheduled } from "./scheduled.mjs"`)) {
  appendFileSync(indexPath, `\nexport { scheduled } from "./scheduled.mjs";\n`);
  console.log("[postbuild] export scheduled adăugat în index.mjs");
}
