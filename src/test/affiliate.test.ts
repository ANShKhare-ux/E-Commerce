import { describe, it, expect } from 'vitest';
import {
  validateAffiliateUrl,
  getOutboundRedirectPath,
  getAllowedDomains,
} from '@/lib/affiliate';

describe('Affiliate URL Security & Validation', () => {
  it('approves legitimate HTTPS affiliate URLs on allowed merchant domains', () => {
    const urls = [
      'https://www.myntra.com/tshirts/bewakoof?affId=lumiere_m&campaign=summer',
      'https://www.ajio.com/nudie-jeans-raw-selvedge/p/461298492001?tracker=editorial',
      'https://www.tatacliq.com/reformation-bias-cut-silk-dress/p-mp00000001839211?affId=test',
      'https://www.amazon.in/dp/B08X9Q8319?tag=lumierein-21',
      'https://www.nykaafashion.com/raw-mango-saree/p/9283749?aff_source=lumiere',
      'https://www.marksandspencer.in/pure-linen-shirt/p/001.html?affId=partner',
    ];

    for (const url of urls) {
      const result = validateAffiliateUrl(url);
      expect(result.isValid).toBe(true);
      expect(result.sanitizedUrl).toBeDefined();
    }
  });

  it('preserves query tracking parameters in sanitized URLs', () => {
    const url = 'https://www.myntra.com/product?affId=lumiere_001&subId=editorial_campaign&utm_medium=affiliate';
    const result = validateAffiliateUrl(url);
    expect(result.isValid).toBe(true);
    expect(result.sanitizedUrl).toContain('affId=lumiere_001');
    expect(result.sanitizedUrl).toContain('subId=editorial_campaign');
    expect(result.sanitizedUrl).toContain('utm_medium=affiliate');
  });

  it('rejects prohibited or dangerous URL schemes', () => {
    const malicious = [
      'javascript:alert("XSS")',
      'javascript:window.location="https://attacker.com"',
      'data:text/html,<script>alert(1)</script>',
      'vbscript:msgbox("hello")',
      'file:///etc/passwd',
      'blob:https://lumierefashion.in/uuid',
    ];

    for (const url of malicious) {
      const result = validateAffiliateUrl(url);
      expect(result.isValid).toBe(false);
      expect(result.error).toMatch(/protocol|scheme|Malformed/i);
    }
  });

  it('rejects unapproved or unknown domains to prevent open redirects', () => {
    const untrusted = [
      'https://www.evil-hacker.com/steal-creds',
      'https://myntra.com.attacker.com/fake-product',
      'https://fakemyntra.com/offer',
      'https://not-amazon.in/item',
      'https://phishing-site.org',
    ];

    for (const url of untrusted) {
      const result = validateAffiliateUrl(url);
      expect(result.isValid).toBe(false);
      expect(result.error).toMatch(/not in the approved affiliate retailer directory/i);
    }
  });

  it('rejects URLs with embedded user credentials to prevent userinfo spoofing', () => {
    const credUrls = [
      'https://user:pass@myntra.com/product',
      'https://admin@tatacliq.com/dress',
      'https://test:123456@amazon.in/dp/B08X9Q8319',
    ];

    for (const url of credUrls) {
      const result = validateAffiliateUrl(url);
      expect(result.isValid).toBe(false);
      expect(result.error).toMatch(/embedded user authentication credentials/i);
    }
  });

  it('rejects insecure unencrypted HTTP protocol', () => {
    const result = validateAffiliateUrl('http://www.myntra.com/product');
    expect(result.isValid).toBe(false);
    expect(result.error).toMatch(/Only secure HTTPS is permitted/i);
  });

  it('handles empty or non-string inputs safely', () => {
    expect(validateAffiliateUrl(null as unknown as string).isValid).toBe(false);
    expect(validateAffiliateUrl(undefined as unknown as string).isValid).toBe(false);
    expect(validateAffiliateUrl('').isValid).toBe(false);
    expect(validateAffiliateUrl('   ').isValid).toBe(false);
  });

  it('generates internal outbound redirect path with encoded productId', () => {
    expect(getOutboundRedirectPath('prod-001')).toBe('/api/outbound/prod-001');
    expect(getOutboundRedirectPath('prod 123')).toBe('/api/outbound/prod%20123');
  });
});
