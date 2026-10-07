import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QuoteForm } from "@/components/site/QuoteForm";
import { MobileCta } from "@/components/site/MobileCta";
import { PhoneLink } from "@/components/site/PhoneLink";
import { PriceEstimator } from "@/components/site/PriceEstimator";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import {
  site,
  whatsappLink,
  defaultWhatsappMessage,
  hasWhatsapp,
  hasEmail,
  canonicalUrl,
  phoneHref,
  phoneDisplay,
} from "@/lib/site-config";
import { process, faq } from "@/lib/home-content";
import { jobRates, offerSchema } from "@/lib/pricing";
import { trackConversion } from "@/lib/analytics";

import demoPlan from "@/assets/demo-plan.svg";
import demoPlanScan from "@/assets/demo-plan-scan.webp";
import demoPlanScan640 from "@/assets/demo-plan-scan-640.webp";
import projSectiune from "@/assets/proj-sectiune.webp";
import projSectiune640 from "@/assets/proj-sectiune-640.webp";
import projSheet from "@/assets/proj-sheet.webp";
import projSheet640 from "@/assets/proj-sheet-640.webp";

const title = "Desenare AutoCAD și Revit la comandă, online · NOD BIM";
const description =
  "Desenez în AutoCAD și Revit, online: planuri redesenate din PDF în DWG, corecturi pe planșe și planșe de instalații. Preț stabilit înainte de start.";
const url = canonicalUrl("/");
const orgId = `${url}#org`;

/** Întrebările afișate pe pagină; aceleași intră în FAQPage. */
const homeFaq = faq.slice(0, 6);

const titleBlock = [
  ["Planșă", "Plan apartament · exemplu demonstrativ"],
  ["Scara", "1:50"],
  ["Format", "A3"],
  ["Fișiere", "DWG + PDF"],
] as const;

const examples: {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  fit: string;
}[] = [
  {
    src: demoPlan,
    alt: "Plan de apartament cu două camere, cu cote, suprafețe și indicator",
    width: 960,
    height: 600,
    caption: "Plan de apartament, cu cote",
    fit: "bg-white object-contain",
  },
  {
    src: projSectiune,
    srcSet: `${projSectiune640} 640w, ${projSectiune} 1200w`,
    alt: "Secțiune 3D printr-un model de instalații, cu tubulaturi, conducte și susțineri",
    width: 1200,
    height: 1408,
    caption: "Secțiune din model BIM",
    fit: "object-cover",
  },
  {
    src: projSheet,
    srcSet: `${projSheet640} 640w, ${projSheet} 1600w`,
    alt: "Planșă cu mai multe vederi, secțiuni, legende și indicator",
    width: 1600,
    height: 1104,
    caption: "Set de planșe cu indicator",
    fit: "object-cover",
  },
];

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
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: site.businessName,
              url,
              inLanguage: ["ro-RO", "en"],
              publisher: { "@id": orgId },
            },
            {
              // Brand, nu societate: fără legalName, taxID, adresă sau dată de înființare.
              "@type": "Organization",
              "@id": orgId,
              name: site.businessName,
              url,
              logo: canonicalUrl("/branding/nod-bim-mark.png"),
              description,
              ...(phoneHref ? { telephone: phoneHref.replace("tel:", "") } : {}),
              ...(hasEmail ? { email: site.email } : {}),
              areaServed: { "@type": "Country", name: "România" },
              knowsLanguage: ["ro", "en"],
            },
            {
              "@type": "Service",
              name: "Desenare tehnică în AutoCAD și Revit",
              description,
              url,
              provider: { "@id": orgId },
              offers: [
                offerSchema("redesenare"),
                offerSchema("corectare"),
                offerSchema("instalatii"),
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: homeFaq.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";
const sectionPad = "py-16 md:py-24";
const h2 = "max-w-3xl text-3xl md:text-[2.6rem]";
const textLink =
  "font-medium underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary";
/** Punct de listă cu bifă desenată din două laturi de chenar. */
const check =
  "relative pl-7 before:absolute before:left-0 before:top-[0.45em] before:h-1.5 before:w-3 before:-rotate-45 before:border-b-2 before:border-l-2 before:border-primary";
const onGraphiteHover =
  "hover:border-graphite-foreground hover:bg-graphite-foreground hover:text-graphite";

function Home() {
  const waHref = whatsappLink(defaultWhatsappMessage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="continut">
        {/* HERO */}
        <section className="border-b border-border">
          <div
            className={`${wrap} grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20`}
          >
            <div className="min-w-0">
              <p className="tech-label text-muted-foreground">
                Desenare tehnică · AutoCAD · Revit MEP
              </p>
              <h1 className="display-xl mt-5 text-[2.3rem] sm:text-5xl xl:text-[4rem]">
                Trimiți PDF-ul sau schița. Primești{" "}
                <span className="text-primary">planul desenat în AutoCAD</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Redesenare în AutoCAD, conversie PDF în DWG și modelare Revit MEP pentru instalații.
                Lucrez cu persoane fizice, arhitecți și birouri de proiectare. Prețul îl afli în
                scris înainte să încep.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <PhoneLink source="hero" className="btn btn-primary">
                  {`Sună: ${phoneDisplay}`}
                </PhoneLink>
                {hasWhatsapp && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => {
                      trackConversion("whatsapp_click", { source: "hero" });
                    }}
                    className="btn"
                  >
                    Scrie pe WhatsApp
                  </a>
                )}
              </div>
              <p className="mt-4 text-sm">
                <a href="#preturi" className={`inline-flex min-h-11 items-center ${textLink}`}>
                  sau calculează un preț orientativ
                </a>
              </p>

              <ul className="mt-6 flex flex-col gap-x-3 gap-y-1.5 border-t border-border pt-5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:[&>li+li]:before:mr-3 sm:[&>li+li]:before:content-['·']">
                {[
                  "Preț în scris înainte să încep",
                  "fișiere DWG și PDF",
                  "ofertă de regulă în 1–2 zile lucrătoare",
                ].map((fact) => (
                  <li key={fact} className="max-sm:first-letter:uppercase">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Planșa: singurul element „desenat” al paginii */}
            <figure className="sheet-frame min-w-0 p-2.5 md:p-4">
              <img
                src={demoPlan}
                alt="Plan de apartament cu două camere: pereți, uși, ferestre, cote și indicator"
                width={960}
                height={600}
                className="block h-auto w-full border border-foreground/50 bg-white"
              />
              <figcaption>
                <dl className="mt-2.5 grid grid-cols-2 gap-px border border-foreground/50 bg-foreground/50 font-mono text-[0.8rem] leading-snug min-[480px]:grid-cols-[2fr_1fr_1fr_1fr]">
                  {titleBlock.map(([k, v]) => (
                    <div key={k} className="min-w-0 bg-sheet px-2.5 py-2">
                      <dt className="text-[0.75rem] uppercase tracking-[0.06em] text-muted-foreground">
                        {k}
                      </dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* DOUĂ INTRĂRI */}
        <section id="servicii" className={`${wrap} ${sectionPad}`}>
          <h2 className={h2}>Ai un plan de redesenat sau un proiect de modelat?</h2>
          <div className="mt-8 grid gap-px border border-border-strong bg-border-strong md:mt-12 md:grid-cols-2">
            <Link
              to="/autocad-dwg"
              className="group grid content-start gap-4 bg-sheet p-6 transition-colors hover:bg-background md:p-10"
            >
              <h3 className="text-2xl md:text-[1.7rem]">Am un plan de redesenat</h3>
              <p className="max-w-prose leading-relaxed text-muted-foreground">
                Ai un PDF, o scanare sau o schiță de mână și îți trebuie fișier DWG editabil, la
                scară, cu layere ordonate.
              </p>
              <span className="mt-2 font-medium transition-colors group-hover:text-primary">
                {`Redesenare de la ${jobRates.redesenare.min} lei / ${jobRates.redesenare.unit} →`}
              </span>
            </Link>
            <Link
              to="/revit-mep"
              className="group grid content-start gap-4 bg-sheet p-6 transition-colors hover:bg-background md:p-10"
            >
              <h3 className="text-2xl md:text-[1.7rem]">Suntem birou de proiectare</h3>
              <p className="max-w-prose leading-relaxed text-muted-foreground">
                Aveți soluția tehnică, dar nu și timp pentru modelare. Preiau modelarea și planșele,
                pe șablonul (template-ul) și standardele biroului.
              </p>
              <span className="mt-2 font-medium transition-colors group-hover:text-primary">
                Vezi cum lucrez cu birourile →
              </span>
            </Link>
          </div>
        </section>

        {/* COMPARAȚIE */}
        <section className="border-y border-border bg-sheet">
          <div
            className={`${wrap} ${sectionPad} grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16`}
          >
            <div className="min-w-0">
              <p className="tech-label text-muted-foreground">PDF în DWG</p>
              <h2 className={`${h2} mt-4`}>Dintr-o scanare neclară, un desen pe care poți lucra</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                Mută glisorul ca să compari. Scanările le redesenez linie cu linie și le verific la
                scară; PDF-urile vectoriale le import și le curăț.
              </p>
              <ul className="mt-6 grid gap-3">
                <li className={check}>Scară verificată după cotele din original</li>
                <li className={check}>Layere denumite și separate pe tipuri de elemente</li>
                <li className={check}>Planșă pregătită pentru tipărit, cu indicator (cartuș)</li>
              </ul>
            </div>
            <BeforeAfter
              clean={demoPlan}
              scan={demoPlanScan}
              scanSrcSet={`${demoPlanScan640} 640w, ${demoPlanScan} 960w`}
              alt="Plan de apartament cu două camere, scanat înclinat și neclar, comparat cu același plan redesenat"
              note="Exemplu demonstrativ, desenat pentru această pagină."
            />
          </div>
        </section>

        {/* PREȚURI */}
        <section id="preturi" className={`${wrap} ${sectionPad}`}>
          <h2 className={h2}>Află cam cât costă înainte să suni</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Două alegeri și ai o cifră de pornire.
          </p>
          <div className="mt-8 md:mt-12">
            <PriceEstimator />
          </div>
        </section>

        {/* EXEMPLE */}
        <section id="portofoliu" className="border-y border-border bg-sheet">
          <div className={`${wrap} ${sectionPad}`}>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <h2 className={h2}>Exemple de planșe și modele</h2>
              <Link to="/portofoliu" className={`inline-flex min-h-11 items-center ${textLink}`}>
                Vezi toate exemplele
              </Link>
            </div>
            <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-6 lg:gap-8">
              {examples.map((ex) => (
                <figure key={ex.caption} className="min-w-0">
                  <img
                    src={ex.src}
                    {...(ex.srcSet
                      ? {
                          srcSet: ex.srcSet,
                          sizes: "(min-width:768px) 370px, calc(100vw - 32px)",
                        }
                      : {})}
                    alt={ex.alt}
                    width={ex.width}
                    height={ex.height}
                    loading="lazy"
                    className={`aspect-[4/3] w-full border border-border-strong ${ex.fit}`}
                  />
                  <figcaption className="mt-3 grid gap-1">
                    <span className="font-display text-xl font-semibold [font-stretch:88%]">
                      {ex.caption}
                    </span>
                    <span className="tech-label text-muted-foreground">
                      Ilustrație de prezentare
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PROCES */}
        <section className={`${wrap} ${sectionPad}`}>
          <h2 className={h2}>Patru pași, fără surprize la preț</h2>
          <ol className="mt-8 grid gap-y-8 border-t border-foreground sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="pr-6 pt-5">
                <span
                  className="font-display text-2xl font-semibold text-primary"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* LUCREZI DIRECT CU MINE */}
        <section className="border-y border-border bg-sheet">
          <div className={`${wrap} ${sectionPad} grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
            <div className="min-w-0">
              <h2 className={h2}>Lucrezi direct cu mine</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                Sunt inginer de instalații și desenez personal fiecare planșă. Cine îți face oferta
                este și cine lucrează pe fișierele tale. NOD BIM este numele sub care ofer aceste
                servicii, nu o societate.
              </p>
              <p className="mt-4">
                <Link to="/despre" className={`inline-flex min-h-11 items-center ${textLink}`}>
                  Despre mine
                </Link>
              </p>
            </div>
            <ul className="grid content-start gap-5 text-lg leading-snug lg:pt-2">
              <li className={check}>Preț în scris înainte să încep</li>
              <li className={check}>
                Fișierele tale nu sunt publicate și nu ajung la altcineva; la cerere semnez un acord
                de confidențialitate
              </li>
              <li className={check}>
                Desenez și modelez; calculele, verificarea și semnătura rămân la proiectantul
                autorizat
              </li>
            </ul>
          </div>
        </section>

        {/* ÎNTREBĂRI */}
        <section id="faq" className={`${wrap} ${sectionPad}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <h2 className={h2}>Întrebări frecvente</h2>
            <div>
              {homeFaq.map(([q, a], i) => (
                <details
                  key={q}
                  open={i === 0}
                  className="group border-t border-border-strong last:border-b"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {q}
                    <span
                      className="font-mono text-xl leading-none text-primary transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[60ch] pb-5 leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* APEL FINAL CU FORMULAR */}
        <section id="estimare" className="bg-graphite text-graphite-foreground">
          <div className={`${wrap} ${sectionPad} grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16`}>
            <div className="min-w-0">
              <h2 className="display-xl text-4xl md:text-6xl">Ai un plan care trebuie desenat?</h2>
              <p className="mt-6 max-w-md leading-relaxed text-graphite-foreground/75">
                Trimite-l acum și primești oferta de regulă în 1–2 zile lucrătoare. Fișierele rămân
                confidențiale.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PhoneLink source="final_cta" className={`btn btn-primary ${onGraphiteHover}`}>
                  {`Sună: ${phoneDisplay}`}
                </PhoneLink>
                {hasWhatsapp && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => {
                      trackConversion("whatsapp_click", { source: "final_cta" });
                    }}
                    className={`btn border-graphite-foreground/50 text-graphite-foreground ${onGraphiteHover}`}
                  >
                    Scrie pe WhatsApp
                  </a>
                )}
              </div>
              {hasEmail && (
                <p className="mt-5 text-sm text-graphite-foreground/75">
                  sau scrie la{" "}
                  <a
                    href={`mailto:${site.email}`}
                    onClick={() => {
                      trackConversion("email_click", { source: "final_cta" });
                    }}
                    className="inline-flex min-h-11 items-center font-medium text-graphite-foreground underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                </p>
              )}
            </div>
            {/* Formularul este o planșă deschisă pe fundal grafit: își păstrează culorile. */}
            <div className="min-w-0 text-foreground [&_:focus-visible]:outline-primary">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
