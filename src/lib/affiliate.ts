/**
 * Default approved merchant domains for outbound affiliate traffic.
 * Can be overridden or extended via the AFFILIATE_ALLOWED_DOMAINS env variable.
 */
export const DEFAULT_ALLOWED_DOMAINS = [
  'myntra.com',
  'ajio.com',
  'amazon.in',
  'tatacliq.com',
  'nykaafashion.com',
  'marksandspencer.in',
  'zara.com',
  'hm.com',
  'snitch.co.in',
  'bewakoof.com',
];

export function getAllowedDomains(): string[] {
  const envDomains = process.env.AFFILIATE_ALLOWED_DOMAINS;
  if (envDomains) {
    const parsed = envDomains
      .split(',')
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);
    if (parsed.length > 0) return parsed;
  }
  return DEFAULT_ALLOWED_DOMAINS;
}

export interface AffiliateValidationResult {
  isValid: boolean;
  sanitizedUrl?: string;
  domain?: string;
  error?: string;
}

/**
 * Validates an affiliate destination URL.
 * - Enforces HTTPS (or HTTP) protocol.
 * - Rejects dangerous protocols (javascript:, data:, file:, etc.).
 * - Validates host against approved merchant domain whitelist.
 * - Prevents subdomain spoofing (e.g. not-myntra.com vs myntra.com).
 * - Preserves legitimate query parameters (e.g. affId, tag, subId).
 */
export function validateAffiliateUrl(rawUrl: string): AffiliateValidationResult {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { isValid: false, error: 'Destination URL is required' };
  }

  const trimmed = rawUrl.trim();

  // Explicit check for dangerous protocols before parsing
  const lowercase = trimmed.toLowerCase();
  if (
    lowercase.startsWith('javascript:') ||
    lowercase.startsWith('data:') ||
    lowercase.startsWith('vbscript:') ||
    lowercase.startsWith('file:') ||
    lowercase.startsWith('blob:')
  ) {
    return { isValid: false, error: 'Prohibited URL protocol detected' };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { isValid: false, error: 'Malformed or invalid URL' };
  }

  // Strictly require HTTPS protocol for all external merchant destinations
  if (parsed.protocol !== 'https:') {
    return { isValid: false, error: `Invalid protocol: ${parsed.protocol}. Only secure HTTPS is permitted.` };
  }

  // Reject embedded authentication credentials (RFC 3986 / WHATWG prevents userinfo trickery)
  if (parsed.username || parsed.password) {
    return {
      isValid: false,
      error: 'Destination URLs containing embedded user authentication credentials are strictly prohibited.',
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const allowedDomains = getAllowedDomains();

  // Check if hostname matches or is a subdomain of an allowed domain
  const isDomainAllowed = allowedDomains.some((domain) => {
    return hostname === domain || hostname.endsWith(`.${domain}`);
  });

  if (!isDomainAllowed) {
    return {
      isValid: false,
      error: `Merchant domain '${hostname}' is not in the approved affiliate retailer directory.`,
    };
  }

  return {
    isValid: true,
    sanitizedUrl: parsed.toString(),
    domain: hostname,
  };
}

/**
 * Generates the internal outbound routing URL for a product.
 * Directs clicks through the server endpoint for verification and attribution.
 */
export function getOutboundRedirectPath(productId: string): string {
  return `/api/outbound/${encodeURIComponent(productId)}`;
}
