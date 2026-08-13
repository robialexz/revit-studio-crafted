import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import {
  site,
  canonicalUrl,
  formatPhoneDisplay,
  whatsappLink,
  defaultWhatsappMessage,
  hasWhatsapp,
  hasEmail,
} from "@/lib/site-config";

const title = "Contact — NOD BIM · Estimare și suport Revit MEP";
const description =
  "Contact NOD BIM pentru modelare Revit MEP, BIM și desenare tehnică. Trimite proiectul pentru o estimare, pe WhatsApp sau prin formularul de contact.";
const url = canonicalUrl("/contact");

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  const phoneDisplay = formatPhoneDisplay(site.whatsappNumber);
  const waHref = whatsappLink(defaultWhatsappMessage);

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
              <span className="text-foreground">Contact</span>
            </nav>
            <h1 className="display-xl mt-8 max-w-4xl text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem]">
              Contact
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Trimite tema, planurile existente și cerințele proiectului. Primești o estimare cu
              volumul, termenul și costul, stabilite înainte de începerea lucrării.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="sheet-frame p-6 md:p-8 lg:col-span-7">
              <p className="tech-label text-mep">Canale de contact</p>
              <ul className="mt-6 space-y-4 text-sm md:text-base">
                {hasWhatsapp && (
                  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                    <span className="tech-label w-28 shrink-0 text-muted-foreground">Telefon</span>
                    <a href={`tel:+${site.whatsappNumber}`} className="hover:text-primary">
                      {phoneDisplay}
                    </a>
                  </li>
                )}
                {hasWhatsapp && (
                  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                    <span className="tech-label w-28 shrink-0 text-muted-foreground">WhatsApp</span>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-primary"
                    >
                      {phoneDisplay}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                    <span className="tech-label w-28 shrink-0 text-muted-foreground">Email</span>
                    <a href={`mailto:${site.email}`} className="hover:text-primary">
                      {site.email}
                    </a>
                  </li>
                )}
                <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="tech-label w-28 shrink-0 text-muted-foreground">Răspuns</span>
                  <span className="text-muted-foreground">
                    De regulă în 1–2 zile lucrătoare, după analiza documentației trimise.
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#estimare"
                  className="tech-label border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
                >
                  Formular de estimare
                </a>
                {hasWhatsapp && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tech-label border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                  >
                    Scrie pe WhatsApp
                  </a>
                )}
              </div>
              <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground">
                Pentru o estimare corectă sunt utile: planurile de arhitectură (DWG / PDF), tema
                proiectului, disciplinele vizate, numărul aproximativ de planșe și termenul dorit.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-border-strong bg-graphite p-6 text-graphite-foreground md:p-8">
                <p className="tech-label text-primary">Servicii</p>
                <ul className="mt-5 space-y-2 text-sm text-graphite-foreground/85">
                  {[
                    "Modelare Revit MEP & BIM",
                    "Planșe HVAC, termice, electrice",
                    "Vederi, secțiuni, sheet-uri",
                    "Export RVT / DWG / PDF",
                    "AutoCAD / DWG — corectări și conversii",
                    "Suport tehnic academic",
                  ].map((item) => (
                    <li key={item} className="border-b border-graphite-foreground/15 pb-2">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/portofoliu"
                  className="tech-label mt-6 inline-block border-b border-graphite-foreground/50 pb-1 transition-colors hover:border-primary hover:text-primary"
                >
                  Vezi portofoliul
                </Link>
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
