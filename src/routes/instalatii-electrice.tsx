import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { canonicalUrl } from "@/lib/site-config";
import projElectrice from "@/assets/proj-electrice.webp";
import hero2d from "@/assets/hero-2d.webp";

const title = "Instalații electrice — desenare și modelare tehnică · NOD BIM";
const description =
  "Desenare și modelare tehnică pentru instalații electrice: iluminat, prize, circuite, trasee, tablouri, simboluri și legende, pe baza informațiilor de proiect furnizate.";
const url = canonicalUrl("/instalatii-electrice");

export const Route = createFileRoute("/instalatii-electrice")({
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
      { rel: "preload", as: "image", href: projElectrice },
    ],
  }),
  component: () => (
    <ServicePage
      label="Instalații electrice"
      h1="Desenare și modelare tehnică pentru instalații electrice"
      intro="Realizez partea de desenare și modelare pentru instalații electrice: amplasări, circuite, trasee și planșe organizate, pe baza temei și a informațiilor tehnice primite."
      lead="Este un serviciu de desenare tehnică și modelare, nu de proiectare electrică autorizată."
      sections={[
        {
          title: "Amplasări și consumatori",
          body: "Desenez poziția corpurilor de iluminat, a prizelor și a celorlalți consumatori conform soluției transmise, cu simbolurile folosite consecvent în toate planșele.",
          items: [
            "corpuri de iluminat",
            "prize",
            "întrerupătoare",
            "consumatori dedicați",
            "aparataj de comandă",
          ],
        },
        {
          title: "Circuite și trasee",
          body: "Marchez circuitele și traseele astfel încât legătura dintre tablou și consumator să fie clară pe planșă, cu numerotare unitară.",
          items: [
            "numerotarea circuitelor",
            "trasee pe plan",
            "grupare pe zone",
            "marcaje și note",
          ],
        },
        {
          title: "Tablouri, simboluri și legende",
          body: "Pregătesc reprezentarea tablourilor și schemele aferente pe baza datelor primite, împreună cu legenda simbolurilor folosite în planșe.",
          items: [
            "tablouri electrice",
            "scheme monofilare pe baza datelor primite",
            "legendă simboluri",
            "tabele de circuite",
          ],
        },
        {
          title: "Limitele serviciului",
          body: "Lucrarea acoperă desenarea și modelarea documentației. Dimensionările, verificările și avizele care necesită competență autorizată rămân în sarcina specialiștilor cu drept de semnătură.",
        },
      ]}
      images={[
        {
          src: projElectrice,
          alt: "Planșă de instalații electrice cu circuite de iluminat, prize, simboluri și legendă",
          caption: "Electrice · Plan nivel",
          meta: "EL-101",
        },
        {
          src: hero2d,
          alt: "Detaliu de planșă tehnică cu legendă de simboluri și note pentru instalații electrice",
          caption: "Legendă și simboluri",
          meta: "EL-LEG",
        },
      ]}
      deliverables={[
        "planuri de iluminat și prize",
        "marcarea circuitelor și traseelor",
        "legendă de simboluri",
        "tabele și note tehnice",
        "DWG · PDF, iar RVT când lucrarea se face în Revit",
      ]}
      faq={[
        [
          "Semnezi documentația electrică?",
          "Nu. Ofer desenare și modelare tehnică pe baza informațiilor de proiect furnizate. Documentațiile care necesită verificare sau semnătură se validează de profesioniști autorizați.",
        ],
        [
          "Poți desena după o schiță de mână?",
          "Da, dacă schița conține informația necesară. Îți semnalez ce lipsește înainte de a începe.",
        ],
        [
          "Lucrezi în Revit sau în AutoCAD pentru electrice?",
          "În Revit când proiectul este modelat, în AutoCAD când documentația este strict 2D.",
        ],
      ]}
      related={["/revit-mep", "/hvac", "/autocad-dwg"]}
      note="Desenare și modelare tehnică pe baza temei și a informațiilor de proiect furnizate. Nu se oferă proiectare electrică autorizată sau semnătură de specialitate."
    />
  ),
});
