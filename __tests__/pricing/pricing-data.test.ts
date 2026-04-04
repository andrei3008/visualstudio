import { describe, it, expect } from "vitest";
import pricingSiteuri from "@/data/pricing-siteuri.json";
import pricingAutomatizari from "@/data/pricing-automatizari.json";
import pricingSoftwareCustom from "@/data/pricing-software-custom.json";
import pricingGeneral from "@/data/pricing.json";
import type { PricingItem } from "@/types/pricing";

function validatePricingItem(item: PricingItem, idx: number, context: string) {
  // Every card should have a title
  expect(item.title, `${context}[${idx}] title missing`).toBeDefined();
  expect(item.title!.length, `${context}[${idx}] title empty`).toBeGreaterThan(0);

  // Cards with amount should have currency and period
  if (item.amount) {
    expect(item.currency, `${context}[${idx}] has amount but no currency`).toBeDefined();
    expect(item.period, `${context}[${idx}] has amount but no period`).toBeDefined();
  }

  // If features exist, should be non-empty strings
  if (item.features) {
    expect(item.features.length, `${context}[${idx}] features empty`).toBeGreaterThan(0);
    item.features.forEach((f, fi) => {
      expect(f.length, `${context}[${idx}] feature[${fi}] empty`).toBeGreaterThan(0);
    });
  }

  // CTA button should have valid href
  expect(item.btnHref, `${context}[${idx}] btnHref missing`).toMatch(/^\//);
}

describe("Pricing data - site-uri-prezentare-magazine-online", () => {
  it("has exactly 3 pricing cards", () => {
    expect(pricingSiteuri).toHaveLength(3);
  });

  it("has one one-time payment card, one one-time best card, and one monthly subscription", () => {
    const monthly = pricingSiteuri.filter((p) => p.period === "/lună");
    const oneTime = pricingSiteuri.filter((p) => p.period !== "/lună");
    expect(monthly).toHaveLength(1);
    expect(oneTime.length).toBeGreaterThanOrEqual(2);
  });

  it("has exactly one best card", () => {
    const best = pricingSiteuri.filter((p) => p.best === true);
    expect(best).toHaveLength(1);
  });

  it("all items are valid", () => {
    pricingSiteuri.forEach((item, idx) => {
      validatePricingItem(item, idx, "siteuri");
    });
  });

  it("monthly card has no best flag", () => {
    const monthly = pricingSiteuri.find((p) => p.period === "/lună");
    expect(monthly?.best).toBeFalsy();
  });
});

describe("Pricing data - automatizari-firme", () => {
  it("has exactly 3 pricing cards", () => {
    expect(pricingAutomatizari).toHaveLength(3);
  });

  it("has one monthly subscription", () => {
    const monthly = pricingAutomatizari.filter((p) => p.period === "/lună");
    expect(monthly).toHaveLength(1);
  });

  it("has exactly one best card", () => {
    const best = pricingAutomatizari.filter((p) => p.best === true);
    expect(best).toHaveLength(1);
  });

  it("all items are valid", () => {
    pricingAutomatizari.forEach((item, idx) => {
      validatePricingItem(item, idx, "automatizari");
    });
  });
});

describe("Pricing data - software-custom-firme", () => {
  it("has exactly 3 pricing cards", () => {
    expect(pricingSoftwareCustom).toHaveLength(3);
  });

  it("has one monthly subscription", () => {
    const monthly = pricingSoftwareCustom.filter((p) => p.period === "/lună");
    expect(monthly).toHaveLength(1);
  });

  it("has exactly one best card", () => {
    const best = pricingSoftwareCustom.filter((p) => p.best === true);
    expect(best).toHaveLength(1);
  });

  it("all items are valid", () => {
    pricingSoftwareCustom.forEach((item, idx) => {
      validatePricingItem(item, idx, "softwareCustom");
    });
  });
});

describe("Pricing data - general (pricing page)", () => {
  it("has at least 2 cards", () => {
    expect(pricingGeneral.length).toBeGreaterThanOrEqual(2);
  });

  it("all items are valid", () => {
    pricingGeneral.forEach((item, idx) => {
      validatePricingItem(item, idx, "general");
    });
  });
});

describe("Pricing data - consistency across all files", () => {
  const allPricings = [
    { name: "siteuri", data: pricingSiteuri },
    { name: "automatizari", data: pricingAutomatizari },
    { name: "softwareCustom", data: pricingSoftwareCustom },
    { name: "general", data: pricingGeneral },
  ];

  it("all monthly cards have amount > 0 (EUR)", () => {
    allPricings.forEach(({ name, data }) => {
      data.forEach((item, idx) => {
        if (item.period === "/lună" && item.amount) {
          const numericAmount = parseInt(item.amount.replace(/[^0-9]/g, ""), 10);
          expect(numericAmount, `${name}[${idx}] monthly amount too low`).toBeGreaterThan(0);
        }
      });
    });
  });

  it("all one-time cards have amount > 0 (EUR)", () => {
    allPricings.forEach(({ name, data }) => {
      data.forEach((item, idx) => {
        if (item.period !== "/lună" && item.amount) {
          const numericAmount = parseInt(item.amount.replace(/[^0-9]/g, ""), 10);
          expect(numericAmount, `${name}[${idx}] one-time amount too low`).toBeGreaterThan(0);
        }
      });
    });
  });

  it("all cards link to /contact", () => {
    allPricings.forEach(({ name, data }) => {
      data.forEach((item, idx) => {
        expect(item.btnHref, `${name}[${idx}] btnHref`).toBe("/contact");
      });
    });
  });
});
