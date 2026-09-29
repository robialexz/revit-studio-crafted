import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { EnEstimate, EnFaq } from "@/components/site/EnSections";
import { enFaqSchema, enMailHref } from "@/lib/en-page";
import { brandSchema, canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";
import projDwg from "@/assets/proj-dwg.webp";

const path = "/en/autocad-drafting";
const url = canonicalUrl(path);
const title = "AutoCAD Drafting Services for Engineering Offices · NOD BIM";
const description =
  "AutoCAD drafting support for engineering and design offices: PDF and scan to DWG redrafting, drawing cleanup to your CAD standards, markups and revisions. Remote, in English.";

const facts: [string, string][] = [
  ["Input", "PDF · scans · DWG · markups"],
  ["Output", "DWG · PDF"],
  ["Standards", "Your layers, blocks and title blocks"],
  ["Collaboration", "Remote · English · NDA available"],
];

const services: { title: string; body: string; items: string[] }[] = [
  {
    title: "PDF and scan to DWG",
    body: "Legacy drawings that only exist as PDFs or scans are redrafted as clean, editable DWG. Vector PDFs can be converted and then corrected; scans are redrafted to scale.",
    items: [
      "redrafting to scale",
      "dimensions and text",
      "hatches and linetypes",
      "checked against the source",
    ],
  },
  {
    title: "Cleanup and standardisation",
    body: "Drawings received from third parties are brought into a state your team can work with: consistent layers, blocks, text styles and xrefs.",
    items: [
      "layer mapping to your standard",
      "block and text cleanup",
      "xref and image repair",
      "purge and audit",
    ],
  },
  {
    title: "Markups and revisions",
    body: "Redline markups from your engineers are incorporated into existing drawings, with revision clouds and title block updates where your process needs them.",
    items: [
      "redline incorporation",
      "revision clouds and tables",
      "title block updates",
      "batch updates across sheets",
    ],
  },
  {
    title: "Layouts and plot setup",
    body: "Paper space layouts, viewports, scales and plot settings prepared so the set prints the same way every time.",
    items: ["layouts and viewports", "annotation scales", "plot styles", "PDF sets for issue"],
  },
];

const faq: [string, string][] = [
  [
    "Can you work to our CAD standards?",
    "Yes. Send your template, layer standard, blocks and title blocks at the start and the drawings are produced to them.",
  ],
  [
    "Can you convert any PDF to DWG?",
    "A vector PDF can be converted and then corrected. A scan or image is redrafted manually, so the estimate depends on the number and complexity of the drawings.",
  ],
  [
    "Do you also model in Revit?",
    "Yes. For MEP projects that need a model and coordinated sheets, see Revit MEP outsourcing. AutoCAD drafting suits 2D-only work and existing DWG sets.",
  ],
  [
    "Will you sign an NDA?",
    "Yes. An NDA can be signed before you share any drawings. Files are not published or passed on.",
  ],
  [
    "How is the price set?",
    "After reviewing the files, you receive a fixed price for the agreed scope and timeline. Extra scope is quoted before it is done.",
  ],
  [
    "Do you check the engineering content?",
    "No. Drafting follows the information you provide; engineering design, calculations and sign-off remain with your team.",
  ],
];

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
                AutoCAD drafting for engineering offices
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
                  {[
                    "editable DWG files to your CAD standard",
                    "PDF set ready for issue",
                    "a short note of assumptions and open questions",
                  ].map((d) => (
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
