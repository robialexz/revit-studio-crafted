import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Box, FileStack, Layers, PenLine, Ruler, Wrench, Zap } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QuoteForm } from "@/components/site/QuoteForm";
import { MobileCta } from "@/components/site/MobileCta";
import {
  site,
  disclaimer,
  whatsappLink,
  defaultWhatsappMessage,
  hasWhatsapp,
  hasEmail,
  hasSiteUrl,
  canonicalUrl,
  formatPhoneDisplay,
} from "@/lib/site-config";
import type { ServicePath } from "@/components/site/ServicePage";
import { track, trackConversion } from "@/lib/analytics";

import hero3d from "@/assets/hero-3d.webp";
import hero3dMobile from "@/assets/hero-3d-640.webp";
import hero2d from "@/assets/hero-2d.webp";
import hero2dMobile from "@/assets/hero-2d-640.webp";
import projHvac from "@/assets/proj-hvac.webp";
import projTermice from "@/assets/proj-termice.webp";
import projSectiune from "@/assets/proj-sectiune.webp";
import projSheet from "@/assets/proj-sheet.webp";

const title = "Revit MEP & Modelare BIM · Planșe HVAC, Termice, Electrice";
const description =
  "Modelare Revit MEP și documentație tehnică pentru instalații HVAC, termice și electrice. Planșe, secțiuni, sheet-uri, export RVT / DWG / PDF. AutoCAD disponibil complementar.";
const url = canonicalUrl("/");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      {
        rel: "preload",
        as: "image",
        href: hero3d,
        imagesrcset: `${hero3dMobile} 640w, ${hero3d} 1200w`,
        imagesizes: "(min-width: 1024px) 640px, 100vw",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.businessName,
          description,
          slogan: site.tagline,
          areaServed: "RO",
          serviceType: [
            "Modelare Revit MEP",
            "Modelare BIM",
            "Desenare instalații HVAC",
            "Desenare instalații termice",
            "Desenare instalații electrice",
            "Desenare AutoCAD / DWG",
          ],
          ...(hasSiteUrl ? { url: canonicalUrl("/"), image: canonicalUrl("/og-image.jpg") } : {}),
          ...(hasWhatsapp ? { telephone: site.whatsappNumber } : {}),
          ...(hasEmail ? { email: site.email } : {}),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const capabilities = ["Revit MEP", "BIM 3D", "HVAC", "Termice", "Electrice", "RVT", "DWG", "PDF"];

/** Linkuri interne crawlabile de la blocurile de servicii către paginile dedicate. */
const serviceHref: Record<string, ServicePath | undefined> = {
  "Revit MEP & Modelare BIM": "/revit-mep",
  "Instalații HVAC": "/hvac",
  "Instalații termice": "/instalatii-termice",
  "Instalații electrice": "/instalatii-electrice",
  "AutoCAD / DWG": "/autocad-dwg",
};

const services = [
  {
    n: "01",
    icon: Box,
    title: "Revit MEP & Modelare BIM",
    lead: "Modelare 3D și pregătirea documentației tehnice într-un workflow Revit MEP.",
    items: [
      "modelare instalații",
      "trasee MEP",
      "amplasare echipamente",
      "vederi",
      "secțiuni",
      "sheet-uri",
      "adnotări",
      "documentație 2D din model",
      "export RVT / DWG / PDF",
    ],
    featured: true,
  },
  {
    n: "02",
    icon: Layers,
    title: "Instalații HVAC",
    lead: "Planșe și modele pentru instalații de ventilare și climatizare.",
    items: [
      "tubulaturi",
      "echipamente",
      "grile",
      "anemostate",
      "ventilatoare",
      "introducere / evacuare aer",
      "secțiuni",
      "scheme",
    ],
  },
  {
    n: "03",
    icon: Wrench,
    title: "Instalații termice",
    lead: "Trasee, echipamente și planșe pentru instalații de încălzire.",
    items: [
      "conducte",
      "radiatoare",
      "centrale",
      "distribuitoare",
      "pompe",
      "încălzire în pardoseală",
      "scheme",
      "planuri și secțiuni",
    ],
  },
  {
    n: "04",
    icon: Zap,
    title: "Instalații electrice",
    lead: "Desenare și modelare tehnică pe baza temei și informațiilor de proiect furnizate.",
    items: [
      "corpuri de iluminat",
      "prize și consumatori",
      "circuite",
      "trasee",
      "tablouri",
      "simboluri",
      "legende",
      "scheme",
    ],
  },
  {
    n: "05",
    icon: PenLine,
    title: "AutoCAD / DWG",
    lead: "Serviciu complementar, pentru completări, corectări, conversii și livrare.",
    items: [
      "curățare DWG",
      "organizare layere",
      "redesenare",
      "layout / Paper Space",
      "cote și note",
      "conversii",
      "pregătire pentru print",
    ],
  },
  {
    n: "06",
    icon: FileStack,
    title: "Corectare & completare",
    lead: "Preluarea unui proiect început și ducerea documentației la formă finală.",
    items: [
      "preluare RVT / DWG existent",
      "implementarea observațiilor",
      "modificări",
      "completări",
      "reorganizare planșe",
      "refacerea documentației",
    ],
  },
  {
    n: "07",
    icon: Ruler,
    title: "Suport tehnic academic",
    lead: "Suport pentru modelare, desenare și organizarea proiectelor de facultate.",
    items: [
      "modelare Revit",
      "desenare planșe",
      "organizarea documentației",
      "scheme",
      "explicații tehnice",
      "implementarea observațiilor",
    ],
  },
];

const process = [
  {
    n: "01",
    title: "Îmi trimiți proiectul",
    body: "Trimite tema, planurile existente și cerințele.",
    meta: "DWG / PDF / RVT · discipline · nr. planșe · termen",
  },
  {
    n: "02",
    title: "Primești estimarea",
    body: "Analizez volumul, complexitatea și termenul și stabilim costul înainte de începerea lucrării.",
    meta: "Preț stabilit înainte de start",
  },
  {
    n: "03",
    title: "Realizez modelul și planșele",
    body: "Lucrez în principal în Revit și folosesc AutoCAD atunci când proiectul sau livrabilele o cer.",
    meta: "Revit MEP · AutoCAD la nevoie",
  },
  {
    n: "04",
    title: "Primești livrabilele",
    body: "Fișierele finale, în formatele stabilite în scopul lucrării.",
    meta: "RVT · DWG · PDF",
  },
];

const faq = [
  [
    "Lucrezi în Revit?",
    "Da. Revit MEP este principalul meu mediu de lucru pentru modelare și pregătirea planșelor.",
  ],
  [
    "Pot primi fișierul RVT?",
    "Da, atunci când livrarea fișierului editabil face parte din lucrare.",
  ],
  [
    "Pot primi și DWG?",
    "Da. Pot furniza exporturi sau fișiere DWG atunci când proiectul o necesită.",
  ],
  [
    "Poți lucra pe un proiect început de altcineva?",
    "Da. Pot prelua fișiere RVT, DWG sau documentații existente pentru corectări, completări și reorganizare.",
  ],
  [
    "Poți porni de la un PDF?",
    "Da, în funcție de calitatea și informațiile disponibile în document.",
  ],
  [
    "Realizezi instalații sanitare?",
    "Nu. Serviciile sunt concentrate pe Revit MEP, HVAC, instalații termice și instalații electrice.",
  ],
  [
    "Realizezi instalații electrice?",
    "Da, pentru partea de desenare/modelare tehnică pe baza cerințelor și informațiilor de proiect furnizate.",
  ],
  [
    "Poți ajuta cu proiecte pentru facultate?",
    "Da. Ofer suport tehnic pentru modelare, desenare și organizarea documentației, pe baza cerințelor proiectului.",
  ],
  [
    "Cum se stabilește prețul?",
    "În funcție de volum, complexitate, nivelul de detaliu și termen. Costul este stabilit înainte de începerea lucrării.",
  ],
  [
    "În cât timp poate fi gata?",
    "Termenul depinde de complexitatea și volumul proiectului. Trimite documentația și termenul dorit pentru o estimare.",
  ],
  ["Putem lucra complet online?", "Da. Fișierele și observațiile pot fi transmise online."],
];

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="tech-label text-mep">{index}</span>
      <span className="tech-label text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border-strong" />
    </div>
  );
}

function Home() {
  const waHref = whatsappLink(defaultWhatsappMessage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
            <div className="lg:col-span-5">
              <p className="tech-label text-primary">
                Revit MEP · Modelare BIM · HVAC · Termice · Electrice
              </p>
              <h1 className="display-xl mt-6 text-[3.1rem] sm:text-[4rem] lg:text-[4.6rem] xl:text-[5.4rem]">
                Modelare
                <br />
                Revit MEP.
                <br />
                <span className="text-primary">Planșe tehnice</span>
                <br />
                clare.
                <br />
                Gata de predare.
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-foreground/80 md:text-lg">
                Modelare BIM și documentație tehnică pentru instalații HVAC, termice și electrice.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                AutoCAD / DWG disponibil pentru completări, corectări, conversii și livrare.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#estimare"
                  className="tech-label border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
                >
                  Solicită o estimare
                </a>
                {hasWhatsapp && (
                  <a
                    href={waHref || undefined}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => {
                      track("whatsapp_click", { source: "homepage" });
                      trackConversion("whatsapp_click", { source: "homepage" });
                    }}
                    className="tech-label border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                  >
                    Scrie pe WhatsApp
                  </a>
                )}
              </div>

              <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border-strong pt-5">
                <div>
                  <dt className="tech-label text-muted-foreground">Cost</dt>
                  <dd className="mt-1 text-sm">Preț stabilit înainte de începerea lucrării.</dd>
                </div>
                <div>
                  <dt className="tech-label text-muted-foreground">Livrabile</dt>
                  <dd className="tech-label mt-1 text-foreground">RVT · DWG · PDF</dd>
                </div>
              </dl>
            </div>

            {/* Compoziție 3D + 2D */}
            <div className="lg:col-span-7">
              <figure className="relative">
                <div className="sheet-frame p-2 md:p-3">
                  <div className="flex items-center justify-between border-b border-border px-2 pb-2">
                    <span className="tech-label text-muted-foreground">Model 3D Revit MEP</span>
                    <span className="tech-label text-muted-foreground">Ventilare HVAC</span>
                  </div>
                  <img
                    src={hero3d}
                    srcSet={`${hero3dMobile} 640w, ${hero3d} 1200w`}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    alt="Model 3D Revit MEP cu trasee de tubulatură, conducte și echipamente"
                    width={1200}
                    height={912}
                    fetchPriority="high"
                    className="mt-2 w-full object-cover"
                  />
                  <div className="flex items-center justify-between px-2 pt-2">
                    <span className="tech-label text-muted-foreground">MEP-3D-01</span>
                    <span className="tech-label text-mep">Proiect demonstrativ</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-12 gap-4">
                  <div className="sheet-frame col-span-8 p-2 sm:col-span-7">
                    <div className="flex items-center justify-between border-b border-border px-1 pb-2">
                      <span className="tech-label text-muted-foreground">Plan nivel</span>
                      <span className="tech-label text-muted-foreground">A-101</span>
                    </div>
                    <img
                      src={hero2d}
                      srcSet={`${hero2dMobile} 640w, ${hero2d} 912w`}
                      sizes="(min-width: 1024px) 640px, 100vw"
                      alt="Planșă 2D de instalații extrasă din modelul Revit, cu trasee, cote și legendă"
                      width={912}
                      height={1104}
                      className="mt-2 h-56 w-full object-cover object-top sm:h-64"
                    />
                  </div>
                  <div className="col-span-4 flex flex-col justify-between border border-border-strong bg-graphite p-3 text-graphite-foreground sm:col-span-5">
                    <p className="tech-label text-graphite-foreground/55">Secțiune / detaliu</p>
                    <ul className="mt-3 space-y-2 text-xs leading-relaxed text-graphite-foreground/80">
                      <li>Model 3D și planșe 2D în același workflow</li>
                      <li>Vederi, secțiuni și sheet-uri organizate</li>
                      <li>Export coordonat RVT / DWG / PDF</li>
                    </ul>
                    <p className="tech-label mt-4 text-graphite-foreground/60">Rev. 00</p>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* CAPABILITY STRIP */}
        <section aria-label="Capabilități" className="border-b border-border-strong bg-sheet">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 md:px-8">
            {capabilities.map((c, i) => (
              <span key={c} className="tech-label flex items-center gap-8 text-foreground/75">
                {c}
                {i < capabilities.length - 1 && (
                  <span className="hidden h-3 w-px bg-border-strong sm:block" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </section>

        {/* PORTOFOLIU PREVIEW */}
        <section id="portofoliu" className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel index="01">Portofoliu</SectionLabel>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-4xl uppercase md:text-6xl">
              Lucrări de modelare și documentație tehnică
            </h2>
            <Link
              to="/portofoliu"
              className="tech-label inline-flex items-center gap-2 border-b border-foreground pb-1 transition-colors hover:border-primary hover:text-primary"
            >
              Vezi portofoliul complet <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <figure className="group relative overflow-hidden border border-border-strong bg-sheet lg:col-span-8">
              <img
                src={projHvac}
                alt="Planșă tehnică de instalații HVAC cu trasee de tubulatură, grile și legendă"
                width={1600}
                height={1008}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
                <span className="tech-label">HVAC · Plan nivel</span>
                <span className="tech-label text-muted-foreground">Software: Revit MEP</span>
              </figcaption>
            </figure>

            <figure className="group relative overflow-hidden border border-border-strong bg-graphite lg:col-span-4">
              <img
                src={projSectiune}
                alt="Secțiune 3D printr-un model Revit MEP cu tubulaturi, conducte și susțineri"
                width={1200}
                height={1408}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] lg:h-[calc(100%-3rem)]"
              />
              <figcaption className="flex items-center justify-between border-t border-graphite-foreground/15 px-4 py-3 text-graphite-foreground">
                <span className="tech-label">Model BIM · Secțiune</span>
                <span className="tech-label text-graphite-foreground/50">3D</span>
              </figcaption>
            </figure>

            <figure className="group overflow-hidden border border-border-strong bg-sheet lg:col-span-5">
              <img
                src={projTermice}
                alt="Plan de instalații termice cu trasee de conducte, radiatoare și distribuitoare"
                width={1200}
                height={912}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <figcaption className="flex items-center justify-between border-t border-border px-4 py-3">
                <span className="tech-label">Termice · Plan</span>
                <span className="tech-label text-muted-foreground">Livrabil: PDF</span>
              </figcaption>
            </figure>

            <figure className="group overflow-hidden border border-border-strong bg-sheet lg:col-span-7">
              <img
                src={projSheet}
                alt="Sheet tehnic cu mai multe vederi, secțiuni, legende și indicator"
                width={1600}
                height={1104}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <figcaption className="flex items-center justify-between border-t border-border px-4 py-3">
                <span className="tech-label">Sheet · Organizare planșe</span>
                <span className="tech-label text-muted-foreground">Livrabil: RVT · DWG · PDF</span>
              </figcaption>
            </figure>
          </div>
          <p className="tech-label mt-6 text-muted-foreground">
            Imagini dintr-un proiect demonstrativ propriu.
          </p>
        </section>

        {/* SERVICII */}
        <section id="servicii" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <SectionLabel index="02">Servicii</SectionLabel>
            <h2 className="mt-8 max-w-3xl text-4xl uppercase md:text-6xl">
              Revit MEP în centru. Restul, complementar.
            </h2>

            <div className="mt-12 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => {
                const Icon = s.icon;
                const to = serviceHref[s.title];
                return (
                  <article
                    key={s.n}
                    className={`p-6 md:p-8 ${
                      s.featured
                        ? "bg-graphite text-graphite-foreground md:col-span-2 lg:col-span-2 lg:row-span-2"
                        : "bg-sheet"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`tech-label ${s.featured ? "text-accent" : "text-mep"}`}>
                        {s.n}
                      </span>
                      <Icon
                        size={18}
                        className={
                          s.featured ? "text-graphite-foreground/50" : "text-muted-foreground"
                        }
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className={`mt-5 uppercase ${
                        s.featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                      }`}
                    >
                      {to ? (
                        <Link
                          to={to}
                          className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          {s.title}
                        </Link>
                      ) : (
                        s.title
                      )}
                    </h3>

                    <p
                      className={`mt-3 max-w-md text-sm leading-relaxed ${
                        s.featured
                          ? "text-graphite-foreground/75 md:text-base"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.lead}
                    </p>
                    <ul className={`mt-6 flex flex-wrap gap-x-4 gap-y-2 ${s.featured ? "" : ""}`}>
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className={`tech-label border-b pb-1 ${
                            s.featured
                              ? "border-graphite-foreground/20 text-graphite-foreground/80"
                              : "border-border text-foreground/70"
                          }`}
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              {disclaimer}
            </p>
          </div>
        </section>

        {/* DE CE REVIT / BIM */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel index="03">De ce Revit / BIM</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <h2 className="text-4xl uppercase md:text-5xl lg:col-span-5">
              Un singur model.
              <br />
              Documentație coerentă.
            </h2>
            <div className="grid gap-px bg-border-strong sm:grid-cols-2 lg:col-span-7">
              {[
                ["Model 3D + planșe 2D", "Modelul și documentația trăiesc în același workflow."],
                [
                  "Vederi și secțiuni",
                  "Informația tehnică poate fi înțeleasă vizual, nu doar citită.",
                ],
                [
                  "Modificări urmărite mai ușor",
                  "Un model structurat ajută la organizarea reviziilor.",
                ],
                [
                  "Fișier editabil",
                  "RVT poate rămâne livrabil editabil, când face parte din scopul lucrării.",
                ],
              ].map(([t, d]) => (
                <div key={t} className="bg-background p-6 md:p-8">
                  <h3 className="text-2xl uppercase">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCES */}
        <section
          id="proces"
          className="border-y border-border-strong bg-graphite text-graphite-foreground"
        >
          <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <div
              className="cad-grid pointer-events-none absolute inset-0 opacity-60"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-baseline gap-4">
                <span className="tech-label text-accent">04</span>
                <span className="tech-label text-graphite-foreground/50">Proces</span>
                <span className="h-px flex-1 bg-graphite-foreground/20" />
              </div>
              <h2 className="mt-8 max-w-2xl text-4xl uppercase md:text-6xl">
                De la fișierele tale la planșe gata de predare
              </h2>
              <ol className="mt-12 grid gap-px bg-graphite-foreground/15 md:grid-cols-2 lg:grid-cols-4">
                {process.map((p) => (
                  <li key={p.n} className="bg-graphite p-6 md:p-8">
                    <span className="tech-label text-accent">{p.n}</span>
                    <h3 className="mt-5 text-2xl uppercase">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite-foreground/75">
                      {p.body}
                    </p>
                    <p className="tech-label mt-6 text-graphite-foreground/60">{p.meta}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* LIVRABILE */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel index="05">Livrabile</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-4xl uppercase md:text-5xl">Ce primești la final</h2>
              <ul className="mt-8 grid grid-cols-1 gap-px bg-border-strong sm:grid-cols-2">
                {[
                  "fișier RVT editabil",
                  "DWG",
                  "PDF gata de print",
                  "sheet-uri organizate",
                  "indicator",
                  "legende",
                  "cote și adnotări",
                  "note tehnice, unde e cazul",
                ].map((d) => (
                  <li key={d} className="tech-label bg-background px-4 py-4">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6 lg:pl-8">
              <div className="sheet-frame p-6 md:p-8">
                <p className="tech-label text-mep">Confidențialitate</p>
                <p className="mt-4 text-lg leading-relaxed">
                  Fișierele proiectului tău rămân confidențiale și nu sunt publicate în portofoliu
                  fără acord.
                </p>
                <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                  1–2 runde normale de modificări pot fi incluse, în funcție de lucrare. Scopul și
                  livrabilele se stabilesc înainte de începerea lucrării.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PREȚURI */}
        <section id="preturi" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <SectionLabel index="06">Prețuri</SectionLabel>
            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="text-4xl uppercase md:text-5xl">Estimare orientativă</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Prețurile sunt orientative. Prețul final depinde de complexitate, nivelul de
                  detaliu, numărul de planșe și termen. Costul este stabilit înainte de începerea
                  lucrării.
                </p>
                <a
                  href="#estimare"
                  onClick={() => track("pricing_cta_click")}
                  className="tech-label mt-8 inline-block border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
                >
                  Cere preț pentru proiectul tău
                </a>
              </div>
              <dl className="lg:col-span-8">
                {[
                  ["Modificare / corectare planșă", "de la 150 lei"],
                  ["Redesenare / curățare plan", "200 – 500 lei"],
                  ["Planșă instalații", "de la 200 lei / planșă"],
                  ["Pachet proiect — 5 planșe + suport tehnic", "de la 1.000 lei"],
                  ["Proiect complex / termen urgent", "Preț personalizat"],
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border-strong py-6 first:border-t"
                  >
                    <dt className="max-w-md text-xl uppercase font-display font-semibold tracking-tight">
                      {label}
                    </dt>
                    <dd className="tech-label text-primary">{price}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* PENTRU CINE LUCREZ */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel index="07">Clienți</SectionLabel>
          <h2 className="mt-8 text-4xl uppercase md:text-6xl">Pentru cine lucrez</h2>
          <div className="mt-12 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Proiectanți / birouri",
                "Suport pentru modelare Revit și pregătirea documentației atunci când volumul de lucru crește.",
              ],
              [
                "Arhitecți",
                "Modelare și documentație MEP pe baza cerințelor și informațiilor tehnice furnizate.",
              ],
              ["Beneficiari", "Corectarea, redesenarea sau organizarea documentațiilor existente."],
              [
                "Studenți",
                "Suport tehnic pentru modelare, planșe și organizarea proiectelor academice.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-6 md:p-8">
                <h3 className="text-2xl uppercase">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <SectionLabel index="08">Întrebări frecvente</SectionLabel>
            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              <h2 className="text-4xl uppercase md:text-5xl lg:col-span-4">
                Întrebări
                <br />
                frecvente
              </h2>
              <div className="lg:col-span-8">
                {faq.map(([q, a]) => (
                  <details key={q} className="group border-b border-border-strong first:border-t">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-display font-semibold uppercase tracking-tight">
                      {q}
                      <span
                        className="tech-label text-mep transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ESTIMARE / WHATSAPP */}
        <section id="estimare" className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel index="09">Estimare</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-4xl uppercase md:text-5xl">Solicită o estimare</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Completează câteva detalii, iar cererea ajunge la mine pentru o estimare.
                {hasWhatsapp ? " Fișierele le poți trimite direct pe WhatsApp." : ""}
              </p>
              {hasWhatsapp && (
                <a
                  href={waHref || undefined}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => {
                    track("whatsapp_click", { source: "homepage" });
                    trackConversion("whatsapp_click", { source: "homepage" });
                  }}
                  className="tech-label mt-8 inline-block border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                >
                  Trimite proiectul pe WhatsApp
                </a>
              )}
              {(hasWhatsapp || hasEmail) && (
                <div className="mt-10 border-t border-border-strong pt-6">
                  <p className="tech-label text-muted-foreground">Contact</p>
                  {hasWhatsapp && (
                    <p className="mt-3 text-sm">
                      WhatsApp: {formatPhoneDisplay(site.whatsappNumber)}
                    </p>
                  )}
                  {hasEmail && <p className="text-sm">Email: {site.email}</p>}
                </div>
              )}
            </div>
            <div className="lg:col-span-7">
              <QuoteForm />
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="border-t border-border-strong bg-graphite text-graphite-foreground">
          <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
            <div
              className="cad-grid-lg pointer-events-none absolute inset-0 opacity-70"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <h2 className="display-xl text-5xl md:text-7xl">Ai un proiect de terminat?</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-foreground/75">
                Trimite planurile și cerințele, iar eu îți pot spune ce presupune lucrarea, termenul
                și costul.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#estimare"
                  className="tech-label border border-primary bg-primary px-6 py-4 text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Solicită o estimare
                </a>
                {hasWhatsapp && (
                  <a
                    href={waHref || undefined}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => {
                      track("whatsapp_click", { source: "homepage" });
                      trackConversion("whatsapp_click", { source: "homepage" });
                    }}
                    className="tech-label border border-graphite-foreground/40 px-6 py-4 transition-colors hover:bg-graphite-foreground hover:text-graphite"
                  >
                    Trimite proiectul pe WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
