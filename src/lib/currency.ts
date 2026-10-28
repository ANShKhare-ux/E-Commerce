/**
 * Formats a numeric price into standard Indian Rupee (INR) representation.
 * Example: 1499 -> "₹1,499", 149999 -> "₹1,49,999"
 */
export function formatINR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    return '₹0';
  }

  // Format using Indian Numbering System (Lakhs & Crores)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}

/**
 * Calculates percentage discount between original and current price.
 * Returns rounded integer percentage (e.g. 35 for 35% off), or null if no discount or invalid.
 */
export function calculateDiscount(currentPrice: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= currentPrice || currentPrice <= 0) {
    return null;
  }

  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  return discount > 0 && discount < 100 ? discount : null;
}
