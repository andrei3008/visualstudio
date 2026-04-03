/**
 * Simple IP-based rate limiter for API routes.
 * In-memory store — resets on server restart (acceptable for a contact form).
 */

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Check if a request is within rate limits.
 *
 * @param ip       - Client IP address
 * @param limit    - Max requests per window (default: 5)
 * @param windowMs - Time window in ms (default: 60 minutes)
 */
export function rateLimit(
  ip: string,
  limit = 5,
  windowMs = 60 * 60 * 1000
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const key = ip;
  let entry = store.get(key);

  // No entry or expired — start fresh
  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  // Within window — increment
  entry.count++;

  if (entry.count > limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}
