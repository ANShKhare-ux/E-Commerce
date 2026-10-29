import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-admin-route", pathname === "/admin/login" ? "login" : "dashboard");

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase credentials are missing or placeholder in development
  const isSupabaseConfigured =
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes("placeholder-project");

  if (!isSupabaseConfigured) {
    // If accessing admin without active configuration, redirect to admin login
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refreshes the auth token by calling getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Protected Admin Control Room Routes (/admin/*)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protected Customer Account Routes (/account/*)
  if (pathname.startsWith("/account")) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Guest-Only Authentication Pages (/login, /signup)
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const targetUrl = request.nextUrl.clone();
    targetUrl.search = "";

    // Validate safe relative redirect
    if (redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//")) {
      targetUrl.pathname = redirectParam;
    } else {
      targetUrl.pathname = "/account";
    }
    return NextResponse.redirect(targetUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
