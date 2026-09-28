import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";

const path = "/en/cookies";
const url = canonicalUrl(path);
const title = "Cookie Policy · NOD BIM";
const description =
  "Cookie policy for nodbim.com: strictly necessary storage, and analytics and ad measurement cookies only with explicit consent through Google Consent Mode.";

export const Route = createFileRoute("/en/cookies")({
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
  component: CookiesPage,
});

/** Versiunea EN a /politica-cookies — păstrează conținutul sincronizat. */
function CookiesPage() {
  return (
    <LegalPage
      label="Cookies"
      h1="Cookie policy"
      intro="The site uses storage strictly necessary for it to work and, only with your explicit consent, analytics and ad measurement cookies."
      updatedAt="28.09.2026"
      sections={[
        {
          title: "Strictly necessary storage (no consent needed)",
          body: [
            "The estimate form uses sessionStorage to keep, for the duration of the session, the form context and campaign attribution parameters (lead_attribution_v1). These are essential for the service you request and do not require consent.",
            "Your cookie choice is stored locally in your browser (nod_consent_v1), so the banner is not shown on every visit.",
          ],
        },
        {
          title: "Non-essential cookies — only with consent",
          body: [
            "If you choose “Accept all”, the site may use analytics cookies (Google Analytics 4) to understand how the site is used, and ad measurement cookies (Google Ads) to see whether ads reach their purpose. They are not enabled before you make a choice.",
            "The site implements Google Consent Mode v2: until you choose, all categories (analytics, advertising, personalisation) stay “denied” and no analytics or advertising cookies are set. Your choice is passed to Google services and can be changed at any time.",
          ],
        },
        {
          title: "Consent categories",
          body: [
            "• ad_storage — storage of advertising cookies;",
            "• ad_user_data — sending user data to advertising services;",
            "• ad_personalization — ad personalisation;",
            "• analytics_storage — storage of analytics cookies.",
            "The banner lets you accept all categories or only the strictly necessary ones.",
          ],
        },
        {
          title: "Changing your choice",
          body: [
            "You can change your choice at any time with the “Cookie preferences” link in the site footer (it reopens the banner), or by clearing the site data in your browser settings.",
          ],
        },
      ]}
    />
  );
}
