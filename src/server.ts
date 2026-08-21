import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { canonicalHostname } from "./lib/site-config";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com",
].join("; ");

function withSecurityHeaders(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  headers.set("X-Frame-Options", "DENY");

  if (import.meta.env.PROD) {
    headers.set("Content-Security-Policy", contentSecurityPolicy);
    if (new URL(request.url).protocol === "https:") {
      headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Returnează URL-ul țintă de redirect www→apex (cu path și query păstrate),
 * sau undefined când host-ul nu este varianta www a domeniului canonical.
 * Pură, pentru testare; robustă și în spatele proxy-urilor (folosește
 * antetul Host, nu doar request.url).
 */
export function redirectToApexUrl(
  requestUrl: string,
  hostHeader: string | null,
  canonicalHost: string,
): string | undefined {
  const url = new URL(requestUrl);
  const host = ((hostHeader ?? url.host).split(":")[0] ?? "").toLowerCase();
  if (host !== `www.${canonicalHost}`) return undefined;
  url.hostname = canonicalHost;
  return url.toString();
}

function redirectWwwHost(request: Request): Response | undefined {
  const target = redirectToApexUrl(request.url, request.headers.get("host"), canonicalHostname);
  if (!target) return undefined;
  return new Response(null, {
    status: 301,
    headers: {
      Location: target,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

/**
 * Returnează URL-ul țintă de redirect http→https (cu path și query păstrate),
 * sau undefined când cererea e deja https sau host-ul nu este cel canonical.
 * Pură, pentru testare; robustă și în spatele proxy-urilor (folosește
 * antetul Host, nu doar request.url). Dev-ul local (localhost) nu e atins.
 */
export function redirectToHttpsUrl(
  requestUrl: string,
  hostHeader: string | null,
  canonicalHost: string,
): string | undefined {
  const url = new URL(requestUrl);
  if (url.protocol !== "http:") return undefined;
  const host = ((hostHeader ?? url.host).split(":")[0] ?? "").toLowerCase();
  if (host !== canonicalHost) return undefined;
  url.protocol = "https:";
  return url.toString();
}

function redirectHttpHost(request: Request): Response | undefined {
  const target = redirectToHttpsUrl(request.url, request.headers.get("host"), canonicalHostname);
  if (!target) return undefined;
  return new Response(null, {
    status: 301,
    headers: {
      Location: target,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = redirectWwwHost(request) ?? redirectHttpHost(request);
      if (redirect) return withSecurityHeaders(redirect, request);

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return withSecurityHeaders(normalized, request);
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
        request,
      );
    }
  },

  /**
   * Keep-alive zilnic pentru Supabase (free tier): proiectele fără trafic
   * sunt puse pe pauză automat după o săptămână; un ping de activitate
   * previne pauzarea. Cron: zilnic la 07:00 UTC (10:00 RO), via wrangler.jsonc.
   */
  async scheduled(_event: unknown, _env: unknown, _ctx: unknown) {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!url || !key) {
      console.warn("[keepalive] Supabase env lipsă — ping sărit.");
      return;
    }
    try {
      const res = await fetch(`${url}/rest/v1/leads?select=id&limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
      console.log("[keepalive] Supabase ping:", res.status);
    } catch (error) {
      console.error("[keepalive] Supabase ping eșuat:", error);
    }
  },
};
