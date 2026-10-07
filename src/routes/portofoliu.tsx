import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl } from "@/lib/site-config";
import hero3d from "@/assets/hero-3d-professional.webp";
import portfolioDwg from "@/assets/portfolio-dwg-conversion.webp";
import portfolioElectrical from "@/assets/portfolio-electrical-plan.webp";
import portfolioHvac from "@/assets/portfolio-hvac-plan.webp";
import portfolioSection from "@/assets/portfolio-section.webp";
import portfolioSheet from "@/assets/portfolio-sheet.webp";
import portfolioThermal from "@/assets/portfolio-thermal-plan.webp";

const title = "Exemple de planșe și modele Revit MEP · NOD BIM";
const description =
  "Exemple de modelare Revit MEP și documentație tehnică: modele 3D, planuri HVAC, termice și electrice, secțiuni și planșe. Ilustrații de prezentare.";
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
    src: portfolioSheet,
    alt: "Panou de documentație tehnică cu plan, secțiune și detalii Revit MEP",
    caption: "Documentație · Planșe tehnice",
    meta: "Revit MEP · RVT · DWG · PDF",
    w: 1448,
    h: 1086,
    span: "lg:col-span-7",
  },
  {
    src: portfolioSection,
    alt: "Secțiune BIM printr-o clădire cu trasee HVAC, termice și electrice coordonate",
    caption: "Coordonare · Secțiune BIM",
    meta: "Model 3D · Coordonare MEP",
    w: 1448,
    h: 1086,
    span: "lg:col-span-5",
    dark: true,
  },
  {
    src: portfolioHvac,
    alt: "Plan HVAC coordonat cu tubulaturi, difuzoare și grile într-un nivel de clădire",
    caption: "HVAC · Plan coordonat",
    meta: "Ventilare · Climatizare",
    w: 1448,
    h: 1086,
    span: "lg:col-span-12",
  },
  {
    src: portfolioThermal,
    alt: "Plan de instalații termice cu radiatoare, distribuitor și conducte tur-retur",
    caption: "Termice · Distribuție",
    meta: "Radiatoare · Distribuitor · Trasee",
    w: 1448,
    h: 1086,
    span: "lg:col-span-6",
  },
  {
    src: portfolioElectrical,
    alt: "Plan de instalații electrice cu corpuri de iluminat, prize și trasee de circuit",
    caption: "Electrice · Plan coordonat",
    meta: "Iluminat · Prize · Circuite",
    w: 1448,
    h: 1086,
    span: "lg:col-span-6",
    dark: true,
  },
  {
    src: portfolioDwg,
    alt: "Comparație între un plan DWG curățat și modelul 3D Revit MEP rezultat",
    caption: "DWG → Revit · Conversie",
    meta: "Import · Curățare · Modelare",
    w: 1448,
    h: 1086,
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
      <main id="continut">
        <section className="border-b border-border-strong">
          <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
            <div>
              <p className="tech-label text-primary">Exemple · Revit MEP · BIM</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Exemple de planșe și modele
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
                Exemple de modelare Revit MEP și documentație pentru instalații HVAC, termice și
                electrice, plus exemple de corectare și pregătire DWG.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
          <Reveal>
            <figure className="border border-border-strong bg-graphite">
              <img
                src={hero3d}
                alt="Model 3D Revit MEP: trasee de tubulatură, conducte și echipamente într-o structură"
                width={1536}
                height={1024}
                className="w-full object-cover"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-graphite-foreground/15 px-5 py-4 text-graphite-foreground">
                <span className="font-display text-2xl">Model 3D Revit MEP</span>
                <span className="tech-label text-graphite-foreground/55">
                  HVAC · Termice · Electrice · Model BIM
                </span>
                <span className="tech-label basis-full text-graphite-foreground/55">
                  Ilustrație de prezentare
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
                    <span
                      className={`tech-label basis-full ${
                        it.dark ? "text-graphite-foreground/50" : "text-muted-foreground"
                      }`}
                    >
                      Ilustrație de prezentare
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
              <span className="basis-full text-graphite-foreground/50">
                Ilustrație de prezentare
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
