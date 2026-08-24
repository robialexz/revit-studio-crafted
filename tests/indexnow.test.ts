import { describe, expect, test } from "bun:test";

import {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  indexnowKeyFileContent,
  indexnowKeyUrl,
} from "../src/lib/indexnow";

describe("indexnow", () => {
  test("cheia este o valoare hex de 32 de caractere", () => {
    expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{32}$/);
  });

  test("fișierul de verificare conține exact cheia, fără newline", () => {
    expect(indexnowKeyFileContent()).toBe(INDEXNOW_KEY);
    expect(indexnowKeyFileContent().includes("\n")).toBe(false);
  });

  test("URL-ul cheii respectă protocolul /{key}.txt pe host-ul corect", () => {
    expect(indexnowKeyUrl()).toBe(`https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`);
  });
});
