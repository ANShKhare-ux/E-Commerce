/**
 * Lightweight in-memory sliding-window rate limiter for sensitive API routes.
 * Suitable for single-instance Node.js deployments and serverless environments.
 * For distributed multi-region production deployments, configure Redis / Upstash.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const store = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const cleanup = setInterval(() => {
    const now = Date.now();
    store.forEach((record: RateLimitRecord, key: string) => {
      record.timestamps = record.timestamps.filter((ts: number) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    });
  }, 5 * 60 * 1000);
  // Unref so cleanup timer does not prevent process exit in test runners
  if (cleanup.unref) cleanup.unref();
}

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60000, maxRequests: 30 }
): RateLimitResult {
  const { windowMs, maxRequests } = options;
  const now = Date.now();
  const windowStart = now - windowMs;

  const record = store.get(identifier) || { timestamps: [] };
  // Prune expired timestamps
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const resetMs = Math.max(0, oldest + windowMs - now);
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetMs,
    };
  }

  record.timestamps.push(now);
  store.set(identifier, record);

  return {
    success: true,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - record.timestamps.length),
    resetMs: windowMs,
  };
}

/**
 * Extracts a client identifier from standard request headers.
 */
export function getClientIp(headers: Headers): string {
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  return '127.0.0.1';
}
