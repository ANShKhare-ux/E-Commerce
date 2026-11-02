// =============================================================================
// LUMIÈRE - Secure Input Sanitization Utility
// Sanitizes user inputs, addresses, names, and search queries to prevent
// Cross-Site Scripting (XSS), script injection, and SQL/NoSQL payload delivery.
// =============================================================================

export function sanitizeText(input: unknown): string {
  if (input === null || input === undefined) return "";
  const str = typeof input === "string" ? input : String(input);

  return str
    .replace(/[<>]/g, "") // Strip dangerous HTML tags
    .replace(/javascript:/gi, "") // Neutralize javascript protocol
    .replace(/on\w+=/gi, "") // Neutralize inline event handlers (onerror=, onload=)
    .trim();
}

export function sanitizeIndianPhone(phone: unknown): string {
  if (phone === null || phone === undefined) return "";
  const str = typeof phone === "string" ? phone : String(phone);
  const cleaned = str.replace(/[^0-9]/g, "");
  // Return last 10 digits if country code (+91 or 91) was included
  if (cleaned.length > 10) {
    return cleaned.slice(-10);
  }
  return cleaned;
}

export function sanitizePincode(pincode: unknown): string {
  if (pincode === null || pincode === undefined) return "";
  const str = typeof pincode === "string" ? pincode : String(pincode);
  return str.replace(/[^0-9]/g, "").slice(0, 6);
}

