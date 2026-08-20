import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl, hasEmail, site } from "@/lib/site-config";
import { legal, isLegalConfigured } from "@/lib/legal-config";

const title = "Politica de confidențialitate — NOD BIM";
const description =
  "Politica de confidențialitate NOD BIM: ce date personale colectăm prin formularul de estimare, scopurile, temeiurile legale, destinatarii și drepturile tale conform GDPR.";
const url = canonicalUrl("/politica-de-confidentialitate");

export const Route = createFileRoute("/politica-de-confidentialitate")({
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
  component: PrivacyPage,
});

const operatorName = isLegalConfigured(legal.legalName) ? legal.legalName : "NOD BIM";

function PrivacyPage() {
  const contactChannels = [
    ...(hasEmail ? [`email: ${site.email}`] : []),
    ...(isLegalConfigured(legal.legalEmail) && legal.legalEmail !== site.email
      ? [`email oficial: ${legal.legalEmail}`]
      : []),
  ];
  const contactLine = contactChannels.length
    ? contactChannels.join(", ")
    : "prin formularul de contact de pe site";

  return (
    <LegalPage
      label="Confidențialitate"
      h1="Politica de confidențialitate"
      intro={`Această politică explică modul în care ${operatorName} prelucrează datele cu caracter personal atunci când folosești site-ul nodbim.com și, în special, formularul de estimare.`}
      updatedAt="13.08.2026"
      sections={[
        {
          title: "Operatorul de date",
          body: [
            `Operatorul prelucrării este ${operatorName}. Ne poți contacta în legătură cu datele tale personale ${contactLine}.`,
          ],
        },
        {
          title: "Ce date colectăm",
          body: [
            "Prin formularul de estimare colectăm doar datele pe care ni le furnizezi voluntar: numele (obligatoriu), numărul de telefon / WhatsApp (obligatoriu), adresa de email (opțională) și informații despre proiect: tipul proiectului, fișierele disponibile, numărul aproximativ de planșe, termenul dorit și descrierea proiectului.",
            "Colectăm automat, pentru funcționarea tehnică a site-ului: pagina vizitată (page_path), referrer-ul (pagina de proveniență), parametrii UTM (sursa campaniei), precum și date tehnice uzuale necesare securității și funcționării serviciului (adrese IP, anteturi HTTP) — prelucrate de infrastructura de găzduire.",
            "Datele marcate ca obligatorii în formular sunt necesare pentru a-ți putea răspunde solicitării. Câmpurile opționale le completezi doar dacă dorești.",
          ],
        },
        {
          title: "Scopuri și temeiuri legale",
          body: [
            "Prelucrăm datele tale pentru: (1) a răspunde solicitării tale de estimare și a comunica oferta, volumul și termenul lucrării — temei: executarea măsurilor precontractuale la cererea ta (art. 6 alin. (1) lit. b) GDPR); (2) păstrarea evidenței solicitărilor și îmbunătățirea serviciului — temei: interesul legitim (art. 6 alin. (1) lit. f) GDPR); (3) respectarea obligațiilor legale, dacă este cazul (art. 6 alin. (1) lit. c) GDPR).",
            "Nu folosim datele tale pentru decizii individuale automatizate sau pentru crearea de profiluri.",
          ],
        },
        {
          title: "Destinatari și procesatori",
          body: [
            "Datele sunt stocate și prelucrate cu ajutorul unor furnizori de infrastructură: Cloudflare (găzduire și securitate), Supabase (baza de date unde se salvează solicitările) și Resend (trimiterea notificării interne de solicitare nouă). Acești furnizori acționează ca împuterniciți (procesatori) și prelucrează datele doar în scopul furnizării serviciilor, în baza unor obligații contractuale de confidențialitate.",
            "Dacă alegi tu să continui conversația pe WhatsApp, datele pe care le transmiți acolo sunt prelucrate conform politicilor WhatsApp / Meta — doar atunci când inițiezi tu această comunicare.",
            "Nu vindem și nu închiriem datele tale personale către terți.",
          ],
        },
        {
          title: "Transferuri internaționale",
          body: [
            "Unii dintre furnizorii de infrastructură pot prelucra date în afara Spațiului Economic European, pe baza clauzelor contractuale standard și a mecanismelor de transfer prevăzute de GDPR. Poți solicita detalii despre garanțiile aplicabile folosind datele de contact de mai sus.",
          ],
        },
        {
          title: "Perioada de păstrare",
          body: [
            "Solicitările de estimare se păstrează pe durata necesară răspunsului și, ulterior, pe durata în care păstrarea este justificată de interesul legitim de a gestiona relațiile de afaceri și eventualele dispute, dar nu mai mult de 3 ani de la ultima interacțiune, cu excepția cazurilor în care legea impune altfel.",
            "Datele tehnice din logurile infrastructurii sunt păstrate conform politicilor furnizorilor de găzduire, pe perioade scurte, specifice securității.",
          ],
        },
        {
          title: "Securitate",
          body: [
            "Folosim măsuri tehnice și organizatorice rezonabile pentru protejarea datelor: transmisie criptată (HTTPS), acces restricționat la baza de date, politici de acces ale infrastructurii de găzduire. Nicio metodă de transmitere sau stocare nu este însă absolut sigură.",
          ],
        },
        {
          title: "Drepturile tale",
          body: [
            "Conform GDPR, ai dreptul de acces, rectificare, ștergere („dreptul de a fi uitat”), restricționare a prelucrării, portabilitate a datelor și dreptul de a te opune prelucrării. Pentru exercitarea lor, scrie-ne folosind datele de contact de mai sus; răspundem fără întârzieri nejustificate, în maximum 30 de zile.",
            "Dacă consideri că prelucrarea încalcă legislația, ai dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) — www.dataprotection.ro.",
          ],
        },
        {
          title: "Cookie-uri și stocare locală",
          body: [
            "Site-ul folosește stocare strict necesară funcționării (sessionStorage pentru reținerea contextului formularului). Cookie-urile de statistică anonimă (Google Analytics 4) și de măsurare a reclamelor (Google Ads) sunt activate doar cu consimțământul tău explicit, prin bannerul de pe site (Google Consent Mode). Detalii complete în Politica de cookies.",
          ],
        },
        {
          title: "Modificări ale politicii",
          body: [
            "Această politică poate fi actualizată periodic; versiunea curentă este întotdeauna disponibilă pe această pagină.",
          ],
        },
      ]}
    />
  );
}
