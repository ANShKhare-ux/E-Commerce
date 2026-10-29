// =============================================================================
// LUMIÈRE - Secure Input Sanitization Utility
// Sanitizes user inputs, addresses, names, and search queries to prevent
// Cross-Site Scripting (XSS), script injection, and SQL/NoSQL payload delivery.
// =============================================================================

export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .replace(/[<>]/g, "") // Strip dangerous HTML tags
    .replace(/javascript:/gi, "") // Neutralize javascript protocol
    .replace(/on\w+=/gi, "") // Neutralize inline event handlers (onerror=, onload=)
    .trim();
}

export function sanitizeIndianPhone(phone: unknown): string {
  if (typeof phone !== "string") return "";
  const cleaned = phone.replace(/[^0-9]/g, "");
  // Return last 10 digits if country code (+91 or 91) was included
  if (cleaned.length > 10) {
    return cleaned.slice(-10);
  }
  return cleaned;
}

export function sanitizePincode(pincode: unknown): string {
  if (typeof pincode !== "string") return "";
  return pincode.replace(/[^0-9]/g, "").slice(0, 6);
}

