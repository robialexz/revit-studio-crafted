import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl, hasEmail, site } from "@/lib/site-config";
import { legal, isLegalConfigured } from "@/lib/legal-config";
import { hreflangLinks } from "@/lib/i18n";

const path = "/en/privacy";
const url = canonicalUrl(path);
const title = "Privacy Policy · NOD BIM";
const description =
  "How NOD BIM processes personal data sent through the project estimate form: what is collected, why, who processes it, how long it is kept and your rights under the GDPR.";

export const Route = createFileRoute("/en/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }, ...hreflangLinks(path)],
  }),
  component: PrivacyPage,
});

/** Versiunea EN a /politica-de-confidentialitate — păstrează conținutul sincronizat. */
function PrivacyPage() {
  // Identitatea operatorului: până la înființarea unei forme juridice, persoana
  // fizică din spatele brandului. Datele se completează din VITE_LEGAL_*.
  const operatorName = isLegalConfigured(legal.legalName)
    ? legal.legalName
    : "the individual who operates the NOD BIM brand";
  const contactLine = hasEmail ? `by email at ${site.email}` : "through the contact form";

  return (
    <LegalPage
      label="Privacy"
      h1="Privacy policy"
      intro={`This policy explains how ${operatorName} processes personal data when you use nodbim.com, in particular the project estimate form. NOD BIM is a trading brand, not a registered company.`}
      updatedAt="28.09.2026"
      sections={[
        {
          title: "Data controller",
          body: [
            `The controller is ${operatorName}. For any question about your personal data you can get in touch ${contactLine}.`,
          ],
        },
        {
          title: "What data is collected",
          body: [
            "Through the estimate form: your name and email address (required), your phone number and company or office (optional), and project information — scope, available files, approximate number of drawings, target date and project brief.",
            "Automatically, for the site to work: the page visited, the referring page, campaign (UTM) parameters, and the usual technical data needed for security and operation (IP addresses, HTTP headers), processed by the hosting infrastructure.",
            "Required fields are needed to reply to your request. Optional fields are filled in only if you choose to.",
          ],
        },
        {
          title: "Purposes and legal bases",
          body: [
            "Your data is processed to: (1) reply to your estimate request and communicate scope, timeline and price — legal basis: steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR); (2) keep a record of requests and improve the service — legal basis: legitimate interest (Art. 6(1)(f) GDPR); (3) comply with legal obligations, where applicable (Art. 6(1)(c) GDPR).",
            "Your data is not used for automated individual decision-making or profiling.",
          ],
        },
        {
          title: "Recipients and processors",
          body: [
            "Data is stored and processed with the help of infrastructure providers: Cloudflare (hosting and security), Supabase (database where requests are saved) and Resend (internal notification of a new request). These providers act as processors and process data only to provide their services, under contractual confidentiality obligations.",
            "If you choose to continue the conversation on WhatsApp, the data you share there is processed under WhatsApp / Meta policies — only when you start that conversation.",
            "Personal data is not sold or rented to third parties.",
          ],
        },
        {
          title: "International transfers",
          body: [
            "Some infrastructure providers may process data outside the European Economic Area, based on standard contractual clauses and the transfer mechanisms provided by the GDPR. You can ask for details of the applicable safeguards using the contact details above.",
          ],
        },
        {
          title: "Retention",
          body: [
            "Estimate requests are kept for as long as needed to reply and, afterwards, for as long as justified by the legitimate interest of managing business relationships and possible disputes, but no longer than 3 years from the last interaction, unless the law requires otherwise.",
            "Technical data in infrastructure logs is kept according to the hosting providers' policies, for short, security-specific periods.",
          ],
        },
        {
          title: "Security",
          body: [
            "Reasonable technical and organisational measures protect the data: encrypted transmission (HTTPS), restricted database access and the access policies of the hosting infrastructure. No method of transmission or storage is completely secure.",
          ],
        },
        {
          title: "Your rights",
          body: [
            "Under the GDPR you have the right of access, rectification, erasure, restriction of processing, data portability and the right to object. To exercise them, use the contact details above; you will receive a reply without undue delay and within 30 days at the latest.",
            "If you believe the processing breaches the law, you can lodge a complaint with the Romanian supervisory authority (ANSPDCP, www.dataprotection.ro) or with the supervisory authority in your country of residence.",
          ],
        },
        {
          title: "Cookies and local storage",
          body: [
            "The site uses storage strictly necessary for it to work (sessionStorage to keep the form context). Analytics cookies (Google Analytics 4) and ad measurement cookies (Google Ads) are enabled only with your explicit consent, through the banner on the site (Google Consent Mode). Full details in the cookie policy.",
          ],
        },
        {
          title: "Language and changes",
          body: [
            "This policy is also available in Romanian. It may be updated from time to time; the current version is always available on this page.",
          ],
        },
      ]}
    />
  );
}
