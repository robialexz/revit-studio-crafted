import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { brandSchema, canonicalUrl, hasWhatsapp, whatsappLink } from "@/lib/site-config";
import { products, type ShopProduct } from "@/lib/products";

const title = "Magazin BIM: audit Revit și kituri MEP · NOD BIM";
const description =
  "Resurse BIM pentru birouri din România: RVT/DWG Health Check, Revit MEP Office Starter Kit, automatizări Dynamo/pyRevit și modele didactice.";
const url = canonicalUrl("/magazin");

const shopFaq: [string, string][] = [
  [
    "Ce este RVT / DWG Health Check?",
    "Este o verificare punctuală a unui fișier RVT, DWG sau PDF înainte de predare, preluare ori continuarea lucrului. Primești un raport cu problemele găsite, observații prioritizate și recomandări pentru următorii pași. Nu înlocuiește verificarea sau semnătura unui specialist autorizat.",
  ],
  [
    "Ce conține Revit MEP Office Starter Kit?",
    "Kitul poate include un template RVT de pornire, view templates, filtre, nomenclatoare, sheet-uri organizate și un checklist QA/QC. Versiunea Revit și nivelul de personalizare se confirmă înainte de comandă.",
  ],
  [
    "Pe ce versiuni Revit funcționează pachetele?",
    "Trimite versiunea Revit, Dynamo sau pyRevit pe care o folosește biroul. Confirm compatibilitatea și scopul exact înainte de livrare; nu vând scripturi fără să știu fluxul în care vor fi folosite.",
  ],
  [
    "Ce înseamnă pachet de capacitate externă?",
    "Este o colaborare cu scop fix pentru un vârf de lucru: de exemplu 5 planșe, o revizie RVT/DWG sau 10 ore de suport. Prețul, termenul și livrabilele se stabilesc după ce văd fișierele și cerințele.",
  ],
  [
    "Pot comanda un model didactic MEP personalizat?",
    "Da. Putem porni de la o pompă, vană, ventiloconvector sau distribuitor. Stabilim împreună nivelul de secționare, codurile de culoare, dimensiunea, suportul și termenul înainte de print.",
  ],
  [
    "Cum se face comanda și livrarea?",
    "Scrii pe WhatsApp ce ofertă te interesează și trimiți contextul necesar. Confirm disponibilitatea, compatibilitatea, prețul și termenul înainte de plată. Pachetele digitale se livrează online, iar modelele fizice prin curier în România.",
  ],
];

function offerSchema(product: ShopProduct) {
  if (product.priceMin === undefined) return undefined;

  return {
    "@type": "AggregateOffer",
    lowPrice: product.priceMin,
    ...(product.priceMax !== undefined ? { highPrice: product.priceMax } : {}),
    priceCurrency: "RON",
    availability: "https://schema.org/PreOrder",
    url,
  };
}

function shopSchema() {
  const entities = products.map((product) => {
    const offers = offerSchema(product);

    return {
      "@id": `${url}#${product.id}`,
      "@type": product.kind === "Serviciu" ? "Service" : "Product",
      name: product.name,
      description: product.description,
      category: product.category,
      areaServed: { "@type": "Country", name: "România" },
      brand: brandSchema,
      ...(product.kind !== "Serviciu"
        ? {
            image: canonicalUrl(product.image),
          }
        : {}),
      ...(product.kind === "Serviciu" ? { serviceType: product.category } : {}),
      ...(offers ? { offers } : {}),
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "ro-RO",
        dateModified: "2026-08-31",
        mainEntity: { "@id": `${url}#catalog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: canonicalUrl("/") },
          { "@type": "ListItem", position: 2, name: "Magazin BIM", item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#catalog`,
        name: "Resurse BIM, audit și modele didactice",
        numberOfItems: entities.length,
        itemListElement: entities.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": product["@id"] },
        })),
      },
      ...entities,
      {
        "@type": "FAQPage",
        mainEntity: shopFaq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
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
        children: JSON.stringify(shopSchema()),
      },
    ],
  }),
  component: Magazin,
});

function orderLink(productName: string): string {
  const message = `Salut! Mă interesează oferta „${productName}” din magazinul NOD BIM. Îți pot trimite detaliile proiectului pentru o confirmare de preț și termen?`;
  return whatsappLink(message);
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="tech-label text-mep">{index}</span>
      <span className="tech-label text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border-strong" />
    </div>
  );
}

function Magazin() {
  const featured = products.slice(0, 3);
  const secondary = products.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
            <Reveal>
              <nav aria-label="Breadcrumb" className="tech-label text-muted-foreground">
                <Link to="/" className="hover:text-primary">
                  Acasă
                </Link>
                <span className="px-2">/</span>
                <span className="text-foreground">Magazin BIM</span>
              </nav>
              <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="tech-label text-primary">Magazin BIM · Audit · La comandă</p>
                  <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                    Resurse BIM,
                    <br />
                    audit și modele
                    <br />
                    didactice.
                  </h1>
                </div>
                <div className="lg:col-span-5">
                  <p className="max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
                    NOD BIM oferă pentru birouri din România audituri RVT/DWG, kituri Revit MEP,
                    automatizări Dynamo/pyRevit și capacitate externă pentru proiecte HVAC, termice
                    și electrice.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Sunt oferte cu scop clar și livrabile definite — nu un catalog general de
                    papetărie. Pentru modele didactice MEP, alegem împreună nivelul de detaliu și
                    forma finală.
                  </p>
                </div>
              </div>
              <div className="mt-12 grid gap-px bg-border-strong sm:grid-cols-3">
                {[
                  ["01", "Verifici", "RVT, DWG sau PDF înainte de predare"],
                  ["02", "Organizezi", "Template, automatizări și QA/QC pentru birou"],
                  ["03", "Externalizezi", "Planșe, revizii sau modele didactice la comandă"],
                ].map(([index, label, text]) => (
                  <a
                    key={index}
                    href={
                      index === "01"
                        ? "#resurse-bim"
                        : index === "02"
                          ? "#resurse-bim"
                          : "#comenzi-speciale"
                    }
                    className="bg-background p-5 transition-colors hover:bg-sheet"
                  >
                    <span className="tech-label text-mep">{index}</span>
                    <h2 className="mt-5 text-xl uppercase">{label}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="resurse-bim" className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
          <Reveal>
            <SectionLabel index="01" children="Resurse BIM pentru birouri" />
            <div className="mt-8 max-w-2xl">
              <h2 className="text-4xl uppercase md:text-5xl">Cumpără o rezolvare, nu un obiect</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                Primele trei oferte sunt gândite pentru o problemă concretă: să afli dacă un fișier
                poate fi predat, să pornești un template de birou sau să elimini o sarcină
                repetitivă din Revit MEP.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} featured />
            ))}
          </div>
        </section>

        <section id="comenzi-speciale" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
            <Reveal>
              <SectionLabel index="02" children="Capacitate și modele la comandă" />
              <div className="mt-8 max-w-2xl">
                <h2 className="text-4xl uppercase md:text-5xl">Când ai nevoie de o mână în plus</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Pentru lucrări care nu încap într-un pachet standard, stabilim scopul, termenul și
                  livrabilele înainte de începere. Astfel magazinul poate fi primul pas către o
                  colaborare de externalizare Revit MEP.
                </p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {secondary.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index + featured.length} />
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              Pentru modelare completă, coordonare sau mai mult de un pachet de capacitate, mergi la{" "}
              <Link to="/revit-mep" className="text-foreground underline hover:text-primary">
                serviciile Revit MEP
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
          <Reveal>
            <SectionLabel index="03" children="Cum funcționează" />
          </Reveal>
          <div className="mt-8 grid gap-px bg-border-strong md:grid-cols-3">
            {[
              [
                "01",
                "Alegi pachetul",
                "Selectezi auditul, kitul, automatizarea sau modelul de care ai nevoie.",
              ],
              [
                "02",
                "Trimiți contextul",
                "Pentru audit și servicii trimiți fișierele RVT/DWG/PDF, versiunea și termenul dorit.",
              ],
              [
                "03",
                "Primești livrabilele",
                "Confirmăm prețul și termenul înainte de plată; livrarea se face digital sau prin curier.",
              ],
            ].map(([index, title, text]) => (
              <div key={index} className="bg-sheet p-6 md:p-8">
                <span className="tech-label text-mep">{index}</span>
                <h3 className="mt-6 text-2xl uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border border-border-strong bg-sheet p-6 md:p-8">
            <p className="tech-label text-primary">De ce există magazinul</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-12">
              <h2 className="text-3xl uppercase md:text-4xl">
                O intrare mică într-o colaborare mai mare
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                Un health check poate arăta ce trebuie reparat într-un model. Un starter kit poate
                pune ordine în birou. Un pachet de capacitate poate acoperi un vârf de lucru. Dacă
                problema este mai mare, continui direct cu servicii de modelare Revit MEP și
                documentație tehnică.
              </p>
            </div>
          </div>
        </section>

        <section id="intrebari" className="border-y border-border-strong bg-sheet">
          <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
            <Reveal>
              <SectionLabel index="04" children="Întrebări despre comandă" />
              <h2 className="mt-8 max-w-2xl text-4xl uppercase md:text-5xl">Întrebări frecvente</h2>
              <div className="mt-8 max-w-4xl">
                {shopFaq.map(([question, answer]) => (
                  <details
                    key={question}
                    className="group border-b border-border-strong first:border-t"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold uppercase tracking-tight">
                      {question}
                      <span
                        className="tech-label text-mep transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection
          title="Ai un fișier sau o nevoie concretă?"
          description="Scrie-mi ce vrei să verifici, să organizezi sau să externalizezi. Confirm ce se poate livra, în ce format și cu ce termen înainte de orice plată."
          source="magazin"
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}

function ProductCard({
  product,
  index,
  featured = false,
}: {
  product: ShopProduct;
  index: number;
  featured?: boolean;
}) {
  const wa = orderLink(product.name);

  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <article className="sheet-frame flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <span className="tech-label text-mep">{product.category}</span>
          <span className="tech-label text-right text-muted-foreground">{product.kind}</span>
        </div>
        <figure className="relative overflow-hidden border-b border-border bg-sheet">
          <img
            src={product.image}
            alt={product.imageAlt}
            loading={index === 0 ? "eager" : "lazy"}
            width={1200}
            height={860}
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 tech-label text-mep">
            {product.imageCaption}
          </figcaption>
        </figure>
        <div className="flex flex-1 flex-col px-5 py-5 md:px-6">
          <h2 className={featured ? "text-2xl uppercase" : "text-3xl uppercase"}>{product.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-5 grid gap-4 border-y border-border py-4 text-sm sm:grid-cols-2">
            <div>
              <p className="tech-label text-muted-foreground">Pentru</p>
              <p className="mt-2 leading-relaxed text-foreground/80">{product.audience}</p>
            </div>
            <div>
              <p className="tech-label text-muted-foreground">Compatibil cu</p>
              <p className="mt-2 leading-relaxed text-foreground/80">{product.compatibility}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="tech-label text-primary">Ce primești</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
              {product.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-2">
                  <span className="text-mep" aria-hidden="true">
                    ·
                  </span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
            <div>
              <p className="tech-label text-muted-foreground">{product.availability}</p>
              <p className="mt-2 font-display text-2xl font-semibold uppercase text-primary">
                {product.price}
              </p>
            </div>
            {hasWhatsapp ? (
              <a
                href={wa || undefined}
                target="_blank"
                rel="noreferrer noopener"
                className="tech-label border border-foreground bg-foreground px-4 py-3 text-background transition-colors hover:border-primary hover:bg-primary"
              >
                Cere detalii
              </a>
            ) : (
              <Link
                to="/contact"
                className="tech-label border border-foreground bg-foreground px-4 py-3 text-background transition-colors hover:border-primary hover:bg-primary"
              >
                Cere detalii
              </Link>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
