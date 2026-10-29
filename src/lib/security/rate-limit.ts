// =============================================================================
// LUMIÈRE - High-Performance Sliding Window Rate Limiter
// Protects critical checkout, payment, authentication, and inventory routes
// against credential stuffing, brute force, and automated scraping.
// =============================================================================

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60,000 = 1 minute)
  maxRequests?: number; // Max requests allowed per window (default: 60)
  keyPrefix?: string; // Optional namespace prefix
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 60;
  const key = `${options.keyPrefix || "rl"}:${identifier}`;

  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: Math.ceil((now + windowMs) / 1000),
    };
  }

  // Existing window
  if (record.count >= maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - record.count,
    reset: Math.ceil(record.resetTime / 1000),
  };
}

