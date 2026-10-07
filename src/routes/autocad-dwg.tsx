import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";
import projDwg from "@/assets/proj-dwg.webp";

const title = "Desenator AutoCAD la comandă: planșe și corecturi DWG";
const description =
  "Desenez la comandă în AutoCAD: planșe după schiță, corecturi pe DWG-ul tău, layere și layout de print. Trimiți fișierele, primești prețul înainte de start.";
const url = canonicalUrl("/autocad-dwg");

export const Route = createFileRoute("/autocad-dwg")({
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
    links: [
      { rel: "canonical", href: url },
      ...hreflangLinks("/autocad-dwg"),
      { rel: "preload", as: "image", href: projDwg },
    ],
  }),
  component: () => (
    <ServicePage
      label="AutoCAD / DWG"
      h1="Desenator AutoCAD pentru planșe, corecturi și desene după schiță"
      intro="Ai o schiță, un plan vechi sau un DWG de corectat? Fac desenare în AutoCAD pentru persoane fizice și firme mici, dar și pentru arhitecți și birouri de proiectare: desene la comandă, redesenare planuri și corecturi pe planșe existente."
      lead="Costul îl stabilesc după ce văd fișierele, înainte de începere. Primești DWG editabil, organizat pe layere, plus PDF gata de tipărit."
      offers={["corectare", "redesenare"]}
      sections={[
        {
          title: "Curățare și organizare DWG",
          body: "Fișierele primite de la terți sunt adesea greu de folosit. Le aduc într-o formă în care se poate lucra și tipări previzibil.",
          items: [
            "curățare geometrie inutilă",
            "organizare layere",
            "stiluri de linie și text unitare",
            "blocuri și referințe externe",
            "purge și verificare fișier",
          ],
        },
        {
          title: "Redesenare și corectări",
          body: "Redesenez planuri pornind de la scanări, PDF-uri sau desene incomplete și implementez observațiile primite pe documentațiile existente.",
          items: [
            "redesenare plan",
            "completări",
            "implementarea observațiilor",
            "cote și note",
            "hașuri și legende",
          ],
        },
        {
          title: "Layout, print și conversii",
          body: "Pregătesc fișierul pentru livrare: layout-uri în Paper Space, scări corecte, indicator și export controlat.",
          items: [
            "layout / Paper Space",
            "viewport-uri și scări",
            "indicator",
            "PDF pregătit de print",
            "PDF către DWG, când documentul permite",
          ],
        },
        {
          title: "Legătura cu fluxul Revit",
          body: "Când proiectul este modelat în Revit, exportul DWG rămâne un livrabil pentru colaboratori. Când primești DWG de la alții, îl pot pregăti pentru a fi folosit ca bază în model.",
        },
      ]}
      images={[
        {
          src: projDwg,
          alt: "Fișier DWG curățat și reorganizat pe layere, cu layout pregătit pentru print",
          caption: "DWG · Curățare și layout",
          meta: "AutoCAD",
        },
      ]}
      deliverables={[
        "fișier DWG curat, organizat pe layere",
        "layout-uri configurate la scară",
        "PDF gata de print",
        "planșe redesenate sau corectate",
      ]}
      faq={[
        [
          "Cauți un proiectant AutoCAD?",
          "Fac desenarea, nu proiectarea autorizată: desenez după proiectul, schița sau observațiile tale.",
        ],
        [
          "Poți converti un PDF în DWG?",
          "Depinde de PDF. Un export vectorial se poate converti util; o scanare se redesenează, iar în acest caz estimarea se face în funcție de volum.",
        ],
        [
          "Faci doar corectări mici?",
          "Da. Modificările punctuale pe planșe existente sunt un tip de lucrare frecvent.",
        ],
        [
          "De ce recomanzi Revit în locul AutoCAD?",
          "Pentru proiecte cu multe vederi și modificări, modelul reduce erorile între planșe. Pentru o planșă izolată, AutoCAD e adesea soluția potrivită.",
        ],
      ]}
      related={["/pdf-in-dwg", "/revit-mep", "/modelare-revit"]}
    />
  ),
});
