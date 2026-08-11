import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/site-config";
import hero3d from "@/assets/hero-3d.jpg";
import hero2d from "@/assets/hero-2d.jpg";
import projHvac from "@/assets/proj-hvac.jpg";
import projTermice from "@/assets/proj-termice.jpg";
import projElectrice from "@/assets/proj-electrice.jpg";
import projSectiune from "@/assets/proj-sectiune.jpg";
import projSheet from "@/assets/proj-sheet.jpg";
import projDwg from "@/assets/proj-dwg.jpg";

const title = "Portofoliu Revit MEP · Modele BIM și planșe tehnice";
const description =
  "Exemple de modelare Revit MEP și documentație tehnică: modele BIM 3D, planuri HVAC, instalații termice și electrice, secțiuni, sheet-uri și lucrări AutoCAD / DWG.";

export const Route = createFileRoute("/portofoliu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:url", content: "/portofoliu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portofoliu" }],
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
];

function Portofoliu() {
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
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
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
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

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            {items.map((it) => (
              <figure
                key={it.caption}
                className={`group overflow-hidden border border-border-strong ${it.span} ${
                  it.dark ? "bg-graphite" : "bg-sheet"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(it)}
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
            ))}
          </div>
        </section>

        <section className="border-t border-border-strong bg-graphite text-graphite-foreground">
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
            <h2 className="display-xl text-4xl md:text-6xl">Ai un proiect de terminat?</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-foreground/75">
              Trimite planurile și cerințele, iar eu îți pot spune ce presupune lucrarea, termenul și
              costul.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                hash="estimare"
                className="tech-label border border-primary bg-primary px-6 py-4 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Solicită o estimare
              </Link>
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="tech-label border border-graphite-foreground/40 px-6 py-4 transition-colors hover:bg-graphite-foreground hover:text-graphite"
              >
                Trimite proiectul pe WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCta />

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite/95 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            autoFocus
            aria-label="Închide"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-graphite-foreground/40 text-graphite-foreground"
          >
            <X size={18} />
          </button>
          <figure className="max-h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={open.src}
              alt={open.alt}
              className="max-h-[82vh] w-full object-contain"
            />
            <figcaption className="tech-label mt-3 text-graphite-foreground/70">
              {open.caption} — {open.meta}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
