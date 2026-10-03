import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { EnEstimate, EnFaq } from "@/components/site/EnSections";
import { enDrafting } from "@/lib/en-content";
import { enFaqSchema, enMailHref } from "@/lib/en-page";
import { brandSchema, canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";
import projDwg from "@/assets/proj-dwg.webp";

const path = "/en/autocad-drafting";
const url = canonicalUrl(path);
const title = "AutoCAD Drafting Services for Engineering Offices · NOD BIM";
const { h1, description, facts, services, received, faq } = enDrafting;

export const Route = createFileRoute("/en/autocad-drafting")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:locale:alternate", content: "ro_RO" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }, ...hreflangLinks(path)],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AutoCAD drafting services",
          description,
          url,
          inLanguage: "en",
          availableLanguage: ["en", "ro"],
          brand: brandSchema,
          serviceType: ["CAD drafting", "PDF to DWG redrafting", "Drawing cleanup"],
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(enFaqSchema(faq)) },
    ],
  }),
  component: AutocadDrafting,
});

function AutocadDrafting() {
  const mailHref = enMailHref("AutoCAD drafting enquiry");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="tech-label text-primary">AutoCAD drafting · CAD production support</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]">
                {h1}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                Redrafting, cleanup and revisions for teams with more drawings than drafting time.
                Legacy PDFs become editable DWG, third-party files follow your CAD standard, and
                markups are incorporated without tying up your engineers.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#estimate"
                  className="tech-label border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
                >
                  Send your drawings for an estimate
                </a>
                <a
                  href="/en/revit-mep-outsourcing"
                  className="tech-label border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                >
                  Need a Revit model instead?
                </a>
              </div>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5">
              <dl className="sheet-frame divide-y divide-border p-6 md:p-8">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-5 gap-4 py-3 first:pt-0 last:pb-0">
                    <dt className="tech-label col-span-2 text-muted-foreground">{k}</dt>
                    <dd className="col-span-3 text-sm leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Reply with scope, timeline and cost within 1–2 working days.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              {services.map((s) => (
                <article key={s.title} className="border-b border-border-strong py-8 first:pt-0">
                  <h2 className="text-3xl uppercase md:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
                    {s.body}
                  </p>
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
                </article>
              ))}
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5">
              <figure className="sheet-frame p-2 md:p-3">
                <div className="flex items-center justify-between border-b border-border px-2 pb-2">
                  <span className="tech-label text-muted-foreground">DWG cleanup and layout</span>
                  <span className="tech-label text-mep">Demonstration project</span>
                </div>
                <img
                  src={projDwg}
                  alt="DWG drawing reorganised on layers with a paper space layout ready for plotting"
                  width={1200}
                  height={860}
                  loading="lazy"
                  className="mt-2 w-full object-cover"
                />
              </figure>
              <div className="mt-10 border border-border-strong bg-graphite p-6 text-graphite-foreground md:p-8">
                <p className="tech-label text-accent">What you receive</p>
                <ul className="mt-5 space-y-2 text-sm text-graphite-foreground/85">
                  {received.map((d) => (
                    <li key={d} className="border-b border-graphite-foreground/15 pb-2">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <EnFaq faq={faq} title="Questions before you send drawings" />

        <EnEstimate mailHref={mailHref} source="en_autocad_estimate" />
      </main>
      <Footer />
      <MobileCta estimateHref="#estimate" />
    </div>
  );
}
