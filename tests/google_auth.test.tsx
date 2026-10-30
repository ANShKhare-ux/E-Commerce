import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  GoogleSignInButton,
  GoogleIcon,
  getSafeRedirectUrl,
  triggerGoogleOAuth,
} from "@/components/GoogleSignInButton";
import { GET as handleAuthCallback } from "@/app/auth/callback/route";

// Mock Supabase server client for callback route tests
const mockExchangeCodeForSession = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn().mockImplementation(async () => ({
    auth: {
      exchangeCodeForSession: mockExchangeCodeForSession,
    },
  })),
}));

describe("LUMIÈRE Google OAuth Authentication Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GoogleIcon Component & Accessibility", () => {
    it("should render accessible SVG icon with official Google color palette", () => {
      const html = renderToString(<GoogleIcon />);
      expect(html).toContain("<svg");
      expect(html).toContain('viewBox="0 0 24 24"');
      expect(html).toContain('aria-hidden="true"');
      expect(html).toContain('focusable="false"');

      // Verify official Google 4-color brand fills
      expect(html).toContain('fill="#4285F4"'); // Blue
      expect(html).toContain('fill="#34A853"'); // Green
      expect(html).toContain('fill="#FBBC05"'); // Yellow
      expect(html).toContain('fill="#EA4335"'); // Red
    });

    it("should accept custom className", () => {
      const html = renderToString(<GoogleIcon className="w-6 h-6 custom-test-class" />);
      expect(html).toContain("custom-test-class");
      expect(html).toContain("w-6 h-6");
    });
  });

  describe("getSafeRedirectUrl Redirect Security Validation", () => {
    it("should allow safe relative internal application paths", () => {
      expect(getSafeRedirectUrl("/account")).toBe("/account");
      expect(getSafeRedirectUrl("/checkout")).toBe("/checkout");
      expect(getSafeRedirectUrl("/account/orders?page=2")).toBe("/account/orders?page=2");
      expect(getSafeRedirectUrl("/collections/bridal-couture")).toBe("/collections/bridal-couture");
    });

    it("should reject malicious open redirects and fall back safely to /account", () => {
      expect(getSafeRedirectUrl("https://malicious-phishing.com")).toBe("/account");
      expect(getSafeRedirectUrl("http://attacker.com/login")).toBe("/account");
      expect(getSafeRedirectUrl("//evil.com")).toBe("/account");
      expect(getSafeRedirectUrl("/\\evil.com")).toBe("/account");
      expect(getSafeRedirectUrl("javascript:alert(1)")).toBe("/account");
      expect(getSafeRedirectUrl("")).toBe("/account");
      expect(getSafeRedirectUrl(undefined)).toBe("/account");
      expect(getSafeRedirectUrl(null)).toBe("/account");
    });

    it("should prevent redirect loops back to auth routes", () => {
      expect(getSafeRedirectUrl("/login")).toBe("/account");
      expect(getSafeRedirectUrl("/login?redirect=/checkout")).toBe("/account");
      expect(getSafeRedirectUrl("/signup")).toBe("/account");
      expect(getSafeRedirectUrl("/auth/callback")).toBe("/account");
      expect(getSafeRedirectUrl("/auth/signout")).toBe("/account");
    });
  });

  describe("triggerGoogleOAuth Functionality", () => {
    it("should trigger Supabase OAuth with provider google and correct callback url", async () => {
      const mockSignInWithOAuth = vi.fn().mockResolvedValue({ data: { url: "https://accounts.google.com" }, error: null });
      const mockSupabase = {
        auth: {
          signInWithOAuth: mockSignInWithOAuth,
        },
      };

      const result = await triggerGoogleOAuth(mockSupabase, "/checkout", "https://lumiere.in");

      expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: "google",
        options: {
          redirectTo: "https://lumiere.in/auth/callback?next=%2Fcheckout",
        },
      });
      expect(result.error).toBeNull();
    });

    it("should automatically resolve window.location.origin when origin argument is omitted", async () => {
      const mockSignInWithOAuth = vi.fn().mockResolvedValue({ data: {}, error: null });
      const mockSupabase = {
        auth: {
          signInWithOAuth: mockSignInWithOAuth,
        },
      };

      // Temporarily mock global window.location.origin
      const originalWindow = globalThis.window;
      (globalThis as any).window = {
        location: {
          origin: "https://couture.lumiere.in",
        },
      };

      try {
        await triggerGoogleOAuth(mockSupabase, "/checkout");

        expect(mockSignInWithOAuth).toHaveBeenCalledWith({
          provider: "google",
          options: {
            redirectTo: "https://couture.lumiere.in/auth/callback?next=%2Fcheckout",
          },
        });
      } finally {
        globalThis.window = originalWindow;
      }
    });

    it("should sanitize open redirect attacks in redirectTo option", async () => {
      const mockSignInWithOAuth = vi.fn().mockResolvedValue({ data: {}, error: null });
      const mockSupabase = {
        auth: {
          signInWithOAuth: mockSignInWithOAuth,
        },
      };

      await triggerGoogleOAuth(mockSupabase, "https://phishing.com/steal-creds", "https://lumiere.in");

      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: "google",
        options: {
          redirectTo: "https://lumiere.in/auth/callback?next=%2Faccount",
        },
      });
    });

    it("should forward Supabase OAuth errors correctly", async () => {
      const mockError = { message: "Google OAuth provider is disabled in Supabase dashboard." };
      const mockSignInWithOAuth = vi.fn().mockResolvedValue({ data: null, error: mockError });
      const mockSupabase = {
        auth: {
          signInWithOAuth: mockSignInWithOAuth,
        },
      };

      const result = await triggerGoogleOAuth(mockSupabase, "/account", "https://lumiere.in");
      expect(result.error).toEqual(mockError);
    });
  });

  describe("GoogleSignInButton Server & SSR Rendering", () => {
    it("should render luxury atelier styling with 'Continue with Google' label", () => {
      const html = renderToString(<GoogleSignInButton redirectUrl="/account" />);
      expect(html).toContain("Continue with Google");
      expect(html).toContain('type="button"');
      expect(html).toContain('aria-label="Continue with Google"');
      expect(html).toContain("border-canvas-border");
      expect(html).toContain("rounded-sm");
      expect(html).toContain("tracking-wider");
      expect(html).toContain("uppercase");
      expect(html).toContain("<svg");
    });

    it("should render disabled attribute when disabled prop is true", () => {
      const html = renderToString(<GoogleSignInButton disabled={true} />);
      expect(html).toContain("disabled");
    });

    it("should support custom button text while maintaining atelier elegance", () => {
      const html = renderToString(<GoogleSignInButton text="Sign in via Google Atelier" />);
      expect(html).toContain("Sign in via Google Atelier");
      expect(html).toContain('aria-label="Sign in via Google Atelier"');
    });
  });

  describe("Auth Callback Route Handler (/auth/callback)", () => {
    it("should exchange valid code for session and redirect to safe internal destination", async () => {
      mockExchangeCodeForSession.mockResolvedValueOnce({ error: null });

      const request = new Request("https://lumiere.in/auth/callback?code=valid-auth-code&next=/checkout");
      const response = await handleAuthCallback(request);

      expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid-auth-code");
      expect(response.status).toBe(307); // NextResponse.redirect default status
      expect(response.headers.get("Location")).toBe("https://lumiere.in/checkout");
    });

    it("should respect x-forwarded-host header behind reverse proxies in production", async () => {
      const originalEnv = process.env.NODE_ENV;
      (process.env as any).NODE_ENV = "production";
      mockExchangeCodeForSession.mockResolvedValueOnce({ error: null });

      try {
        const request = new Request("http://localhost:3000/auth/callback?code=valid-auth-code&next=/checkout", {
          headers: {
            "x-forwarded-host": "atelier.lumiere.in",
          },
        });
        const response = await handleAuthCallback(request);

        expect(response.headers.get("Location")).toBe("https://atelier.lumiere.in/checkout");
      } finally {
        (process.env as any).NODE_ENV = originalEnv;
      }
    });

    it("should sanitize open redirect destination in next query parameter", async () => {
      mockExchangeCodeForSession.mockResolvedValueOnce({ error: null });

      const request = new Request("https://lumiere.in/auth/callback?code=valid-auth-code&next=//attacker.com");
      const response = await handleAuthCallback(request);

      expect(response.headers.get("Location")).toBe("https://lumiere.in/account");
    });

    it("should redirect to /login with error and preserve next destination if exchange fails", async () => {
      mockExchangeCodeForSession.mockResolvedValueOnce({ error: { message: "Invalid code" } });

      const request = new Request("https://lumiere.in/auth/callback?code=expired-code&next=/checkout");
      const response = await handleAuthCallback(request);

      expect(response.status).toBe(307);
      const location = response.headers.get("Location");
      expect(location).toContain("/login?error=");
      expect(location).toContain("redirect=%2Fcheckout");
    });

    it("should handle access_denied error gracefully with user-friendly message", async () => {
      const request = new Request("https://lumiere.in/auth/callback?error=access_denied&next=/checkout");
      const response = await handleAuthCallback(request);

      expect(response.status).toBe(307);
      const location = response.headers.get("Location");
      expect(location).toContain("Google%20sign-in%20was%20canceled");
      expect(location).toContain("redirect=%2Fcheckout");
    });

    it("should capture and display error_description if Google provider returns error query param", async () => {
      const request = new Request("https://lumiere.in/auth/callback?error=access_denied&error_description=User%20denied%20consent");
      const response = await handleAuthCallback(request);

      expect(response.status).toBe(307);
      const location = response.headers.get("Location");
      expect(location).toContain("/login?error=User%20denied%20consent");
    });

    it("should catch unexpected exchange exceptions and redirect safely to /login", async () => {
      mockExchangeCodeForSession.mockRejectedValueOnce(new Error("Supabase network failure"));

      const request = new Request("https://lumiere.in/auth/callback?code=faulty-code&next=/checkout");
      const response = await handleAuthCallback(request);

      expect(response.status).toBe(307);
      const location = response.headers.get("Location");
      expect(location).toContain("/login?error=");
      expect(location).toContain("redirect=%2Fcheckout");
    });
  });
});
