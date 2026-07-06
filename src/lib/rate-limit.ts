/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Caveat: state lives in the process memory, so it only protects a single
 * server instance and resets on restart. That is sufficient for the current
 * single `output: "standalone"` server; swap for Redis/Upstash if the app is
 * ever scaled to multiple replicas.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // per IP per window

const hits = new Map<string, number[]>();

/**
 * Records a request for the given key (usually an IP address) and returns
 * `true` if it is allowed, `false` if the window limit has been exceeded.
 */
export function rateLimit(key: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
}
