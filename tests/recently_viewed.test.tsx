import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  RecentlyViewed,
  isValidRecentlyViewedProduct,
  getStoredRecentlyViewed,
} from "@/components/RecentlyViewed";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Product } from "@/types";

describe("RecentlyViewed Component & Persistence Suite", () => {
  const originalWindow = globalThis.window;
  const originalLocalStorage = (globalThis as any).localStorage;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.window = originalWindow;
    (globalThis as any).localStorage = originalLocalStorage;
  });

  it("should render null during SSR when not mounted", () => {
    const html = renderToString(
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewed />
        </WishlistProvider>
      </CartProvider>
    );
    expect(html).toBe("");
  });

  it("should export both named and default exports consistently", async () => {
    const mod = await import("@/components/RecentlyViewed");
    expect(typeof mod.RecentlyViewed).toBe("function");
    expect(typeof mod.default).toBe("function");
    expect(mod.RecentlyViewed).toBe(mod.default);
  });

  describe("isValidRecentlyViewedProduct", () => {
    const validSample: Product = {
      id: "prod-1",
      name: "Banarasi Silk Saree",
      slug: "banarasi-silk-saree",
      brand: "LUMIÈRE Atelier",
      category_slug: "ethnic-wear",
      description: "Handcrafted pure mulberry silk",
      fabric_care: "Dry clean only",
      origin: "Varanasi, Uttar Pradesh",
      is_affiliate: false,
      base_price: 18999,
      rating: 4.9,
      review_count: 24,
      status: "active",
      images: [],
      variants: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    it("should accept complete, well-formed Product objects", () => {
      expect(isValidRecentlyViewedProduct(validSample)).toBe(true);
    });

    it("should reject non-object or nullish values", () => {
      expect(isValidRecentlyViewedProduct(null)).toBe(false);
      expect(isValidRecentlyViewedProduct(undefined)).toBe(false);
      expect(isValidRecentlyViewedProduct("string")).toBe(false);
      expect(isValidRecentlyViewedProduct(12345)).toBe(false);
      expect(isValidRecentlyViewedProduct([])).toBe(false);
    });

    it("should reject products missing id or having empty id", () => {
      expect(isValidRecentlyViewedProduct({ ...validSample, id: "" })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, id: "   " })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, id: undefined as any })).toBe(false);
    });

    it("should reject products missing name or having empty name", () => {
      expect(isValidRecentlyViewedProduct({ ...validSample, name: "" })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, name: "   " })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, name: undefined as any })).toBe(false);
    });

    it("should reject products missing slug or having empty slug to prevent broken routes", () => {
      expect(isValidRecentlyViewedProduct({ ...validSample, slug: "" })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, slug: "   " })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, slug: undefined as any })).toBe(false);
    });

    it("should reject products with invalid, missing, negative, or NaN base_price", () => {
      expect(isValidRecentlyViewedProduct({ ...validSample, base_price: NaN })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, base_price: -100 })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, base_price: "4999" as any })).toBe(false);
      expect(isValidRecentlyViewedProduct({ ...validSample, base_price: undefined as any })).toBe(false);
    });
  });

  describe("getStoredRecentlyViewed", () => {
    function setupMockStorage(initialData: Record<string, string> = {}) {
      const store = { ...initialData };
      const mockStorage = {
        getItem: vi.fn((key: string) => store[key] ?? null),
        setItem: vi.fn((key: string, val: string) => {
          store[key] = val;
        }),
        removeItem: vi.fn((key: string) => {
          delete store[key];
        }),
        clear: vi.fn(() => {
          for (const k in store) delete store[k];
        }),
        key: vi.fn((idx: number) => Object.keys(store)[idx] || null),
        get length() {
          return Object.keys(store).length;
        },
      };

      globalThis.window = {
        localStorage: mockStorage,
      } as unknown as Window & typeof globalThis;
      (globalThis as any).localStorage = mockStorage;

      return mockStorage;
    }

    const testProducts: Product[] = [
      {
        id: "p1",
        name: "Item 1",
        slug: "item-1",
        brand: "LUMIÈRE",
        category_slug: "mens",
        description: "",
        fabric_care: "",
        origin: "",
        is_affiliate: false,
        base_price: 1000,
        rating: 5,
        review_count: 1,
        status: "active",
        images: [],
        variants: [],
        created_at: "",
        updated_at: "",
      },
      {
        id: "p2",
        name: "Item 2",
        slug: "item-2",
        brand: "LUMIÈRE",
        category_slug: "womens",
        description: "",
        fabric_care: "",
        origin: "",
        is_affiliate: false,
        base_price: 2000,
        rating: 5,
        review_count: 1,
        status: "active",
        images: [],
        variants: [],
        created_at: "",
        updated_at: "",
      },
      {
        id: "p3",
        name: "Item 3",
        slug: "item-3",
        brand: "LUMIÈRE",
        category_slug: "unisex",
        description: "",
        fabric_care: "",
        origin: "",
        is_affiliate: false,
        base_price: 3000,
        rating: 5,
        review_count: 1,
        status: "active",
        images: [],
        variants: [],
        created_at: "",
        updated_at: "",
      },
    ];

    it("should return empty array if localStorage is empty", () => {
      setupMockStorage();
      const result = getStoredRecentlyViewed();
      expect(result).toEqual([]);
    });

    it("should gracefully handle malformed JSON without throwing", () => {
      setupMockStorage({ lumiere_recently_viewed: "invalid-json{{{" });
      const result = getStoredRecentlyViewed();
      expect(result).toEqual([]);
    });

    it("should filter out corrupted/malformed objects from stored array", () => {
      const mixed = [
        testProducts[0],
        null,
        { id: "corrupt-no-slug", name: "Corrupt", base_price: 500 },
        "string-item",
        testProducts[1],
      ];
      setupMockStorage({ lumiere_recently_viewed: JSON.stringify(mixed) });

      const result = getStoredRecentlyViewed();
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("p1");
      expect(result[1].id).toBe("p2");
    });

    it("should respect the limit parameter", () => {
      setupMockStorage({ lumiere_recently_viewed: JSON.stringify(testProducts) });
      const result = getStoredRecentlyViewed(2);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("p1");
      expect(result[1].id).toBe("p2");
    });

    it("should exclude specified productId when excludeId is passed", () => {
      setupMockStorage({ lumiere_recently_viewed: JSON.stringify(testProducts) });
      const result = getStoredRecentlyViewed(4, "p1");
      expect(result.length).toBe(2);
      expect(result.map((p) => p.id)).toEqual(["p2", "p3"]);
    });

    it("should return empty array when window is undefined (SSR safety)", () => {
      (globalThis as any).window = undefined;
      const result = getStoredRecentlyViewed();
      expect(result).toEqual([]);
    });
  });
});
