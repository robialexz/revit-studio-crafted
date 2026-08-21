import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl, site } from "@/lib/site-config";
import { referrals } from "@/lib/referrals";

const title = "Dosar de referințe · Lucrări livrate Revit MEP";
const description =
  "Fișe de lucrare cu ce s-a livrat, în cât timp și la ce cost: modelare Revit MEP, planșe HVAC, termice și electrice, lucrări DWG. Publicate cu acordul clienților.";
const url = canonicalUrl("/referinte");

export const Route = createFileRoute("/referinte")({
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
  component: Referinte,
});

function Referinte() {
  const isDemo = site.showDemoReferralLabels;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">Referințe · Lucrări livrate</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Dosar de referințe
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
                Fișe de lucrare cu ce s-a livrat, în cât timp și la ce cost. Clienții apar cu
                prenumele și orașul, fără date personale.
              </p>
              <p className="tech-label mt-6 text-muted-foreground">
                Fiecare fișă este publicată cu acordul clientului.
              </p>
              {isDemo && (
                <p className="tech-label mt-3 inline-block border border-primary/40 bg-accent px-3 py-2 text-accent-foreground">
                  Date demonstrative · se înlocuiesc cu referințe reale din lucrări livrate
                </p>
              )}
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-4 lg:grid-cols-2">
            {referrals.map((r, i) => (
              <Reveal key={r.fisa} delay={(i % 2) * 80}>
                <article className="sheet-frame h-full">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
                    <span className="tech-label text-mep">Fișă nr. {r.fisa}</span>
                    <span className="tech-label text-muted-foreground">{r.status}</span>
                  </div>
                  <div className="px-5 py-4">
                    <h2 className="text-2xl uppercase">{r.lucrare}</h2>
                    <p className="tech-label mt-2 text-muted-foreground">
                      {r.client} · {r.loc} · {r.luna}
                    </p>
                    <dl className="mt-5 grid grid-cols-3 gap-px border border-border bg-border-strong">
                      {[
                        ["Livrabile", r.livrabile],
                        ["Termen", r.termen],
                        ["Cost", r.pret],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-sheet px-3 py-3">
                          <dt className="tech-label text-muted-foreground">{k}</dt>
                          <dd className="mt-1.5 text-sm font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <blockquote className="mt-5 border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground/85">
                      „{r.citat}"
                    </blockquote>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="tech-label mt-8 text-muted-foreground">
            {referrals.length} fișe înregistrate · lucrările noi se adaugă pe măsură ce sunt
            livrate, cu acordul clienților.
          </p>
        </section>

        <CtaSection
          title="Vrei să intri în dosar?"
          description="Trimite planurile și cerințele, iar eu îți pot spune ce presupune lucrarea, termenul și costul — înainte de începere."
          source="referinte"
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
