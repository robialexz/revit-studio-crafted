import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl, hasWhatsapp, whatsappLink } from "@/lib/site-config";
import { products } from "@/lib/products";

const title = "Magazin · Unelte CAD și desen tehnic · NOD BIM";
const description =
  "Unelte de birou și CAD greu de găsit în România: macropad-uri pentru scurtături Revit/AutoCAD, radiere electrice, ascuțitori pentru mine de 2mm, șabloane de desen tehnic și modele didactice secționate MEP.";
const url = canonicalUrl("/magazin");

function productSchema() {
  return products.map((p) => {
    const price = p.price.replace(/\D/g, "");
    return {
      "@type": "Product",
      name: p.name,
      description: p.description,
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "RON",
        availability: "https://schema.org/InStock",
        url: canonicalUrl("/magazin"),
      },
    };
  });
}

export const Route = createFileRoute("/magazin")({
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
          "@graph": productSchema(),
        }),
      },
    ],
  }),
  component: Magazin,
});

function orderLink(productName: string): string {
  const message = `Salut! Sunt interesat de „${productName}" din magazinul NOD BIM. Îmi poți da detalii despre disponibilitate și livrare?`;
  return whatsappLink(message);
}

function Magazin() {
  const birouCad = products.filter((p) => p.category === "Birou & CAD");
  const unelte = products.filter((p) => p.category === "Unelte de desen");
  const didactice = products.filter((p) => p.category === "Didactice");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">Magazin · Print 3D · La comandă</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Produse de nișă
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
                Unelte de birou și CAD pe care nu le găsești pe eMAG, șabloane de desen tehnic și
                modele didactice secționate pentru instalații — la prețuri corecte.
              </p>
              <p className="tech-label mt-6 text-muted-foreground">
                Produsele de import au livrare 7–14 zile · modelele didactice se realizează la
                comandă în 3–5 zile lucrătoare
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="tech-label text-mep">01</span>
              <span className="tech-label text-muted-foreground">Unelte de birou & CAD</span>
              <span className="h-px flex-1 bg-border-strong" />
            </div>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {birouCad.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex items-baseline gap-4">
              <span className="tech-label text-mep">02</span>
              <span className="tech-label text-muted-foreground">Unelte de desen tehnic</span>
              <span className="h-px flex-1 bg-border-strong" />
            </div>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {unelte.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex items-baseline gap-4">
              <span className="tech-label text-mep">03</span>
              <span className="tech-label text-muted-foreground">
                Modele didactice secționate MEP
              </span>
              <span className="h-px flex-1 bg-border-strong" />
            </div>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {didactice.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Nu găsești ce cauți? Modelele didactice se pot realiza și la cerere — trimite o
            descriere a echipamentului pe care vrei să-l prezinți la curs.
          </p>
        </section>

        <section className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="tech-label text-mep">04</span>
                <span className="tech-label text-muted-foreground">Întrebări despre comandă</span>
                <span className="h-px flex-1 bg-border-strong" />
              </div>
              <h2 className="mt-8 max-w-2xl text-4xl uppercase md:text-5xl">
                Cum funcționează comanda
              </h2>
              <div className="mt-8 max-w-3xl">
                {[
                  [
                    "Cât durează livrarea?",
                    "Produsele de import (macropad-uri, radiere, șabloane, mese de desen) au termen de 7–14 zile. Modelele didactice se realizează la comandă în 3–5 zile lucrătoare. Termenul exact ți-l confirm înainte de plată.",
                  ],
                  [
                    "Cum plătesc?",
                    "După ce confirmăm comanda pe WhatsApp, plătești prin transfer bancar sau Revolut. Primești dovada plății și numărul de urmărire la expediere.",
                  ],
                  [
                    "Cum se face livrarea?",
                    "Prin curier, oriunde în România. Costul transportului ți-l comunic înainte de confirmarea comenzii.",
                  ],
                  [
                    "Pot returna un produs?",
                    "Da — ai drept de retur de 14 zile pentru produsele nefolosite, conform OUG 34/2014. Pentru modelele didactice personalizate, returul se discută de la caz la caz.",
                  ],
                  [
                    "Pot comanda un model didactic după specificațiile mele?",
                    "Da. Trimite pe WhatsApp echipamentul pe care vrei să-l prezinți la curs și îți propun un model secționat adaptat, cu preț și termen.",
                  ],
                ].map(([q, a]) => (
                  <details key={q} className="group border-b border-border-strong first:border-t">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold uppercase tracking-tight">
                      {q}
                      <span
                        className="tech-label text-mep transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">{a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection
          title="Comandă direct pe WhatsApp"
          description="Scrie-mi ce produs te interesează și cantitatea. Confirm disponibilitatea, termenul de livrare și costul de transport înainte de orice plată."
          source="magazin"
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  const wa = orderLink(product.name);
  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <article className="sheet-frame flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="tech-label text-mep">{product.category}</span>
          <span className="tech-label text-muted-foreground">{product.availability}</span>
        </div>
        {product.image && (
          <div className="border-b border-border bg-sheet">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={480}
              height={480}
              className="h-48 w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col px-5 py-4">
          <h2 className="text-2xl uppercase">{product.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <ul className="mt-4 space-y-1.5">
            {product.details.map((d) => (
              <li key={d} className="tech-label text-foreground/70">
                · {d}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <span className="tech-label text-primary">{product.price}</span>
            {hasWhatsapp && (
              <a
                href={wa || undefined}
                target="_blank"
                rel="noreferrer noopener"
                className="tech-label border border-foreground bg-foreground px-4 py-2.5 text-background transition-colors hover:border-primary hover:bg-primary"
              >
                Comandă
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
