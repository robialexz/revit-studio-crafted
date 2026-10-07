import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { PhoneLink } from "@/components/site/PhoneLink";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { trackConversion } from "@/lib/analytics";
import {
  site,
  canonicalUrl,
  formatPhoneDisplay,
  phoneHref,
  whatsappLink,
  defaultWhatsappMessage,
  hasWhatsapp,
  hasEmail,
} from "@/lib/site-config";

const title = "Contact și ofertă · NOD BIM";
const description =
  "Trimite proiectul prin formular, WhatsApp sau email: estimare cu scop, termen și cost pentru Revit MEP sau AutoCAD, de regulă în 1–2 zile lucrătoare.";
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
      <Header ctaHref="#estimare" />
      <main id="continut">
        <section className="border-b border-border-strong">
          <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-20">
            <Reveal>
              <nav aria-label="Breadcrumb" className="tech-label text-muted-foreground">
                <Link to="/" className="hover:text-primary">
                  Acasă
                </Link>
                <span className="px-2">/</span>
                <span className="text-foreground">Contact</span>
              </nav>
              <h1 className="display-xl mt-8 max-w-4xl text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem]">
                Contact și ofertă
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                Trimite tema, planurile existente și cerințele proiectului. Primești scopul
                lucrării, termenul și costul înainte de începere. Lucrez în română sau engleză, iar
                la cerere semnez un NDA înainte de a primi fișierele.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pt-14 md:px-8 md:pt-20">
          <Reveal className="grid gap-6 lg:grid-cols-12">
            <div className="sheet-frame p-6 md:p-8 lg:col-span-7">
              <p className="tech-label text-muted-foreground">Canale de contact</p>
              <ul className="mt-6 space-y-4 text-sm md:text-base">
                {phoneHref && (
                  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                    <span className="tech-label w-28 shrink-0 text-muted-foreground">Telefon</span>
                    <PhoneLink source="contact" className="hover:text-primary" />
                  </li>
                )}
                {hasWhatsapp && (
                  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                    <span className="tech-label w-28 shrink-0 text-muted-foreground">WhatsApp</span>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => trackConversion("whatsapp_click", { source: "contact" })}
                      className="hover:text-primary"
                    >
                      {phoneDisplay}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border pb-4">
                    <span className="tech-label w-28 shrink-0 text-muted-foreground">Email</span>
                    <a
                      href={`mailto:${site.email}`}
                      onClick={() => trackConversion("email_click")}
                      className="hover:text-primary"
                    >
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
              {hasWhatsapp && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="tech-label mt-8 inline-block border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                >
                  Scrie pe WhatsApp
                </a>
              )}
              <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground">
                Pentru o estimare corectă sunt utile: planurile de arhitectură (DWG / PDF), tema
                proiectului, disciplinele vizate, numărul aproximativ de planșe și termenul dorit.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-border-strong bg-graphite p-6 text-graphite-foreground md:p-8">
                <p className="tech-label text-accent">Servicii</p>
                <ul className="mt-5 space-y-2 text-sm text-graphite-foreground/85">
                  {[
                    "Externalizare Revit MEP",
                    "Planșe HVAC, termice, electrice",
                    "Vederi, secțiuni, sheet-uri",
                    "Export RVT / DWG / PDF",
                    "AutoCAD — redesenare și conversie PDF în DWG",
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
          </Reveal>
        </section>
        <section id="estimare" className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
          <Reveal className="max-w-3xl">
            <QuoteForm />
          </Reveal>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
