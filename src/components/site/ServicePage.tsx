import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PhoneLink } from "@/components/site/PhoneLink";
import { PriceEstimator } from "@/components/site/PriceEstimator";
import { Reveal } from "@/components/site/Reveal";
import {
  site,
  disclaimer,
  whatsappLink,
  defaultWhatsappMessage,
  quoteContextForPath,
  hasWhatsapp,
  hasEmail,
  canonicalUrl,
  phoneHref,
  phoneDisplay,
} from "@/lib/site-config";
import { jobRates, offerSchema, rateLabel, type JobType } from "@/lib/pricing";
import { trackConversion } from "@/lib/analytics";

export type ServicePath =
  | "/revit-mep"
  | "/modelare-revit"
  | "/hvac"
  | "/instalatii-termice"
  | "/instalatii-electrice"
  | "/autocad-dwg"
  | "/pdf-in-dwg";

const serviceLinks: { to: ServicePath; label: string; blurb: string }[] = [
  {
    to: "/revit-mep",
    label: "Externalizare Revit MEP pentru birouri",
    blurb: "Model și planșe HVAC, termice și electrice pe tema biroului tău.",
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
    label: "Desenare AutoCAD — planșe, corecturi, desene după schiță",
    blurb: "Curățare DWG, layere, layout, corecturi, pregătire print.",
  },
  {
    to: "/pdf-in-dwg",
    label: "PDF în DWG — redesenare manuală",
    blurb: "Plan în PDF sau scanat, redesenat linie cu linie în DWG editabil.",
  },
];

/** Răspunsuri la obiecțiile de dinaintea contactului, comune tuturor serviciilor. */
const workingTerms: [string, string][] = [
  [
    "Ce trimiți",
    "PDF-ul, scanarea sau DWG-ul existent, ce trebuie desenat sau corectat și termenul dorit. Pentru instalații: planurile de arhitectură și tema.",
  ],
  [
    "Răspuns și ofertă",
    "De regulă în 1–2 zile lucrătoare primești scopul lucrării, termenul și costul. Lucrarea începe doar după confirmarea ta.",
  ],
  [
    "Software și formate",
    "Revit MEP și AutoCAD. Livrare RVT, DWG și PDF. Versiunea Revit se confirmă la ofertă, pentru că un fișier RVT nu se poate salva într-o versiune mai veche.",
  ],
  [
    "Standardele tale",
    "Pot lucra în template-ul, familiile și convențiile de denumire ale biroului tău, dacă le trimiți la început.",
  ],
  [
    "Confidențialitate",
    "Fișierele nu sunt publicate și nu sunt transmise mai departe. Poți trimite un acord de confidențialitate (NDA) înainte de fișiere.",
  ],
  [
    "Unde lucrez",
    "Complet online, pentru proiecte din România sau din străinătate, în română sau engleză.",
  ],
  [
    "Revizii",
    "1–2 runde normale de modificări pot fi incluse, în funcție de lucrare; se stabilesc în ofertă.",
  ],
  [
    "Ce nu includ",
    "Calcule de dimensionare, verificare și semnătură de specialitate — acestea rămân la proiectantul autorizat.",
  ],
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
  offers,
  children,
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
  /** Tarifele afișate în primul ecran, în estimator și în datele structurate. */
  offers?: JobType[];
  /** Conținut propriu paginii, afișat între introducere și secțiuni. */
  children?: ReactNode;
}) {
  const location = useLocation();
  const waHref = hasWhatsapp
    ? whatsappLink(
        quoteContextForPath(location.pathname)?.whatsappMessage ?? defaultWhatsappMessage,
      )
    : "";
  const relatedItems = serviceLinks.filter((s) => related.includes(s.to));
  const firstOffer = offers?.[0];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: label, item: canonicalUrl(location.pathname) },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: label,
    name: h1,
    description: intro,
    provider: { "@id": `${canonicalUrl("/")}#org` },
    areaServed: { "@type": "Country", name: "România" },
    ...(offers ? { offers: offers.map(offerSchema) } : {}),
    ...(deliverables.length
      ? { serviceOutput: deliverables.map((d) => ({ "@type": "Thing", name: d })) }
      : {}),
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <Header ctaHref="#estimare" />
      <main id="continut">
        <section className="border-b border-border-strong">
          <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-20">
            <nav aria-label="Breadcrumb" className="tech-label text-muted-foreground">
              <Link to="/" className="hover:text-primary">
                Acasă
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">{label}</span>
            </nav>
            <h1 className="display-xl mt-5 max-w-4xl text-[2rem] sm:text-5xl lg:text-[3.6rem]">
              {h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {intro}
            </p>
            {offers && (
              <ul className="mt-5 grid max-w-2xl gap-1.5 border-l-2 border-primary pl-4 text-sm">
                {offers.map((type) => (
                  <li key={type}>
                    {jobRates[type].label}:{" "}
                    <strong className="whitespace-nowrap font-semibold">
                      {rateLabel(type, " pe ")}
                    </strong>
                  </li>
                ))}
              </ul>
            )}
            {(phoneHref || hasWhatsapp) && (
              <div className="mt-7 flex flex-wrap gap-3">
                <PhoneLink source={label} className="btn btn-primary">
                  {`Sună: ${phoneDisplay}`}
                </PhoneLink>
                {hasWhatsapp && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => {
                      trackConversion("whatsapp_click", { source: label });
                    }}
                    className="btn"
                  >
                    Scrie pe WhatsApp
                  </a>
                )}
              </div>
            )}
            <p className="mt-4 text-sm">
              <a
                href="#estimare"
                className="inline-flex min-h-11 items-center font-medium underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {phoneHref || hasWhatsapp ? "sau trimite" : "Trimite"} detaliile în formular
              </a>
            </p>
            {lead && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{lead}</p>
            )}
          </div>
        </section>

        {children && (
          <section className="border-b border-border-strong bg-sheet">
            <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">{children}</div>
          </section>
        )}

        {firstOffer && (
          <section id="preturi" className="border-b border-border-strong">
            <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
              <h2 className="text-3xl md:text-4xl">Află cam cât costă înainte să suni</h2>
              <div className="mt-8">
                <PriceEstimator defaultType={firstOffer} />
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              {sections.map((s) => (
                <article key={s.title} className="border-b border-border-strong py-8 first:pt-0">
                  <h2 className="text-3xl md:text-4xl">{s.title}</h2>
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
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5">
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
                    <figcaption className="tech-label px-2 pt-2 text-muted-foreground">
                      Ilustrație de prezentare
                    </figcaption>
                  </figure>
                ))}
                <Link
                  to="/portofoliu"
                  className="tech-label inline-flex items-center gap-2 border-b border-foreground pb-1 transition-colors hover:border-primary hover:text-primary"
                >
                  Vezi exemple de planșe și modele <ArrowUpRight size={14} />
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
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border-strong">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Înainte să trimiți fișierele</h2>
              <dl className="mt-8 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-4">
                {workingTerms.map(([k, v]) => (
                  <div key={k} className="bg-background p-6">
                    <dt className="tech-label text-muted-foreground">{k}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-foreground/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Întrebări frecvente</h2>
              <div className="mt-8 max-w-3xl">
                {faq.map(([q, a]) => (
                  <details key={q} className="group border-b border-border-strong first:border-t">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                      {q}
                      <span
                        className="font-mono text-xl leading-none text-primary transition-transform group-open:rotate-45"
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

        <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Servicii conexe</h2>
            <div
              className={`mt-8 grid gap-px bg-border-strong md:grid-cols-2 ${relatedItems.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}
            >
              {relatedItems.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="group bg-background p-6 transition-colors hover:bg-sheet md:p-8"
                >
                  <h3 className="text-xl group-hover:text-primary">{s.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                  <span className="tech-label mt-5 inline-flex items-center gap-2 text-primary">
                    Detalii <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="estimare" className="border-t border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
            <Reveal className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-4xl md:text-5xl">Solicită o estimare</h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Trimite câteva detalii despre proiect. Îți răspund cu ce presupune lucrarea,
                  termenul și costul, stabilite înainte de începere.
                </p>
                {(phoneHref || hasEmail) && (
                  <div className="mt-10 border-t border-border-strong pt-6">
                    <p className="tech-label text-muted-foreground">Contact</p>
                    {phoneHref && (
                      <p className="mt-3 text-sm">
                        Telefon:{" "}
                        <PhoneLink
                          source={label}
                          className="inline-flex min-h-11 items-center font-medium underline underline-offset-4"
                        />
                      </p>
                    )}
                    {hasEmail && (
                      <p className="text-sm">
                        Email:{" "}
                        <a
                          href={`mailto:${site.email}`}
                          onClick={() => {
                            trackConversion("email_click", { source: label });
                          }}
                          className="inline-flex min-h-11 items-center font-medium underline underline-offset-4"
                        >
                          {site.email}
                        </a>
                      </p>
                    )}
                  </div>
                )}
                <p className="mt-8 max-w-md text-xs leading-relaxed text-muted-foreground">
                  {disclaimer}
                </p>
              </div>
              <div className="lg:col-span-7">
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
