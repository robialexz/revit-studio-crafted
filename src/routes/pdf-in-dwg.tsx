import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { canonicalUrl } from "@/lib/site-config";
import { rateLabel } from "@/lib/pricing";
import demoPlan from "@/assets/demo-plan.svg";
import demoPlanScan from "@/assets/demo-plan-scan.webp";
import demoPlanScan640 from "@/assets/demo-plan-scan-640.webp";

const title = "PDF în DWG: plan redesenat manual în AutoCAD · NOD BIM";
const description = `Îmi trimiți planul în PDF sau scanat și îl redesenez linie cu linie în AutoCAD: DWG editabil, pe layere, la scară. Serviciu manual, ${rateLabel("redesenare", "/")}.`;
const url = canonicalUrl("/pdf-in-dwg");

export const Route = createFileRoute("/pdf-in-dwg")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => (
    <ServicePage
      label="PDF în DWG"
      h1="PDF în DWG, redesenat manual în AutoCAD"
      intro="Îmi trimiți planul în PDF sau scanat și primești un DWG editabil, pe layere, la scară. Este redesenare manuală, nu un convertor automat."
      lead="Prețul exact îl primești în scris după ce văd fișierul, înainte să încep. Oferta vine de regulă în 1–2 zile lucrătoare."
      offers={["redesenare"]}
      sections={[
        {
          title: "Ce se poate porni dintr-un PDF",
          body: "Un PDF vectorial, exportat dintr-un program de desen, are linii pe care AutoCAD le poate importa: le import, apoi curăț și reorganizez desenul. Un PDF scanat este o imagine: îl așez ca fundal și redesenez fiecare linie peste el. Îți spun de la început din ce categorie face parte fișierul tău.",
          items: ["PDF vectorial", "PDF scanat", "poză a unui plan tipărit", "schiță de mână"],
        },
        {
          title: "Cum verific scara",
          body: "Aduc desenul la scară după o cotă cunoscută din original, apoi verific și alte cote, pe ambele direcții. Dacă scanarea este deformată și cotele nu se potrivesc între ele, îți semnalez diferențele înainte de predare.",
        },
      ]}
      images={[]}
      deliverables={[
        "DWG editabil, pe layere, la scară",
        "PDF de tipărit",
        "lista cotelor care nu au putut fi citite",
      ]}
      faq={[
        [
          "Cu ce diferă de un convertor gratuit?",
          "Un convertor automat transformă doar ce găsește în PDF: dintr-o scanare scoate o imagine sau linii fragmentate, fără layere și fără scară verificată. Eu redesenez planul manual, element cu element, pe layere denumite, și verific scara după cote.",
        ],
        [
          "Ce se întâmplă când lipsesc cote?",
          "Desenez după ce se poate măsura în original și îți trimit lista cotelor care nu au putut fi citite. Îți spun înainte ce nu se poate garanta; nu inventez dimensiuni.",
        ],
        [
          "În ce versiune de DWG se livrează?",
          "Versiunea se stabilește în ofertă, după programul cu care deschizi fișierul. AutoCAD poate salva și în formate DWG mai vechi.",
        ],
      ]}
      related={["/autocad-dwg", "/revit-mep"]}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="min-w-0">
          <p className="tech-label text-muted-foreground">Scanare și desen</p>
          <h2 className="mt-4 text-3xl md:text-4xl">Același plan, înainte și după redesenare</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Mută glisorul ca să compari scanarea cu desenul refăcut linie cu linie.
          </p>
          <p className="mt-5 text-sm">
            Vrei să încerci singur întâi?{" "}
            <Link
              to="/blog/$slug"
              params={{ slug: "pdf-in-dwg-vectorial-scanare-scara-oferta" }}
              className="inline-flex min-h-11 items-center font-medium underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              Vezi ce se poate converti automat
            </Link>
          </p>
        </div>
        <BeforeAfter
          clean={demoPlan}
          scan={demoPlanScan}
          scanSrcSet={`${demoPlanScan640} 640w, ${demoPlanScan} 960w`}
          alt="Plan de apartament cu două camere, scanat înclinat și neclar, comparat cu același plan redesenat"
          note="Exemplu demonstrativ, desenat pentru această pagină."
        />
      </div>
    </ServicePage>
  ),
});
