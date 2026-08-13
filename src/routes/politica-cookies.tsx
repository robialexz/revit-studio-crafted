import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl } from "@/lib/site-config";

const title = "Politica de cookies — NOD BIM";
const description =
  "Politica de cookies NOD BIM: stocare strict necesară + consimțământ explicit pentru statistici anonime și măsurarea reclamelor, prin banner de consimțământ și Google Consent Mode.";
const url = canonicalUrl("/politica-cookies");

export const Route = createFileRoute("/politica-cookies")({
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
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      label="Cookies"
      h1="Politica de cookies"
      intro="Site-ul folosește stocare strict necesară pentru funcționare și, doar cu consimțământul tău explicit, cookie-uri de statistică anonimă și de măsurare a reclamelor."
      updatedAt="13.08.2026"
      sections={[
        {
          title: "Stocare strict necesară (fără consimțământ)",
          body: [
            "Funcționarea formularului de estimare folosește sessionStorage pentru reținerea, pe durata sesiunii, a contextului formularului și a parametrilor de atribuire UTM (lead_attribution_v1). Dacă te-ai autentifica vreodată, browserul ar stoca local sesiunea de autentificare. Aceste mecanisme sunt indispensabile pentru serviciul solicitat și nu necesită consimțământ.",
            "Alegerea ta privind cookie-urile se păstrează local în browser (nod_consent_v1), pentru a nu-ți afișa bannerul la fiecare vizită.",
          ],
        },
        {
          title: "Cookie-uri neesențiale — doar cu consimțământ",
          body: [
            "Dacă activezi „Accept toate”, putem folosi: cookie-uri de statistică anonimă (Google Analytics 4) pentru a înțelege cum este folosit site-ul și cookie-uri de măsurare a reclamelor (Google Ads) pentru a ști dacă reclamele noastre își ating scopul. Acestea nu sunt activate fără alegerea ta prealabilă.",
            "Site-ul implementează Google Consent Mode v2: până când alegi, toate categoriile (analytics, publicitate, personalizare) rămân „denied” — nu se setează cookie-uri de analiză sau publicitate. Alegerea ta este transmisă serviciilor Google și poate fi schimbată oricând.",
          ],
        },
        {
          title: "Categoriile de consimțământ",
          body: [
            "• ad_storage — stocarea cookie-urilor de publicitate;",
            "• ad_user_data — transmiterea datelor despre utilizator către serviciile de publicitate;",
            "• ad_personalization — personalizarea reclamelor;",
            "• analytics_storage — stocarea cookie-urilor de statistică.",
            "Bannerul afișat pe site îți permite să accepți toate categoriile sau doar pe cele strict necesare.",
          ],
        },
        {
          title: "Cum îți schimbi alegerea",
          body: [
            "Poți reafirma sau schimba alegerea oricând din linkul „Preferințe cookies” din subsolul site-ului (redeschide bannerul) sau ștergând datele site-ului din setările browserului. Pentru detalii generale despre cookie-uri, consultă ghidul ANSPDCP (www.dataprotection.ro).",
          ],
        },
      ]}
    />
  );
}
