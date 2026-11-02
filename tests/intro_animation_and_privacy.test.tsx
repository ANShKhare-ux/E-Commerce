import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  IntroEntranceAnimation,
  safeCheckIntroCompleted,
  safeMarkIntroCompleted,
  SESSION_STORAGE_KEY,
} from "@/components/IntroEntranceAnimation";
import PrivacyPage from "@/app/privacy/page";

describe("LUMIÈRE Frontend Enhancements: Intro Animation & Privacy Page", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.window = originalWindow;
    vi.clearAllMocks();
  });

  describe("IntroEntranceAnimation Component & Storage Helpers", () => {
    it("should render cleanly without crashing in server-rendered environments", () => {
      // In SSR (no window / sessionStorage), it returns null gracefully
      (globalThis as any).window = undefined;
      const html = renderToString(<IntroEntranceAnimation />);
      expect(html).toBe("");
    });

    it("should handle storage exceptions gracefully without throwing", () => {
      // Mock sessionStorage throwing SecurityError (e.g., Safari private browsing / strict cookies)
      const mockStorage = {
        getItem: vi.fn(() => {
          throw new Error("SecurityError: The operation is insecure.");
        }),
        setItem: vi.fn(() => {
          throw new Error("QuotaExceededError");
        }),
      };

      (globalThis as any).window = {
        sessionStorage: mockStorage,
      };

      // safeCheckIntroCompleted must return false instead of throwing
      expect(() => safeCheckIntroCompleted()).not.toThrow();
      expect(safeCheckIntroCompleted()).toBe(false);

      // safeMarkIntroCompleted must catch and not throw
      expect(() => safeMarkIntroCompleted()).not.toThrow();
    });

    it("should read true from safeCheckIntroCompleted when session storage key is set", () => {
      const storageState = new Map<string, string>();
      const mockStorage = {
        getItem: vi.fn((key: string) => storageState.get(key) || null),
        setItem: vi.fn((key: string, val: string) => storageState.set(key, val)),
      };

      (globalThis as any).window = {
        sessionStorage: mockStorage,
      };

      expect(safeCheckIntroCompleted()).toBe(false);
      safeMarkIntroCompleted();
      expect(safeCheckIntroCompleted()).toBe(true);
      expect(storageState.get(SESSION_STORAGE_KEY)).toBe("true");
    });
  });

  describe("Privacy Page Layout & Structured Sections (/privacy)", () => {
    it("should render all 7 standard statutory privacy sections", () => {
      const html = renderToString(<PrivacyPage />);

      // Verify Main Title and Statutory Notice
      expect(html).toContain("Privacy Policy");
      expect(html).toContain("LUMIÈRE Data Protection Pledge");

      // Verify 1. Data Collection
      expect(html).toContain("1. Data Collection");
      expect(html).toContain("Patron Identity &amp; Contact Information");

      // Verify 2. Usage of Personal Data
      expect(html).toContain("2. Usage of Personal Data");
      expect(html).toContain("Order Fulfillment &amp; Line-Haul Delivery");

      // Verify 3. Cookies & Tracking Technologies
      expect(html).toContain("3. Cookies &amp; Tracking Technologies");
      expect(html).toContain("Strictly Necessary Cookies");

      // Verify 4. Third-Party Disclosure
      expect(html).toContain("4. Third-Party Disclosure");
      expect(html).toContain("Delhivery Express Logistics");
      expect(html).toContain("PhonePe Standard Checkout");

      // Verify 5. Data Security & Retention
      expect(html).toContain("5. Data Security &amp; Retention");
      expect(html).toContain("PostgreSQL Row Level Security (RLS)");

      // Verify 6. User Rights (GDPR / CCPA / DPDP)
      expect(html).toContain("6. Your Statutory Rights (GDPR, CCPA/CPRA, and DPDP Act)");
      expect(html).toContain("Digital Personal Data Protection Act, 2023");
      expect(html).toContain("European Union &amp; UK Residents (GDPR");
      expect(html).toContain("California Residents (CCPA / CPRA)");

      // Verify 7. Contact Information & Grievance Redressal
      expect(html).toContain("7. Contact Information &amp; Grievance Redressal");
      expect(html).toContain("privacy@lumiere.in");
      expect(html).toContain("grievance@lumiere.in");
    });
  });
});
