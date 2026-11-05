import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { ProductPreviewClient } from "@/app/products/[slug]/preview/ProductPreviewClient";
import { ProductDetailClient } from "@/app/products/[slug]/ProductDetailClient";
import { PhotoDropzone, DroppedImage } from "@/components/PhotoDropzone";
import { SafeImage } from "@/components/SafeImage";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Product } from "@/types";
import { isSafeImageUrl, getSafeImageUrl } from "@/lib/images";

const mockProduct: Product = {
  id: "prod-preview-test-01",
  name: "Handwoven Royal Chanderi Silk Saree",
  slug: "royal-chanderi-silk-saree",
  brand: "LUMIÈRE Atelier",
  category_slug: "ethnic-wear",
  description: "Authentic hand-spun Chanderi silk with delicate golden zari motifs and featherlight drape.",
  fabric_care: "100% Chanderi Silk with Zari. Dry clean only. Store in unbleached cotton muslin.",
  origin: "Chanderi, Madhya Pradesh",
  base_price: 18990,
  discount_price: 14990,
  is_deal: true,
  is_affiliate: false,
  status: "active",
  rating: 4.9,
  review_count: 24,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  images: [
    {
      id: "img-01",
      product_id: "prod-preview-test-01",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
      alt_text: "Front view full drape on royal mannequin",
      display_order: 1,
      is_primary: true,
      color: "Emerald Gold",
    },
    {
      id: "img-02",
      product_id: "prod-preview-test-01",
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
      alt_text: "Close-up of zari border weave details",
      display_order: 2,
      is_primary: false,
      color: "Emerald Gold",
    },
    {
      id: "img-03",
      product_id: "prod-preview-test-01",
      url: "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAkA4JaQAA3AA/vuUAAA=",
      alt_text: "Pallu handloom weave texture",
      display_order: 3,
      is_primary: false,
    },
  ],
  variants: [
    {
      id: "var-01",
      product_id: "prod-preview-test-01",
      sku: "LUM-CHN-SLK-EMG-FS",
      color: "Emerald Gold",
      color_hex: "#0b5345",
      size: "Free Size",
      price: 14990,
      compare_at_price: 18990,
      weight_grams: 650,
      is_active: true,
      inventory: {
        id: "inv-01",
        variant_id: "var-01",
        physical_stock: 12,
        reserved_stock: 2,
        low_stock_threshold: 3,
        available_stock: 10,
        updated_at: "2026-01-01T00:00:00Z",
      },
    },
  ],
};

describe("Dedicated Product Preview Page & Drag-and-Drop Photo Uploader Suite", () => {
  describe("1. Dedicated Product Preview Page (ProductPreviewClient)", () => {
    it("should render full preview page with high-res gallery and navigation", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      // Verify header back navigation & badge
      expect(html).toContain("Back to Product");
      expect(html).toContain("/products/royal-chanderi-silk-saree");
      expect(html).toContain("Full Preview Mode");
      expect(html).toContain("Handwoven Royal Chanderi Silk Saree");

      // Verify photo counter
      expect(html).toContain("Photograph 1 of 3");

      // Verify all thumbnails rendered
      expect(html).toContain("All Visual Angles &amp; Swatches");
    });

    it("should display authoritative pricing with 12% GST and discount badge", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("Authoritative Atelier Pricing");
      expect(html).toContain("14,990"); // Selling price
      expect(html).toContain("18,990"); // MRP strike-through
      expect(html).toContain("Save 21%"); // (18990 - 14990) / 18990 = 21%
      expect(html).toContain("Authoritative Price Inclusive of 12% GST");
    });

    it("should render prominent 7-day return and two-stage inspection guarantee panel", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("7-Day Return &amp; Two-Stage Inspection Guarantee");
      expect(html).toContain("Doorstep Delhivery Reverse Pickup");
      expect(html).toContain("Two-Stage Quality Inspection");
      expect(html).toContain("Zero Restocking Fees");
      expect(html).toContain("/returns-policy");
    });

    it("should render Delhivery logistics estimator and hub dispatch notice", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("Delhivery Express Logistics");
      expect(html).toContain("PIN Code");
      expect(html).toContain("Royal Opera House Fulfillment Hub, Mumbai");
      expect(html).toContain("orders ₹2,999 and above");
    });

    it("should display artisanal craft origin and care specifications", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("Artisanal Craft, Fabric &amp; Authenticity");
      expect(html).toContain("Chanderi, Madhya Pradesh");
      expect(html).toContain("100% Chanderi Silk with Zari");
      expect(html).toContain("Silk Mark &amp; GI Tag Verified");
      expect(html).toContain("/authenticity");
    });

    it("should render Add to Bag and Buy Now commercial actions", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("Add to Bag");
      expect(html).toContain("Buy Now");
      expect(html).toContain("Stock is securely reserved for 15 minutes");
    });
  });

  describe("2. Product Detail Page (ProductDetailClient) Preview Integration", () => {
    it("should render link to dedicated full preview page on standard PDP", () => {
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductDetailClient product={mockProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("/products/royal-chanderi-silk-saree/preview");
      expect(html).toContain("Full Visual Preview &amp; Policy Inspection");
      expect(html).toContain("Fullscreen");
    });
  });

  describe("3. PhotoDropzone Drag-and-Drop Component", () => {
    it("should render dropzone area with accepted file formats and browse prompt", () => {
      const html = renderToString(
        <PhotoDropzone
          images={[]}
          onChange={() => {}}
        />
      );

      expect(html).toContain("Drag &amp; Drop Product Photos Here");
      expect(html).toContain("browse local files");
      expect(html).toContain("JPG");
      expect(html).toContain("PNG");
      expect(html).toContain("WEBP");
      expect(html).toContain("AVIF");
      expect(html).toContain("Or paste external image URL");
    });

    it("should render thumbnail queue for uploaded and dropped images", () => {
      const initialImages: DroppedImage[] = [
        {
          id: "drop-1",
          url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
          alt_text: "Front saree angle",
          is_primary: true,
          display_order: 1,
          file_name: "front.jpg",
          file_size_kb: 145,
        },
        {
          id: "drop-2",
          url: "data:image/jpeg;base64,/9j/4AAQSkZJRg==",
          alt_text: "Back drape detail",
          is_primary: false,
          display_order: 2,
          file_name: "back.jpg",
          file_size_kb: 98,
        },
      ];

      const html = renderToString(
        <PhotoDropzone
          images={initialImages}
          onChange={() => {}}
        />
      );

      expect(html).toContain("Configured Photographs (2)");
      expect(html).toContain("PRIMARY");
      expect(html).toContain("Make Primary");
      expect(html).toContain("#1");
      expect(html).toContain("#2");
      expect(html).toContain("145 KB");
      expect(html).toContain("98 KB");
      expect(html).toContain("Front saree angle");
      expect(html).toContain("Back drape detail");
      expect(html).toContain("Color Variant Link (Optional)");
      expect(html).toContain("draggable=\"true\"");
    });
  });

  describe("4. Edge Cases: Non-Zero Primary Image Index & Pricing Without Variants", () => {
    it("should initialize active photograph index to the designated primary image when not at index 0", () => {
      const nonZeroPrimaryProduct: Product = {
        ...mockProduct,
        images: [
          {
            id: "img-01",
            product_id: mockProduct.id,
            url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
            alt_text: "First secondary image",
            display_order: 1,
            is_primary: false,
          },
          {
            id: "img-02",
            product_id: mockProduct.id,
            url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
            alt_text: "Second image designated as PRIMARY",
            display_order: 2,
            is_primary: true,
          },
        ],
      };

      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={nonZeroPrimaryProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      // Verify that the preview starts on Photograph 2 of 2 because img-02 is PRIMARY
      expect(html).toContain("Photograph 2 of 2");
      expect(html).toContain("Second image designated as PRIMARY");
    });

    it("should correctly calculate pricing and discount badge when product has no variants", () => {
      const noVariantsProduct: Product = {
        ...mockProduct,
        variants: [],
        base_price: 24990,
        discount_price: 19990,
      };

      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <ProductPreviewClient product={noVariantsProduct} />
          </WishlistProvider>
        </CartProvider>
      );

      expect(html).toContain("19,990"); // Selling price
      expect(html).toContain("24,990"); // Base strike-through MRP
      expect(html).toContain("Save 20%"); // (24990 - 19990) / 24990 = 20%
      expect(html).toContain("Authoritative Price Inclusive of 12% GST");
    });
  });

  describe("5. Base64 & Data URL Compatibility with SafeImage", () => {
    it("should validate that base64 data URLs are recognized as safe image sources", () => {
      const webpDataUrl = "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAkA4JaQAA3AA/vuUAAA=";
      const jpegDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/";

      expect(isSafeImageUrl(webpDataUrl)).toBe(true);
      expect(isSafeImageUrl(jpegDataUrl)).toBe(true);
      expect(getSafeImageUrl(webpDataUrl)).toBe(webpDataUrl);
      expect(getSafeImageUrl(jpegDataUrl)).toBe(jpegDataUrl);
    });

    it("should bypass regex overhead in normalizeImageUrl for data:, blob:, and root-relative paths", () => {
      const dataUrl = "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAkA4JaQAA3AA/vuUAAA=";
      const blobUrl = "blob:https://lumiere.in/1234-5678";
      const localPath = "/brand/crest.svg";

      expect(getSafeImageUrl(dataUrl)).toBe(dataUrl);
      expect(getSafeImageUrl(blobUrl)).toBe(blobUrl);
      expect(getSafeImageUrl(localPath)).toBe(localPath);
    });

    it("should render SafeImage with data URL without crashing next/image runtime", () => {
      const dataUrl = "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAkA4JaQAA3AA/vuUAAA=";

      expect(() => {
        renderToString(
          <SafeImage
            src={dataUrl}
            alt="Dropped Local Photo"
            width={300}
            height={400}
          />
        );
      }).not.toThrow();
    });
  });
});
