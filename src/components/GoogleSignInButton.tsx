"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export interface GoogleSignInButtonProps {
  redirectUrl?: string;
  onStart?: () => void;
  onError?: (error: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  disabled?: boolean;
  className?: string;
  text?: string;
  supabaseClient?: any;
}

import { getSafeRedirectUrl } from "@/lib/auth/redirect";

export { getSafeRedirectUrl };

export async function triggerGoogleOAuth(
  supabase: any,
  redirectUrl: string = "/account",
  origin?: string
) {
  const safeRedirect = getSafeRedirectUrl(redirectUrl);
  const resolvedOrigin =
    origin ||
    (typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "");

  const callbackUrl = resolvedOrigin
    ? `${resolvedOrigin}/auth/callback?next=${encodeURIComponent(safeRedirect)}`
    : `/auth/callback?next=${encodeURIComponent(safeRedirect)}`;

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl,
    },
  });
}

export function GoogleSignInButton({
  redirectUrl = "/account",
  onStart,
  onError,
  onLoadingChange,
  disabled = false,
  className = "",
  text = "Continue with Google",
  supabaseClient,
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading || disabled) return;

    if (onStart) onStart();
    if (onError) onError("");
    setLoading(true);
    if (onLoadingChange) onLoadingChange(true);

    try {
      const supabase = supabaseClient || createClient();
      const origin =
        typeof window !== "undefined" && window.location?.origin
          ? window.location.origin
          : "";

      const { error } = await triggerGoogleOAuth(supabase, redirectUrl, origin);

      if (error) {
        if (onError) {
          onError(error.message || "Failed to initiate Google sign-in. Please try again.");
        }
        setLoading(false);
        if (onLoadingChange) onLoadingChange(false);
      }
    } catch (err: any) {
      if (onError) {
        onError(err?.message || "An unexpected error occurred during Google sign-in.");
      }
      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={loading ? "Connecting to Google..." : text}
      className={`w-full bg-white hover:bg-canvas-subtle text-noir-800 border border-canvas-border hover:border-noir-400 py-3 px-4 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all shadow-2xs flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-noir-300 border-t-noir-900 rounded-full animate-spin shrink-0" />
          <span>Connecting to Google...</span>
        </>
      ) : (
        <>
          <GoogleIcon className="w-4 h-4 shrink-0" />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}

export default GoogleSignInButton;
