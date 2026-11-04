import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function getRedirectOrigin(request: Request): string {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  return !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  const redirectOrigin = getRedirectOrigin(request);
  return NextResponse.redirect(`${redirectOrigin}/login`, { status: 303 });
}

export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  const redirectOrigin = getRedirectOrigin(request);
  return NextResponse.redirect(`${redirectOrigin}/login`, { status: 303 });
}

