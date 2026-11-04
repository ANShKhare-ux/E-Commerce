import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";

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
      const loginUrl = new URL("/admin/login", request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  // Determine if this route requires authentication checks or redirects
  const isProtectedAdmin = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isProtectedAccount = pathname.startsWith("/account");
  const isGuestAuthPage = pathname === "/login" || pathname === "/signup";
  const requiresAuthCheck = isProtectedAdmin || isProtectedAccount || isGuestAuthPage;

  // For all public storefront routes (/, /products, /category/*, /cart, /checkout, /about, etc.),
  // bypass remote Supabase network roundtrips completely for both guests and authenticated users.
  if (!requiresAuthCheck) {
    return supabaseResponse;
  }

  // Check if any Supabase authentication cookies are present in the request
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) => c.name.startsWith("sb-") || c.name.includes("auth-token")
  );

  // If no auth cookie exists, the user is guaranteed to be unauthenticated (guest)
  if (!hasAuthCookie) {
    // 1. Unauthenticated attempt to access protected admin routes -> redirect immediately (0ms network cost)
    if (isProtectedAdmin) {
      const loginUrl = new URL("/admin/login", request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Unauthenticated attempt to access customer account -> redirect to login immediately (0ms network cost)
    if (isProtectedAccount) {
      const fullPath = pathname + request.nextUrl.search;
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("redirect", fullPath);
      return NextResponse.redirect(loginUrl);
    }

    // 3. For guest authentication pages (/login, /signup), allow immediate continuation
    return supabaseResponse;
  }

  // Auth cookie is present on a protected or guest-auth route: verify and refresh session
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

  // Safe session verification with error handling
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch {
    user = null;
  }

  // 1. Protected Admin Control Room Routes (/admin/*)
  if (isProtectedAdmin) {
    if (!user) {
      const loginUrl = new URL("/admin/login", request.nextUrl.origin);
      const redirectResponse = NextResponse.redirect(loginUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value);
      });
      return redirectResponse;
    }
  }

  // 2. Protected Customer Account Routes (/account/*)
  if (isProtectedAccount) {
    if (!user) {
      const fullPath = pathname + request.nextUrl.search;
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("redirect", fullPath);
      const redirectResponse = NextResponse.redirect(loginUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value);
      });
      return redirectResponse;
    }
  }

  // 3. Guest-Only Authentication Pages (/login, /signup)
  if (user && isGuestAuthPage) {
    const rawRedirect =
      request.nextUrl.searchParams.get("redirect") ||
      request.nextUrl.searchParams.get("next");
    const safeDestination = getSafeRedirectUrl(rawRedirect, "/account");
    const targetUrl = new URL(safeDestination, request.nextUrl.origin);
    const redirectResponse = NextResponse.redirect(targetUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|site\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ttf|eot|ico|css|js)$).*)",
  ],
};
