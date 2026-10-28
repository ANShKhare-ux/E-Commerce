import { describe, it, expect } from 'vitest';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

describe('Rate Limiter Utility', () => {
  it('allows requests within the specified window limit', () => {
    const id = 'test-client-allowed';
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      const result = checkRateLimit(id, { windowMs: 10000, maxRequests: limit });
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(limit - 1 - i);
    }
  });

  it('blocks requests exceeding the specified rate limit', () => {
    const id = 'test-client-blocked';
    const limit = 3;

    for (let i = 0; i < limit; i++) {
      checkRateLimit(id, { windowMs: 10000, maxRequests: limit });
    }

    const blocked = checkRateLimit(id, { windowMs: 10000, maxRequests: limit });
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetMs).toBeGreaterThan(0);
  });

  it('extracts IP correctly from x-forwarded-for and x-real-ip headers', () => {
    const headersForwarded = new Headers();
    headersForwarded.set('x-forwarded-for', '203.0.113.195, 70.41.3.18');
    expect(getClientIp(headersForwarded)).toBe('203.0.113.195');

    const headersReal = new Headers();
    headersReal.set('x-real-ip', '198.51.100.1');
    expect(getClientIp(headersReal)).toBe('198.51.100.1');

    const emptyHeaders = new Headers();
    expect(getClientIp(emptyHeaders)).toBe('127.0.0.1');
  });
});
