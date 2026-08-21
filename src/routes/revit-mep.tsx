import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { canonicalUrl } from "@/lib/site-config";
import hero3d from "@/assets/hero-3d.webp";
import projSectiune from "@/assets/proj-sectiune.webp";
import projSheet from "@/assets/proj-sheet.webp";

const title = "Servicii Revit MEP — modelare BIM instalații și planșe tehnice · NOD BIM";
const description =
  "Modelare Revit MEP pentru instalații: model 3D, vederi, secțiuni, sheet-uri și documentație 2D. Preluare modele existente, corectări, export RVT / DWG / PDF.";
const url = canonicalUrl("/revit-mep");

export const Route = createFileRoute("/revit-mep")({
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
      { rel: "preload", as: "image", href: hero3d },
    ],
  }),
  component: () => (
    <ServicePage
      label="Revit MEP"
      h1="Modelare Revit MEP pentru instalații"
      intro="Lucrez în Revit MEP ca mediu principal: construiesc modelul 3D al instalațiilor și scot din același model planșele 2D, vederile, secțiunile și sheet-urile necesare documentației."
      lead="Discipline acoperite: ventilare și climatizare (HVAC), instalații termice și instalații electrice. Instalațiile sanitare nu fac parte din servicii."
      sections={[
        {
          title: "Ce pot realiza în Revit MEP",
          body: "Modelez trasee și echipamente pe baza planurilor de arhitectură și a informațiilor tehnice primite, apoi organizez documentația astfel încât planșele să poată fi citite și tipărite fără intervenții suplimentare.",
          items: [
            "model 3D instalații",
            "trasee tubulatură și conducte",
            "amplasare echipamente",
            "vederi de nivel",
            "secțiuni",
            "sheet-uri și indicator",
            "cote, adnotări, legende",
            "documentație 2D din model",
          ],
        },
        {
          title: "De la model la planșe",
          body: "Modelul și planșele trăiesc în același fișier: o modificare în model se reflectă în vederile și secțiunile plasate pe sheet-uri. Asta reduce erorile de coordonare între planșe și scurtează rundele de corectură.",
        },
        {
          title: "Preluarea unui model existent",
          body: "Pot continua un proiect început de altcineva. Preiau fișierul RVT sau documentația DWG / PDF existentă, verific structura modelului, implementez observațiile și duc documentația la formă finală.",
          items: [
            "preluare RVT existent",
            "corectări și completări",
            "implementarea observațiilor",
            "reorganizarea planșelor",
            "refacerea sheet-urilor",
          ],
        },
        {
          title: "Formate de lucru și livrare",
          body: "Fișierele de intrare pot fi RVT, DWG, PDF sau schițe. Livrarea se stabilește înainte de începerea lucrării și poate include fișierul editabil.",
          items: ["RVT", "DWG", "PDF", "capturi 3D pentru prezentare"],
        },
      ]}
      images={[
        {
          src: hero3d,
          alt: "Model 3D Revit MEP cu trasee de ventilare, conducte și echipamente de instalații",
          caption: "Model 3D Revit MEP",
          meta: "MEP-3D-01",
        },
        {
          src: projSectiune,
          alt: "Secțiune printr-un model Revit MEP cu tubulaturi, conducte și susțineri",
          caption: "Secțiune din model",
          meta: "SEC-01",
        },
        {
          src: projSheet,
          alt: "Sheet Revit cu vederi, secțiuni, legende și indicator pentru instalații",
          caption: "Sheet organizat",
          meta: "SH-01",
        },
      ]}
      deliverables={[
        "fișier RVT editabil, când face parte din scopul lucrării",
        "planșe 2D exportate DWG",
        "PDF gata de print",
        "sheet-uri organizate cu indicator și legende",
        "vederi și secțiuni suplimentare, la cerere",
      ]}
      faq={[
        [
          "Ce trebuie să îți trimit ca să pot începe?",
          "Planurile de arhitectură (DWG sau PDF), tema tehnică și, dacă există, modelul RVT sau planșele începute. Util este și numărul de planșe și termenul dorit.",
        ],
        [
          "Pot primi fișierul RVT la final?",
          "Da, atunci când livrarea fișierului editabil este stabilită în scopul lucrării.",
        ],
        [
          "Poți lucra pe un model Revit făcut de altcineva?",
          "Da. Preiau modelul, verific cum e structurat și continui modelarea sau documentația de acolo.",
        ],
        [
          "Faci și instalații sanitare?",
          "Nu. Serviciile acoperă HVAC, instalații termice și instalații electrice.",
        ],
      ]}
      related={["/hvac", "/instalatii-termice", "/instalatii-electrice"]}
      note="Modelarea și desenarea se realizează pe baza temei și a informațiilor tehnice furnizate. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați."
    />
  ),
});
