import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { canonicalUrl } from "@/lib/site-config";
import hero2d from "@/assets/hero-2d.jpg";
import projSheet from "@/assets/proj-sheet.jpg";

const title = "Modelare Revit și desenare planșe — modelare BIM 3D";
const description =
  "Modelare Revit și desenare tehnică: model 3D, planuri, secțiuni și planșe organizate. Când merită modelarea BIM, ce trimiți la început și ce primești la final.";
const url = canonicalUrl("/modelare-revit");

export const Route = createFileRoute("/modelare-revit")({
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
      label="Modelare Revit"
      h1="Modelare Revit și desenare planșe"
      intro="Serviciu de modelare 3D și desenare în Revit, pentru situațiile în care ai nevoie de un model coerent și de planșe care se pot preda, nu doar de desene separate."
      lead="Dacă interesul tău este strict partea de instalații, pagina dedicată este modelarea Revit MEP."
      sections={[
        {
          title: "Când merită modelarea în Revit",
          body: "Modelarea are sens când proiectul se modifică des, când sunt necesare mai multe vederi și secțiuni coordonate sau când ai nevoie de un fișier editabil pe care să construiești mai departe. Pentru o singură planșă simplă, desenarea directă în AutoCAD poate fi mai rapidă și îți spun asta deschis.",
        },
        {
          title: "Ce poți trimite ca punct de plecare",
          body: "Nu e nevoie să ai deja un model. Pot porni de la ce există, iar dacă informația din documente e insuficientă, îți semnalez ce mai este necesar înainte de a începe.",
          items: [
            "plan arhitectură DWG",
            "PDF scanat sau exportat",
            "schițe de mână",
            "fișier RVT început",
            "temă tehnică",
          ],
        },
        {
          title: "Ce conține modelarea",
          body: "Construiesc modelul cu niveluri, grile și elemente relevante pentru scopul lucrării, apoi generez documentația din model: planuri de nivel, secțiuni, vederi de detaliu și sheet-uri numerotate.",
          items: [
            "niveluri și grile",
            "modelare 3D",
            "planuri de nivel",
            "secțiuni și detalii",
            "familii și componente",
            "planșe Revit numerotate",
          ],
        },
        {
          title: "Nivelul de detaliu se stabilește la început",
          body: "Nivelul de detaliu influențează direct timpul de lucru și costul. Stabilim de la început cât de detaliat trebuie modelul și ce planșe intră în livrare, ca să nu apară surprize pe parcurs.",
        },
      ]}
      images={[
        {
          src: hero2d,
          alt: "Plan de nivel desenat în Revit, cu trasee, cote și legendă",
          caption: "Plan nivel din model",
          meta: "A-101",
        },
        {
          src: projSheet,
          alt: "Planșe Revit organizate pe sheet-uri, cu indicator și legende",
          caption: "Organizare planșe",
          meta: "SH-02",
        },
      ]}
      deliverables={[
        "model 3D Revit (RVT)",
        "planuri, secțiuni și vederi generate din model",
        "planșe organizate pe sheet-uri",
        "export DWG pentru colaboratori",
        "PDF pregătit pentru print",
      ]}
      faq={[
        [
          "Care e diferența față de pagina Revit MEP?",
          "Aceasta acoperă modelarea și desenarea în Revit în general. Pagina Revit MEP tratează specific instalațiile: HVAC, termice și electrice.",
        ],
        [
          "Poți porni doar de la un PDF?",
          "Da, în funcție de calitatea documentului și de informațiile disponibile în el.",
        ],
        [
          "Câte runde de modificări sunt incluse?",
          "În general 1–2 runde normale de modificări, în funcție de lucrare. Scopul se stabilește înainte de începere.",
        ],
      ]}
      related={["/revit-mep", "/hvac", "/autocad-dwg"]}
    />
  ),
});
