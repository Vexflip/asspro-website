/**
 * Small HTTP guards shared by the public form route handlers.
 */

/**
 * Maximum accepted request body size. The contact/adhésion forms are small JSON
 * payloads; anything much larger is abuse (oversized outbound emails / memory
 * pressure), so we reject it before buffering the body.
 */
export const MAX_BODY_BYTES = 64 * 1024; // 64 KB

/**
 * Returns `true` when the request advertises a body larger than the limit.
 * Cheap Content-Length check performed before `request.json()` buffers anything.
 * (The Zod `.max()` field bounds are the second line of defence once parsed.)
 */
export function bodyTooLarge(request: Request): boolean {
  const declared = Number(request.headers.get("content-length"));
  return Number.isFinite(declared) && declared > MAX_BODY_BYTES;
}
