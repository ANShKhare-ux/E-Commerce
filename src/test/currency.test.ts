import { describe, it, expect } from 'vitest';
import { formatINR, calculateDiscount } from '@/lib/currency';

describe('Currency and Discount Utilities', () => {
  it('formats whole INR amounts with rupee symbol and Indian commas', () => {
    // 799 -> ₹799
    expect(formatINR(799)).toContain('799');
    expect(formatINR(799)).toContain('₹');

    // 1499 -> ₹1,499
    expect(formatINR(1499)).toMatch(/₹\s?1,499/);

    // 14500 -> ₹14,500
    expect(formatINR(14500)).toMatch(/₹\s?14,500/);

    // 149999 -> ₹1,49,999 (Indian numbering format)
    expect(formatINR(149999)).toMatch(/₹\s?1,49,999/);
  });

  it('handles zero and invalid price values gracefully', () => {
    expect(formatINR(0)).toMatch(/₹\s?0/);
    expect(formatINR(-500)).toMatch(/₹\s?0/);
    expect(formatINR(NaN)).toMatch(/₹\s?0/);
    expect(formatINR('invalid' as unknown as number)).toMatch(/₹\s?0/);
  });

  it('calculates correct discount percentage when original price is provided', () => {
    // 4999 original, 3499 current = ~30%
    const discount = calculateDiscount(3499, 4999);
    expect(discount).toBe(30);

    // 999 original, 699 current = 30%
    expect(calculateDiscount(699, 999)).toBe(30);

    // 1000 original, 500 current = 50%
    expect(calculateDiscount(500, 1000)).toBe(50);
  });

  it('returns null when original price is missing, lower, or equal', () => {
    expect(calculateDiscount(1000, undefined)).toBeNull();
    expect(calculateDiscount(1000, 1000)).toBeNull();
    expect(calculateDiscount(1500, 1000)).toBeNull();
    expect(calculateDiscount(-100, 500)).toBeNull();
  });
});
