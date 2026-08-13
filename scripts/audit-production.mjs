// Audit de producție — rulează împotriva site-ului live după fiecare deploy.
// Utilizare: bun scripts/audit-production.mjs [BASE_URL]
// NU trimite lead-uri automate (testul de lead se face manual/opt-in).
const BASE_URL = (process.argv[2] || process.env.AUDIT_BASE_URL || "https://nodbim.com").replace(
  /\/+$/,
  "",
);

const EXPECTED_ROUTES = [
  "/",
  "/revit-mep",
  "/modelare-revit",
  "/hvac",
  "/instalatii-termice",
  "/instalatii-electrice",
  "/autocad-dwg",
  "/portofoliu",
  "/contact",
  "/politica-de-confidentialitate",
  "/politica-cookies",
  "/termeni-si-conditii",
  "/informatii-legale",
  "/robots.txt",
  "/sitemap.xml",
];

const CANONICAL_HOST = "nodbim.com";

let failures = 0;
let checks = 0;

function report(ok, message) {
  checks += 1;
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${message}`);
}

async function fetchOnce(url, options = {}) {
  const res = await fetch(url, { redirect: "manual", ...options });
  const body = await res.text().catch(() => "");
  return { res, body };
}

function canonicalOf(html) {
  const match = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  return match ? match[1] : null;
}

function titleOf(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

function descriptionOf(html) {
  const match = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  return match ? match[1] : null;
}

async function main() {
  console.log(`Audit producție: ${BASE_URL}\n`);

  // 1. Rute așteptate
  for (const route of EXPECTED_ROUTES) {
    const { res } = await fetchOnce(`${BASE_URL}${route}`);
    report(res.status === 200, `GET ${route} -> ${res.status}`);
  }

  // 2. 404
  {
    const { res, body } = await fetchOnce(`${BASE_URL}/pagina-care-nu-exista-${Date.now()}`);
    const is404Page = body.includes("Pagină inexistentă");
    report(
      res.status === 404 && is404Page,
      `rută necunoscută -> ${res.status} (pagină 404 corectă)`,
    );
  }

  // 3. Redirect www -> apex (cu păstrarea path-ului)
  {
    const wwwBase = BASE_URL.replace("://", "://www.");
    const { res } = await fetchOnce(`${wwwBase}/portofoliu?utm_source=test`);
    report(
      res.status === 301 &&
        res.headers.get("location") === `${BASE_URL}/portofoliu?utm_source=test`,
      `www -> apex 301 (${res.status}) cu path+query păstrate`,
    );
  }

  // 4. robots.txt
  {
    const { res, body } = await fetchOnce(`${BASE_URL}/robots.txt`);
    const contentType = res.headers.get("content-type") ?? "";
    report(
      res.status === 200 && contentType.includes("text/plain"),
      `robots.txt -> 200 text/plain`,
    );
    report(
      body.includes(`Sitemap: ${BASE_URL}/sitemap.xml`),
      "robots.txt conține referința sitemap-ului de producție",
    );
  }

  // 5. sitemap.xml — XML valid + URL-uri
  let sitemapUrls = [];
  {
    const { res, body } = await fetchOnce(`${BASE_URL}/sitemap.xml`);
    const isXml = body.trimStart().startsWith("<?xml");
    sitemapUrls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    report(res.status === 200 && isXml, "sitemap.xml -> 200 XML valid");
    const missing = EXPECTED_ROUTES.filter(
      (route) => !["/robots.txt", "/sitemap.xml"].includes(route),
    ).filter((route) => !sitemapUrls.includes(`${BASE_URL}${route}`));
    report(
      missing.length === 0,
      `sitemap conține toate paginile publice${missing.length ? ` — LIPSESC: ${missing.join(", ")}` : ""}`,
    );
  }

  // 6. Homepage: canonical, title, description, lang, OG
  {
    const { res, body } = await fetchOnce(BASE_URL);
    const canonical = canonicalOf(body);
    report(canonical === `${BASE_URL}/`, `canonical home = ${canonical}`);
    report(!!titleOf(body), "homepage are <title>");
    report(!!descriptionOf(body), "homepage are meta description");
    report(/<html[^>]*lang="ro"/.test(body), 'html lang="ro"');
    report(
      body.includes(`property="og:image" content="${BASE_URL}/og-image.jpg"`),
      "og:image folosește URL-ul de producție",
    );
    const forbidden = ["localhost", "lovableproject", "lovable.app", "workers.dev", "noindex"];
    const found = forbidden.filter((term) => body.toLowerCase().includes(term));
    report(
      found.length === 0,
      `fără referințe localhost/lovable/preview${found.length ? ` — GĂSIT: ${found.join(", ")}` : ""}`,
    );
    void res;
  }

  // 7. Pagini publice: canonical + title + description + host corect
  for (const route of [
    "/contact",
    "/politica-de-confidentialitate",
    "/politica-cookies",
    "/termeni-si-conditii",
    "/informatii-legale",
    "/portofoliu",
    "/revit-mep",
  ]) {
    const { body } = await fetchOnce(`${BASE_URL}${route}`);
    const canonical = canonicalOf(body);
    const ok =
      !!canonical &&
      new URL(canonical).hostname === CANONICAL_HOST &&
      canonical.startsWith("https://") &&
      !!titleOf(body) &&
      !!descriptionOf(body);
    report(ok, `${route}: canonical https://${CANONICAL_HOST} + title + description`);
  }

  // 8. Linkuri interne esențiale
  {
    const { body } = await fetchOnce(BASE_URL);
    const hrefs = [...body.matchAll(/href="(\/[^"#]*)/g)].map((m) => m[1]);
    const unique = [...new Set(hrefs)].filter(
      (href) => !href.includes("@") && !href.startsWith("//"),
    );
    const results = await Promise.all(
      unique.map(async (href) => {
        const { res } = await fetchOnce(`${BASE_URL}${href}`);
        return { href, status: res.status };
      }),
    );
    const broken = results.filter((r) => r.status >= 400);
    report(
      broken.length === 0,
      `linkuri interne de pe homepage: ${results.length} verificate${broken.length ? ` — RUPTE: ${broken.map((b) => `${b.href} (${b.status})`).join(", ")}` : ""}`,
    );
  }

  console.log(`\n${checks - failures}/${checks} verificări trecute.`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("Audit eșuat:", error);
  process.exit(1);
});
