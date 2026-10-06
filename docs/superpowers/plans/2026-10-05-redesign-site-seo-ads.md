# Redesign NOD BIM (site, SEO, Ads) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repoziționează nodbim.com pe desenare în AutoCAD la comandă și redesenare PDF în DWG, cu aspect de studio, telefon apelabil din primul ecran și măsurat, și pagini de destinație separate pentru un test mic de Google Ads.

**Architecture:** Aceleași rute TanStack Start și aceleași tokenuri de culoare și font. Utilitarele tipografice existente se redefinesc pe loc, deci stilul nou ajunge pe toate paginile fără rescrierea lor. Se rescriu antetul, prima pagină și șablonul `ServicePage`; se adaugă o rută (`/pdf-in-dwg`), trei componente mici și un modul de prețuri cu funcții pure. Tracking-ul folosește evenimentele existente din `analytics.ts`.

**Tech Stack:** React 19, TanStack Start/Router, Tailwind 4, lucide-react, bun test, knip. Fără dependențe noi.

**Spec:** `docs/superpowers/specs/2026-10-05-redesign-site-seo-ads-design.md` · Machetă: https://claude.ai/artifact/FCDyVk6Cz1v4tRSXHJZa5C (varianta A). Acolo unde macheta și planul diferă, planul are dreptate: macheta a fost corectată de patru revizuiri.

**Revizuit de:** patru revizori independenți (fidelitate față de cod, UX și accesibilitate, SEO, Google Ads), pe 2026-10-05. Volumele sunt din Keyword Planner, România, sep. 2025 – aug. 2026.

## Global Constraints

- Niciun URL existent nu se schimbă. O singură rută nouă: `/pdf-in-dwg`. Fără pagini pe orașe, fără pagină separată de prețuri, fără pagină de releveu.
- Fără dependențe noi, fără `any`, fără aserțiuni non-null, fără directive de suprimare. Nu se slăbește configurația TypeScript, ESLint, Knip sau a testelor.
- `tsconfig` are `noUncheckedIndexedAccess` și `exactOptionalPropertyTypes`: un prop opțional se omite, nu se pasează ca `undefined`.
- Texte la persoana întâi singular sau impersonal; niciodată „noi”. Nicio mențiune despre centre de date sau acreditări Uptime în texte noi. Articolul general de blog despre instalații în centre de date rămâne (decizia proprietarului din 2026-10-02).
- Nimic inventat: fără recenzii, nume de clienți, cifre sau lucrări. Nicio imagine nu este prezentată ca lucrare predată până când proprietarul confirmă, pe fiecare, că este un export real; până atunci poartă eticheta vizibilă „Ilustrație de prezentare”.
- Termenele se scriu ca pe site-ul actual: „de regulă în 1–2 zile lucrătoare”. Rundele de modificări: „se stabilesc în ofertă”.
- Prețurile apar într-un singur loc în cod (`src/lib/pricing.ts`). Niciun preț în `<title>`. Un preț poate apărea într-o descriere doar dacă este tariful propriu al acelei pagini.
- Id-urile de secțiune de pe prima pagină rămân cele existente: `servicii`, `portofoliu`, `preturi`, `faq`, `estimare`.
- Punctul de trecere mobil/desktop este `lg` (1024 px), ca în `MobileCta` și în restul site-ului.
- Evenimentele de tracking se trimit doar cu acord pentru cookies; regula din `analytics.ts` nu se atinge. Conversiile din Ads sunt de aceea o limită inferioară; deciziile se iau pe jurnalul de contacte al proprietarului.
- **Precondiție git:** cele cinci fișiere modificate și necomise din `main` (`src/lib/agent-content.ts`, `src/lib/blog.ts`, `src/routes/blog.$slug.tsx`, `src/routes/sitemap[.]xml.ts`, `tests/agent-content.test.ts`) se comit înainte de Task 1, de proprietar pe `main` sau ca prim commit pe ramură. Task 5 depinde de articolul `pdf-in-dwg-vectorial-scanare-scara-oferta`, care există doar în aceste modificări.
- Ramura se creează pe loc cu `git switch -c redesign-2026-10`. Commit local după fiecare task, cu căi explicite, niciodată `git add -A`. Fără push și fără merge în `main` până la confirmarea proprietarului (`main` se sincronizează cu Lovable). Fără rebase sau amend pe commituri publicate.
- `docs/`, `.agents/`, `.claude/`, `.serena/`, `office/` nu se comit până când proprietarul confirmă că repo-ul GitHub este privat (conțin ID-ul contului de Ads și cheltuieli).
- Fiecare task se încheie cu `npm run typecheck && npm run lint && npm run deadcode && bun test`, toate verzi. Formatarea se face cu `npx eslint --fix <fișiere>`, nu cu `npm run format` (rescrie fișiere fără legătură).
- Nicio schimbare în Google Ads, GA4 sau GTM fără aprobarea explicită a proprietarului, pentru fiecare schimbare în parte.

## Întrebări pentru proprietar (înainte de Task 4)

Răspunsurile schimbă texte, nu structura. Fără răspuns se aplică varianta implicită.

| Întrebare | Implicit |
| --- | --- |
| Imaginile din `src/assets` (`proj-*`, `hero-*`, `portfolio-*`) sunt exporturi reale sau ilustrații generate? | Ilustrații: eticheta „Ilustrație de prezentare” |
| În cât timp răspunzi la o cerere pentru un singur plan? | „de regulă în 1–2 zile lucrătoare” |
| Numele și o fotografie pe site? | Nu |
| Un exemplu de livrabil de descărcat (`exemplu-livrabil.dwg` și `.pdf`)? | Nu există link |
| Pagina `/magazin` (kituri și automatizări Revit) rămâne? | Rămâne indexată, cu link doar din subsol |

## Maparea căutărilor pe pagini

| URL | Deține | Nu conduce cu |
| --- | --- | --- |
| `/` | brandul; „desenare autocad”, „desene autocad” (110/lună fiecare) | „Desenator”, „PDF în DWG” |
| `/autocad-dwg` | „desenator autocad” (30), „caut desenator autocad”, „freelancer autocad”, „desenator cad” (10 fiecare), corecturi DWG | „redesenare”, „PDF în DWG” |
| `/pdf-in-dwg` | „pdf in dwg” (1.300) ca serviciu, „pdf scanat în dwg”, „redesenare planuri” | — |
| articolul de blog | ghid: „cum transformi un PDF în DWG” | „PDF în DWG:” ca prefix de titlu |
| `/revit-mep` și paginile MEP | planșe de instalații, „planuri instalatii electrice” (40), releveu de instalații | „proiect”, „proiectare” |

Excluse, cu motiv: „releveu apartament / casă” și „schiță casă / apartament” (cer măsurare la fața locului și persoană autorizată); „desen tehnic” (1.900; cursuri); „desenator tehnic” (170; locuri de muncă). „Proiectant AutoCAD” (70) apare o singură dată, într-o întrebare de pe `/autocad-dwg`, nu în titlu.

## Review Focus

1. **Prima vizită pe telefon, cu bannerul de cookies afișat (375×667):** un link `tel:` este vizibil și apăsabil fără a închide bannerul. Verificare în Task 2.
2. **Nici telefon, nici WhatsApp configurate:** antetul, hero-ul, bara de mobil și estimatorul se afișează fără linkuri moarte și fără rânduri goale. Teste în Task 1, verificare în Task 2.
3. **Număr de planșe în afara intervalului** (0, 21, 2.5, −3, NaN): întreg între 1 și 20. Test în Task 1.
4. **Acord cookies refuzat sau absent:** clicul pe telefon și WhatsApp funcționează și nu trimite niciun eveniment. Test în Task 1.
5. **Fără JavaScript:** titlul, prețul implicit al estimatorului („350 – 800 lei”) și linkurile de telefon sunt vizibile; comparația stă jumătate/jumătate. Verificare în Task 4.

## File Structure

| Fișier | Rol |
| --- | --- |
| `src/lib/pricing.ts` (nou) | Tarife, calcul orientativ, mesaj WhatsApp, `Offer` pentru date structurate |
| `src/lib/site-config.ts` | `buildPhoneHref`, `phoneHref`, `phoneDisplay`, mesaj WhatsApp neutru, slogan |
| `src/components/site/PhoneLink.tsx` (nou) | Link `tel:` cu `phone_click` |
| `src/components/site/PriceEstimator.tsx`, `BeforeAfter.tsx` (noi) | Estimator și comparație |
| `src/assets/demo-plan.svg`, `demo-plan-scan.webp` (noi) | Pereche demonstrativă |
| `src/styles.css`, `public/fonts/*` | Utilitare redefinite, fonturi deduplicate |
| `src/components/site/Header.tsx`, `Footer.tsx`, `MobileCta.tsx`, `ConsentBanner.tsx`, `QuoteForm.tsx`, `CtaSection.tsx` | Cadru |
| `src/routes/index.tsx`, `src/lib/home-content.ts`, `src/lib/agent-content.ts` | Prima pagină și varianta ei Markdown |
| `src/components/site/ServicePage.tsx`, rutele de servicii, `src/routes/pdf-in-dwg.tsx` (nou), `src/routeTree.gen.ts` | Pagini de servicii |
| `src/lib/blog.ts` | Titlul și linkul articolului PDF→DWG; trei linkuri interne |

---

### Task 1: Prețuri, telefon, mesaje (logică pură)

**Files:**
- Create: `src/lib/pricing.ts`, `tests/pricing.test.ts`
- Modify: `src/lib/site-config.ts`, `tests/site-config.test.ts`, `tests/analytics.test.ts`

**Interfaces — Produces:**
- `type JobType = "redesenare" | "corectare" | "instalatii"`
- `jobRates: Record<JobType, { label: string; waName: string; min: number; max: number | null; unit: string; note: string }>` cu exact aceste valori:
  - `redesenare`: `label: "Redesenare plan sau PDF în DWG"`, `waName: "de redesenat (PDF în DWG)"`, `min: 350`, `max: 800`, `unit: "plan"`, `note: "Depinde de complexitate și de cât de lizibil este originalul."`
  - `corectare`: `label: "Modificare sau corectare planșă existentă"`, `waName: "de modificat sau corectat"`, `min: 250`, `max: null`, `unit: "planșă"`, `note: "Preț de pornire pe planșă, în funcție de volumul observațiilor."`
  - `instalatii`: `label: "Planșă de instalații (HVAC, termice, electrice)"`, `waName: "de instalații, de desenat"`, `min: 300`, `max: null`, `unit: "planșă"`, `note: "Pachetul de 5 planșe pornește de la 1.500 lei."`
- `packagePrice = { sheets: 5, min: 1500 }`
- `estimate(type: JobType, sheets: number): { sheets: number; min: number; max: number | null }`
- `estimateLabel(type: JobType, sheets: number): string`
- `estimateWhatsappMessage(type: JobType, sheets: number): string` — `Salut! Am găsit NOD BIM pe site. Am {n} {planșă | planșe | de planșe} {waName}. Pot trimite fișierele pentru o ofertă?` („de planșe” de la 20 în sus)
- `offerSchema(type: JobType): object` — `{ "@type": "Offer", name: label, priceCurrency: "RON", priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "RON", minPrice, unitText: unit } }`, cu `maxPrice` doar când există
- În `site-config.ts`: `buildPhoneHref(raw: string): string`, `phoneHref`, `phoneDisplay`; `defaultWhatsappMessage` devine `"Salut! Am găsit NOD BIM pe site și am un plan de desenat. Pot să îți trimit fișierele pentru o ofertă?"`; `site.tagline` devine `"DESENARE TEHNICĂ · AUTOCAD · REVIT MEP"`

- [ ] **Step 1: Scrie testele care pică**

```ts
// tests/pricing.test.ts
import { describe, expect, test } from "bun:test";
import {
  estimate, estimateLabel, estimateWhatsappMessage, jobRates, offerSchema, packagePrice,
} from "../src/lib/pricing";

test("tarifele din specificație", () => {
  expect(jobRates.redesenare).toMatchObject({ min: 350, max: 800, unit: "plan" });
  expect(jobRates.corectare).toMatchObject({ min: 250, max: null });
  expect(jobRates.instalatii).toMatchObject({ min: 300, max: null });
  expect(packagePrice).toEqual({ sheets: 5, min: 1500 });
});

describe("estimate", () => {
  test("interval și preț de pornire", () => {
    expect(estimate("redesenare", 1)).toEqual({ sheets: 1, min: 350, max: 800 });
    expect(estimate("redesenare", 3)).toEqual({ sheets: 3, min: 1050, max: 2400 });
    expect(estimate("instalatii", 5)).toEqual({ sheets: 5, min: 1500, max: null });
  });
  test("numărul de planșe e adus în 1–20, întreg", () => {
    for (const [input, want] of [[0, 1], [-3, 1], [21, 20], [2.5, 3], [2.6, 3], [Number.NaN, 1]] as const) {
      expect(estimate("corectare", input).sheets).toBe(want);
    }
  });
});

test("estimateLabel", () => {
  expect(estimateLabel("redesenare", 1)).toBe("350 – 800 lei");
  expect(estimateLabel("redesenare", 20)).toBe("7.000 – 16.000 lei");
  expect(estimateLabel("corectare", 1)).toBe("de la 250 lei");
});

test("mesajul WhatsApp: acord și formulare", () => {
  expect(estimateWhatsappMessage("redesenare", 1)).toContain("1 planșă de redesenat");
  expect(estimateWhatsappMessage("redesenare", 4)).toContain("4 planșe de redesenat");
  expect(estimateWhatsappMessage("redesenare", 20)).toContain("20 de planșe");
  expect(estimateWhatsappMessage("instalatii", 3)).not.toContain("pentru planșe");
  expect(estimateWhatsappMessage("corectare", 2)).toContain("pe site");
});

test("offerSchema", () => {
  expect(offerSchema("redesenare")).toEqual({
    "@type": "Offer", name: "Redesenare plan sau PDF în DWG", priceCurrency: "RON",
    priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "RON", minPrice: 350, maxPrice: 800, unitText: "plan" },
  });
  expect(offerSchema("corectare")).not.toHaveProperty("priceSpecification.maxPrice");
});
```

```ts
// de adăugat în tests/site-config.test.ts
test("buildPhoneHref", () => {
  expect(buildPhoneHref("40750485793")).toBe("tel:+40750485793");
  expect(buildPhoneHref("+40 750 485 793")).toBe("tel:+40750485793");
  expect(buildPhoneHref("0750485793")).toBe("tel:+40750485793");
  for (const bad of ["", "12345", "[WHATSAPP_NUMBER]"]) expect(buildPhoneHref(bad)).toBe("");
});
test("phoneHref și phoneDisplay există împreună", () => {
  expect(phoneHref === "").toBe(phoneDisplay === "");
  expect(phoneHref === "" || /^tel:\+\d{8,15}$/.test(phoneHref)).toBe(true);
});
```

În `tests/analytics.test.ts`, cu harness-ul existent (rândurile 21–58) și `gaMeasurementId = "G-TEST"`: fără alegere și cu „necessary”, `trackConversion("phone_click", { source: "header" })` lasă `dataLayer` și apelurile `gtag` goale; cu „all”, `dataLayer` este `[{ event: "phone_click", source: "header" }]` și apelurile sunt `[["event", "phone_click", { source: "header" }]]`.

- [ ] **Step 2:** `bun test tests/pricing.test.ts tests/site-config.test.ts tests/analytics.test.ts` — Expected: FAIL pe modulele și exporturile noi.
- [ ] **Step 3: Implementează `pricing.ts`.** Separatorul de mii se scrie cu regex, nu cu `toLocaleString`, ca serverul și browserul să dea același text.
- [ ] **Step 4: `site-config.ts`.** `buildPhoneHref` normalizează 07… la +40 (aceeași regulă ca `formatPhoneDisplay`), cere 8–15 cifre și respinge placeholderul cu `isConfigured`. Sursa numărului: `site.phone`, cu rezervă `site.whatsappNumber`. `phoneDisplay` folosește `formatPhoneDisplay` pe aceeași sursă.
- [ ] **Step 5:** Suita completă — Expected: PASS (testele importă toate exporturile noi, deci Knip rămâne curat).
- [ ] **Step 6: Commit** — `feat: pricing module, phone helpers, neutral WhatsApp message`

---

### Task 2: Cadru — stiluri, fonturi, antet, subsol, bare fixe, formular, favicon

**Files:**
- Create: `src/components/site/PhoneLink.tsx`, `public/favicon.svg`, `public/favicon-48.png`, `public/apple-touch-icon.png`
- Modify: `src/styles.css`, `Header.tsx`, `Footer.tsx`, `MobileCta.tsx`, `ConsentBanner.tsx`, `QuoteForm.tsx`, `CtaSection.tsx`, `ServicePage.tsx` (doar apelul `MobileCta`/`Header`), `src/routes/__root.tsx`, `contact.tsx`, `en.about.tsx`, `en.autocad-drafting.tsx`, `en.revit-mep-outsourcing.tsx`, `public/og-image.jpg`
- Delete: `public/fonts/ibm-plex-sans-{500,600}-latin.woff2`, `ibm-plex-sans-{500,600}-latin-ext.woff2`

**Interfaces:**
- Consumes: `phoneHref`, `phoneDisplay`, `defaultWhatsappMessage` (Task 1); `trackConversion`.
- Produces:
  - `PhoneLink({ source, className, children }: { source: string; className?: string; children?: ReactNode })` — `null` când `phoneHref` e gol; fără `children` afișează `phoneDisplay`.
  - `Header({ ctaHref }: { ctaHref?: string })` — implicit `"/#estimare"`.
  - `MobileCta()` fără props.
  - Utilitare CSS noi: `btn`, `btn-primary`. Redefinite pe loc: `tech-label`, `display-xl`.

- [ ] **Step 1: `styles.css`.**
  - `tech-label`: `font-size: .75rem`, `letter-spacing: .08em`, `line-height: 1.4` (rămâne cu majuscule).
  - `display-xl`: fără `text-transform`, `font-stretch: 88%`, `line-height: 1.04`.
  - Regula de bază `h1–h4`: `font-stretch: 88%`, `line-height: 1.1`, `letter-spacing: -.015em`, `text-wrap: balance`.
  - Adaugă `btn` și `btn-primary` după machetă.
  - `:where(section, div)[id] { scroll-margin-top: 5rem }`; șterge `scroll-behavior: smooth`.
  - `.bg-graphite :focus-visible { outline-color: var(--graphite-foreground) }`.
  - `--input: oklch(0.62 0.008 240)` (contrast 3,2:1 pe fundal).
  - Fonturi: o singură pereche `@font-face` IBM Plex Sans cu `font-weight: 400 600` pe fișierele `-400-` (cele trei greutăți sunt același fișier variabil); șterge cele patru blocuri și fișiere duplicate. IBM Plex Mono primește `font-display: optional`.
- [ ] **Step 2: `PhoneLink.tsx`** conform interfeței.
- [ ] **Step 3: `Header.tsx`.**
  - RO: `Servicii` (meniu), `Lucrări` → `/portofoliu`, `Prețuri` → `/#preturi`, `Despre` → `/despre`, `PhoneLink source="header"`, buton „Cere ofertă” → `ctaHref`. Meniul are două intrări acum („Desenare AutoCAD” → `/autocad-dwg`, „Revit MEP și instalații” → `/revit-mep`); a treia vine în Task 5.
  - EN: „Revit MEP”, „AutoCAD”, „About”, telefon, buton „Get a quote”.
  - Dispar sloganul de sub nume, „Jurnal”, „FAQ” și `LanguageSwitcher` (se șterge componenta). Sigla devine `/favicon.svg`. Fundal opac, fără `backdrop-blur`. Toate elementele au `whitespace-nowrap`.
  - Meniul „Servicii”: `<details>` controlat (`open` + `onToggle`), `<summary>` ca singur declanșator, linkuri într-un `<ul>` simplu, fără `role="menu"` și fără deschidere la hover. Se închide la Escape (focusul revine pe `<summary>`), la `focusout` în afara lui, la `pointerdown` în afară și la schimbarea căii sau a ancorei. Linkuri de minimum 44 px, cu eticheta și descrierea de un rând din machetă.
  - Sub `lg`: sigla, `PhoneLink source="header_mobile"` cu iconiță și textul „Sună” (minimum 44×44 px, vizibil fără a deschide meniul), buton „Meniu” cu `aria-expanded` și `aria-controls`. Panoul listează linkurile pe verticală, fără `<details>`, se închide la Escape, are `max-height: calc(100dvh - 4rem)` și `overflow-y: auto`.
  - Primul element focalizabil din pagină: „Sari la conținut” → `#continut`; `<main>` primește `id="continut"` în fiecare rută care randează `Header`.
  - `ServicePage` și `contact.tsx` pasează `ctaHref="#estimare"`.
- [ ] **Step 4: `Footer.tsx`.** Descriere RO: „Desenare tehnică în AutoCAD și Revit: planuri redesenate, PDF în DWG și planșe de instalații.” Coloana „Servicii” listează toate rutele de servicii existente (`/autocad-dwg`, `/revit-mep`, `/modelare-revit`, `/hvac`, `/instalatii-termice`, `/instalatii-electrice`), cu aceleași nume ca în antet. Coloana „Site”: Lucrări, Jurnal tehnic, Magazin, Despre, Contact, Întrebări frecvente (`/#faq`). Linkul de limbă existent („English” / „Română”) duce la `alternatePath(pathname, …)`, cu `hrefLang` și `lang`. Telefonul devine `PhoneLink source="footer"`. Linkurile au `hover:underline`, nu `hover:text-primary`. Rădăcina primește `pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0`.
- [ ] **Step 5: `MobileCta.tsx`.** Înălțime fixă `h-14`, `pb-[env(safe-area-inset-bottom)]`, fundal opac. Două butoane: `PhoneLink source="mobile_cta"` („Sună” / „Call”) și WhatsApp. Cu un singur canal configurat, acela ocupă toată lățimea; cu niciunul, `return null`. Se scoate `estimateHref` din toți apelanții și `pb-16 lg:pb-0` de pe `<main>` (spațiul vine din subsol).
- [ ] **Step 6: `ConsentBanner.tsx`.** `bottom-14 lg:bottom-0`, ca bara „Sună” să rămână vizibilă. Text: „Site-ul folosește cookies doar pentru funcționare și, cu acordul tău, pentru statistici anonime și măsurarea reclamelor.”
- [ ] **Step 7: `QuoteForm.tsx` și `CtaSection.tsx`.**
  - Tipuri RO: „Redesenare / PDF în DWG”, „Corectare planșă”, „Planșe de instalații”, „Modelare Revit MEP”, „Altceva”. Fișiere implicite `["PDF"]`.
  - Legende fără numere. Câmpul de telefon imediat după nume, cu eticheta „Telefon / WhatsApp (opțional, pentru răspuns mai rapid)”.
  - Indiciu la descriere: „Ex.: plan apartament cu 2 camere, scanat; îl vreau în DWG, la scară.”
  - Inputuri `text-base md:text-sm` (iOS nu mai mărește pagina la focus), fără `outline-none`; opțiunile `py-3`; `inputMode="numeric"` la numărul de planșe. La validare eșuată, focus pe primul câmp invalid.
  - `CtaSection`: butoanele devin `PhoneLink source="cta"` și WhatsApp.
- [ ] **Step 8: `contact.tsx` și `__root.tsx`.**
  - `contact.tsx`: titlu „Contact și ofertă · NOD BIM”, H1 „Contact și ofertă”, blocul cu canale deasupra formularului, `PhoneLink source="contact"` în locul linkului `tel:` existent.
  - `__root.tsx`: viewport cu `viewport-fit=cover`; preload pentru `archivo-var-latin.woff2` și `-latin-ext` (`as: "font"`, `type: "font/woff2"`, `crossOrigin: "anonymous"`); titlu implicit „NOD BIM · Desenare tehnică în AutoCAD și Revit”; pagina 404 folosește `Header` și `Footer`, are linkuri către `/`, `/autocad-dwg`, `/portofoliu`, `/contact` și `PhoneLink source="404"`, fără `sitemap.xml`, `llms.txt` și blocul `<pre>`.
- [ ] **Step 9: Favicon și imagine de partajare.** `public/favicon.svg`: 32×32, fundal `#1a1f24`, două bare `#eeefec`, diagonală `#228bdb` (valorile sRGB ale tokenurilor). `favicon-48.png` (Safari nu redă favicon SVG) și `apple-touch-icon.png` 180×180, fără colțuri rotunjite. `og-image.jpg` 1200×630 pe `#f4f4f1`, cu sigla, „NOD BIM” și „Desenare tehnică în AutoCAD și Revit”, cu textul convertit în contururi. Generare cu `qlmanage -t -s <px> -o <dir> <svg>` și `sips`. În `__root.tsx`: `icon` PNG 48, apoi `icon` SVG, `apple-touch-icon`, `og:image:height` = `630`.
- [ ] **Step 10:** `file public/favicon-48.png public/apple-touch-icon.png public/og-image.jpg` — Expected: `48 x 48`, `180 x 180`, `1200x630`.
- [ ] **Step 11: Verifică în browser** (`preview_start` cu `dev`). Înainte de clicuri rulează în consolă `window["ga-disable-<G-id>"] = true`, ca testele să nu ajungă în GA4-ul de producție.
  - La 375×667, fără `nod_consent_v1` în `localStorage`: `document.elementFromPoint` în centrul butonului „Sună” din bara de jos și al celui din antet întoarce un link `tel:`.
  - La 375, 1024, 1100 și 1440 px, pe `/` și `/en/about`: antet pe un singur rând și `document.documentElement.scrollWidth <= window.innerWidth`.
  - Tastatură: Tab ajunge la „Sari la conținut”, apoi la „Servicii”; Enter îl deschide, Escape îl închide și focusul revine.
  - Cu acord „all”, clicul pe telefon adaugă `{ event: "phone_click", source: "header" }` în `window.dataLayer`; fără acord, nimic și nicio eroare în consolă.
- [ ] **Step 12:** Suita completă — Expected: PASS.
- [ ] **Step 13: Commit** — `feat: new site shell, phone-first header and bars, favicon`

---

### Task 3: Stilul nou pe paginile care nu se rescriu

**Files:** `src/components/site/DespreContent.tsx`, `LegalPage.tsx`, `EnSections.tsx`, `PrivacyContent.tsx`, `src/routes/portofoliu.tsx`, `magazin.tsx`, `blog.index.tsx`, `blog.$slug.tsx`, `despre.tsx`, `en.about.tsx`, `en.autocad-drafting.tsx`, `en.revit-mep-outsourcing.tsx`, `en.cookies.tsx`, `en.privacy.tsx`, paginile legale RO.

Trecere mecanică, fără schimbări de conținut în afara celor numite:

- [ ] **Step 1:** Scoate clasa `uppercase` de pe titluri, `dt` și `summary`. Scoate elementele de fundal `cad-grid-lg` din hero-uri. Etichetele `text-mep` devin `text-muted-foreground`. `max-w-[1400px]` devine `max-w-[1200px]`.
- [ ] **Step 2:** `DespreContent.tsx`: H1 „Lucrezi direct cu mine, inginer de instalații”. `portofoliu.tsx`: H1 și titlu fără „predate” sau „realizate”; fiecare imagine primește a doua linie de legendă „Ilustrație de prezentare” (vezi Întrebări pentru proprietar).
- [ ] **Step 3: Verifică** `grep -rn "uppercase" src --include=*.tsx | grep -E "<h[1-4]|display-xl"` — Expected: niciun rezultat. Apoi, în browser la 1440 și 375 px: `/portofoliu`, `/despre`, `/blog`, un articol, `/magazin`, `/en/about`, o pagină legală: titluri cu literă mică, fără grilă de fundal, fără scroll orizontal.
- [ ] **Step 4:** Suita completă — Expected: PASS.
- [ ] **Step 5: Commit** — `style: apply new type and layout rules to remaining pages`

---

### Task 4: Prima pagină, estimator și comparație

**Files:**
- Create: `src/components/site/PriceEstimator.tsx`, `BeforeAfter.tsx`, `src/assets/demo-plan.svg`, `demo-plan-scan.webp`, `demo-plan-scan-640.webp`
- Modify: `src/routes/index.tsx`, `src/lib/home-content.ts`, `src/lib/agent-content.ts`, `tests/agent-content.test.ts`, `src/routes/__root.tsx`, `src/styles.css`
- Delete: `src/components/site/Ticker.tsx`, `Typewriter.tsx`, `src/assets/hero-2d-640.webp`, `hero-2d-720.webp` (dacă rămân fără importuri)

**Interfaces:**
- Consumes: tot ce produc Task 1–2.
- Produces:
  - `PriceEstimator({ defaultType }: { defaultType?: JobType })` — implicit `"redesenare"`, **1 planșă**.
  - `BeforeAfter({ clean, scan, alt, note }: { clean: string; scan: string; alt: string; note: string })`.

Titlu: `Desenare AutoCAD și Revit la comandă, online · NOD BIM`. Descriere: `Desenez în AutoCAD și Revit, online: planuri redesenate din PDF în DWG, corecturi pe planșe și planșe de instalații. Preț stabilit înainte de start.` H1: `Trimiți PDF-ul sau schița. Primești planul desenat în AutoCAD.`

- [ ] **Step 1: Perechea demonstrativă.** `demo-plan.svg`: plan de apartament cu două camere (`viewBox="0 0 960 600"`, fundal alb, linii `#1a1f24`), cu pereți la grosime, uși cu arc de deschidere, ferestre, cote pe două laturi și un indicator cu „Plan apartament · exemplu demonstrativ · scara 1:50”. Fără nume sau adresă. `demo-plan-scan.webp` (960×600 și 640×400) este același plan, redat o singură dată ca scanare (înclinat cu 0,7°, îngălbenit, neclar), salvat ca fișier static. Dacă proprietarul desenează el planul în AutoCAD, exportul lui înlocuiește SVG-ul.
- [ ] **Step 2: `BeforeAfter.tsx`.** Stratul de jos este scanarea, cel de sus desenul curat, decupat cu `clip-path` după un `<input type="range">` (0–100, implicit 50). Fără filtre CSS și fără `mix-blend-mode`. Cursorul este suprapus pe imagine (`absolute inset-0 opacity-0`, `touch-action: pan-y`), cu focusul arătat prin `:has(input:focus-visible)`. `aria-label` „Compară scanarea cu desenul redesenat”, `aria-valuetext` de forma „60% scanare, 40% desen redesenat”. Copia de deasupra are `alt=""`. Sub imagine: „Stânga: plan scanat, înclinat și neclar. Dreapta: același plan redesenat, cu linii curate.” și `note`.
- [ ] **Step 3: `PriceEstimator.tsx`.** `<form aria-labelledby autoComplete="off">`, cu `onSubmit` care face `preventDefault`. Trei opțiuni radio din `jobRates`, fiecare cu tariful ei și unitatea („350–800 lei / plan”, „de la 250 lei / planșă”, „de la 300 lei / planșă”); sub 480 px tariful coboară pe rând propriu. Întrebarea „Câte planuri sau planșe?” cu un `<input type="range">` 1–20, `min-height: 44px`, valoarea afișată în afara etichetei și `aria-valuetext` („3 planșe”). Rezultatul stă într-un `<output htmlFor>` cu `white-space: nowrap`, fără `aria-live` pe container, urmat de nota tarifului. Acțiuni: „Trimite cererea pe WhatsApp” (doar cu `hasWhatsapp`, cu `trackConversion("whatsapp_click", { source: "estimator", job_type })`), rândul „sau sună la” cu `PhoneLink source="estimator"` (doar cu `phoneHref`); fără niciun canal, un buton „Cere ofertă” → `#estimare`. Sub formular, o listă statică `<dl>` din `jobRates` și `packagePrice`: cele trei tarife și „Pachet 5 planșe: de la 1.500 lei”.
- [ ] **Step 4: Rescrie `Home`.** Fără `Reveal` nicăieri pe prima pagină. Secțiuni, în ordine:
  1. **Hero.** Etichetă „Desenare tehnică · AutoCAD · Revit MEP”, H1, paragraful din machetă terminat cu „Prețul îl afli în scris înainte să încep.” Butoane: `PhoneLink source="hero"` ca buton principal cu textul „Sună: {phoneDisplay}”, „Scrie pe WhatsApp” (source `hero`), apoi linkul text „sau calculează un preț orientativ” → `#preturi`. Un rând de fapte: „Preț în scris înainte să încep · fișiere DWG și PDF · ofertă de regulă în 1–2 zile lucrătoare”. În dreapta, cadrul de planșă cu `demo-plan.svg` (`width=960 height=600`) și indicatorul „Plan apartament · exemplu demonstrativ | Scara 1:50 | Format A3 | Fișiere DWG + PDF”, cu etichetele în `text-muted-foreground` la `.75rem`, grilă 2×2 sub 480 px. Șterge importul și preload-ul `hero3d`; hero-ul nu are preload.
  2. **Două intrări** (`#servicii`). H2 „Ai un plan de redesenat sau un proiect de modelat?” Două carduri `<Link>`: „Am un plan de redesenat” → `/autocad-dwg`, cu „Redesenare de la 350 lei / plan →”; „Suntem birou de proiectare” → `/revit-mep`, cu „Preiau modelarea și planșele, pe șablonul (template-ul) și standardele biroului.” Fără etichete mono.
  3. **Comparație.** Etichetă „PDF în DWG”, H2 „Dintr-o scanare neclară, un desen pe care poți lucra”. Text: „Mută glisorul ca să compari. Scanările le redesenez linie cu linie și le verific la scară; PDF-urile vectoriale le import și le curăț.” Trei puncte: „Scară verificată după cotele din original”, „Layere denumite și separate pe tipuri de elemente”, „Planșă pregătită pentru tipărit, cu indicator (cartuș)”. `BeforeAfter` cu nota „Exemplu demonstrativ, desenat pentru această pagină.”
  4. **Prețuri** (`#preturi`). H2 „Află cam cât costă înainte să suni”, `PriceEstimator`.
  5. **Exemple** (`#portofoliu`). H2 „Exemple de planșe și modele”. Trei imagini: planul demonstrativ, `proj-sectiune`, `proj-sheet` (cu variantele `-640`, `width`/`height`, `loading="lazy"`, `sizes="(min-width:768px) 370px, calc(100vw - 32px)"`), fiecare cu „Ilustrație de prezentare” ca a doua linie de legendă și cu `alt` fără „desenat în…”. Link „Vezi toate exemplele” → `/portofoliu`.
  6. **Proces.** H2 „Patru pași, fără surprize la preț”, pași numerotați 1–4 cu cifre simple. Pasul 2: „Ce se livrează, până când și cât costă, de regulă în 1–2 zile lucrătoare.” Pasul 4: „DWG sau RVT, plus PDF gata de tipărit. Rundele de modificări incluse sunt scrise în ofertă.”
  7. **Lucrezi direct cu mine.** „Sunt inginer de instalații și desenez personal fiecare planșă. Cine îți face oferta este și cine lucrează pe fișierele tale. NOD BIM este numele sub care ofer aceste servicii, nu o societate.” Trei puncte: „Preț în scris înainte să încep”; „Fișierele tale nu sunt publicate și nu ajung la altcineva; la cerere semnez un acord de confidențialitate”; „Desenez și modelez; calculele, verificarea și semnătura rămân la proiectantul autorizat”. Link „Despre mine” → `/despre`.
  8. **Întrebări** (`#faq`). Primele 6 din `faq`, ca `<details>`, fără paragraf sub titlu.
  9. **Apel final cu formular** (`#estimare`), o singură secțiune pe fundal grafit. H2 „Ai un plan care trebuie desenat?” Întâi `PhoneLink source="final_cta"`, WhatsApp și `mailto:` cu `email_click`; formularul `QuoteForm` alături pe desktop și dedesubt pe mobil.
- [ ] **Step 5: `home-content.ts`.** În `faq`, intrările de la rândurile 167, 179, 191 și 195 se înlocuiesc cu cele patru întrebări din machetă și se mută primele, formulate la singular („Lucrezi și cu birouri din afara României?”). `process` se rescrie cu cei patru pași. `services` și `serviceHref` rămân (le folosește `agent-content.ts`); `ServiceItem` se reduce la `title`, `lead`, `items`, fără importul lucide. „stabilim costul” devine „îți comunic costul”.
- [ ] **Step 6: Date structurate.** `WebSite` se mută din `__root.tsx` pe prima pagină, într-un singur `@graph` cu `Organization` (`@id` `https://nodbim.com/#org`, `name`, `url`, `logo` `/branding/nod-bim-mark.png`, `description`, `telephone` și `email` doar dacă sunt configurate, `areaServed` România, `knowsLanguage` `["ro","en"]`; fără `legalName`, `taxID`, `address`, `foundingDate`). `Service`: `name: "Desenare tehnică în AutoCAD și Revit"`, `provider: { "@id": "https://nodbim.com/#org" }`, `offers` din `offerSchema` pentru cele trei tarife, fără `availableLanguage`. `FAQPage` conține exact cele 6 întrebări afișate. Aceste date nu produc rezultate îmbogățite în Google; se păstrează valide, fără alt efort.
- [ ] **Step 7: `agent-content.ts`.** `homeMarkdown()` pune întâi AutoCAD și PDF în DWG și ia prețurile din `estimateLabel(type, 1)` și `packagePrice`. Blocurile în engleză „When to use this” rămân neschimbate. Actualizează în `tests/agent-content.test.ts` doar aserțiunile pe textele schimbate.
- [ ] **Step 8:** Șterge `Ticker`, `Typewriter` și, din `styles.css`, `ticker-track`, `ticker-scroll`, `blink`, `cursor-blink`, `cad-grid`, `rule-t`, după ce `grep` în `src/**/*.tsx` nu mai găsește nicio utilizare.
- [ ] **Step 9: Verifică în browser** la 1440 și 375 px.
  - Un singur `h1`; `document.title` și `meta[name=description]` au valorile de mai sus; toate blocurile `ld+json` se parsează cu `JSON.parse`.
  - Răspunsul serverului (`view-source`) conține „350 – 800 lei”, „Pachet 5 planșe” și un link `tel:` în hero.
  - Cu JavaScript dezactivat, H1 și prețul sunt vizibile.
  - Mișcarea cursorului schimbă prețul și `href`-ul WhatsApp; la 320 px, „7.000 – 16.000 lei” încape pe un rând.
  - Încărcarea directă a `/#preturi` arată H2-ul sub antet.
  - La 375 px nu se cere `hero-3d-professional`. Fiecare rută de serviciu are cel puțin un link din `/` sau din subsol.
  - Cu acord, clicul pe WhatsApp din estimator adaugă `whatsapp_click` cu `source: "estimator"` în `dataLayer`.
  - Captură de ecran pentru proprietar.
- [ ] **Step 10:** Suita completă — Expected: PASS.
- [ ] **Step 11: Commit** — `feat: reposition homepage on AutoCAD drafting, estimator, before/after`

---

### Task 5: Pagini de servicii și `/pdf-in-dwg`

**Files:**
- Create: `src/routes/pdf-in-dwg.tsx`
- Modify: `src/routeTree.gen.ts` (regenerat), `src/components/site/ServicePage.tsx`, `Header.tsx`, `Footer.tsx`, `src/routes/autocad-dwg.tsx`, `revit-mep.tsx`, `hvac.tsx`, `instalatii-termice.tsx`, `instalatii-electrice.tsx`, `modelare-revit.tsx`, `__root.tsx`, `sitemap[.]xml.ts`, `src/lib/agent-content.ts`, `home-content.ts`, `blog.ts`, `tests/agent-content.test.ts`, `scripts/audit-production.mjs`

**Interfaces:**
- Produces: `ServicePath` include `"/pdf-in-dwg"`. `ServicePage` primește în plus `offers?: JobType[]`, `whatsappMessage?: string`, `children?: ReactNode` (afișat între introducere și secțiuni).

- [ ] **Step 1: Test care pică.** În `tests/agent-content.test.ts`: `isKnownPath("/pdf-in-dwg")` este `true`; `/pdf-in-dwg` intră în bucla de la rândurile 104–113; `llms.txt` conține `/pdf-in-dwg`. Rulează: FAIL.
- [ ] **Step 2: Creează ruta și regenerează arborele.** Scrie `pdf-in-dwg.tsx` (conținutul la Step 5), apoi rulează `npm run build` o dată: pluginul TanStack rescrie `src/routeTree.gen.ts` (nu există generator CLI). Verifică `grep -c pdf-in-dwg src/routeTree.gen.ts` — Expected: cel puțin 1. Fișierul intră în commit.
- [ ] **Step 3: `ServicePage.tsx`.** Fără `Reveal` în primul ecran. Lângă butonul WhatsApp, `PhoneLink source={label}` în locul textului de la rândurile 349–353. WhatsApp folosește `whatsappMessage ?? defaultWhatsappMessage`. Cu `offers`: schema `Service` primește `offers` din `offerSchema`, iar pagina afișează estimatorul astfel: `const firstOffer = offers?.[0];` și `{firstOffer && <PriceEstimator defaultType={firstOffer} />}`. Schema folosește `provider: { "@id": "https://nodbim.com/#org" }` în loc de `brand` și `areaServed` România. `serviceLinks` primește `/pdf-in-dwg` („PDF în DWG — redesenare manuală”).
- [ ] **Step 4: `autocad-dwg.tsx`.**
  - Titlu: `Desenator AutoCAD la comandă: planșe și corecturi DWG` (fără sufix de brand).
  - Descriere: `Desenez la comandă în AutoCAD: planșe după schiță, corecturi pe DWG-ul tău, layere și layout de print. Trimiți fișierele, primești prețul înainte de start.`
  - H1: `Desenator AutoCAD pentru planșe, corecturi și desene după schiță`.
  - Introducerea se adresează întâi persoanelor fizice și firmelor mici. Textul conține firesc „desenare în AutoCAD”, „desene la comandă”, „redesenare planuri”.
  - `offers={["corectare", "redesenare"]}`; `whatsappMessage="Salut! Am găsit NOD BIM pe site și am un plan de desenat în AutoCAD. Pot să îți trimit fișierele pentru o ofertă?"`; `related` include `/pdf-in-dwg`.
  - Întrebare nouă: „Cauți un proiectant AutoCAD?” — „Fac desenarea, nu proiectarea autorizată: desenez după proiectul, schița sau observațiile tale.”
  - Răspunsul existent despre conversia PDF (rândurile 89–92) rămâne cum este: PDF-urile vectoriale se convertesc, scanările se redesenează.
- [ ] **Step 5: `pdf-in-dwg.tsx`.**
  - Titlu: `PDF în DWG: plan redesenat manual în AutoCAD · NOD BIM`.
  - Descriere, cu prețul luat din `jobRates.redesenare`: `Îmi trimiți planul în PDF sau scanat și îl redesenez linie cu linie în AutoCAD: DWG editabil, pe layere, la scară. Serviciu manual, 350–800 lei/plan.`
  - `label="PDF în DWG"`, H1 `PDF în DWG, redesenat manual în AutoCAD`, `images={[]}`, `offers={["redesenare"]}`, `related={["/autocad-dwg", "/revit-mep"]}`, `whatsappMessage="Salut! Am găsit NOD BIM pe site și am un plan PDF de redesenat în DWG. Pot să îți trimit fișierul pentru o ofertă?"`, `BeforeAfter` ca `children`. Fără pereche în engleză.
  - Primul ecran spune „redesenare manuală, nu un convertor automat” și „350–800 lei pe plan”.
  - Secțiuni: „Ce se poate porni dintr-un PDF” (vectorial sau scanat), „Cum verific scara”. `deliverables`: DWG editabil pe layere, la scară; PDF de tipărit; lista cotelor care nu au putut fi citite.
  - Întrebări: diferența față de un convertor gratuit; ce se întâmplă când lipsesc cote; în ce versiune de DWG se livrează.
  - Pagina nu reia secțiunile articolului de blog. Are un link „Vrei să încerci singur întâi? Vezi ce se poate converti automat” către articol.
- [ ] **Step 6: `blog.ts`.** Articolul `pdf-in-dwg-vectorial-scanare-scara-oferta`: `title` → „Cum transformi un PDF în DWG: ce se convertește și ce se redesenează”; `metaTitle` → „Cum transformi un PDF în DWG și când nu merge”; descriere → „Ce importă AutoCAD dintr-un PDF vectorial, de ce o scanare trebuie redesenată și cum verifici scara în DWG. Ghid practic, înainte să ceri o ofertă.”; în `links` se adaugă `{ label: "Redesenare PDF în DWG: serviciul", href: "/pdf-in-dwg" }`, păstrând linkul către `/autocad-dwg` (fixat de un test). Se adaugă câte un link în `links` la `revit-vs-autocad-experiment` (→ `/autocad-dwg`), `cat-costa-o-plansa-de-instalatii` (→ `/revit-mep`) și `documentatie-instalatii-dtac-pt` (→ `/revit-mep`).
- [ ] **Step 7: Celelalte pagini de servicii.**
  - `/revit-mep`: titlu `Modelare Revit MEP pentru birouri de proiectare · NOD BIM`; descriere `Model și planșe HVAC, termice și electrice pe template-ul biroului, plus relevee de instalații existente din datele tale. Livrare RVT, DWG și PDF.` Secțiune nouă „Releveu de instalații existente (as-built)”: „Desenez instalațiile HVAC, termice și electrice existente, în AutoCAD sau Revit, pe baza măsurătorilor, fotografiilor și schițelor tale. Pentru birouri de proiectare și executanți.” plus o întrebare în FAQ.
  - `/hvac`: titlu `Planșe HVAC în Revit: ventilare și climatizare · NOD BIM`.
  - `/instalatii-termice`: titlu `Planșe instalații termice în Revit și AutoCAD · NOD BIM`; descriere `Desenez planșe de instalații termice în Revit și AutoCAD, pe proiectul tău: trasee, radiatoare, centrală, pardoseală. Ofertă în 1–2 zile lucrătoare.`
  - `/instalatii-electrice`: titlu `Planșe instalații electrice în AutoCAD și Revit · NOD BIM`; descriere `Desenez planșe de instalații electrice în AutoCAD și Revit, pe proiectul tău: iluminat, prize, circuite, tablouri, legende. Ofertă în 1–2 zile lucrătoare.`
  - `/modelare-revit`: titlu `Modelare Revit: model 3D și planșe tehnice · NOD BIM`.
  - Pe termice și electrice, primul paragraf (nu descrierea) spune: „Desenez și modelez după proiectul tău; nu fac proiect autorizat sau semnat.”
- [ ] **Step 8: Înregistrează ruta.**
  - `home-content.ts`: intrare nouă în `services` cu `title: "PDF în DWG"` și `serviceHref["PDF în DWG"] = "/pdf-in-dwg"` (din ea se generează varianta Markdown a paginii).
  - `agent-content.ts`: `staticPaths`, lista din `llms.txt`, `notFoundMarkdown`.
  - `sitemap[.]xml.ts`: intrare nouă; fără schimbări de `priority`; `lastmod` nou doar pe rutele al căror conținut s-a schimbat.
  - `Header.tsx` și `Footer.tsx`: intrarea „PDF în DWG” → `/pdf-in-dwg`, ca `<Link>`. `__root.tsx`: aceeași intrare în lista de pe pagina 404.
  - `scripts/audit-production.mjs`: `/pdf-in-dwg` în `EXPECTED_ROUTES`.
- [ ] **Step 9:** `bun test` — Expected: PASS.
- [ ] **Step 10: Verifică în browser** fiecare rută modificată la 1440 și 375 px: un singur `h1`, titlu și descriere exacte, adresă canonică proprie, `ld+json` valid, fără erori în consolă. `/sitemap.xml` și `/llms.txt` conțin `/pdf-in-dwg`. Pe `/pdf-in-dwg` și `/autocad-dwg`, la 375 px, primul ecran arată mesajul, un preț și un link de telefon.
- [ ] **Step 11:** Suita completă — Expected: PASS.
- [ ] **Step 12: Commit** — `feat: service template, AutoCAD and PDF-to-DWG landing pages`

---

### Task 6: Verificare finală, predare, indexare

- [ ] **Step 1:** `npm run build` — Expected: fără erori.
- [ ] **Step 2:** Parcurge în browser `/`, `/autocad-dwg`, `/pdf-in-dwg`, `/revit-mep`, `/portofoliu`, `/contact`, `/blog`, `/en/revit-mep-outsourcing` la 1440 și 375 px. Deschide `/pdf-in-dwg?gclid=test&utm_source=google&utm_medium=cpc` și verifică că parametrii rămân în adresă. Un formular de test se trimite doar cu acordul proprietarului (scrie în baza de date reală).
- [ ] **Step 3:** Revizuiește `git diff main...redesign-2026-10`: cod mort, prețuri scrise în afara `pricing.ts`, „noi” sau „externalizare” pe prima pagină. `grep -rniE "centr(u|e) de date|data cent|uptime" src` — Expected: rezultate doar în articolul de blog existent.
- [ ] **Step 4:** Arată proprietarului capturile și cere acordul pentru merge și publicare. Înainte de publicare, exportă din Search Console interogările și paginile pe 90 de zile.
- [ ] **Step 5 (ziua publicării):**
  - `node scripts/audit-production.mjs` — Expected: trece.
  - În Search Console: inspectare URL, test live și cerere de indexare, o singură dată, pentru `/`, `/autocad-dwg`, `/pdf-in-dwg`, `/revit-mep` și articolul redenumit; retrimite sitemap-ul.
  - `node scripts/indexnow-ping.mjs` (Bing și Yandex). Verifică site-ul în Bing Webmaster Tools.
  - `BreadcrumbList` de pe `/pdf-in-dwg` în testul Google Rich Results; `Service` și `Offer` în validator.schema.org.
  - PageSpeed pe mobil pentru `/`, `/autocad-dwg`, `/pdf-in-dwg`: LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms.
- [ ] **Step 6 (urmărire):** săptămâna 2 — cele cinci adrese sunt indexate; notează titlul afișat de Google pentru fiecare. Săptămâna 4 — afișări pe pagină și interogări cu „dwg”, „autocad”, „desenator”; nicio interogare cu două pagini care alternează. Săptămâna 8 — decizie: articolul și pagina PDF→DWG rămân separate sau se leagă mai strâns.

---

### Task 7: Google Ads (operațional; după publicarea Task 5)

Fiecare pas marcat „aprobare” se propune proprietarului cu valorile de mai jos și se execută doar după un „da” pentru acel pas.

**La ce să te aștepți.** Calcul pe ipoteze declarate (cotă de afișări 50–70%, CTR 6–10% la desenator și 1–2% la PDF), nu prognoză:

| Grup | Căutări / lună | Clicuri / lună | Cost / lună |
| --- | ---: | ---: | ---: |
| Desenator AutoCAD | 350 | 10–25 | 6–37 lei |
| PDF în DWG (exact) | 1.300 | 4–13 | 4–16 lei |
| Total | 1.650 | 14–38 | 10–53 lei |

Bugetul actual de 6,5 lei/zi nu va fi cheltuit. Testul este ieftin, dar lent și mic.

- [ ] **Step 1 (doar citire): diagnostic.** Campania `24140685581` a avut 0 afișări în 21.09–04.10. Verifică facturarea, starea contului, respingerile și starea cuvintelor. La o problemă de plată sau de cont, oprește-te aici.
- [ ] **Step 2 (doar citire): măsurarea pe site-ul publicat.** Cu „Accept toate”, clicul pe telefon produce o cerere `…/g/collect` cu `en=phone_click` și apare în GA4 Realtime; la fel `whatsapp_click` din estimator. Fără acord nu pleacă nimic. În GTM Preview, niciun tag GA4 nu se declanșează pe aceleași evenimente (altfel se numără dublu). Verifică în GA4 Admin legătura cu contul 8170228625.
- [ ] **Step 3 (GA4, aprobare):** marchează `phone_click` și `whatsapp_click` ca evenimente-cheie.
- [ ] **Step 4 (Ads, aprobare): conversii.** Importă din GA4 `phone_click` ca principală și `whatsapp_click` ca secundară (și pentru că se declanșează și după un formular trimis, cu `source = quote_success`). Numărare „una”, fără valoare. „Submit lead form” rămâne principală; importul GA4 `lead_form_success` rămâne ascuns. Auto-tagging activ. `phone_click` măsoară un clic pe link, nu un apel.
- [ ] **Step 5 (aprobare): campanie nouă „Search | Desenare AutoCAD | RO”, creată pe pauză.**
  - Doar Google Search, fără parteneri și fără Display. România, „Prezență”. Limbi: română și engleză.
  - Buget 6,5 lei/zi, mutat din campania veche.
  - CPC manual: Desenator 1,50 lei, PDF 1,20 lei; plafoane fără aprobare nouă 2,00 și 1,50 lei.
  - Program: luni–duminică 08:00–21:00, de confirmat de proprietar.
  - Oprite: potrivirea largă la nivel de campanie, AI Max, asset-urile create automat, extinderea adresei finale, recomandările aplicate automat.
  - Sufix adresă finală: `utm_source=google&utm_medium=cpc&utm_campaign=desenare-autocad-ro&utm_content={adgroupid}&utm_term={keyword}`.
- [ ] **Step 6 (aprobare): cuvinte negative.** Se copiază cele 94 existente, fără `casa`, `apartament` și `online` (ar bloca „redesenare plan apartament” și „desenator autocad online”); textul exact se citește din cont. Negativele nu acoperă variantele apropiate, deci unde există diacritice se adaugă ambele forme.
  - Noi, la campanie: `releveu`, `schita`/`schiță`, `cadastru`, `cadastral`, `intabulare`, `topograf`, `ancpi`, `autorizat`, `autorizatie`/`autorizație`, `stampila`/`ștampilă`, `dtac`, `ce este`, `ce inseamna`/`ce înseamnă`, `cum`, `model`, `modele`, `exemplu`, `exemple`, `gratis`, `gratuit`, `free`, `salariu`, `angajari`/`angajări`, `angajez`, `locuri de munca`/`muncă`, `cv`, `fisa postului`, `meditatii`, `comenzi`, `planuri case`, `proiecte case`.
  - Noi, doar la grupul PDF: `online`, `pdf to dwg`, `dwg in pdf`, `dwg to pdf`, `pdf in autocad`, `convertire`, `import`, `jpg`, `png`, `imagine`, `dxf`, `autodesk`, `adobe`, `acrobat`, `ilovepdf`, `smallpdf`, `zamzar`, `cloudconvert`, `autodwg`, `aplicatie`.
- [ ] **Step 7 (aprobare): grupuri și cuvinte.** Cuvintele se scriu fără diacritice.
  - **Desenator AutoCAD → `/autocad-dwg`:** `"desenator autocad"` (30), `"desenator cad"` (10), `"freelancer autocad"` (10), `"proiectant autocad"` (70; risc: titlu de post), `"desenare autocad"` (110; risc: cursuri), `[desene autocad]` (110; risc: descărcări), `"desene autocad la comanda"`, `"desenez in autocad"`, `"redesenare planuri"`, `"servicii autocad"`, `"servicii desenare autocad"`. Negativ de grup: `pdf`. „Releveu de instalații” nu se licitează: nu are volum, iar `releveu` este negativ.
  - **PDF în DWG → `/pdf-in-dwg`:** `[pdf in dwg]` (1.300; risc: convertor gratuit), `"redesenare pdf in dwg"`, `"pdf scanat in dwg"`, `"transformare pdf in dwg"`.
  - Nu se licitează: orice formă cu „conversie” (negativul existent o blochează și nu are volum), `desenator tehnic`, `desen tehnic`, `proiectare autocad`, `plan casa autocad`, `revit mep`.
- [ ] **Step 8 (aprobare): anunțuri.** Un RSA pe grup. Titlurile fixate apar pe pozițiile 1 și 2. Numărul de caractere se verifică în editor înainte de salvare (titluri ≤ 30, descrieri ≤ 90).
  - **RSA „Desenator AutoCAD”**, cale `desenator` / `autocad`.
    - Poziția 1: „Desenator AutoCAD” · „Desenare în AutoCAD la comandă” · „Redesenare planuri în AutoCAD”.
    - Poziția 2: „Corectare planșă de la 250 lei” · „Redesenare 350-800 lei pe plan”.
    - Libere: „Ofertă de regulă în 1-2 zile” · „Trimiți schița, primești DWG” · „Preț stabilit înainte de start” · „DWG pe layere, la scară” · „Lucrez online, în toată țara” · „Pachet 5 planșe de la 1500 lei” · „Desenez după PDF sau schiță” · „Desene tehnice la comandă” · „Cauți desenator AutoCAD?” · „Lucrezi direct cu inginerul”.
    - Descrieri: „Trimiți PDF-ul, scanarea sau schița. Primești DWG pe layere, la scară, și PDF de print.” · „Corectare de la 250 lei. Redesenare 350-800 lei pe plan. Preț stabilit înainte de start.” · „Sunt inginer de instalații și desenez planuri în AutoCAD. Ofertă de regulă în 1-2 zile.” · „Lucrez complet online: trimiți fișierele, primești prețul în scris, apoi planșele.”
  - **RSA „PDF în DWG”**, cale `pdf-in-dwg` / `redesenare`.
    - Poziția 1: „PDF în DWG, redesenat manual” · „Redesenare PDF în DWG”.
    - Poziția 2: „Serviciu plătit, nu convertor” · „350-800 lei pe plan”.
    - Libere: „Nu merge convertorul?” · „Trimiți PDF, primești DWG” · „Ofertă de regulă în 1-2 zile” · „Plan scanat redesenat în DWG” · „DWG editabil, pe layere” · „Redesenat linie cu linie” · „Verificat la scară” · „Preț stabilit înainte de start” · „Transformare PDF în DWG” · „Lucrezi direct cu inginerul” · „Lucrez online, în toată țara”.
    - Descrieri: „Trimiți planul în PDF sau scanat. Îl redesenez în AutoCAD și primești DWG editabil.” · „Redesenare manuală, nu convertor automat. 350-800 lei pe plan, stabilit înainte de start.” · „DWG editabil, pe layere, verificat la scară. Ofertă de regulă în 1-2 zile.” · „Lucrez complet online. Trimiți fișierul, primești prețul în scris, apoi planul în DWG.”
- [ ] **Step 9 (aprobare): extensii.**
  - **Apel:** numărul afișat ca text pe site, România, program egal cu orele în care proprietarul răspunde. Condițiile de verificare ale numărului se confirmă în interfață. Fără anunțuri doar pentru apel.
  - **Sitelinkuri:** „Redesenare în AutoCAD” → `/autocad-dwg`; „PDF în DWG” → `/pdf-in-dwg`; „Planșe de instalații” → `/revit-mep`; „Prețuri orientative” → `/#preturi`; „Exemple de planșe” → `/portofoliu`; „Trimite fișierele” → `/contact`.
  - **Callout-uri:** „Lucru complet online” · „Preț stabilit în scris” · „DWG pe layere, la scară” · „Corectări de la 250 lei” · „Persoane fizice și firme”.
  - **Fragment structurat „Servicii”:** Redesenare planuri · PDF în DWG · Corectare planșe · Planșe de instalații.
  - **Extensie de preț** (RON, „De la”; se renunță dacă româna sau RON nu sunt disponibile): Corectare planșă, de la 250, `/autocad-dwg` · Redesenare PDF în DWG, de la 350, `/pdf-in-dwg` · Planșă de instalații, de la 300, `/#preturi` · Pachet 5 planșe, de la 1500, `/#preturi`.
  - Formularul de lead din Ads nu se atașează: cererile ar rămâne în interfața Ads, fără notificare.
- [ ] **Step 10 (aprobare):** în aceeași zi, pune pe pauză toată campania „Search | Externalizare Revit MEP | RO” (ambele grupuri, altfel cele două campanii concurează pe „desenator autocad”) și activează campania nouă. Notează data.
- [ ] **Step 11 (aprobare):** actualizează contextul salvat al contului: pagini de destinație pe grup; conversii principale = formular salvat și clic pe telefon; WhatsApp rămâne secundar; lista nouă de negative.
- [ ] **Step 12 (proprietar): jurnal de contacte.** Pentru fiecare apel, mesaj sau formular: data, canalul, răspunsul la „unde ați găsit numărul?” (OLX / Google / site), lucrarea cerută, ofertă trimisă, plătit. „Contact real” = o cerere pentru o lucrare pe care o faci, venită de pe Google sau de pe site.
- [ ] **Step 13: rutina săptămânală, luni.** (1) Pe grup: cost, afișări, clicuri, CTR, cost pe clic, cotă de afișări. (2) Termeni de căutare, clasificați (serviciu / unealtă gratuită / curs sau post / altele); țintă de cel puțin 70% clicuri relevante; negative propuse, aplicate doar cu aprobare. (3) Conversii pe acțiune, puse lângă jurnal și lângă cererile salvate cu `utm_medium=cpc`. (4) Scorul de calitate și starea cuvintelor; licitarea se ajustează cu cel mult 0,50 lei, în plafoane. (5) Extensii: afișări, clicuri, respingeri. (6) Contoarele de oprire. (7) Raportul se scrie în `office/reports/`.
- [ ] **Step 14: decizie.** La primul dintre: 40 de clicuri, 120 lei sau ziua 60.
  - **Continuă:** cel puțin un contact real cu ofertă trimisă.
  - **Oprește și mută banii în promovare OLX:** zero contacte reale, sau sub 50% clicuri relevante două săptămâni la rând.
  - **Grupul PDF** se oprește separat la 15 clicuri fără contact sau dacă peste 70% din termeni sunt de tip convertor după 7 zile.
  - „Maximize conversions” nu intră în acest test.
  - 40 de clicuri sunt prea puține pentru o concluzie statistică. Rezultatul spune dacă merită continuat, nu cât valorează canalul.

---

### În sarcina proprietarului: prezență în afara site-ului

Aceste platforme apar deja în rezultate acolo unde site-ul nu poate ajunge curând. În ordinea impactului probabil:

1. **OLX.** Anunțul tău apare primul în categoria de servicii, iar pagina categoriei apare în Google la „servicii desenare autocad”. Anunțul vechi (ID 304887749) nu se modifică. Se adaugă anunțuri separate pentru PDF în DWG și pentru planșe de instalații.
2. **Publi24.** Pagina anunțului tău apare în Google la „servicii desenare autocad” și „redesenare planuri pdf dwg”.
3. **Brig.ro** și **HomeRun.ro.** Apar la „servicii autocad” și „proiectant autocad”. Condițiile de înscriere fără firmă nu sunt verificate.

Textele respectă regula existentă: fără centre de date, fără acreditări.

**Profil Google Business: nu se creează.** Regulile Google cer contact în persoană cu clienții și exclud afacerile exclusiv online; la o suspendare se cer acte de înregistrare. Se reevaluează doar dacă apar o formă juridică înregistrată și un serviciu real cu deplasare la client.
