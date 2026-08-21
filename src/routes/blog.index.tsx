import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl } from "@/lib/site-config";
import { articles } from "@/lib/blog";

const title = "Jurnal tehnic · Revit MEP, BIM și instalații explicate în profunzime · NOD BIM";
const description =
  "Articole de inginerie cu probe practice: costuri reale, experimente Revit vs AutoCAD, proiectarea instalațiilor în centre de date. Conținut tehnic, nu umplutură.";
const url = canonicalUrl("/blog");

export const Route = createFileRoute("/blog/")({
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
  component: BlogIndex,
});

const fmtDate = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">Jurnal tehnic · Inginerie aplicată</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Articole cu probe, nu păreri
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
                Subiecte complicate din instalații, Revit MEP și BIM, explicate din lucrul real:
                costuri descompuse, experimente măsurate, principii de proiectare pe care nu le
                găsești explicate în română.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80} className="h-full">
                <Link to="/blog/$slug" params={{ slug: a.slug }} className="block h-full">
                  <article className="sheet-frame flex h-full flex-col transition-colors hover:border-primary">
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                      <span className="tech-label text-mep">
                        {fmtDate.format(new Date(a.date))}
                      </span>
                      <span className="tech-label text-muted-foreground">{a.readingTime} min</span>
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-4">
                      <h2 className="text-2xl uppercase leading-tight">{a.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {a.description}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {a.tags.map((t) => (
                          <span key={t} className="tech-label border border-border px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaSection
          title="Ai o temă pe care vrei explicată?"
          description="Trimite-mi întrebarea tehnică — dacă e un subiect bun de jurnal, îl acopăr cu probe practice, nu cu răspunsuri de manual."
          source="blog"
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
