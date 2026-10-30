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

  // Prevent redirect loops back to authentication gateway pages
  const lower = trimmed.toLowerCase();
  if (
    lower === "/login" ||
    lower.startsWith("/login?") ||
    lower === "/signup" ||
    lower.startsWith("/signup?") ||
    lower.startsWith("/auth/")
  ) {
    return fallback;
  }

  return trimmed;
}
