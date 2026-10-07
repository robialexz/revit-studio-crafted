import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { EnEstimate } from "@/components/site/EnSections";
import { enAbout } from "@/lib/en-content";
import { enMailHref } from "@/lib/en-page";
import { canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";

const path = "/en/about";
const url = canonicalUrl(path);
const title = "About NOD BIM · Revit MEP and CAD Support from an Installations Engineer";
const { h1, description, facts: profile, howIWork } = enAbout;

export const Route = createFileRoute("/en/about")({
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
  }),
  component: About,
});

/**
 * Versiunea EN a /despre. NOD BIM este un brand, nu o societate:
 * experiența este a specialistului.
 */
function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="continut">
        <section className="border-b border-border-strong">
          <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">About NOD BIM</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">
                {h1}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                NOD BIM provides Revit MEP modelling and AutoCAD drafting, delivered directly by an
                installations engineer. The person who prepares your estimate is the person who
                works on your files.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl">The engineer behind the brand</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                I studied building services engineering and work professionally in MEP design and
                coordination, where precise documentation and coordination between disciplines are
                requirements, not extras.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/85">
                Projects from employment belong to the employer and its clients and are not
                presented as NOD BIM work. Only work I have the right to show appears on this site,
                and demonstration examples are labelled as such.
              </p>

              <h2 className="mt-12 text-3xl md:text-4xl">How I work</h2>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
                {howIWork.map((item, i) => (
                  <li key={item}>
                    <span className="tech-label text-muted-foreground">0{i + 1} · </span>
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-3xl md:text-4xl">A brand, not a company</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                NOD BIM is the name under which I offer these services; it is not a registered
                company. Contracting and invoicing details are agreed together with each estimate.
              </p>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5">
              <div className="sheet-frame p-6 md:p-8">
                <p className="tech-label text-muted-foreground">Profile</p>
                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {profile.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-4 py-3">
                      <dt className="tech-label text-muted-foreground">{k}</dt>
                      <dd className="text-sm leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href="/en/revit-mep-outsourcing"
                    className="tech-label text-primary hover:underline"
                  >
                    Revit MEP outsourcing
                  </a>
                  <a
                    href="/en/autocad-drafting"
                    className="tech-label text-primary hover:underline"
                  >
                    AutoCAD drafting
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <EnEstimate mailHref={enMailHref("Project enquiry")} source="en_about_estimate" />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
