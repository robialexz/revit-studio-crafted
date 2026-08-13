import { describe, expect, test } from "bun:test";

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Verifică static că bundle-ul de CLIENT (browser) nu conține nici numele,
 * nici valorile variabilelor secrete de server. Se bazează pe output-ul de
 * build din .output/public (rulează `bun run build` înainte de teste).
 */
const CLIENT_DIR = join(import.meta.dir, "..", ".output", "public");

function clientBundleFiles(): string[] {
  if (!existsSync(CLIENT_DIR)) return [];
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js") || entry.name.endsWith(".mjs")) files.push(full);
    }
  };
  walk(CLIENT_DIR);
  return files;
}

const SECRET_NAMES = [
  "SUPABASE_SECRET_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "LEAD_NOTIFICATION_EMAIL",
  "CRON_SECRET",
];

const SECRET_VALUES = [
  process.env["SUPABASE_SECRET_KEY"],
  process.env["SUPABASE_SERVICE_ROLE_KEY"],
  process.env["RESEND_API_KEY"],
  process.env["LEAD_NOTIFICATION_FROM"],
  process.env["CRON_SECRET"],
].filter((v): v is string => !!v);

describe("bundle client — fără secrete", () => {
  const files = clientBundleFiles();

  test("bundle-ul de client există (s-a rulat build-ul)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const name of SECRET_NAMES) {
    test(`numele variabilei ${name} nu apare în bundle-ul de client`, () => {
      for (const file of files) {
        const content = readFileSync(file, "utf8");
        expect(content).not.toContain(name);
      }
    });
  }

  test("valorile secrete reale din .env nu apar în bundle-ul de client", () => {
    if (SECRET_VALUES.length === 0) return;
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const value of SECRET_VALUES) {
        expect(content).not.toContain(value);
      }
    }
  });
});
