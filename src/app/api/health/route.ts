/**
 * Liveness probe used by the Docker HEALTHCHECK. Kept intentionally tiny so the
 * container's health check doesn't render the full homepage on every interval.
 *
 * GET route handlers are not cached by default in Next 16 (no Cache Components
 * here), so this runs at request time and reflects the live server.
 */
export function GET() {
  return Response.json({ status: "ok" });
}
