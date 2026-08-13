import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { QuoteForm } from "@/components/site/QuoteForm";
import {
  site,
  disclaimer,
  whatsappLink,
  defaultWhatsappMessage,
  hasWhatsapp,
  hasEmail,
  formatPhoneDisplay,
} from "@/lib/site-config";
import { track, trackConversion } from "@/lib/analytics";

export type ServicePath =
  | "/revit-mep"
  | "/modelare-revit"
  | "/hvac"
  | "/instalatii-termice"
  | "/instalatii-electrice"
  | "/autocad-dwg";

export const serviceLinks: { to: ServicePath; label: string; blurb: string }[] = [
  {
    to: "/revit-mep",
    label: "Revit MEP & modelare BIM instalații",
    blurb: "Model 3D, vederi, secțiuni și sheet-uri pentru instalații.",
  },
  {
    to: "/modelare-revit",
    label: "Modelare Revit & desenare planșe",
    blurb: "Modelare 3D și documentație Revit, de la schiță la planșe.",
  },
  {
    to: "/hvac",
    label: "Instalații HVAC — ventilare și climatizare",
    blurb: "Tubulaturi, echipamente, grile, anemostate, scheme.",
  },
  {
    to: "/instalatii-termice",
    label: "Instalații termice — încălzire",
    blurb: "Conducte, radiatoare, centrale, distribuitoare, pardoseală.",
  },
  {
    to: "/instalatii-electrice",
    label: "Instalații electrice — desenare tehnică",
    blurb: "Iluminat, prize, circuite, trasee, tablouri, legende.",
  },
  {
    to: "/autocad-dwg",
    label: "AutoCAD / DWG — corectare și redesenare",
    blurb: "Curățare DWG, layere, layout, conversii, pregătire print.",
  },
];

export type ServiceSection = { title: string; body: string; items?: string[] };

export type ServiceImage = { src: string; alt: string; caption: string; meta: string };

export function ServicePage({
  label,
  h1,
  intro,
  lead,
  sections,
  images,
  deliverables,
  faq,
  related,
  note,
}: {
  label: string;
  h1: string;
  intro: string;
  lead?: string;
  sections: ServiceSection[];
  images: ServiceImage[];
  deliverables: string[];
  faq: [string, string][];
  related: ServicePath[];
  note?: string;
}) {
  const waHref = hasWhatsapp ? whatsappLink(defaultWhatsappMessage) : "";
  const relatedItems = serviceLinks.filter((s) => related.includes(s.to));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
            <nav aria-label="Breadcrumb" className="tech-label text-muted-foreground">
              <Link to="/" className="hover:text-primary">
                Acasă
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">{label}</span>
            </nav>
            <h1 className="display-xl mt-8 max-w-4xl text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem]">
              {h1}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {intro}
            </p>
            {lead && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{lead}</p>
            )}
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
                    track("whatsapp_click", { source: label });
                    trackConversion("whatsapp_click", { source: label });
                  }}
                  className="tech-label border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                >
                  Scrie pe WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {sections.map((s) => (
                <article key={s.title} className="border-b border-border-strong py-8 first:pt-0">
                  <h2 className="text-3xl uppercase md:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
                    {s.body}
                  </p>
                  {s.items && (
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="tech-label border-b border-border pb-1 text-foreground/70"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
              {note && (
                <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  {note}
                </p>
              )}
            </div>

            <aside className="lg:col-span-5">
              <div className="grid gap-4">
                {images.map((img) => (
                  <figure key={img.src + img.caption} className="sheet-frame p-2 md:p-3">
                    <div className="flex items-center justify-between border-b border-border px-2 pb-2">
                      <span className="tech-label text-muted-foreground">{img.caption}</span>
                      <span className="tech-label text-muted-foreground">{img.meta}</span>
                    </div>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      width={1200}
                      height={860}
                      className="mt-2 w-full object-cover"
                    />
                    {site.showDemoImageLabels && (
                      <p className="tech-label px-2 pt-2 text-mep">
                        Imagine demonstrativă · înlocuibilă
                      </p>
                    )}
                  </figure>
                ))}
                <Link
                  to="/portofoliu"
                  className="tech-label inline-flex items-center gap-2 border-b border-foreground pb-1 transition-colors hover:border-primary hover:text-primary"
                >
                  Vezi portofoliul de modelare și planșe <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="mt-10 border border-border-strong bg-graphite p-6 text-graphite-foreground md:p-8">
                <p className="tech-label text-accent">Livrabile</p>
                <ul className="mt-5 space-y-2 text-sm text-graphite-foreground/85">
                  {deliverables.map((d) => (
                    <li key={d} className="border-b border-graphite-foreground/15 pb-2">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
            <h2 className="text-3xl uppercase md:text-4xl">Întrebări frecvente</h2>
            <div className="mt-8 max-w-3xl">
              {faq.map(([q, a]) => (
                <details key={q} className="group border-b border-border-strong first:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold uppercase tracking-tight">
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
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="text-3xl uppercase md:text-4xl">Servicii conexe</h2>
          <div className="mt-8 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group bg-background p-6 transition-colors hover:bg-sheet md:p-8"
              >
                <h3 className="text-xl uppercase group-hover:text-primary">{s.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                <span className="tech-label mt-5 inline-flex items-center gap-2 text-primary">
                  Detalii <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="estimare" className="border-t border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-4xl uppercase md:text-5xl">Solicită o estimare</h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Trimite câteva detalii despre proiect. Îți răspund cu ce presupune lucrarea,
                  termenul și costul, stabilite înainte de începere.
                </p>
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
                <p className="mt-8 max-w-md text-xs leading-relaxed text-muted-foreground">
                  {disclaimer}
                </p>
              </div>
              <div className="lg:col-span-7">
                <QuoteForm />
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
