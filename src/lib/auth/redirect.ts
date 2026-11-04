// =============================================================================
// LUMIÈRE Atelier - Open Redirect Defense & Navigation Sanitizer
// Strictly validates post-authentication redirects to prevent Open Redirect attacks.
// =============================================================================

/**
 * Validates and sanitizes a destination URL, ensuring it is a safe relative internal route.
 * Rejects external URLs, protocol-relative (//) URLs, backslash-prefixed (/\) vectors,
 * and dangerous loops back to auth gateways (/login, /signup).
 */
export function getSafeRedirectUrl(
  redirectUrl?: string | null,
  fallback: string = "/account"
): string {
  if (!redirectUrl || typeof redirectUrl !== "string") {
    return fallback;
  }

  const trimmed = redirectUrl.trim();

  // Must begin with a single forward slash.
  // Rejects absolute URLs (https://, http://), protocol-relative (//), and backslash-prefixed (/\) vectors.
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/\\")
  ) {
    return fallback;
  }

  // Extract path without search params or hash, and strip trailing slash
  const lower = trimmed.toLowerCase();
  const pathPart = lower.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";

  // Prevent redirect loops back to authentication gateway pages.
  // Note: /reset-password is NOT blocked because it is the legitimate destination for password recovery callbacks.
  if (
    pathPart === "/login" ||
    pathPart.startsWith("/login/") ||
    pathPart === "/signup" ||
    pathPart.startsWith("/signup/") ||
    pathPart === "/forgot-password" ||
    pathPart.startsWith("/forgot-password/") ||
    pathPart === "/auth" ||
    pathPart.startsWith("/auth/")
  ) {
    return fallback;
  }

  return trimmed;
}
