import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl } from "@/lib/site-config";

const title = "Politica de cookies — NOD BIM";
const description =
  "Politica de cookies NOD BIM: site-ul folosește doar stocare strict necesară funcționării; nu sunt utilizate cookie-uri de marketing sau de analiză fără consimțământ.";
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
      intro="Transparență totală: la momentul publicării acestei versiuni, site-ul nu folosește cookie-uri de marketing, publicitate sau analiză."
      updatedAt="13.08.2026"
      sections={[
        {
          title: "Ce este un cookie",
          body: [
            "Un cookie este un mic fișier stocat de browser pe dispozitivul tău atunci când vizitezi un site. Cookie-urile pot fi strict necesare (esențiale pentru funcționare) sau neesențiale (marketing, analiză, preferințe).",
          ],
        },
        {
          title: "Ce folosește acest site astăzi",
          body: [
            "Site-ul folosește exclusiv stocare locală strict necesară funcționării formularului de estimare: sessionStorage (reține pe durata sesiunii contextul formularului și parametrii de atribuire UTM pentru ca solicitarea ta să ajungă corect) și, doar dacă te autentifici vreodată, stocarea locală a sesiunii de autentificare. Aceste mecanisme sunt indispensabile pentru funcționarea cerută de tine și nu necesită consimțământ.",
            "Nu sunt setate cookie-uri de analiză (ex. Google Analytics), publicitate sau remarketing. Nu există banner de consimțământ tocmai pentru că nu există cookie-uri neesențiale.",
          ],
        },
        {
          title: "Ce se întâmplă dacă activăm analiza sau publicitatea",
          body: [
            "Dacă în viitor activăm instrumente de analiză (ex. Google Analytics 4) sau publicitate (ex. Google Ads), acestea vor fi activate doar după ce obții consimțământul tău prealabil, printr-un mecanism de consimțământ afișat pe site. Această politică va fi actualizată înainte de orice astfel de activare, cu lista exactă a cookie-urilor și scopurile acestora.",
          ],
        },
        {
          title: "Cum poți controla cookie-urile",
          body: [
            "Poți șterge oricând stocarea locală din setările browserului („Ștergeți datele site-urilor”) sau poți naviga în mod privat. Pentru mai multe informații despre cookie-uri în general, consultă ghidul autorității de protecție a datelor (www.dataprotection.ro).",
          ],
        },
      ]}
    />
  );
}
