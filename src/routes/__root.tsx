import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { captureAttribution } from "../lib/attribution";
import { site, canonicalUrl, hasSiteUrl, hasTracking } from "../lib/site-config";
import { consentModeBootstrapScript } from "../lib/consent";
import { ConsentBanner } from "../components/site/ConsentBanner";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { MobileCta } from "../components/site/MobileCta";
import { PhoneLink } from "../components/site/PhoneLink";
import { useLocale } from "../lib/i18n";

const tagScriptUrls = [
  site.gaMeasurementId || site.adsConversionId
    ? `https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId || site.adsConversionId}`
    : "",
  site.gtmContainerId ? `https://www.googletagmanager.com/gtm.js?id=${site.gtmContainerId}` : "",
].filter(Boolean);

// Bibliotecile Google (~700 KB) se cer abia după `load` și după primul cadru
// desenat, ca să nu concureze cu textul paginii pe conexiuni lente. Starea de
// consimțământ și comenzile gtag() rămân în coadă în dataLayer până atunci.
const deferredTagLoaderScript = `(function(){function l(){${
  site.gtmContainerId ? "dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});" : ""
}${JSON.stringify(tagScriptUrls)}.forEach(function(u){var s=document.createElement('script');s.async=true;s.src=u;document.head.appendChild(s)})}function d(){requestAnimationFrame(function(){setTimeout(l)})}if(document.readyState==='complete')d();else addEventListener('load',d)})();`;

const gtagConfigScript = [
  'gtag("js",new Date());',
  site.gaMeasurementId ? `gtag("config",${JSON.stringify(site.gaMeasurementId)});` : "",
  site.adsConversionId ? `gtag("config",${JSON.stringify(site.adsConversionId)});` : "",
].join("");

// HeadContent gestionează bine JSON-LD, dar scripturile inline de tracking
// dispar din DOM după hidratare. Le ținem în shell, unde rulează și rămân
// disponibile pentru GTM pe toată durata paginii.
const trackingInlineScript = [
  consentModeBootstrapScript(),
  gtagConfigScript,
  deferredTagLoaderScript,
].join("");

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="continut" className="mx-auto max-w-xl px-5 py-20 text-center md:py-28">
        <p className="tech-label text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl md:text-5xl">Pagină inexistentă</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Pagina căutată nu există sau a fost mutată.
        </p>
        <ul className="mt-8 space-y-3 text-base">
          <li>
            <Link to="/" className="underline underline-offset-4 hover:text-primary">
              Pagina principală
            </Link>
          </li>
          <li>
            <Link to="/autocad-dwg" className="underline underline-offset-4 hover:text-primary">
              Desenare AutoCAD
            </Link>
          </li>
          <li>
            <Link to="/pdf-in-dwg" className="underline underline-offset-4 hover:text-primary">
              PDF în DWG
            </Link>
          </li>
          <li>
            <Link to="/portofoliu" className="underline underline-offset-4 hover:text-primary">
              Exemple
            </Link>
          </li>
          <li>
            <Link to="/contact" className="underline underline-offset-4 hover:text-primary">
              Contact
            </Link>
          </li>
        </ul>
        <PhoneLink source="404" className="btn btn-primary mt-8" />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Pagina nu a putut fi încărcată
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A apărut o problemă pe site. Poți reîncerca sau te poți întoarce la pagina principală.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reîncearcă
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Pagina principală
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#f4f4f1" },
      { title: `${site.businessName} · Desenare tehnică în AutoCAD și Revit` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: site.businessName },
      { name: "twitter:card", content: "summary_large_image" },
      ...(hasSiteUrl
        ? [
            { property: "og:image", content: canonicalUrl("/og-image.jpg") },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { name: "twitter:image", content: canonicalUrl("/og-image.jpg") },
          ]
        : []),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ...[
        "ibm-plex-sans-400-latin",
        "ibm-plex-sans-400-latin-ext",
        "archivo-var-latin",
        "archivo-var-latin-ext",
      ].map((font) => ({
        rel: "preload",
        href: `/fonts/${font}.woff2`,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      })),
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <html lang={locale}>
      <head>
        <HeadContent />
        {hasTracking ? (
          <script
            dangerouslySetInnerHTML={{ __html: trackingInlineScript }}
            suppressHydrationWarning
          />
        ) : null}
      </head>
      <body>
        {site.gtmContainerId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${site.gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <ConsentBanner />
    </QueryClientProvider>
  );
}
