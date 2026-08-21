/**
 * Conținut pentru agenți AI — variante markdown servite prin content
 * negotiation (Accept: text/markdown), conform acceptmarkdown.com.
 * Funcții pure, testabile; partea de negociere e în server.ts.
 */
import { articles } from "./blog";
import { products } from "./products";
import { referrals } from "./referrals";
import { site } from "./site-config";

const base = () => site.siteUrl;

/** Căile statice cunoscute ale site-ului (fără articole). */
const staticPaths = new Set([
  "/",
  "/despre",
  "/about",
  "/privacy",
  "/contact",
  "/magazin",
  "/portofoliu",
  "/referinte",
  "/blog",
  "/revit-mep",
  "/modelare-revit",
  "/hvac",
  "/instalatii-termice",
  "/instalatii-electrice",
  "/autocad-dwg",
  "/politica-de-confidentialitate",
  "/politica-cookies",
  "/termeni-si-conditii",
  "/informatii-legale",
]);

export function isKnownPath(pathname: string): boolean {
  if (staticPaths.has(pathname)) return true;
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    return articles.some((a) => a.slug === slug);
  }
  return false;
}

const mdHeaders = (status: number) => ({
  status,
  headers: {
    "content-type": "text/markdown; charset=utf-8",
    vary: "Accept, Accept-Encoding",
  },
});

function simpleMdResponse(body: string, status = 200): Response {
  return new Response(body, mdHeaders(status));
}

export function markdownResponseForPath(pathname: string): Response | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return simpleMdResponse(homeMarkdown());
  if (clean === "/despre" || clean === "/about") return simpleMdResponse(aboutMarkdown());
  if (clean === "/contact") return simpleMdResponse(contactMarkdown());
  if (clean === "/magazin") return simpleMdResponse(shopMarkdown());
  if (clean === "/portofoliu") return simpleMdResponse(portfolioMarkdown());
  if (clean === "/referinte") return simpleMdResponse(referencesMarkdown());
  if (clean === "/blog") return simpleMdResponse(blogIndexMarkdown());
  if (clean.startsWith("/blog/")) {
    const slug = clean.replace("/blog/", "");
    const article = articles.find((a) => a.slug === slug);
    if (article) return simpleMdResponse(articleMarkdown(article.slug));
  }
  return null;
}

export function notFoundMarkdown(pathname: string): Response {
  return simpleMdResponse(
    [
      `# Pagina nu există (404)`,
      ``,
      `> NOD BIM — modelare Revit MEP, instalații și documentație tehnică.`,
      ``,
      `${pathname ? `Cererea pentru \`${pathname}\` nu corespunde niciunei pagini.` : "Pagina cerută nu există."}`,
      ``,
      `Vezi unde să continui:`,
      ``,
      `- [Hartă completă a site-ului](${base()}/sitemap.xml)`,
      `- [Index pentru agenți AI](${base()}/llms.txt)`,
      `- [Servicii](${base()}/revit-mep)`,
      `- [Portofoliu](${base()}/portofoliu)`,
      `- [Magazin](${base()}/magazin)`,
      `- [Jurnal tehnic](${base()}/blog)`,
      `- [Contact](${base()}/contact)`,
      ``,
      `Răspunde doar cu aceste linkuri sau cu un mesaj scurt de recuperare.`,
    ].join("\n"),
    404,
  );
}

export function notAcceptableMarkdown(pathname: string): Response {
  return simpleMdResponse(
    [
      `# 406 — doar HTML`,
      ``,
      `> ${pathname} este disponibilă doar în format HTML.`,
      ``,
      `Solicită varianta HTML (Accept: text/html) sau consultă [llms.txt](${base()}/llms.txt).`,
      ``,
    ].join("\n"),
    406,
  );
}

function homeMarkdown(): string {
  return [
    `# ${site.businessName}`,
    ``,
    `> ${site.tagline}. Servicii de modelare Revit MEP, BIM și documentație tehnică pentru instalații HVAC, termice și electrice, plus AutoCAD/DWG pentru corectări și conversii.`,
    ``,
    `## Servicii`,
    ``,
    `- [Revit MEP & Modelare BIM](${base()}/revit-mep): modelare 3D, vederi, secțiuni, sheet-uri, export RVT/DWG/PDF`,
    `- [Instalații HVAC](${base()}/hvac): tubulaturi, echipamente, grile, anemostate, scheme`,
    `- [Instalații termice](${base()}/instalatii-termice): conducte, radiatoare, centrale, distribuitoare`,
    `- [Instalații electrice](${base()}/instalatii-electrice): iluminat, prize, circuite, trasee, tablouri`,
    `- [AutoCAD / DWG](${base()}/autocad-dwg): curățare, layere, redesenare, pregătire print`,
    `- [Corectare & completare](${base()}/modelare-revit): preluare RVT/DWG existent, implementarea observațiilor`,
    ``,
    `## Proces`,
    ``,
    `1. Clientul trimite proiectul (DWG/PDF/RVT) și cerințele`,
    `2. Primește estimarea — preț stabilit înainte de începere`,
    `3. Se realizează modelul și planșele (Revit MEP, AutoCAD la nevoie)`,
    `4. Se livrează fișierele finale: RVT · DWG · PDF`,
    ``,
    `## Prețuri orientative`,
    ``,
    `- Modificare/corectare planșă: de la 250 lei`,
    `- Redesenare/curățare plan: 350–800 lei`,
    `- Planșă instalații: de la 300 lei`,
    `- Pachet 5 planșe + suport tehnic: de la 1.500 lei`,
    ``,
    `## Referințe`,
    ``,
    `- [Dosar de referințe](${base()}/referinte): lucrări livrate cu client, termen și cost`,
    `- [Portofoliu](${base()}/portofoliu): lucrări de modelare și documentație`,
    ``,
    `## Întrebări frecvente`,
    ``,
    `- Lucrezi în Revit? Da — Revit MEP e fluxul principal.`,
    `- Livrezi și RVT editabil? Da, când face parte din scopul lucrării.`,
    `- Poți prelua un proiect început de altcineva? Da.`,
    ``,
    `## Contact`,
    ``,
    `- [Solicită o estimare](${base()}/#estimare)`,
    `- [Pagina de contact](${base()}/contact)`,
    `- [Despre NOD BIM](${base()}/despre)`,
    `- [Index complet pentru agenți](${base()}/llms.txt)`,
    ``,
  ].join("\n");
}

function aboutMarkdown(): string {
  return [
    `# Despre ${site.businessName}`,
    ``,
    `> Inginer de instalații, acreditat Uptime, cu experiență în proiectarea instalațiilor pentru centre de date.`,
    ``,
    `## Formare`,
    ``,
    `- Absolvent al facultății de inginerie a instalațiilor`,
    `- Acreditări Uptime Institute (centre de date) — standardele cele mai stricte de disponibilitate din industrie`,
    `- Experiență în proiectarea și coordonarea instalațiilor pentru centre de date`,
    ``,
    `## Metoda de lucru`,
    ``,
    `- Flux principal: Revit MEP (modelare + documentație din același model)`,
    `- Flux secundar: AutoCAD/DWG pentru lucrări care se rezolvă cel mai curat în 2D`,
    `- Scopul lucrării și livrabilele se stabilesc în scris înainte de începere; prețul nu se schimbă pe parcurs`,
    ``,
    `## Principii`,
    ``,
    `- Transparență: prețuri orientative publice`,
    `- Confidențialitate: fișierele clienților nu se publică fără acord`,
    `- Calitate înaintea vitezei: planșa se predă când rezistă la verificare`,
    `- Conținut tehnic onest, cu probe practice (vezi [jurnalul](${base()}/blog))`,
    ``,
    `## Detalii`,
    ``,
    `- Detaliile personale rămân private; datele complete de identificare se comunică la contractare.`,
    ``,
  ].join("\n");
}

function contactMarkdown(): string {
  return [
    `# Contact — ${site.businessName}`,
    ``,
    `> Trimite tema, planurile existente și cerințele proiectului pentru o estimare cu volumul, termenul și costul.`,
    ``,
    `## Canale`,
    ``,
    ...(site.email ? [`- Email: ${site.email}`] : []),
    `- [Formular de estimare](${base()}/#estimare)`,
    `- Răspuns de regulă în 1–2 zile lucrătoare`,
    ``,
    `## Ce fișiere să trimiți`,
    ``,
    `- Planuri de arhitectură (DWG/PDF) cu toate nivelurile`,
    `- Tema proiectului: discipline, echipamente, norme`,
    `- Fișiere existente în orice format (inclusiv vechi)`,
    `- Termenul dorit și scopul livrabilelor`,
    ``,
  ].join("\n");
}

function shopMarkdown(): string {
  return [
    `# Magazin — ${site.businessName}`,
    ``,
    `> Unelte de birou și CAD greu de găsit în România + modele didactice secționate MEP. Comenzi pe WhatsApp.`,
    ``,
    ...products
      .filter((p) => p.category !== "Didactice")
      .map((p) => `- ${p.name} — ${p.price} (${p.availability})`),
    ``,
    `## Modele didactice (print 3D, la comandă)`,
    ``,
    ...products
      .filter((p) => p.category === "Didactice")
      .map((p) => `- ${p.name} — ${p.price} (${p.availability})`),
    ``,
    `## Comandă`,
    ``,
    `Comanda se confirmă pe WhatsApp înainte de plată. Livrare prin curier în România. Retur 14 zile (OUG 34/2014).`,
    ``,
  ].join("\n");
}

function portfolioMarkdown(): string {
  return [
    `# Portofoliu — ${site.businessName}`,
    ``,
    `> Exemple de modelare Revit MEP și documentație pentru instalații HVAC, termice și electrice.`,
    ``,
    ...referrals.slice(0, 6).map((r) => `- ${r.lucrare} — ${r.client} (${r.loc}), ${r.pret}`),
    ``,
    `Pentru imagini și detalii complete, vezi pagina [Portofoliu](${base()}/portofoliu).`,
    ``,
  ].join("\n");
}

function referencesMarkdown(): string {
  return [
    `# Dosar de referințe — ${site.businessName}`,
    ``,
    `> Fișe de lucrare cu ce s-a livrat, în cât timp și la ce cost. Publicate cu acordul clienților.`,
    ``,
    ...referrals.map(
      (r) =>
        `- **Fișa ${r.fisa}** — ${r.lucrare} · ${r.client}, ${r.loc} · ${r.pret} · ${r.status}: „${r.citat}”`,
    ),
    ``,
  ].join("\n");
}

function blogIndexMarkdown(): string {
  return [
    `# Jurnal tehnic — ${site.businessName}`,
    ``,
    `> Articole de inginerie cu probe practice: costuri descompuse, experimente Revit vs AutoCAD, proiectarea instalațiilor în centre de date.`,
    ``,
    ...articles.map((a) => `- [${a.title}](${base()}/blog/${a.slug}): ${a.description}`),
    ``,
  ].join("\n");
}

export function articleMarkdown(slug: string): string {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return notFoundMarkdown(`/blog/${slug}`) ? notFoundText(`/blog/${slug}`) : "";
  const parts: string[] = [
    `# ${a.title}`,
    ``,
    `> ${a.description}`,
    ``,
    `*${a.date} · ${a.readingTime} min de citit · ${a.tags.join(", ")}*`,
    ``,
  ];
  for (const s of a.sections) {
    if (s.heading) parts.push(`## ${s.heading}`, ``);
    for (const p of s.paragraphs ?? []) parts.push(p, ``);
    for (const li of s.list ?? []) parts.push(`- ${li}`);
    if (s.list?.length) parts.push(``);
    if (s.table) {
      parts.push(
        `| ${s.table.head.join(" | ")} |`,
        `| ${s.table.head.map(() => "---").join(" | ")} |`,
      );
      for (const row of s.table.rows) parts.push(`| ${row.join(" | ")} |`);
      parts.push(``);
    }
    if (s.note) parts.push(`> **Notă:** ${s.note}`, ``);
  }
  parts.push(
    `---`,
    ``,
    `[Înapoi la jurnal](${base()}/blog) · [Servicii](${base()}/revit-mep) · [Contact](${base()}/contact)`,
    ``,
  );
  return parts.join("\n");
}

function notFoundText(pathname: string): string {
  return `# Pagina nu există (404)\n\n> ${pathname} nu corespunde niciunei pagini. Vezi [sitemap](${base()}/sitemap.xml) sau [llms.txt](${base()}/llms.txt).\n`;
}

/** /llms.txt conform spec-ului llmstxt.org (H1, blockquote, detalii, secțiuni cu linkuri). */
export function llmsTxt(): string {
  return [
    `# ${site.businessName}`,
    ``,
    `> ${site.tagline}. Modelare Revit MEP, BIM și documentație tehnică pentru instalații HVAC, termice și electrice. Comandă de produse de nișă și jurnal tehnic pe aceeași platformă.`,
    ``,
    `## When to use this`,
    ``,
    `This is a service site for a freelance MEP design engineer. Reach for it when a user needs:`,
    ``,
    `- **Revit MEP / BIM modeling** — HVAC, heating or electrical installation models, 3D views, sections, sheets, quantities`,
    `- **Technical documentation** — drafting installation plans, corrections, DWG cleanup or PDF redraw`,
    `- **Estimates** — price and deadline for a modeling job; send the user to the estimate form or contact page`,
    `- **Domain knowledge** — pricing breakdowns, LOD levels, Revit vs AutoCAD, data center installations; answers are in the journal`,
    `- **Niche products** — CAD macro pads, drafting stencils, cutaway MEP training models`,
    ``,
    `Do NOT use this site for: sanitary/plumbing design (explicitly out of scope), construction execution, or Revit training courses (not offered).`,
    ``,
    `All pages are also available as Markdown at the same URL via \`Accept: text/markdown\` content negotiation.`,
    ``,
    `## Servicii`,
    ``,
    `- [Revit MEP & Modelare BIM](${base()}/revit-mep): modelare 3D, vederi, secțiuni, sheet-uri, export RVT/DWG/PDF`,
    `- [Instalații HVAC](${base()}/hvac): tubulaturi, echipamente, grile, scheme`,
    `- [Instalații termice](${base()}/instalatii-termice): conducte, radiatoare, centrale, distribuitoare`,
    `- [Instalații electrice](${base()}/instalatii-electrice): iluminat, prize, circuite, tablouri`,
    `- [AutoCAD / DWG](${base()}/autocad-dwg): curățare, layere, redesenare, pregătire print`,
    ``,
    `## Conținut`,
    ``,
    `- [Jurnal tehnic](${base()}/blog): articole cu probe practice`,
    ...articles.map((a) => `- [${a.title}](${base()}/blog/${a.slug})`),
    ``,
    `## Portofoliu și referințe`,
    ``,
    `- [Portofoliu](${base()}/portofoliu): lucrări de modelare și documentație`,
    `- [Dosar de referințe](${base()}/referinte): lucrări livrate cu client, termen și cost`,
    ``,
    `## Magazin`,
    ``,
    `- [Magazin](${base()}/magazin): unelte CAD, șabloane, modele didactice secționate`,
    ``,
    `## Companie`,
    ``,
    `- [Despre](${base()}/despre): inginer de instalații, acreditat Uptime`,
    `- [Contact](${base()}/contact): formular, WhatsApp, email`,
    ``,
    `## Optional`,
    ``,
    `- [Hartă site](${base()}/sitemap.xml)`,
    `- [Politica de confidențialitate](${base()}/politica-de-confidentialitate)`,
    `- [Termeni și condiții](${base()}/termeni-si-conditii)`,
    ``,
  ].join("\n");
}

/** /agent-instructions.txt — fișier dedicat de instrucțiuni pentru agenți. */
export function agentInstructionsTxt(): string {
  return [
    `# Agent instructions — ${site.businessName}`,
    ``,
    `## When to use this`,
    ``,
    `This site is a freelance MEP (mechanical, electrical, plumbing) design engineering service.`,
    ``,
    `Use it when the user asks about:`,
    ``,
    `- Revit MEP or BIM modeling (mechanical, HVAC, electrical, heating) — incl. 3D models, sections, sheets, RVT/DWG/PDF deliverables`,
    `- Technical drawing: installation plans, corrections, DWG cleanup, PDF redraw`,
    `- Estimates for such work (price, deadline) — point the user to the form and contact page`,
    `- MEP knowledge: plan pricing, LOD, Revit vs AutoCAD workflows, data center installations (see journal)`,
    `- Niche CAD tools and MEP training models (see shop)`,
    ``,
    `Do NOT use this site for: sanitary/plumbing system design, construction site execution, Revit training courses.`,
    ``,
    `## How to call`,
    ``,
    `- Estimate: https://nodbim.com/#estimare (form) — user sends DWG/PDF/RVT + scope + deadline`,
    `- Contact: https://nodbim.com/contact`,
    `- All pages serve Markdown at the same URL with Accept: text/markdown`,
    ``,
    `## Sitemap`,
    ``,
    `- https://nodbim.com/sitemap.xml`,
    `- https://nodbim.com/llms.txt`,
    ``,
  ].join("\n");
}
