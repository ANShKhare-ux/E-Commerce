import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  isSafeImageUrl,
  getSafeImageUrl,
  normalizeImageUrl,
  matchesHostname,
  DEFAULT_FALLBACK_IMAGE,
  INLINE_FALLBACK_SVG,
  ALLOWED_IMAGE_HOST_PATTERNS,
} from "@/lib/images";
import { SafeImage } from "@/components/SafeImage";
import { ProductCard } from "@/components/ProductCard";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Product } from "@/types";
import nextConfig from "../next.config.mjs";

describe("Safe Image Resolution & Fallback Suite", () => {
  describe("matchesHostname", () => {
    it("should match exact hostnames case-insensitively", () => {
      expect(matchesHostname("share.google", "share.google")).toBe(true);
      expect(matchesHostname("SHARE.GOOGLE", "share.google")).toBe(true);
      expect(matchesHostname("drive.google.com", "drive.google.com")).toBe(true);
      expect(matchesHostname("other.com", "share.google")).toBe(false);
    });

    it("should match wildcard domain patterns for subdomains", () => {
      expect(matchesHostname("lh3.googleusercontent.com", "*.googleusercontent.com")).toBe(true);
      expect(matchesHostname("xyz.supabase.co", "*.supabase.co")).toBe(true);
      expect(matchesHostname("photos.google.com", "*.google.com")).toBe(true);
      expect(matchesHostname("mercury.phonepe.com", "*.phonepe.com")).toBe(true);
      expect(matchesHostname("mercury-uat.phonepe.com", "*.phonepe.com")).toBe(true);
    });

    it("should reject lookalike and nested attacker hostnames", () => {
      expect(matchesHostname("fakegoogle.com", "*.google.com")).toBe(false);
      expect(matchesHostname("google.com.evil.com", "*.google.com")).toBe(false);
      expect(matchesHostname("not-phonepe.com", "*.phonepe.com")).toBe(false);
    });
  });

  describe("normalizeImageUrl", () => {
    it("should convert Google Drive file viewer URLs to direct thumbnail view URLs", () => {
      const viewerUrl = "https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing";
      const normalized = normalizeImageUrl(viewerUrl);
      expect(normalized).toBe("https://drive.google.com/uc?export=view&id=1A2B3C4D5E");
    });

    it("should convert multi-account Google Drive file viewer URLs (/file/u/0/d/...) to direct view URLs", () => {
      const multiUserUrl = "https://drive.google.com/file/u/0/d/1A2B3C4D5E/view?usp=sharing";
      const normalized = normalizeImageUrl(multiUserUrl);
      expect(normalized).toBe("https://drive.google.com/uc?export=view&id=1A2B3C4D5E");

      const multiUser1 = "https://drive.google.com/file/u/1/d/1A2B3C4D5E/view";
      expect(normalizeImageUrl(multiUser1)).toBe("https://drive.google.com/uc?export=view&id=1A2B3C4D5E");
    });

    it("should convert Google Drive open?id URLs to direct thumbnail view URLs", () => {
      const openUrl = "https://drive.google.com/open?id=1A2B3C4D5E";
      const normalized = normalizeImageUrl(openUrl);
      expect(normalized).toBe("https://drive.google.com/uc?export=view&id=1A2B3C4D5E");
    });

    it("should upgrade protocol-relative and http URLs for configured hosts", () => {
      expect(normalizeImageUrl("//images.unsplash.com/photo-1")).toBe("https://images.unsplash.com/photo-1");
      expect(normalizeImageUrl("http://share.google/qsxtZOVe5uoibVG8h")).toBe("https://share.google/qsxtZOVe5uoibVG8h");
      expect(normalizeImageUrl("http://drive.google.com/open?id=1A2B3C4D5E")).toBe("https://drive.google.com/uc?export=view&id=1A2B3C4D5E");
    });

    it("should leave standard images and relative paths unaltered", () => {
      expect(normalizeImageUrl("https://images.unsplash.com/photo-1")).toBe("https://images.unsplash.com/photo-1");
      expect(normalizeImageUrl("/brand/logo.svg")).toBe("/brand/logo.svg");
      expect(normalizeImageUrl("https://share.google/qsxtZOVe5uoibVG8h")).toBe("https://share.google/qsxtZOVe5uoibVG8h");
    });

    it("should handle non-string and empty inputs gracefully", () => {
      expect(normalizeImageUrl(null)).toBe("");
      expect(normalizeImageUrl(undefined)).toBe("");
      expect(normalizeImageUrl("   ")).toBe("");
    });
  });

  describe("isSafeImageUrl", () => {
    it("should accept share.google specifically (resolving error report)", () => {
      expect(isSafeImageUrl("https://share.google/qsxtZOVe5uoibVG8h")).toBe(true);
      expect(isSafeImageUrl("https://share.google/any-photo-path")).toBe(true);
    });

    it("should accept all configured image hosts", () => {
      expect(isSafeImageUrl("https://images.unsplash.com/photo-1610030469983")).toBe(true);
      expect(isSafeImageUrl("https://xyz-project.supabase.co/storage/v1/object/public/products/1.jpg")).toBe(true);
      expect(isSafeImageUrl("https://supabase.co/favicon.png")).toBe(true);
      expect(isSafeImageUrl("https://lh3.googleusercontent.com/d/12345")).toBe(true);
      expect(isSafeImageUrl("https://googleusercontent.com/pic.jpg")).toBe(true);
      expect(isSafeImageUrl("https://drive.google.com/uc?export=view&id=123")).toBe(true);
      expect(isSafeImageUrl("https://photos.google.com/album/photo.png")).toBe(true);
      expect(isSafeImageUrl("https://google.com/logo.png")).toBe(true);
      expect(isSafeImageUrl("https://mercury.phonepe.com/qr.png")).toBe(true);
      expect(isSafeImageUrl("https://phonepe.com/banner.png")).toBe(true);
    });

    it("should accept relative asset paths and data URLs", () => {
      expect(isSafeImageUrl("/brand/lumiere-lockup-horizontal.svg")).toBe(true);
      expect(isSafeImageUrl("/images/fallback.png")).toBe(true);
      expect(isSafeImageUrl("data:image/svg+xml;base64,PHN2Zz4=")).toBe(true);
      expect(isSafeImageUrl(INLINE_FALLBACK_SVG)).toBe(true);
    });

    it("should reject unconfigured hostnames to prevent next/image runtime crashes", () => {
      expect(isSafeImageUrl("https://unconfigured-image-host.com/photo.jpg")).toBe(false);
      expect(isSafeImageUrl("https://random-cdn.xyz/pic.png")).toBe(false);
      expect(isSafeImageUrl("https://i.imgur.com/sample.jpg")).toBe(false);
      expect(isSafeImageUrl("https://dropbox.com/photo.jpg")).toBe(false);
    });

    it("should reject non-https or non-standard protocols", () => {
      expect(isSafeImageUrl("")).toBe(false);
      expect(isSafeImageUrl("   ")).toBe(false);
      expect(isSafeImageUrl("not-a-valid-url")).toBe(false);
      expect(isSafeImageUrl("http://")).toBe(false);
      expect(isSafeImageUrl("ftp://images.unsplash.com/photo.jpg")).toBe(false);
      expect(isSafeImageUrl("javascript:alert(1)")).toBe(false);
      expect(isSafeImageUrl(null)).toBe(false);
      expect(isSafeImageUrl(undefined)).toBe(false);
    });

    it("should accept object with src property (StaticImageData)", () => {
      expect(isSafeImageUrl({ src: "https://images.unsplash.com/photo-1" })).toBe(true);
      expect(isSafeImageUrl({ src: "https://unconfigured.com/photo-1" })).toBe(false);
    });
  });

  describe("getSafeImageUrl", () => {
    it("should return the configured URL intact", () => {
      const url = "https://share.google/qsxtZOVe5uoibVG8h";
      expect(getSafeImageUrl(url)).toBe(url);
    });

    it("should return DEFAULT_FALLBACK_IMAGE for unconfigured external domains", () => {
      const unconfigured = "https://unconfigured-domain.org/image.png";
      expect(getSafeImageUrl(unconfigured)).toBe(DEFAULT_FALLBACK_IMAGE);
    });

    it("should return custom fallback when valid and provided", () => {
      const customFallback = "/brand/lumiere-lockup-horizontal.svg";
      expect(getSafeImageUrl("https://unconfigured.com/pic.jpg", customFallback)).toBe(customFallback);
    });

    it("should safeguard against an invalid custom fallback by defaulting to DEFAULT_FALLBACK_IMAGE", () => {
      const unsafeFallback = "https://another-unconfigured-domain.com/broken.jpg";
      expect(getSafeImageUrl("https://unconfigured.com/pic.jpg", unsafeFallback)).toBe(DEFAULT_FALLBACK_IMAGE);
    });

    it("should return fallback for null, undefined, or empty values", () => {
      expect(getSafeImageUrl(null)).toBe(DEFAULT_FALLBACK_IMAGE);
      expect(getSafeImageUrl(undefined)).toBe(DEFAULT_FALLBACK_IMAGE);
      expect(getSafeImageUrl("")).toBe(DEFAULT_FALLBACK_IMAGE);
      expect(getSafeImageUrl("   ")).toBe(DEFAULT_FALLBACK_IMAGE);
    });
  });

  describe("next.config.mjs remotePatterns synchronization", () => {
    it("should ensure every allowed host pattern is configured in next.config.mjs", () => {
      const configPatterns = nextConfig.images?.remotePatterns || [];
      for (const pattern of ALLOWED_IMAGE_HOST_PATTERNS) {
        const found = configPatterns.some((cp: any) => cp.hostname === pattern);
        expect(found, `Pattern "${pattern}" must exist in next.config.mjs remotePatterns`).toBe(true);
      }
    });
  });

  describe("SafeImage & Storefront Component Resilience", () => {
    it("should render SafeImage with share.google URL without throwing", () => {
      expect(() => {
        renderToString(
          <SafeImage
            src="https://share.google/qsxtZOVe5uoibVG8h"
            alt="Google Share Product Image"
            width={400}
            height={500}
          />
        );
      }).not.toThrow();
    });

    it("should render SafeImage with an unconfigured domain by substituting fallback without throwing", () => {
      let html = "";
      expect(() => {
        html = renderToString(
          <SafeImage
            src="https://unconfigured-external-domain.com/photo.jpg"
            alt="Unconfigured Domain Test"
            width={400}
            height={500}
          />
        );
      }).not.toThrow();

      expect(html).toContain("images.unsplash.com");
    });

    it("should render SafeImage with null or undefined src safely", () => {
      let html = "";
      expect(() => {
        html = renderToString(
          <SafeImage
            src={null}
            alt="Null Src Test"
            width={400}
            height={500}
          />
        );
      }).not.toThrow();

      expect(html).toContain("images.unsplash.com");

      expect(() => {
        renderToString(
          <SafeImage
            src={undefined}
            alt="Undefined Src Test"
            width={400}
            height={500}
          />
        );
      }).not.toThrow();
    });

    it("should render SafeImage with an unsafe object src without throwing", () => {
      let html = "";
      expect(() => {
        html = renderToString(
          <SafeImage
            src={{ src: "https://unconfigured-unsafe-domain.com/photo.jpg" } as any}
            alt="Unsafe Object Src"
            width={400}
            height={500}
          />
        );
      }).not.toThrow();

      expect(html).toContain("images.unsplash.com");
    });

    it("should render ProductCard with share.google image without crashing the tree", () => {
      const sampleProduct: Product = {
        id: "prod-google-share-01",
        name: "Artisanal Silk Dupatta",
        slug: "artisanal-silk-dupatta",
        base_price: 3990,
        status: "active",
        brand: "LUMIÈRE Atelier",
        category_slug: "ethnic-wear",
        description: "Pure silk dupatta with hand embroidery.",
        fabric_care: "Dry clean only",
        origin: "Varanasi, Uttar Pradesh",
        is_affiliate: false,
        images: [
          {
            id: "img-google-1",
            product_id: "prod-google-share-01",
            url: "https://share.google/qsxtZOVe5uoibVG8h",
            alt_text: "Google Share Photo",
            display_order: 1,
            is_primary: true,
          },
        ],
        variants: [
          {
            id: "var-1",
            product_id: "prod-google-share-01",
            sku: "LUM-DUP-01",
            color: "Gold",
            color_hex: "#D4AF37",
            size: "Free Size",
            price: 3990,
            weight_grams: 500,
            is_active: true,
          },
        ],
        rating: 4.8,
        review_count: 12,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z",
      };

      expect(() => {
        renderToString(
          <CartProvider>
            <WishlistProvider>
              <ProductCard product={sampleProduct} />
            </WishlistProvider>
          </CartProvider>
        );
      }).not.toThrow();
    });

    it("should render ProductCard with completely unconfigured domain safely without ErrorBoundary crash", () => {
      const unconfiguredProduct: Product = {
        id: "prod-unconfigured-01",
        name: "Streetwear Graphic Tee",
        slug: "streetwear-graphic-tee",
        base_price: 2490,
        status: "active",
        brand: "LUMIÈRE Street",
        category_slug: "streetwear",
        description: "Heavyweight boxy cotton tee.",
        fabric_care: "Machine wash cold",
        origin: "Mumbai, Maharashtra",
        is_affiliate: false,
        images: [
          {
            id: "img-unconfigured-1",
            product_id: "prod-unconfigured-01",
            url: "https://completely-unconfigured-image-cdn.com/product.jpg",
            alt_text: "Unconfigured Domain",
            display_order: 1,
            is_primary: true,
          },
        ],
        variants: [
          {
            id: "var-tee-1",
            product_id: "prod-unconfigured-01",
            sku: "LUM-TEE-01",
            color: "Noir",
            color_hex: "#000000",
            size: "M",
            price: 2490,
            weight_grams: 450,
            is_active: true,
          },
        ],
        rating: 4.5,
        review_count: 8,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z",
      };

      let html = "";
      expect(() => {
        html = renderToString(
          <CartProvider>
            <WishlistProvider>
              <ProductCard product={unconfiguredProduct} />
            </WishlistProvider>
          </CartProvider>
        );
      }).not.toThrow();

      // It must fallback safely to the trusted Unsplash placeholder
      expect(html).toContain("images.unsplash.com");
    });
  });
});
