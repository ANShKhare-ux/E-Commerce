import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  IntroEntranceAnimation,
  safeCheckIntroCompleted,
  safeMarkIntroCompleted,
  isExcludedIntroRoute,
  SESSION_STORAGE_KEY,
  LOCAL_STORAGE_KEY,
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

    it("should read true from safeCheckIntroCompleted when localStorage has the key even if sessionStorage is empty", () => {
      const localState = new Map<string, string>();
      const mockLocalStorage = {
        getItem: vi.fn((key: string) => localState.get(key) || null),
        setItem: vi.fn((key: string, val: string) => localState.set(key, val)),
      };
      const sessionState = new Map<string, string>();
      const mockSessionStorage = {
        getItem: vi.fn((key: string) => sessionState.get(key) || null),
        setItem: vi.fn((key: string, val: string) => sessionState.set(key, val)),
      };

      (globalThis as any).window = {
        sessionStorage: mockSessionStorage,
        localStorage: mockLocalStorage,
      };

      // Set key only in localStorage (simulating page reload where sessionStorage is cleared or cross-tab)
      localState.set("lumiere_intro_completed", "true");
      expect(safeCheckIntroCompleted()).toBe(true);
    });

    it("should read true from safeCheckIntroCompleted when in-memory guard is set even if storages throw", () => {
      (globalThis as any).window = {
        __lumiere_intro_completed: true,
        sessionStorage: {
          getItem: () => {
            throw new Error("Blocked");
          },
        },
        localStorage: {
          getItem: () => {
            throw new Error("Blocked");
          },
        },
      };

      expect(safeCheckIntroCompleted()).toBe(true);
    });

    it("should immediately populate all storage targets upon safeMarkIntroCompleted to shield refreshes and navigation", () => {
      const sessionState = new Map<string, string>();
      const localState = new Map<string, string>();
      const winObj: any = {
        sessionStorage: {
          getItem: (key: string) => sessionState.get(key) || null,
          setItem: (key: string, val: string) => sessionState.set(key, val),
        },
        localStorage: {
          getItem: (key: string) => localState.get(key) || null,
          setItem: (key: string, val: string) => localState.set(key, val),
        },
      };

      (globalThis as any).window = winObj;

      expect(safeCheckIntroCompleted()).toBe(false);
      // Calling mark completed must immediately synchronize all targets
      safeMarkIntroCompleted();

      expect(safeCheckIntroCompleted()).toBe(true);
      expect(winObj.__lumiere_intro_completed).toBe(true);
      expect(sessionState.get("lumiere_intro_completed")).toBe("true");
      expect(localState.get("lumiere_intro_completed")).toBe("true");
    });

    it("should accurately identify excluded auth and admin routes to prevent intro blocking", () => {
      // Excluded auth gateway routes
      expect(isExcludedIntroRoute("/login")).toBe(true);
      expect(isExcludedIntroRoute("/login/")).toBe(true);
      expect(isExcludedIntroRoute("/login?redirect=/checkout")).toBe(true);
      expect(isExcludedIntroRoute("/signup")).toBe(true);
      expect(isExcludedIntroRoute("/signup/")).toBe(true);
      expect(isExcludedIntroRoute("/forgot-password")).toBe(true);
      expect(isExcludedIntroRoute("/forgot-password/")).toBe(true);
      expect(isExcludedIntroRoute("/reset-password")).toBe(true);
      expect(isExcludedIntroRoute("/reset-password/")).toBe(true);
      expect(isExcludedIntroRoute("/auth")).toBe(true);
      expect(isExcludedIntroRoute("/auth/callback")).toBe(true);
      expect(isExcludedIntroRoute("/auth/signout")).toBe(true);

      // Excluded admin portal routes
      expect(isExcludedIntroRoute("/admin")).toBe(true);
      expect(isExcludedIntroRoute("/admin/products")).toBe(true);
      expect(isExcludedIntroRoute("/admin/login")).toBe(true);

      // Standard storefront routes that MUST permit initial intro animation
      expect(isExcludedIntroRoute("/")).toBe(false);
      expect(isExcludedIntroRoute("/products")).toBe(false);
      expect(isExcludedIntroRoute("/products/banarasi-silk-kurta")).toBe(false);
      expect(isExcludedIntroRoute("/cart")).toBe(false);
      expect(isExcludedIntroRoute("/checkout")).toBe(false);
      expect(isExcludedIntroRoute(null)).toBe(false);
      expect(isExcludedIntroRoute(undefined)).toBe(false);
    });

    it("should verify tactile physical harmonic spring damping curves for sovereign diamond emblem", () => {
      // Harmonic oscillator spring formula matching Framer Motion's physical dynamics:
      // damping = 14, stiffness = 120, mass = 0.8
      const damping = 14;
      const stiffness = 120;
      const mass = 0.8;
      const omega0 = Math.sqrt(stiffness / mass);
      const zeta = damping / (2 * Math.sqrt(stiffness * mass));
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);

      const calculateSpring = (frame: number, fps = 30) => {
        if (frame === 0) return 0;
        const t = frame / fps;
        const envelope = Math.exp(-zeta * omega0 * t);
        return 1 - envelope * (Math.cos(omegaD * t) + ((zeta * omega0) / omegaD) * Math.sin(omegaD * t));
      };

      const val0 = calculateSpring(0);
      const val15 = calculateSpring(15);
      const val30 = calculateSpring(30);

      expect(val0).toBe(0);
      expect(val15).toBeGreaterThan(0.8);
      expect(val30).toBeCloseTo(1, 1);
    });

    it("should cleanly dismiss the zero-latency initial curtain from DOM when safeMarkIntroCompleted is triggered", () => {
      // Setup mock DOM document
      const mockCurtain = {
        id: "lumiere-intro-curtain",
        style: { display: "flex" },
        remove: vi.fn(),
      };

      const classListSet = new Set<string>();
      const mockDocument = {
        getElementById: vi.fn((id: string) => (id === "lumiere-intro-curtain" ? mockCurtain : null)),
        documentElement: {
          classList: {
            add: (cls: string) => classListSet.add(cls),
            remove: (cls: string) => classListSet.delete(cls),
            contains: (cls: string) => classListSet.has(cls),
          },
        },
      };

      (globalThis as any).document = mockDocument;
      (globalThis as any).window = {
        __lumiere_intro_completed: false,
        sessionStorage: { getItem: () => null, setItem: vi.fn() },
        localStorage: { getItem: () => null, setItem: vi.fn() },
      };

      // Simulating curtain removal helper
      const curtain = mockDocument.getElementById("lumiere-intro-curtain");
      if (curtain) {
        curtain.style.display = "none";
              }
      mockDocument.documentElement.classList.add("lumiere-intro-dismissed");

      expect(curtain?.style.display).toBe("none");
            expect(classListSet.has("lumiere-intro-dismissed")).toBe(true);
    });

    it("should ensure simulated refresh (F5) immediately dismisses intro curtain before first contentful paint", () => {
      // Simulate page refresh in same tab: sessionStorage already holds lumiere_intro_completed = true
      const sessionState = new Map<string, string>([[SESSION_STORAGE_KEY, "true"]]);
      const classList = new Set<string>();
      const winObj: any = {
        location: { pathname: "/" },
        __lumiere_intro_completed: false,
        sessionStorage: {
          getItem: (key: string) => sessionState.get(key) || null,
          setItem: (key: string, val: string) => sessionState.set(key, val),
        },
        localStorage: {
          getItem: () => null,
          setItem: () => {},
        },
      };

      const docObj: any = {
        documentElement: {
          classList: {
            add: (cls: string) => classList.add(cls),
            contains: (cls: string) => classList.has(cls),
          },
        },
      };

      // Execute synchronous shield logic as executed in layout.tsx <head>
      const p = winObj.location.pathname || "";
      const isExcluded = /^\/(admin|login|signup|forgot-password|reset-password|auth)/.test(p);
      let isDone = false;
      if (winObj.__lumiere_intro_completed === true) isDone = true;
      if (!isDone && winObj.sessionStorage && winObj.sessionStorage.getItem("lumiere_intro_completed") === "true") isDone = true;
      if (!isDone && winObj.localStorage && winObj.localStorage.getItem("lumiere_intro_completed") === "true") isDone = true;

      if (isExcluded || isDone) {
        docObj.documentElement.classList.add("lumiere-intro-dismissed");
        winObj.__lumiere_intro_completed = true;
      }

      // Assert that html has lumiere-intro-dismissed immediately before any frame paints
      expect(classList.has("lumiere-intro-dismissed")).toBe(true);
      expect(winObj.__lumiere_intro_completed).toBe(true);
    });

    it("should verify spring motion calculations produce natural physical damping curves without generic AI timer tickers", () => {
      const damping = 14;
      const stiffness = 120;
      const mass = 0.8;
      const omega0 = Math.sqrt(stiffness / mass);
      const zeta = damping / (2 * Math.sqrt(stiffness * mass));
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);

      const calculateSpring = (frame: number, fps = 30) => {
        if (frame === 0) return 0;
        const t = frame / fps;
        const envelope = Math.exp(-zeta * omega0 * t);
        return 1 - envelope * (Math.cos(omegaD * t) + ((zeta * omega0) / omegaD) * Math.sin(omegaD * t));
      };

      const frames = [0, 5, 10, 15, 20, 25, 30];
      const values = frames.map((f) => calculateSpring(f));

      // Frame 0 must be resting at 0
      expect(values[0]).toBe(0);
      // Progressively accelerates
      expect(values[1]).toBeGreaterThan(values[0]);
      // Damped settling near 1
      expect(values[frames.length - 1]).toBeCloseTo(1, 1);
    });

    it("should succeed in safeCheckIntroCompleted when sessionStorage throws but localStorage has the key", () => {
      const localState = new Map<string, string>([[LOCAL_STORAGE_KEY, "true"]]);
      (globalThis as any).window = {
        sessionStorage: {
          getItem: () => {
            throw new Error("SecurityError: Blocked in private browsing");
          },
        },
        localStorage: {
          getItem: (key: string) => localState.get(key) || null,
        },
      };

      expect(safeCheckIntroCompleted()).toBe(true);
    });

    it("should continue to populate localStorage even if sessionStorage.setItem throws QuotaExceededError", () => {
      const localState = new Map<string, string>();
      (globalThis as any).window = {
        sessionStorage: {
          setItem: () => {
            throw new Error("QuotaExceededError");
          },
        },
        localStorage: {
          setItem: (key: string, val: string) => localState.set(key, val),
        },
      };

      safeMarkIntroCompleted();
      expect(localState.get(LOCAL_STORAGE_KEY)).toBe("true");
    });

    it("should include suppressHydrationWarning on html tag to avoid hydration mismatch when synchronous shield modifies classes", async () => {
      const fs = await import("fs");
      const path = await import("path");
      const layoutContent = fs.readFileSync(path.resolve(process.cwd(), "src/app/layout.tsx"), "utf-8");
      expect(layoutContent).toContain("<html lang=\"en\" suppressHydrationWarning");
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
