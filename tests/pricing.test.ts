import { describe, expect, test } from "bun:test";

import {
  estimate,
  estimateLabel,
  estimateWhatsappMessage,
  formatLei,
  jobRates,
  offerSchema,
  packagePrice,
  sheetsLabel,
} from "../src/lib/pricing";

test("tarifele din specificație", () => {
  expect(jobRates.redesenare).toMatchObject({ min: 350, max: 800, unit: "plan" });
  expect(jobRates.corectare).toMatchObject({ min: 250, max: null });
  expect(jobRates.instalatii).toMatchObject({ min: 300, max: null });
  expect(packagePrice).toEqual({ sheets: 5, min: 1500 });
});

describe("estimate", () => {
  test("interval și preț de pornire", () => {
    expect(estimate("redesenare", 1)).toEqual({ sheets: 1, min: 350, max: 800 });
    expect(estimate("redesenare", 3)).toEqual({ sheets: 3, min: 1050, max: 2400 });
    expect(estimate("instalatii", 5)).toEqual({ sheets: 5, min: 1500, max: null });
  });
  test("numărul de planșe e adus în 1–20, întreg", () => {
    for (const [input, want] of [
      [0, 1],
      [-3, 1],
      [21, 20],
      [2.5, 3],
      [2.6, 3],
      [Number.NaN, 1],
    ] as const) {
      expect(estimate("corectare", input).sheets).toBe(want);
    }
  });
});

test("estimateLabel", () => {
  expect(estimateLabel("redesenare", 1)).toBe("350 – 800 lei");
  expect(estimateLabel("redesenare", 20)).toBe("7.000 – 16.000 lei");
  expect(estimateLabel("corectare", 1)).toBe("de la 250 lei");
});

test("sheetsLabel și formatLei", () => {
  expect([1, 3, 20, 99].map(sheetsLabel)).toEqual([
    "1 planșă",
    "3 planșe",
    "20 de planșe",
    "20 de planșe",
  ]);
  expect(formatLei(packagePrice.min)).toBe("1.500");
});

test("mesajul WhatsApp: acord și formulare", () => {
  expect(estimateWhatsappMessage("redesenare", 1)).toContain("1 planșă de redesenat");
  expect(estimateWhatsappMessage("redesenare", 4)).toContain("4 planșe de redesenat");
  expect(estimateWhatsappMessage("redesenare", 20)).toContain("20 de planșe");
  expect(estimateWhatsappMessage("instalatii", 3)).not.toContain("pentru planșe");
  expect(estimateWhatsappMessage("corectare", 2)).toContain("pe site");
});

test("offerSchema", () => {
  expect(offerSchema("redesenare")).toEqual({
    "@type": "Offer",
    name: "Redesenare plan sau PDF în DWG",
    priceCurrency: "RON",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "RON",
      minPrice: 350,
      maxPrice: 800,
      unitText: "plan",
    },
  });
  expect(offerSchema("corectare")).not.toHaveProperty("priceSpecification.maxPrice");
});
