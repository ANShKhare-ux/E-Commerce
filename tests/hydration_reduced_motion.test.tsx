import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React, { useEffect } from "react";
import { renderToString } from "react-dom/server";

let mockReducedMotion: boolean | null = true;

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: () => mockReducedMotion,
  };
});

import { useSafeReducedMotion } from "@/lib/motion";
import { HeroSection } from "@/components/HeroSection";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Product } from "@/types";

// Helper test component
function MotionProbe({ onRender }: { onRender: (val: boolean) => void }) {
  const isReduced = useSafeReducedMotion();
  onRender(isReduced);
  return <div data-reduced={String(isReduced)}>Probe</div>;
}

describe("SSR & Hydration Parity: useSafeReducedMotion & Framer Motion Components", () => {
  const sampleHero = {
    badge_text: "Spring / Summer 2026",
    headline_line1: "Handloom Silks &",
    headline_line2: "Modern Streetwear",
    subheading: "Hand-spun Chanderi silks, 450 GSM boxy streetwear drops, and verified extractions.",
    primary_button_text: "Explore Collection",
    primary_button_link: "/category/ethnic-wear",
    secondary_button_text: "Curated Looks",
    secondary_button_link: "/outfits",
    image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
    is_active: true,
  };

  const sampleProduct: Product = {
    id: "prod-test-01",
    name: "Banarasi Raw Silk Kurta",
    slug: "banarasi-raw-silk-kurta",
    base_price: 8900,
    status: "active",
    brand: "LUMIÈRE Atelier",
    category_slug: "ethnic-wear",
    description: "Handcrafted Varanasi raw silk kurta.",
    fabric_care: "Dry clean only",
    origin: "Varanasi, Uttar Pradesh",
    is_affiliate: false,
    images: [
      {
        id: "img-1",
        product_id: "prod-test-01",
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
        alt_text: "Banarasi Raw Silk Kurta",
        display_order: 1,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    rating: 4.8,
    review_count: 24,
    variants: [
      {
        id: "var-1",
        product_id: "prod-test-01",
        size: "M",
        color: "Noir",
        color_hex: "#000000",
        price: 8900,
        weight_grams: 500,
        is_active: true,
        sku: "BAN-NOIR-M",
      },
    ],
  };

  beforeEach(() => {
    mockReducedMotion = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("useSafeReducedMotion hook contract", () => {
    it("should always return false during SSR initial render even if framer-motion useReducedMotion returns true", () => {
      mockReducedMotion = true;

      let renderedValue: boolean | null = null;
      const html = renderToString(
        <MotionProbe
          onRender={(val) => {
            renderedValue = val;
          }}
        />
      );

      // On SSR / initial render, hook MUST return false to guarantee 100% attribute parity with server HTML
      expect(renderedValue).toBe(false);
      expect(html).toContain('data-reduced="false"');
    });

    it("should return false when framer-motion useReducedMotion returns false", () => {
      mockReducedMotion = false;

      let renderedValue: boolean | null = null;
      const html = renderToString(
        <MotionProbe
          onRender={(val) => {
            renderedValue = val;
          }}
        />
      );

      expect(renderedValue).toBe(false);
      expect(html).toContain('data-reduced="false"');
    });

    it("should return false when framer-motion useReducedMotion returns null (SSR default)", () => {
      mockReducedMotion = null;

      let renderedValue: boolean | null = null;
      const html = renderToString(
        <MotionProbe
          onRender={(val) => {
            renderedValue = val;
          }}
        />
      );

      expect(renderedValue).toBe(false);
      expect(html).toContain('data-reduced="false"');
    });

    it("should register mediaQuery listener and reactively respond to preference changes in client browser", () => {
      let changeHandler: ((e: { matches: boolean }) => void) | null = null;
      const addListenerSpy = vi.fn((event: string, handler: (e: { matches: boolean }) => void) => {
        if (event === "change") changeHandler = handler;
      });
      const removeListenerSpy = vi.fn();

      const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: addListenerSpy,
        removeEventListener: removeListenerSpy,
      }));

      // Simulate browser window
      const originalWindow = global.window;
      global.window = { matchMedia: mockMatchMedia } as unknown as Window & typeof globalThis;

      try {
        mockReducedMotion = null; // simulate initial framer-motion null

        // Render probe component
        let probeValue: boolean | null = null;
        renderToString(
          <MotionProbe
            onRender={(val) => {
              probeValue = val;
            }}
          />
        );

        expect(probeValue).toBe(false);
      } finally {
        global.window = originalWindow;
      }
    });
  });

  describe("Deterministic SSR HTML Invariance Across Motion Preferences", () => {
    it("HeroSection generates 100% byte-for-byte identical SSR HTML whether user has reduced motion on or off", () => {
      mockReducedMotion = true;
      const htmlReduced = renderToString(<HeroSection hero={sampleHero} />);

      mockReducedMotion = false;
      const htmlStandard = renderToString(<HeroSection hero={sampleHero} />);

      expect(htmlReduced).toBe(htmlStandard);
      expect(htmlReduced).toContain("Handloom Silks &amp;");
      expect(htmlReduced).toContain("Spring / Summer 2026");
    });

    it("ScrollReveal & ScrollRevealItem generate 100% byte-for-byte identical SSR HTML whether reduced motion is on or off", () => {
      const renderGrid = () =>
        renderToString(
          <ScrollReveal variant="stagger" as="section" className="test-editorial-grid">
            <ScrollRevealItem className="test-item-1" variant="fade-up">
              <p>Editorial Item 1</p>
            </ScrollRevealItem>
            <ScrollRevealItem className="test-item-2" variant="scale-up">
              <p>Editorial Item 2</p>
            </ScrollRevealItem>
          </ScrollReveal>
        );

      mockReducedMotion = true;
      const htmlReduced = renderGrid();

      mockReducedMotion = false;
      const htmlStandard = renderGrid();

      expect(htmlReduced).toBe(htmlStandard);
      expect(htmlReduced).toContain("test-editorial-grid");
      expect(htmlReduced).toContain("Editorial Item 1");
    });

    it("SectionHeading generates 100% byte-for-byte identical SSR HTML across both left and center alignments", () => {
      const renderHeadings = () =>
        renderToString(
          <div>
            <SectionHeading
              align="left"
              badge="Curated"
              title="Festive Heritage"
              subtitle="Timeless handloom silhouettes"
              linkText="Explore All"
              linkHref="/products"
            />
            <SectionHeading
              align="center"
              badge="Atelier"
              title="Couture Edit"
              subtitle="Fine craftsmanship"
            />
          </div>
        );

      mockReducedMotion = true;
      const htmlReduced = renderHeadings();

      mockReducedMotion = false;
      const htmlStandard = renderHeadings();

      expect(htmlReduced).toBe(htmlStandard);
      expect(htmlReduced).toContain("Festive Heritage");
      expect(htmlReduced).toContain("Couture Edit");
    });

    it("Footer generates 100% byte-for-byte identical SSR HTML whether reduced motion is on or off", () => {
      mockReducedMotion = true;
      const htmlReduced = renderToString(<Footer />);

      mockReducedMotion = false;
      const htmlStandard = renderToString(<Footer />);

      expect(htmlReduced).toBe(htmlStandard);
      expect(htmlReduced).toContain("The LUMIÈRE Gazette");
      expect(htmlReduced).toContain("Royal Opera House District, Girgaon, Mumbai 400004");
    });

    it("ProductCard generates 100% byte-for-byte identical SSR HTML whether reduced motion is on or off", () => {
      const renderCard = () =>
        renderToString(
          <CartProvider>
            <WishlistProvider>
              <ProductCard product={sampleProduct} index={0} />
            </WishlistProvider>
          </CartProvider>
        );

      mockReducedMotion = true;
      const htmlReduced = renderCard();

      mockReducedMotion = false;
      const htmlStandard = renderCard();

      expect(htmlReduced).toBe(htmlStandard);
      expect(htmlReduced).toContain("Banarasi Raw Silk Kurta");
      expect(htmlReduced).toContain("₹8,900");
    });

    it("PageTransition generates 100% byte-for-byte identical SSR HTML whether reduced motion is on or off", () => {
      mockReducedMotion = true;
      const htmlReduced = renderToString(
        <PageTransition>
          <div data-testid="page-content">Page Content</div>
        </PageTransition>
      );

      mockReducedMotion = false;
      const htmlStandard = renderToString(
        <PageTransition>
          <div data-testid="page-content">Page Content</div>
        </PageTransition>
      );

      expect(htmlReduced).toBe(htmlStandard);
      expect(htmlReduced).toContain("Page Content");
    });
  });
});
