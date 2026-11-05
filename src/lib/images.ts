// =============================================================================
// LUMIÈRE - Safe Image Utility & Domain Resolver
// Ensures external product, campaign, and partner images adhere strictly to
// Next.js remotePatterns and never crash the storefront runtime via ErrorBoundary.
// =============================================================================

export const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";

export const INLINE_FALLBACK_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'><rect width='800' height='1000' fill='%23111111'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='28' letter-spacing='0.2em' fill='%23d4af37'>LUMI%C3%88RE</text></svg>";

export const ALLOWED_IMAGE_HOST_PATTERNS = [
  "images.unsplash.com",
  "*.supabase.co",
  "supabase.co",
  "share.google",
  "*.googleusercontent.com",
  "googleusercontent.com",
  "drive.google.com",
  "*.google.com",
  "google.com",
  "*.phonepe.com",
  "phonepe.com",
] as const;

/**
 * Evaluates whether a hostname matches an allowed host pattern (including wildcards).
 * Matches Next.js picomatch remotePatterns logic:
 * - '*.example.com' matches 'sub.example.com' and 'a.b.example.com', but not 'example.com'
 * - 'example.com' matches exact 'example.com'
 */
export function matchesHostname(hostname: string, pattern: string): boolean {
  const normHost = hostname.toLowerCase().trim();
  const normPat = pattern.toLowerCase().trim();

  if (normPat.startsWith("*.")) {
    const base = normPat.slice(2);
    return normHost.endsWith("." + base) && normHost.length > base.length + 1;
  }

  return normHost === normPat;
}

/**
 * Normalizes known external URLs:
 * 1. Converts protocol-relative URLs ('//...') to 'https://...'
 * 2. Upgrades 'http://' to 'https://' for trusted allowed hostnames
 * 3. Converts Google Drive sharing links (/file/d/{id}, /open?id={id}) to direct view URLs
 */
export function normalizeImageUrl(url: unknown): string {
  if (typeof url !== "string") return "";
  let trimmed = url.trim();
  if (!trimmed) return "";

  // Fast-path: data URLs, blob URLs, and root-relative paths need no domain normalization or regex matching
  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    (trimmed.startsWith("/") && !trimmed.startsWith("//"))
  ) {
    return trimmed;
  }

  // Upgrade protocol-relative URLs
  if (trimmed.startsWith("//")) {
    trimmed = "https:" + trimmed;
  }

  // Upgrade http:// to https:// for known allowed hosts
  if (/^http:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (ALLOWED_IMAGE_HOST_PATTERNS.some((p) => matchesHostname(parsed.hostname, p))) {
        trimmed = trimmed.replace(/^http:\/\//i, "https://");
      }
    } catch {
      // Ignore parse failure; isSafeImageUrl will reject it
    }
  }

  // Google Drive multi-user & standard file URLs:
  // e.g. https://drive.google.com/file/d/{id}/view, /file/u/0/d/{id}/view
  const driveFileMatch = trimmed.match(
    /^https?:\/\/drive\.google\.com\/file\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)/i
  );
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }

  // Google Drive open?id={id}
  const driveOpenMatch = trimmed.match(
    /^https?:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/i
  );
  if (driveOpenMatch && driveOpenMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }

  // Google Drive uc?id={id} without export=view
  const driveUcMatch = trimmed.match(
    /^https?:\/\/drive\.google\.com\/uc\?(?:.*&)?id=([a-zA-Z0-9_-]+)/i
  );
  if (driveUcMatch && driveUcMatch[1] && !trimmed.includes("export=view")) {
    return `https://drive.google.com/uc?export=view&id=${driveUcMatch[1]}`;
  }

  return trimmed;
}

/**
 * Validates whether an image URL is safe and permitted by Next.js image remotePatterns and CSP.
 * Returns false for malformed URLs, unconfigured hostnames, and invalid protocols.
 */
export function isSafeImageUrl(url: unknown): boolean {
  if (!url) return false;

  let urlStr = "";
  if (typeof url === "string") {
    urlStr = url.trim();
  } else if (typeof url === "object" && url !== null && "src" in url) {
    urlStr = String((url as { src: unknown }).src).trim();
  } else {
    return false;
  }

  if (!urlStr) return false;

  // Local/relative paths (e.g. /brand/logo.svg) are always supported by Next.js
  if (urlStr.startsWith("/") && !urlStr.startsWith("//")) {
    return true;
  }

  // Inline data URLs and blob URLs
  if (urlStr.startsWith("data:image/") || urlStr.startsWith("blob:")) {
    return true;
  }

  try {
    const parsed = new URL(urlStr);

    // Only HTTPS is permitted by Next.js remotePatterns and CSP configuration
    if (parsed.protocol !== "https:") {
      return false;
    }

    const hostname = parsed.hostname;
    if (!hostname) return false;

    return ALLOWED_IMAGE_HOST_PATTERNS.some((pattern) =>
      matchesHostname(hostname, pattern)
    );
  } catch {
    // Malformed URL string
    return false;
  }
}

/**
 * Returns the normalized URL if it matches configured domains,
 * or safely falls back to a verified atelier image if unconfigured or malformed.
 * Guarantees that the returned fallback itself is safe.
 */
export function getSafeImageUrl(
  url: unknown,
  fallback: string = DEFAULT_FALLBACK_IMAGE
): string {
  const safeFallback =
    typeof fallback === "string" && isSafeImageUrl(fallback)
      ? fallback
      : DEFAULT_FALLBACK_IMAGE;

  if (typeof url !== "string" && (!url || typeof url !== "object" || !("src" in url))) {
    return safeFallback;
  }

  const rawUrl = typeof url === "string" ? url : String((url as { src: unknown }).src);
  const normalized = normalizeImageUrl(rawUrl);

  if (isSafeImageUrl(normalized)) {
    return normalized;
  }

  return safeFallback;
}
