/**
 * Canonical production site URL, used for metadata, robots.txt and the sitemap.
 *
 * Override per-environment with `NEXT_PUBLIC_SITE_URL` (no trailing slash),
 * e.g. a staging domain. Defaults to the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://asspro.fr"
).replace(/\/$/, "");

/**
 * Canonical-URL metadata for a page, resolved against `metadataBase` (SITE_URL).
 * Next 16 does not emit canonical tags automatically, so each page declares one.
 *
 * Usage: `export const metadata = { …, alternates: canonical("/contact") }`.
 */
export function canonical(path: string): { canonical: string } {
  return { canonical: path };
}
