import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Product } from "@/types";

describe("LUMIÈRE Luxury Visual Experience & Scroll Animation Suite", () => {
  const sampleProduct: Product = {
    id: "prod-luxury-test-1",
    name: "Royal Zari Chanderi Kurta",
    slug: "royal-zari-chanderi-kurta",
    brand: "LUMIÈRE Atelier",
    category_slug: "ethnic-wear",
    description: "Hand-spun Chanderi silk with authentic zari brocade border.",
    fabric_care: "Dry Clean Only",
    origin: "Chanderi, Madhya Pradesh",
    base_price: 12499,
    discount_price: 9999,
    rating: 4.9,
    review_count: 18,
    is_affiliate: false,
    status: "active",
    images: [
      {
        id: "img-1",
        product_id: "prod-luxury-test-1",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        alt_text: "Royal Zari Chanderi Kurta",
        is_primary: true,
        display_order: 1,
      },
    ],
    variants: [
      {
        id: "var-1",
        product_id: "prod-luxury-test-1",
        sku: "LUM-ETH-001-M",
        size: "M",
        color: "Ivory Gold",
        color_hex: "#F5EEDB",
        price: 9999,
        compare_at_price: 12499,
        weight_grams: 450,
        is_active: true,
        inventory: {
          id: "inv-1",
          variant_id: "var-1",
          available_stock: 8,
          physical_stock: 8,
          reserved_stock: 0,
          low_stock_threshold: 3,
          updated_at: new Date().toISOString(),
        },
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  describe("ScrollProgress Component", () => {
    it("should export named and default ScrollProgress consistently", () => {
      expect(typeof ScrollProgress).toBe("function");
    });

    it("should render cleanly during SSR without crashing", () => {
      const html = renderToString(<ScrollProgress />);
      // Initially not mounted during SSR to ensure hydration parity
      expect(typeof html).toBe("string");
    });
  });

  describe("ScrollReveal & ScrollRevealItem Components", () => {
    it("should render ScrollReveal container with children", () => {
      const html = renderToString(
        <ScrollReveal variant="fade-up" className="test-reveal">
          <p>Luxury Content</p>
        </ScrollReveal>
      );
      expect(html).toContain("Luxury Content");
      expect(html).toContain("test-reveal");
    });

    it("should support stagger variant with nested ScrollRevealItem elements", () => {
      const html = renderToString(
        <ScrollReveal variant="stagger" as="section" className="editorial-section">
          <ScrollRevealItem className="item-1">
            <h2>Artisanal Silks</h2>
          </ScrollRevealItem>
          <ScrollRevealItem className="item-2">
            <p>Centuries of weaving craft</p>
          </ScrollRevealItem>
        </ScrollReveal>
      );
      expect(html).toContain("Artisanal Silks");
      expect(html).toContain("Centuries of weaving craft");
      expect(html).toContain("editorial-section");
    });
  });

  describe("SectionHeading Component", () => {
    it("should render badge, title, and explore link in left-aligned mode", () => {
      const html = renderToString(
        <SectionHeading
          badge="Category Discovery"
          title="Shop by Department"
          subtitle="Explore distinct fashion silhouettes"
          linkText="Explore All Atelier"
          linkHref="/products"
        />
      );
      expect(html).toContain("Category Discovery");
      expect(html).toContain("Shop by Department");
      expect(html).toContain("Explore distinct fashion silhouettes");
      expect(html).toContain("Explore All Atelier");
      expect(html).toContain("/products");
    });

    it("should render centered layout when align='center'", () => {
      const html = renderToString(
        <SectionHeading
          badge="Aesthetic Matrix"
          title="Shop by Style"
          subtitle="Filter by silhouettes"
          align="center"
        />
      );
      expect(html).toContain("Shop by Style");
      expect(html).toContain("text-center");
    });
  });

  describe("ProductCard Redesign & Interaction Attributes", () => {
    it("should render real product with authoritative pricing, images, and quick action hooks", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductCard product={sampleProduct} index={0} />
          </WishlistProvider>
        </CartProvider>
      );

      // Verify product typography and pricing
      expect(html).toContain("Royal Zari Chanderi Kurta");
      expect(html).toContain("LUMIÈRE Atelier");
      expect(html).toContain("₹9,999");
      expect(html).toContain("₹12,499");
      expect(html).toContain("20% OFF");

      // Verify aspect-[3/4] luxury card ratio and quick actions
      expect(html).toContain("aspect-[3/4]");
      expect(html).toContain("Quick View");
      expect(html).toContain("Quick Add");

      // Verify focus-within accessibility classes
      expect(html).toContain("group-focus-within:opacity-100");
    });
  });

  describe("Footer Redesign & Woven Texture Wordmark", () => {
    it("should render all 7 core luxury sections and the LUMIÈRE woven texture", () => {
      const html = renderToString(<Footer />);

      // Section 1: Brand & Special Woven Texture
      expect(html).toContain("lumiere-woven-texture");
      expect(html).toContain("lumiere-text-clipped");
      expect(html).toContain("LUMIÈRE");
      expect(html).toContain("Royal Opera House District, Girgaon, Mumbai 400004");

      // Section 2: Shop Navigation
      expect(html).toContain("Shop Atelier");
      expect(html).toContain("/category/mens-clothing");
      expect(html).toContain("/category/womens-clothing");

      // Section 3: Customer Support
      expect(html).toContain("Customer Support");
      expect(html).toContain("/track-order");
      expect(html).toContain("/shipping-policy");

      // Section 4: About LUMIÈRE
      expect(html).toContain("About LUMIÈRE");
      expect(html).toContain("/about");
      expect(html).toContain("/authenticity");

      // Section 5: Social & Policies
      expect(html).toContain("Connect &amp; Legal");
      expect(html).toContain("Instagram");
      expect(html).toContain("X (Twitter)");

      // Section 6: Newsletter
      expect(html).toContain("The LUMIÈRE Gazette");
      expect(html).toContain("Private Previews &amp; Handloom Stories");

      // Section 7: Statutory trust badges
      expect(html).toContain("RBI 2FA / PCI-DSS Secured");
      expect(html).toContain("Delhivery Express Logistics (19,000+ PINs)");
      expect(html).toContain("DPDP Act 2023 Compliant");
      expect(html).toContain("GSTIN: 27AABCL9841K1Z3");
    });
  });
});
