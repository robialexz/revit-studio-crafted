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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagină inexistentă</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pagina căutată nu există sau a fost mutată.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
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
          A apărut o problemă din partea noastră. Poți reîncerca sau te poți întoarce la pagina
          principală.
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f4f4f1" },
      { title: `${site.businessName} — Modelare Revit MEP & BIM` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:site_name", content: site.businessName },
      { name: "twitter:card", content: "summary_large_image" },
      ...(hasSiteUrl
        ? [
            { property: "og:image", content: canonicalUrl("/og-image.jpg") },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "912" },
            { name: "twitter:image", content: canonicalUrl("/og-image.jpg") },
          ]
        : []),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,400..700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.businessName,
          inLanguage: "ro-RO",
          ...(site.siteUrl ? { url: site.siteUrl } : {}),
        }),
      },
      // Tracking (GA4 + Google Ads) — doar când este configurat. Consent Mode v2:
      // starea implicită de consimțământ este trimisă ÎNAINTE de gtag.js, astfel
      // încât fără consimțământ nu se setează cookie-uri analytics/ads.
      ...(hasTracking
        ? [
            {
              children: consentModeBootstrapScript(),
            },
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId || site.adsConversionId}`,
              async: true,
            },
            ...(site.gaMeasurementId
              ? [
                  {
                    children: `gtag('js',new Date());gtag('config','${site.gaMeasurementId}');`,
                  },
                ]
              : []),
          ]
        : []),
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
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
