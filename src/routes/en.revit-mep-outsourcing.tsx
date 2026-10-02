import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { EnEstimate, EnFaq } from "@/components/site/EnSections";
import { enFaqSchema, enMailHref } from "@/lib/en-page";
import { Reveal } from "@/components/site/Reveal";
import { brandSchema, canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";
import { trackConversion } from "@/lib/analytics";
import hero3d from "@/assets/hero-3d.webp";
import projSheet from "@/assets/proj-sheet.webp";

const path = "/en/revit-mep-outsourcing";
const url = canonicalUrl(path);
const title = "Revit MEP Outsourcing for Engineering Teams · NOD BIM";
const description =
  "Revit MEP outsourcing for MEP consultancies and engineering teams: modelling and drawings in your template, delivered as RVT, DWG and PDF. NDA available.";

const facts: [string, string][] = [
  ["Disciplines", "HVAC · heating · electrical"],
  ["Software", "Revit MEP · AutoCAD"],
  ["Deliverables", "RVT · DWG · PDF"],
  ["Collaboration", "Remote · English · NDA available"],
];

const useCases: [string, string][] = [
  [
    "Overflow capacity",
    "Your team has the design but not the hours. External Revit MEP production covers the peak without hiring.",
  ],
  [
    "2D design to Revit model",
    "Your engineers issue layouts, markups or DWG drawings; I build the Revit MEP model and the drawing set from them.",
  ],
  [
    "Taking over a model",
    "A model started by someone else needs to be checked, cleaned up and brought to issue.",
  ],
  [
    "Drawings and revisions",
    "Sheets, sections, schedules and annotation for an issue, or a revision round after comments.",
  ],
];

const process: { n: string; title: string; body: string; items: string[] }[] = [
  {
    n: "01",
    title: "What you send",
    body: "The engineering input the model is built from. Your design decisions stay yours.",
    items: [
      "architectural background (RVT, DWG or PDF)",
      "MEP layouts, markups or schematics",
      "your Revit template, families and BIM standards",
      "scope, level of detail and target date",
    ],
  },
  {
    n: "02",
    title: "What I do",
    body: "Model and document to the agreed scope, inside your standards.",
    items: [
      "Revit MEP modelling: ducts, pipes, equipment, electrical layouts",
      "views, sections and sheets set up in your template",
      "tags, annotation and schedules",
      "model and sheet checks before issue",
    ],
  },
  {
    n: "03",
    title: "What you receive",
    body: "Files your team can continue working on, not just prints.",
    items: [
      "editable RVT model",
      "DWG exports to your layer standards",
      "PDF drawing set ready for issue",
      "a short issue note: what was modelled and any open questions",
    ],
  },
  {
    n: "04",
    title: "How we collaborate",
    body: "Remote, in English, with one point of contact who also does the work.",
    items: [
      "written scope, timeline and price before work starts",
      "NDA signed before you share files, on request",
      "files via your shared folder, cloud platform or transfer link",
      "progress updates at agreed milestones",
    ],
  },
];

const standards = [
  "your project template and view templates",
  "your families and type naming",
  "your sheet sizes, title blocks and numbering",
  "your DWG export and layer settings",
  "your file naming and folder structure",
];

const faq: [string, string][] = [
  [
    "Do you provide engineering design or calculations?",
    "No. The service is BIM production: modelling, drawings and documentation based on the design your engineers provide. Sizing, calculations, checking and sign-off remain with your team.",
  ],
  [
    "Can you work in our Revit template, with our families and BIM standards?",
    "Yes. Send the template, families and any BIM execution plan or modelling guide at the start, and the model and sheets are produced to them.",
  ],
  [
    "Which Revit version do you use?",
    "The version is confirmed in the estimate so the model matches your project. Revit files cannot be saved back to an older version, so this is agreed before work starts.",
  ],
  [
    "Will you sign an NDA?",
    "Yes. An NDA can be signed before you share any project files. Files are not published or passed on.",
  ],
  [
    "How is the price set?",
    "After reviewing the files, you receive a fixed price for the agreed scope, with the timeline and number of revision rounds included. Extra scope is quoted before it is done.",
  ],
  [
    "What time zone do you work in?",
    "Romania (EET, UTC+2 / UTC+3 in summer), which overlaps with UK and central European working hours.",
  ],
  [
    "Which disciplines do you cover?",
    "HVAC, heating and electrical. Plumbing and drainage are not currently included.",
  ],
  [
    "How is the work contracted?",
    "Scope, deliverables, timeline and price are confirmed in writing before work starts. Contracting and invoicing details are agreed together with the estimate.",
  ],
];

export const Route = createFileRoute("/en/revit-mep-outsourcing")({
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      ...hreflangLinks(path),
      { rel: "preload", as: "image", href: hero3d },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Revit MEP outsourcing",
          description,
          url,
          inLanguage: "en",
          availableLanguage: ["en", "ro"],
          brand: brandSchema,
          serviceType: [
            "Revit MEP modelling",
            "BIM production support",
            "MEP drawings and documentation",
          ],
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(enFaqSchema(faq)) },
    ],
  }),
  component: RevitMepOutsourcing,
});

function RevitMepOutsourcing() {
  const mailHref = enMailHref("Revit MEP project enquiry");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="tech-label text-primary">
                Revit MEP outsourcing · BIM production support
              </p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]">
                Revit MEP outsourcing for engineering teams
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                Extra Revit MEP production capacity for MEP consultancies, engineering offices and
                design-build teams. You keep the engineering design; I model it and produce the
                drawings in your template, to your standards.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                HVAC, heating and electrical. Remote collaboration in English, with an NDA available
                before you share files.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#estimate"
                  className="tech-label border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
                >
                  Request a project estimate
                </a>
                {mailHref && (
                  <a
                    href={mailHref}
                    onClick={() => trackConversion("email_click", { source: "en_hero" })}
                    className="tech-label border border-foreground px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
                  >
                    Email your project files
                  </a>
                )}
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
          <Reveal>
            <h2 className="max-w-3xl text-3xl uppercase md:text-5xl">
              When teams bring in external Revit MEP capacity
            </h2>
          </Reveal>
          <Reveal
            delay={80}
            className="mt-10 grid gap-px bg-border-strong md:grid-cols-2 lg:grid-cols-4"
          >
            {useCases.map(([t, d]) => (
              <div key={t} className="bg-background p-6 md:p-8">
                <h3 className="text-xl uppercase">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </Reveal>
        </section>

        <section id="process" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
            <Reveal>
              <h2 className="text-3xl uppercase md:text-5xl">How it works</h2>
            </Reveal>
            <Reveal delay={80} className="mt-10 grid gap-px bg-border-strong md:grid-cols-2">
              {process.map((step) => (
                <article key={step.n} className="bg-background p-6 md:p-8">
                  <p className="tech-label text-mep">{step.n}</p>
                  <h3 className="mt-3 text-2xl uppercase">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{step.body}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {step.items.map((it) => (
                      <li key={it} className="border-b border-border pb-2 last:border-0">
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <h2 className="text-3xl uppercase md:text-4xl">Working inside your standards</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80 md:text-base">
                The output should look like your team produced it. Send your standards at the start
                and the model and sheets follow them:
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {standards.map((s) => (
                  <li key={s} className="tech-label border-b border-border pb-1 text-foreground/70">
                    {s}
                  </li>
                ))}
              </ul>

              <h2 className="mt-14 text-3xl uppercase md:text-4xl">
                Scope, revisions, responsibility
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80 md:text-base">
                <li>
                  <span className="tech-label text-mep">01 · </span>
                  Scope, deliverables, timeline and price agreed in writing before work starts.
                </li>
                <li>
                  <span className="tech-label text-mep">02 · </span>
                  The number of revision rounds is defined in the estimate; extra scope is quoted
                  before it is done.
                </li>
                <li>
                  <span className="tech-label text-mep">03 · </span>
                  Engineering design, calculations, checking and sign-off remain with your
                  responsible engineer.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-6">
              <div className="grid gap-4">
                {[
                  {
                    src: hero3d,
                    alt: "Revit MEP model with ductwork, pipework and equipment",
                    caption: "Revit MEP model",
                  },
                  {
                    src: projSheet,
                    alt: "Revit sheet with plans, sections, legend and title block",
                    caption: "Drawing sheet",
                  },
                ].map((img, i) => (
                  <figure key={img.caption} className="sheet-frame p-2 md:p-3">
                    <div className="flex items-center justify-between border-b border-border px-2 pb-2">
                      <span className="tech-label text-muted-foreground">{img.caption}</span>
                      <span className="tech-label text-mep">Demonstration project</span>
                    </div>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      width={1200}
                      height={860}
                      className="mt-2 w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border-strong bg-graphite text-graphite-foreground">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="tech-label text-accent">Who you work with</p>
              <h2 className="mt-5 text-3xl uppercase md:text-4xl">
                One engineer, from estimate to issue
              </h2>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-7">
              <p className="text-base leading-relaxed text-graphite-foreground/85">
                NOD BIM is the brand of an installations engineer with a building services degree
                and a professional background in MEP design and coordination. The person who
                prepares your estimate is the person who does the work — no account managers in
                between.
              </p>
              <p className="mt-4 text-base leading-relaxed text-graphite-foreground/85">
                Projects from employment belong to the employer and are not presented as NOD BIM
                work.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-graphite-foreground/65">
                As a single specialist, I take on a limited number of projects at a time and confirm
                availability before accepting a scope.
              </p>
            </Reveal>
          </div>
        </section>

        <EnFaq faq={faq} title="Questions before you send files" />

        <EnEstimate mailHref={mailHref} source="en_estimate" />
      </main>
      <Footer />
      <MobileCta estimateHref="#estimate" />
    </div>
  );
}
