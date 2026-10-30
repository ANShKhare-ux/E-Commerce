import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || searchParams.get("redirect") || "/account";

  // Determine correct public origin (respect reverse proxies and custom domain headers in production)
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectOrigin =
    !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  if (code) {
    try {
      const supabase = await createServerSupabaseClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const safeDestination = getSafeRedirectUrl(next);
        return NextResponse.redirect(`${redirectOrigin}${safeDestination}`);
      }
    } catch {
      // Supabase connection or cookie failure falls through to error redirect
    }
  }

  // Handle OAuth provider error parameters (RFC 6749)
  const errorDescription = searchParams.get("error_description");
  const errorCode = searchParams.get("error") || searchParams.get("error_code");

  let failureReason: string;
  if (errorDescription) {
    failureReason = errorDescription;
  } else if (errorCode === "access_denied") {
    failureReason = "Google sign-in was canceled. Please try again or use your password.";
  } else if (errorCode) {
    failureReason = `Google sign-in could not be completed (${errorCode}). Please try again.`;
  } else {
    failureReason =
      "Authentication link has expired or is invalid. Please sign in or request a new link.";
  }

  // Preserve safe intended destination on login retry
  const safeNext = getSafeRedirectUrl(next);
  const redirectQuery =
    safeNext !== "/account" ? `&redirect=${encodeURIComponent(safeNext)}` : "";

  return NextResponse.redirect(
    `${redirectOrigin}/login?error=${encodeURIComponent(failureReason)}${redirectQuery}`
  );
}

