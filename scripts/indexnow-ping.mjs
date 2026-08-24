/**
 * Trimite toate URL-urile din sitemap către IndexNow (Bing / Yandex).
 * Rulează după deploy sau după modificări importante de conținut:
 *   bun scripts/indexnow-ping.mjs
 */
import { INDEXNOW_KEY, INDEXNOW_HOST, indexnowKeyUrl } from "../src/lib/indexnow.ts";

const SITEMAP_URL = `https://${INDEXNOW_HOST}/sitemap.xml`;

const res = await fetch(SITEMAP_URL);
if (!res.ok) {
  console.error(`Sitemap fetch eșuat: ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

console.log(`Trimitet ${urls.length} URL-uri către IndexNow...`);

const submit = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: indexnowKeyUrl(),
    urlList: urls,
  }),
});

console.log(`Răspuns IndexNow: ${submit.status} ${submit.statusText}`);
if (submit.status === 200 || submit.status === 202) {
  console.log("✅ URL-urile au fost acceptate.");
} else {
  console.error("Detalii:", await submit.text());
  process.exit(1);
}

// Yandex acceptă aceeași cheie/fișier — al doilea endpoint, best-effort.
const yandex = await fetch("https://yandex.com/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: indexnowKeyUrl(),
    urlList: urls,
  }),
});
console.log(`Yandex: ${yandex.status} ${yandex.statusText}`);
