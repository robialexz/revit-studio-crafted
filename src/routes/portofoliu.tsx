import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl } from "@/lib/site-config";
import hero3d from "@/assets/hero-3d.webp";
import hero2d from "@/assets/hero-2d.webp";
import projHvac from "@/assets/proj-hvac.webp";
import projTermice from "@/assets/proj-termice.webp";
import projElectrice from "@/assets/proj-electrice.webp";
import projSectiune from "@/assets/proj-sectiune.webp";
import projSheet from "@/assets/proj-sheet.webp";
import projDwg from "@/assets/proj-dwg.webp";
import showcaseCoordination from "@/assets/showcase-coordination.webp";
import showcaseDwgRevit from "@/assets/showcase-dwg-revit.webp";
import showcaseElectrical from "@/assets/showcase-electrical.webp";
import showcaseHvacPlan from "@/assets/showcase-hvac-plan.webp";
import showcasePlantRoom from "@/assets/showcase-plant-room.webp";
import showcaseSection from "@/assets/showcase-section.webp";

const title = "Portofoliu Revit MEP · Modele BIM și planșe tehnice · NOD BIM";
const description =
  "Exemple de modelare Revit MEP și documentație tehnică: modele BIM 3D, planuri HVAC, instalații termice și electrice, secțiuni, sheet-uri și lucrări AutoCAD / DWG.";
const url = canonicalUrl("/portofoliu");

export const Route = createFileRoute("/portofoliu")({
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
    links: [{ rel: "canonical", href: url }],
  }),
  component: Portofoliu,
});

type Item = {
  src: string;
  alt: string;
  caption: string;
  meta: string;
  w: number;
  h: number;
  span: string;
  dark?: boolean;
};

const items: Item[] = [
  {
    src: projSheet,
    alt: "Sheet tehnic cu vederi, secțiuni, legende și indicator, extras dintr-un model Revit",
    caption: "Sheet · Organizare planșe",
    meta: "Software: Revit MEP · Livrabil: RVT · DWG · PDF",
    w: 1600,
    h: 1104,
    span: "lg:col-span-7",
  },
  {
    src: projSectiune,
    alt: "Secțiune 3D printr-un model Revit MEP cu tubulaturi, conducte și susțineri",
    caption: "Model BIM · Secțiune",
    meta: "Model 3D Revit",
    w: 1200,
    h: 1408,
    span: "lg:col-span-5",
    dark: true,
  },
  {
    src: projHvac,
    alt: "Planșă de instalații HVAC cu trasee de tubulatură, grile, anemostate și legendă",
    caption: "HVAC · Plan nivel",
    meta: "Ventilare · Climatizare",
    w: 1600,
    h: 1008,
    span: "lg:col-span-12",
  },
  {
    src: projTermice,
    alt: "Plan de instalații termice cu conducte, radiatoare, centrală și distribuitoare",
    caption: "Termice · Plan",
    meta: "Trasee · Echipamente",
    w: 1200,
    h: 912,
    span: "lg:col-span-6",
  },
  {
    src: projElectrice,
    alt: "Plan de instalații electrice cu corpuri de iluminat, prize, circuite și legendă",
    caption: "Electrice · Plan",
    meta: "Iluminat · Circuite · Tablouri",
    w: 1200,
    h: 912,
    span: "lg:col-span-6",
  },
  {
    src: hero2d,
    alt: "Planșă 2D extrasă din model Revit, cu cote, adnotări și legendă",
    caption: "Plan nivel · Documentație 2D",
    meta: "Extras din model",
    w: 912,
    h: 1104,
    span: "lg:col-span-5",
  },
  {
    src: projDwg,
    alt: "Plan AutoCAD cu layere organizate și linework curățat",
    caption: "AutoCAD / DWG · Curățare",
    meta: "Layere · Layout · Export",
    w: 1200,
    h: 912,
    span: "lg:col-span-7",
    dark: true,
  },
  {
    src: showcaseCoordination,
    alt: "Model de coordonare BIM cu verificarea interferențelor între instalații",
    caption: "Coordonare · Model BIM",
    meta: "Detecție conflicte · Navisworks / Revit",
    w: 1568,
    h: 1003,
    span: "lg:col-span-7",
  },
  {
    src: showcaseSection,
    alt: "Secțiune printr-un model Revit MEP cu trasee de tubulatură și conducte",
    caption: "Secțiune · Model BIM",
    meta: "Model 3D Revit",
    w: 1122,
    h: 1402,
    span: "lg:col-span-5",
  },
  {
    src: showcaseHvacPlan,
    alt: "Planșă HVAC cu trasee de tubulatură, grile, anemostate și echipamente",
    caption: "HVAC · Plan nivel",
    meta: "Ventilare · Climatizare",
    w: 1568,
    h: 1003,
    span: "lg:col-span-12",
  },
  {
    src: showcasePlantRoom,
    alt: "Cameră tehnică cu echipamente HVAC și trasee de instalații",
    caption: "Centrală tehnică",
    meta: "Echipamente · Trasee",
    w: 1448,
    h: 1086,
    span: "lg:col-span-5",
  },
  {
    src: showcaseElectrical,
    alt: "Plan de instalații electrice cu circuite, prize și corpuri de iluminat",
    caption: "Electrice · Plan",
    meta: "Iluminat · Prize · Circuite",
    w: 1568,
    h: 1003,
    span: "lg:col-span-7",
  },
  {
    src: showcaseDwgRevit,
    alt: "Plan DWG pregătit și importat pentru modelare în Revit",
    caption: "DWG · Conversie Revit",
    meta: "Import · Curățare · Export",
    w: 1586,
    h: 992,
    span: "lg:col-span-12",
  },
];

function Portofoliu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? (items[openIndex] ?? null) : null;

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
      } else if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
      } else if (e.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">Portofoliu · Revit MEP · BIM</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Modele BIM și planșe tehnice
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
                Exemple de modelare Revit MEP și documentație pentru instalații HVAC, termice și
                electrice, plus lucrări de corectare și pregătire DWG.
              </p>
              <p className="tech-label mt-6 text-muted-foreground">
                Imagini demonstrative · se înlocuiesc cu capturi din proiecte reale
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          <Reveal>
            <figure className="border border-border-strong bg-graphite">
              <img
                src={hero3d}
                alt="Model 3D Revit MEP: trasee de tubulatură, conducte și echipamente într-o structură"
                width={1200}
                height={912}
                className="w-full object-cover"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-graphite-foreground/15 px-5 py-4 text-graphite-foreground">
                <span className="font-display text-2xl uppercase">Model 3D Revit MEP</span>
                <span className="tech-label text-graphite-foreground/55">
                  HVAC · Termice · Electrice · Model BIM
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            {items.map((it, i) => (
              <Reveal key={it.caption} delay={(i % 6) * 80} className={`${it.span}`}>
                <figure
                  className={`group h-full overflow-hidden border border-border-strong ${
                    it.dark ? "bg-graphite" : "bg-sheet"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="block w-full cursor-zoom-in"
                    aria-label={`Mărește imaginea: ${it.caption}`}
                  >
                    <img
                      src={it.src}
                      alt={it.alt}
                      width={it.w}
                      height={it.h}
                      loading="lazy"
                      className="max-h-[70vh] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </button>
                  <figcaption
                    className={`flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 ${
                      it.dark
                        ? "border-graphite-foreground/15 text-graphite-foreground"
                        : "border-border"
                    }`}
                  >
                    <span className="tech-label">{it.caption}</span>
                    <span
                      className={`tech-label ${
                        it.dark ? "text-graphite-foreground/50" : "text-muted-foreground"
                      }`}
                    >
                      {it.meta}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaSection
          title="Ai un proiect de terminat?"
          description="Trimite planurile și cerințele, iar eu îți pot spune ce presupune lucrarea, termenul și costul."
          source="portofoliu"
        />
      </main>
      <Footer />
      <MobileCta />

      {open && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite/95 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            autoFocus
            aria-label="Închide"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-graphite-foreground/40 text-graphite-foreground"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((openIndex - 1 + items.length) % items.length);
            }}
            aria-label="Imaginea anterioară"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-graphite-foreground/40 text-graphite-foreground transition-colors hover:bg-graphite-foreground hover:text-graphite md:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((openIndex + 1) % items.length);
            }}
            aria-label="Imaginea următoare"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-graphite-foreground/40 text-graphite-foreground transition-colors hover:bg-graphite-foreground hover:text-graphite md:right-6"
          >
            <ChevronRight size={20} />
          </button>
          <figure className="max-h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={open.alt} className="max-h-[82vh] w-full object-contain" />
            <figcaption className="tech-label mt-3 flex flex-wrap items-center justify-between gap-2 text-graphite-foreground/70">
              <span>
                {open.caption} — {open.meta}
              </span>
              <span className="text-graphite-foreground/50">
                {openIndex + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
