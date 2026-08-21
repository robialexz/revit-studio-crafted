import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QuoteForm } from "@/components/site/QuoteForm";
import { MobileCta } from "@/components/site/MobileCta";
import { CtaSection } from "@/components/site/CtaSection";
import { Reveal } from "@/components/site/Reveal";
import { Ticker } from "@/components/site/Ticker";
import { Typewriter } from "@/components/site/Typewriter";
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
import { services, process, faq, serviceHref } from "@/lib/home-content";
import { track, trackConversion } from "@/lib/analytics";
import { referrals } from "@/lib/referrals";
import { articles } from "@/lib/blog";

import hero3d from "@/assets/hero-3d.webp";
import hero3dMobile from "@/assets/hero-3d-640.webp";
import hero3d960 from "@/assets/hero-3d-960.webp";
import hero2d from "@/assets/hero-2d.webp";
import hero2dMobile from "@/assets/hero-2d-640.webp";
import hero2d720 from "@/assets/hero-2d-720.webp";
import projHvac from "@/assets/proj-hvac.webp";
import projHvac640 from "@/assets/proj-hvac-640.webp";
import projTermice from "@/assets/proj-termice.webp";
import projTermice640 from "@/assets/proj-termice-640.webp";
import projSectiune from "@/assets/proj-sectiune.webp";
import projSectiune640 from "@/assets/proj-sectiune-640.webp";
import projSheet from "@/assets/proj-sheet.webp";
import projSheet640 from "@/assets/proj-sheet-640.webp";

const title = "NOD BIM · Revit MEP & Modelare BIM · Planșe HVAC, Termice, Electrice";
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
        imagesrcset: `${hero3dMobile} 640w, ${hero3d960} 960w, ${hero3d} 1200w`,
        imagesizes: "(min-width: 1024px) 640px, 640px",
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
          dateModified: "2026-08-22",
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
          "@type": "Organization",
          name: site.businessName,
          url: canonicalUrl("/"),
          description,
          dateModified: "2026-08-22",
          email: hasEmail ? site.email : undefined,
          ...(hasWhatsapp ? { telephone: site.whatsappNumber } : {}),
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            ...(hasEmail ? { email: site.email } : {}),
            ...(hasWhatsapp ? { telephone: site.whatsappNumber } : {}),
            availableLanguage: ["ro", "en"],
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "București",
            addressCountry: "RO",
          },
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
            <Reveal className="lg:col-span-5">
              <p className="tech-label text-primary">
                Revit MEP · Modelare BIM · <Typewriter words={["HVAC", "Termice", "Electrice"]} />
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
            </Reveal>

            {/* Compoziție 3D + 2D */}
            <Reveal delay={120} className="lg:col-span-7">
              <figure className="relative">
                <div className="sheet-frame p-2 md:p-3">
                  <div className="flex items-center justify-between border-b border-border px-2 pb-2">
                    <span className="tech-label text-muted-foreground">Model 3D Revit MEP</span>
                    <span className="tech-label text-muted-foreground">Ventilare HVAC</span>
                  </div>
                  <img
                    src={hero3d}
                    srcSet={`${hero3dMobile} 640w, ${hero3d960} 960w, ${hero3d} 1200w`}
                    sizes="(min-width: 1024px) 640px, 640px"
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
                      srcSet={`${hero2dMobile} 640w, ${hero2d720} 720w, ${hero2d} 912w`}
                      sizes="(min-width: 1024px) 640px, 640px"
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
            </Reveal>
          </div>
        </section>

        {/* CAPABILITY STRIP — ticker infinit */}
        <Ticker />

        {/* PORTOFOLIU PREVIEW */}
        <section id="portofoliu" className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
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
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <figure className="group relative h-full overflow-hidden border border-border-strong bg-sheet">
                <img
                  src={projHvac}
                  srcSet={`${projHvac640} 640w, ${projHvac} 1600w`}
                  sizes="(min-width: 1024px) 66vw, 100vw"
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
            </Reveal>

            <Reveal delay={80} className="lg:col-span-4">
              <figure className="group relative h-full overflow-hidden border border-border-strong bg-graphite">
                <img
                  src={projSectiune}
                  srcSet={`${projSectiune640} 640w, ${projSectiune} 1200w`}
                  sizes="(min-width: 1024px) 33vw, 100vw"
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
            </Reveal>

            <Reveal delay={160} className="lg:col-span-5">
              <figure className="group h-full overflow-hidden border border-border-strong bg-sheet">
                <img
                  src={projTermice}
                  srcSet={`${projTermice640} 640w, ${projTermice} 1200w`}
                  sizes="(min-width: 1024px) 42vw, 100vw"
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
            </Reveal>

            <Reveal delay={240} className="lg:col-span-7">
              <figure className="group h-full overflow-hidden border border-border-strong bg-sheet">
                <img
                  src={projSheet}
                  srcSet={`${projSheet640} 640w, ${projSheet} 1600w`}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  alt="Sheet tehnic cu mai multe vederi, secțiuni, legende și indicator"
                  width={1600}
                  height={1104}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <figcaption className="flex items-center justify-between border-t border-border px-4 py-3">
                  <span className="tech-label">Sheet · Organizare planșe</span>
                  <span className="tech-label text-muted-foreground">
                    Livrabil: RVT · DWG · PDF
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <p className="tech-label mt-6 text-muted-foreground">
            Imagini dintr-un proiect demonstrativ propriu.
          </p>
        </section>

        {/* SERVICII */}
        <section id="servicii" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <Reveal>
              <SectionLabel index="02">Servicii</SectionLabel>
              <h2 className="mt-8 max-w-3xl text-4xl uppercase md:text-6xl">
                Revit MEP în centru. Restul, complementar.
              </h2>
            </Reveal>

            <Reveal
              delay={80}
              className="mt-12 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-3"
            >
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
            </Reveal>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              {disclaimer}
            </p>
          </div>
        </section>

        {/* DE CE REVIT / BIM */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <SectionLabel index="03">De ce Revit / BIM</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="mt-8 grid gap-10 lg:grid-cols-12">
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
          </Reveal>
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
              <Reveal>
                <div className="flex items-baseline gap-4">
                  <span className="tech-label text-accent">04</span>
                  <span className="tech-label text-graphite-foreground/50">Proces</span>
                  <span className="h-px flex-1 bg-graphite-foreground/20" />
                </div>
                <h2 className="mt-8 max-w-2xl text-4xl uppercase md:text-6xl">
                  De la fișierele tale la planșe gata de predare
                </h2>
              </Reveal>
              <Reveal delay={80}>
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
              </Reveal>
            </div>
          </div>
        </section>

        {/* LIVRABILE */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <SectionLabel index="05">Livrabile</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="mt-8 grid gap-10 lg:grid-cols-12">
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
          </Reveal>
        </section>

        {/* PREȚURI */}
        <section id="preturi" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <Reveal>
              <SectionLabel index="06">Prețuri</SectionLabel>
            </Reveal>
            <Reveal delay={80} className="mt-8 grid gap-10 lg:grid-cols-12">
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
                  ["Modificare / corectare planșă", "de la 250 lei"],
                  ["Redesenare / curățare plan", "350 – 800 lei"],
                  ["Planșă instalații", "de la 300 lei / planșă"],
                  ["Pachet proiect — 5 planșe + suport tehnic", "de la 1.500 lei"],
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
            </Reveal>
          </div>
        </section>

        {/* PENTRU CINE LUCREZ */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <SectionLabel index="07">Clienți</SectionLabel>
            <h2 className="mt-8 text-4xl uppercase md:text-6xl">Pentru cine lucrez</h2>
          </Reveal>
          <Reveal
            delay={80}
            className="mt-12 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-4"
          >
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
          </Reveal>
        </section>

        {/* REFERINȚE */}
        <section
          id="referinte"
          className="border-y border-border-strong bg-graphite text-graphite-foreground"
        >
          <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <div
              className="cad-grid pointer-events-none absolute inset-0 opacity-60"
              aria-hidden="true"
            />
            <div className="relative">
              <Reveal>
                <div className="flex items-baseline gap-4">
                  <span className="tech-label text-accent">08</span>
                  <span className="tech-label text-graphite-foreground/50">Referințe</span>
                  <span className="h-px flex-1 bg-graphite-foreground/20" />
                </div>
                <h2 className="mt-8 max-w-2xl text-4xl uppercase md:text-6xl">
                  Dosar de referințe
                </h2>
              </Reveal>
              <Reveal
                delay={80}
                className="mt-12 grid gap-px bg-graphite-foreground/15 md:grid-cols-2"
              >
                {referrals.slice(0, 2).map((r) => (
                  <figure key={r.fisa} className="bg-graphite p-6 md:p-8">
                    <blockquote className="text-lg leading-relaxed text-graphite-foreground/90">
                      „{r.citat}"
                    </blockquote>
                    <figcaption className="tech-label mt-5 text-graphite-foreground/60">
                      {r.client} · {r.loc} — {r.lucrare}
                    </figcaption>
                  </figure>
                ))}
              </Reveal>
              <Reveal delay={160}>
                <Link
                  to="/referinte"
                  className="tech-label mt-8 inline-flex items-center gap-2 border-b border-graphite-foreground/50 pb-1 transition-colors hover:border-primary hover:text-primary"
                >
                  Vezi dosarul complet <ArrowUpRight size={14} />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* JURNAL TEHNIC */}
        <section id="jurnal" className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <SectionLabel index="09">Jurnal tehnic</SectionLabel>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl text-4xl uppercase md:text-6xl">
                Articole cu probe, nu păreri
              </h2>
              <Link
                to="/blog"
                className="tech-label inline-flex items-center gap-2 border-b border-foreground pb-1 transition-colors hover:border-primary hover:text-primary"
              >
                Toate articolele <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 80} className="h-full">
                <Link to="/blog/$slug" params={{ slug: a.slug }} className="block h-full">
                  <article className="sheet-frame flex h-full flex-col transition-colors hover:border-primary">
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                      <span className="tech-label text-mep">{a.readingTime} min</span>
                      <span className="tech-label text-muted-foreground">{a.tags[0]}</span>
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-4">
                      <h3 className="text-xl uppercase leading-tight">{a.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {a.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <Reveal>
              <SectionLabel index="10">Întrebări frecvente</SectionLabel>
            </Reveal>
            <Reveal delay={80} className="mt-8 grid gap-10 lg:grid-cols-12">
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
            </Reveal>
          </div>
        </section>

        {/* ESTIMARE / WHATSAPP */}
        <section id="estimare" className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <SectionLabel index="11">Estimare</SectionLabel>
          </Reveal>
          <Reveal delay={80} className="mt-8 grid gap-10 lg:grid-cols-12">
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
          </Reveal>
        </section>

        {/* CTA FINAL */}
        <CtaSection
          title="Ai un proiect de terminat?"
          description="Trimite planurile și cerințele, iar eu îți pot spune ce presupune lucrarea, termenul și costul."
          source="homepage"
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
