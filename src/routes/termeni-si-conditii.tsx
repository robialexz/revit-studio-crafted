import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl, hasEmail, site } from "@/lib/site-config";
import { legal, isLegalConfigured } from "@/lib/legal-config";

const title = "Termeni și condiții — NOD BIM";
const description =
  "Termenii și condițiile NOD BIM: procesul de estimare, stabilirea scopului lucrării, livrabile, confidențialitate și responsabilități pentru serviciile de modelare Revit MEP și desenare tehnică.";
const url = canonicalUrl("/termeni-si-conditii");

export const Route = createFileRoute("/termeni-si-conditii")({
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
  component: TermsPage,
});

const operatorName = isLegalConfigured(legal.legalName) ? legal.legalName : "NOD BIM";

function TermsPage() {
  return (
    <LegalPage
      label="Termeni"
      h1="Termeni și condiții"
      intro={`Acești termeni descriu folosirea site-ului nodbim.com și cadrul general al serviciilor oferite de ${operatorName} (modelare Revit MEP / BIM și desenare tehnică).`}
      updatedAt="13.08.2026"
      sections={[
        {
          title: "Scopul site-ului",
          body: [
            "Site-ul prezintă serviciile de modelare Revit MEP / BIM, desenare tehnică și documentație pentru instalații și permite trimiterea unei cereri de estimare. Conținutul are caracter informativ.",
          ],
        },
        {
          title: "Natura serviciilor",
          body: [
            "Serviciile constau în desenare tehnică, modelare BIM și pregătirea documentației, pe baza temei și a informațiilor furnizate de client. Serviciile acoperă în principal Revit MEP, instalații HVAC, termice și electrice; AutoCAD / DWG este disponibil complementar.",
          ],
        },
        {
          title: "Cererea de estimare și oferta",
          body: [
            "Trimiterea formularului de estimare este o simplă solicitare de informații și NU reprezintă încheierea unui contract. Estimarea se formulează după analiza documentației trimise.",
            "Scopul lucrării, livrabilele, termenul și prețul se confirmă separat, în scris (email / WhatsApp), înainte de începerea lucrării. O lucrare începe doar după confirmarea explicită a scopului și a prețului.",
          ],
        },
        {
          title: "Prețuri și termene",
          body: [
            "Prețurile prezentate pe site sunt orientative. Prețul final depinde de complexitate, nivelul de detaliu, numărul de planșe și termenul solicitat. Termenul de livrare se stabilește la confirmarea scopului lucrării și poate depinde de primirea la timp a documentației complete din partea clientului.",
          ],
        },
        {
          title: "Informații furnizate de client",
          body: [
            "Clientul este responsabil pentru corectitudinea și dreptul de utilizare a materialelor trimise (planuri, teme, fișiere). Estimarea și lucrarea se bazează pe documentația primită; modificările survenite după confirmarea scopului pot atrage revizuirea prețului și a termenului.",
          ],
        },
        {
          title: "Revizii și livrabile",
          body: [
            "Livrabilele și formatele (RVT / DWG / PDF) se stabilesc explicit în scopul lucrării. Un număr rezonabil de runde de modificări poate fi inclus, conform scopului confirmat; modificările suplimentare sau schimbările de temă se estimează separat.",
          ],
        },
        {
          title: "Confidențialitate",
          body: [
            "Fișierele și informațiile proiectului rămân confidențiale și nu sunt publicate în portofoliu fără acordul clientului. Datele personale sunt prelucrate conform Politicii de confidențialitate.",
          ],
        },
        {
          title: "Proprietate intelectuală",
          body: [
            "Clientul păstrează drepturile asupra documentației sale. Drepturile asupra livrabilelor realizate se transferă clientului la finalizarea și plata lucrării, conform scopului confirmat; metodele, bibliotecile și șabloanele tehnice proprii rămân proprietatea furnizorului, dacă nu se convine altfel.",
          ],
        },
        {
          title: "Întreruperea unei lucrări",
          body: [
            "Dacă o lucrare se întrerupe din motive independente de voința părților, se decontează partea efectuată până la momentul întreruperii, pe baza volumului realizat. Detaliile se stabilesc la confirmarea scopului.",
          ],
        },
        {
          title: "Limitarea responsabilității și declinare tehnică",
          body: [
            "Serviciile sunt servicii de desenare și modelare tehnică. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați — această validare nu face parte din servicii. Furnizorul nu răspunde pentru deciziile de proiectare luate de client sau de specialiștii săi, și nici pentru utilizarea livrabilelor în alte scopuri decât cele confirmate.",
            "Site-ul este oferit „ca atare”; nu garantăm disponibilitatea neîntreruptă a acestuia.",
          ],
        },
        {
          title: "Legea aplicabilă și soluționarea disputelor",
          body: [
            "Acești termeni sunt guvernați de legislația română. Părțile vor încerca soluționarea pe cale amiabilă a oricărei neînțelegeri; în lipsa unui acord, competența revine instanțelor române.",
          ],
        },
        {
          title: "Contact",
          body: [
            `Pentru întrebări legate de acești termeni: ${hasEmail ? site.email : "formularul de contact de pe site"}.`,
          ],
        },
      ]}
    />
  );
}
