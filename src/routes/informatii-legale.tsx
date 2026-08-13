import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl, hasEmail, site } from "@/lib/site-config";
import { configuredLegalFields, isLegalConfigured, legal } from "@/lib/legal-config";

const title = "Informații legale — NOD BIM";
const description =
  "Informații legale NOD BIM: identificarea operatorului site-ului nodbim.com, date de contact și informații despre serviciile de modelare Revit MEP și desenare tehnică.";
const url = canonicalUrl("/informatii-legale");

export const Route = createFileRoute("/informatii-legale")({
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
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: LegalInfoPage,
});

function LegalInfoPage() {
  const fields = configuredLegalFields();

  return (
    <LegalPage
      label="Legal"
      h1="Informații legale"
      intro="Identificarea operatorului site-ului și informații generale despre servicii. Câmpurile de identificare care nu sunt completate nu se afișează; le puteți solicita prin datele de contact."
      updatedAt="13.08.2026"
      sections={[
        {
          title: "Operatorul site-ului",
          body: [
            isLegalConfigured(legal.legalName)
              ? `Site-ul este operat de ${legal.legalName}${
                  isLegalConfigured(legal.legalForm) ? `, ${legal.legalForm}` : ""
                }.`
              : "Site-ul este operat de NOD BIM — marca serviciilor de modelare Revit MEP / BIM prezentate pe acest site. Datele complete de identificare vor fi publicate aici de îndată ce sunt disponibile; le puteți solicita prin formularul de contact.",
            ...(fields.length
              ? [fields.map((field) => `${field.label}: ${field.value}`).join(" · ")]
              : []),
          ],
        },
        {
          title: "Contact",
          body: [
            hasEmail
              ? `Pentru orice întrebare legată de site sau de servicii: ${site.email}.`
              : "Pentru orice întrebare legată de site sau de servicii, folosiți formularul de contact.",
          ],
        },
        {
          title: "Despre servicii",
          body: [
            "Serviciile prezentate constau în desenare tehnică, modelare BIM și pregătirea documentației pentru instalații (Revit MEP, HVAC, termice, electrice), precum și servicii complementare AutoCAD / DWG. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați.",
          ],
        },
        {
          title: "Proprietate intelectuală a site-ului",
          body: [
            "Conținutul site-ului (texte, structură, identitate vizuală) aparține operatorului și nu poate fi copiat sau reutilizat fără acord. Imaginile din portofoliu marcate ca demonstrative au caracter ilustrativ.",
          ],
        },
        {
          title: "Documente utile",
          body: [
            "Politica de confidențialitate, Politica de cookies și Termenii și condițiile completează aceste informații și sunt accesibile din subsolul fiecărei pagini.",
          ],
        },
      ]}
    />
  );
}
