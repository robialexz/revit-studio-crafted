import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl } from "@/lib/site-config";

const title = "Despre NOD BIM · Inginer de instalații, modelare Revit MEP";
const description =
  "NOD BIM este condus de un inginer absolvent al facultății de inginerie a instalațiilor, acreditat Uptime, cu experiență în proiectarea instalațiilor pentru centre de date. Modelare Revit MEP, documentație tehnică și produse de nișă pentru proiectanți.";
const url = canonicalUrl("/despre");

export const Route = createFileRoute("/despre")({
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
  component: Despre,
});

function Despre() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">Despre · Cine e în spatele planșelor</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Un inginer, un flux de lucru, standarde înalte
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="text-3xl uppercase md:text-4xl">Formarea</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                NOD BIM este condus de un inginer absolvent al facultății de inginerie a
                instalațiilor. Activitatea de zi cu zi: proiectarea și coordonarea instalațiilor
                pentru centre de date — medii în care redundanța, documentația exactă și coordonarea
                interdisciplinară nu sunt opționale, ci condiția de existență.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/85">
                Acreditările Uptime înseamnă lucru cu standardele cele mai stricte de
                disponibilitate din industrie: instalații proiectate să nu cadă, verificate pe
                principii care lasă zero loc de improvizație. Exact aceste principii stau la baza
                modului în care lucrez și pentru clienții NOD BIM — indiferent că e o casă, un birou
                sau o hală.
              </p>

              <h2 className="mt-12 text-3xl uppercase md:text-4xl">Metoda</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                Lucrez în Revit MEP ca flux principal, cu AutoCAD/DWG acolo unde lucrarea se rezolvă
                cel mai curat în 2D. Documentația rezultă din model, nu din copiere: planuri,
                secțiuni, sheet-uri și liste de cantități rămân coerente pentru că au o singură
                sursă. Scopul lucrării și livrabilele se stabilesc înainte de începere — prețul nu
                se schimbă pe parcurs.
              </p>

              <h2 className="mt-12 text-3xl uppercase md:text-4xl">Principii</h2>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
                <li>
                  <span className="tech-label text-mep">01 · </span>
                  Transparență: prețuri orientative publice, scopul lucrării stabilit în scris
                  înainte de start.
                </li>
                <li>
                  <span className="tech-label text-mep">02 · </span>
                  Confidențialitate: fișierele clienților nu sunt publicate niciodată fără acord.
                </li>
                <li>
                  <span className="tech-label text-mep">03 · </span>
                  Calitate înaintea vitezei: o planșă se predă când rezistă la verificare, nu când
                  arată terminată.
                </li>
                <li>
                  <span className="tech-label text-mep">04 · </span>
                  Conținut tehnic onest: articolele din jurnal explică lucruri reale, cu probe — nu
                  umplutură de marketing.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5">
              <div className="sheet-frame p-6 md:p-8">
                <p className="tech-label text-mep">Fișă tehnică</p>
                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {[
                    ["Formare", "Inginer de instalații — facultatea de inginerie a instalațiilor"],
                    ["Acreditări", "Uptime Institute (centre de date)"],
                    ["Experiență", "Proiectare instalații pentru centre de date"],
                    ["Flux principal", "Revit MEP · BIM"],
                    ["Flux secundar", "AutoCAD / DWG"],
                    ["Livrabile", "RVT · DWG · PDF"],
                    ["Colaborare", "100% online"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-4 py-3">
                      <dt className="tech-label text-muted-foreground">{k}</dt>
                      <dd className="text-sm leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  Detaliile personale rămân private: site-ul este activitatea independentă, nu un CV
                  public. Pentru lucrări comerciale, datele complete de identificare se comunică
                  direct, la contractare.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection
          title="Hai să discutăm lucrarea ta"
          description="Trimite planurile și cerințele — îți spun ce presupune lucrarea, termenul și costul, înainte de începere."
          source="despre"
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
