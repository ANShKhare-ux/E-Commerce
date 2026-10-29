import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Validate safe relative internal redirect
      const isSafeRedirect = next.startsWith("/") && !next.startsWith("//");
      const forwardUrl = `${origin}${isSafeRedirect ? next : "/account"}`;
      return NextResponse.redirect(forwardUrl);
    }
  }

  // If code is missing or exchange fails
  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent(
      "Authentication link has expired or is invalid. Please sign in or request a new link."
    )}`
  );
}
