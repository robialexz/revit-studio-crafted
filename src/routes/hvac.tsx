import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { canonicalUrl } from "@/lib/site-config";
import projHvac from "@/assets/proj-hvac.jpg";
import projSectiune from "@/assets/proj-sectiune.jpg";

const title = "Instalații HVAC — modelare Revit și planșe de ventilare";
const description =
  "Modelare Revit și planșe pentru instalații HVAC: tubulaturi, echipamente, grile și anemostate, introducere și evacuare aer, planuri, secțiuni și scheme.";
const url = canonicalUrl("/hvac");

export const Route = createFileRoute("/hvac")({
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
      { rel: "preload", as: "image", href: projHvac },
    ],
  }),
  component: () => (
    <ServicePage
      label="Instalații HVAC"
      h1="Modelare Revit și planșe pentru instalații HVAC"
      intro="Modelare și desenare pentru instalații de ventilare și climatizare, realizate în Revit MEP, cu planșe scoase direct din model."
      sections={[
        {
          title: "Ventilare și climatizare",
          body: "Modelez rețelele de aer și componentele aferente pe baza soluției tehnice primite: trasee de introducere și evacuare, racorduri, treceri prin elemente de construcție și spațiile necesare pentru montaj.",
          items: [
            "tubulaturi rectangulare și circulare",
            "introducere aer",
            "evacuare aer",
            "grile",
            "anemostate",
            "clapete și piese speciale",
          ],
        },
        {
          title: "Echipamente",
          body: "Amplasez echipamentele conform temei și indic racordurile către rețea, astfel încât planșele să arate clar unde intervine montajul.",
          items: [
            "centrale de tratare aer",
            "ventilatoare",
            "unități interioare și exterioare",
            "recuperatoare",
            "tubulatură flexibilă de racord",
          ],
        },
        {
          title: "Planșe și documentație",
          body: "Din model rezultă planurile de nivel pe disciplina de ventilare, secțiunile prin zonele aglomerate și schemele necesare pentru înțelegerea rețelei.",
          items: [
            "planuri de nivel ventilare",
            "secțiuni prin trasee",
            "detalii de racord",
            "scheme",
            "legende și simboluri",
            "cote și note tehnice",
          ],
        },
        {
          title: "Coordonare cu celelalte discipline",
          body: "Traseele de aer ocupă cel mai mult spațiu în plafon, așa că le modelez în relație cu instalațiile termice și electrice, pentru a semnala din timp zonele unde apar suprapuneri.",
        },
      ]}
      images={[
        {
          src: projHvac,
          alt: "Plan de nivel instalații HVAC cu trasee de tubulatură, grile și legendă, realizat în Revit",
          caption: "HVAC · Plan nivel",
          meta: "Revit MEP",
        },
        {
          src: projSectiune,
          alt: "Secțiune 3D prin tubulaturile de ventilare dintr-un model Revit MEP",
          caption: "Secțiune ventilare",
          meta: "SEC-HVAC",
        },
      ]}
      deliverables={[
        "planuri de ventilare pe niveluri",
        "secțiuni prin traseele principale",
        "scheme și legende",
        "model 3D al rețelei de aer",
        "RVT / DWG / PDF, conform scopului lucrării",
      ]}
      faq={[
        [
          "Faci și dimensionarea instalației?",
          "Modelarea și desenarea se realizează pe baza soluției și a datelor tehnice furnizate. Calculele care necesită verificare sau semnătură de specialitate rămân în sarcina profesioniștilor autorizați.",
        ],
        [
          "Poți modela peste un plan de arhitectură existent?",
          "Da, acesta este cazul obișnuit. Trimite planul în DWG sau PDF și tema de ventilare.",
        ],
        [
          "Pot primi și secțiuni suplimentare?",
          "Da. Secțiunile se pot genera din model în zonele care necesită clarificare.",
        ],
      ]}
      related={["/revit-mep", "/instalatii-termice", "/instalatii-electrice"]}
      note="Serviciul constă în modelare BIM și desenare tehnică pe baza informațiilor de proiect furnizate."
    />
  ),
});
