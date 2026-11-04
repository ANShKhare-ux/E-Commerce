import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";
import { getSafeRedirectUrl as getSafeRedirectUrlFromButton } from "@/components/GoogleSignInButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

let mockCurrentPath = "/";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => mockCurrentPath,
  useSearchParams: () => new URLSearchParams(),
}));

describe("LUMIÈRE Authentication Pages & Layout Shielding Suite", () => {
  beforeEach(() => {
    mockCurrentPath = "/";
    vi.clearAllMocks();
  });

  describe("getSafeRedirectUrl Extended Defense", () => {
    it("should prevent redirect loops to auth gateways while permitting password recovery", () => {
      expect(getSafeRedirectUrl("/login")).toBe("/account");
      expect(getSafeRedirectUrl("/login/")).toBe("/account");
      expect(getSafeRedirectUrl("/login?redirect=/orders")).toBe("/account");
      expect(getSafeRedirectUrl("/login#modal")).toBe("/account");
      expect(getSafeRedirectUrl("/login/nested")).toBe("/account");
      expect(getSafeRedirectUrl("/signup")).toBe("/account");
      expect(getSafeRedirectUrl("/signup/")).toBe("/account");
      expect(getSafeRedirectUrl("/signup?next=/bag")).toBe("/account");
      expect(getSafeRedirectUrl("/forgot-password")).toBe("/account");
      expect(getSafeRedirectUrl("/forgot-password/")).toBe("/account");
      expect(getSafeRedirectUrl("/forgot-password?email=test@test.com")).toBe("/account");
      expect(getSafeRedirectUrl("/auth")).toBe("/account");
      expect(getSafeRedirectUrl("/auth/callback")).toBe("/account");
      expect(getSafeRedirectUrl("/auth/signout")).toBe("/account");

      // Crucial: /reset-password must be permitted for email password recovery callback flow
      expect(getSafeRedirectUrl("/reset-password")).toBe("/reset-password");
      expect(getSafeRedirectUrl("/reset-password?code=123")).toBe("/reset-password?code=123");
    });

    it("should preserve safe application destinations", () => {
      expect(getSafeRedirectUrl("/checkout")).toBe("/checkout");
      expect(getSafeRedirectUrl("/account/orders")).toBe("/account/orders");
      expect(getSafeRedirectUrl("/products?category=mens-clothing")).toBe("/products?category=mens-clothing");
    });

    it("should reject malicious protocol relative or external URLs", () => {
      expect(getSafeRedirectUrl("https://evil.com")).toBe("/account");
      expect(getSafeRedirectUrl("//evil.com")).toBe("/account");
      expect(getSafeRedirectUrl("/\\evil.com")).toBe("/account");
      expect(getSafeRedirectUrl("javascript:alert(1)")).toBe("/account");
    });
  });

  describe("Layout Shielding: Suppression on Auth Pages", () => {
    const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

    it.each(authRoutes)("should completely suppress Header on %s", (route) => {
      mockCurrentPath = route;
      const html = renderToString(
        <CartProvider>
          <WishlistProvider>
            <Header />
          </WishlistProvider>
        </CartProvider>
      );
      expect(html).toBe("");
    });

    it.each(authRoutes)("should completely suppress Footer on %s", (route) => {
      mockCurrentPath = route;
      const html = renderToString(<Footer />);
      expect(html).toBe("");
    });

    it.each(authRoutes)("should completely suppress CartDrawer on %s", (route) => {
      mockCurrentPath = route;
      const html = renderToString(
        <CartProvider>
          <CartDrawer />
        </CartProvider>
      );
      expect(html).toBe("");
    });

    it.each(authRoutes)("should completely suppress ScrollProgress on %s", (route) => {
      mockCurrentPath = route;
      const html = renderToString(<ScrollProgress />);
      expect(html).toBe("");
    });

    it("should suppress ScrollProgress on /admin", () => {
      mockCurrentPath = "/admin";
      const html = renderToString(<ScrollProgress />);
      expect(html).toBe("");
    });

    it("should render Header and Footer on standard storefront routes", () => {
      mockCurrentPath = "/products";
      const headerHtml = renderToString(
        <CartProvider>
          <WishlistProvider>
            <Header />
          </WishlistProvider>
        </CartProvider>
      );
      expect(headerHtml).toContain("LUMIÈRE");
      expect(headerHtml).toContain("MEN");
      expect(headerHtml).toContain("WOMEN");

      const footerHtml = renderToString(<Footer />);
      expect(footerHtml).toContain("LUMIÈRE");
      expect(footerHtml).toContain("GSTIN: 27AABCL9841K1Z3");
    });
  });

  describe("GoogleSignInButton & getSafeRedirectUrl Parity", () => {
    it("should export identical getSafeRedirectUrl function from GoogleSignInButton without parsing collisions", () => {
      expect(getSafeRedirectUrlFromButton).toBe(getSafeRedirectUrl);
      expect(getSafeRedirectUrlFromButton("/checkout")).toBe("/checkout");
      expect(getSafeRedirectUrlFromButton("https://malicious.com")).toBe("/account");
    });
  });

  describe("Promotional Offer Pop-Up Elimination", () => {
    it("should ensure no welcome pop-up modal or FIRSTBUY promotion overlay renders in layout tree", () => {
      mockCurrentPath = "/";
      const storefrontHtml = renderToString(
        <CartProvider>
          <WishlistProvider>
            <Header />
            <div data-testid="page-content">Home Content</div>
            <CartDrawer />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      );

      expect(storefrontHtml).not.toContain("Exclusive Member Privilege");
      expect(storefrontHtml).not.toContain("Welcome to LUMIÈRE");
      expect(storefrontHtml).not.toContain("Save ₹300 on your first purchase");
      expect(storefrontHtml).toContain("Home Content");
    });
  });
});

