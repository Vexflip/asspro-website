import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * We use the config-based ("without nonces") CSP rather than a nonce-based one:
 * a nonce forces every page into dynamic rendering, which would disable this
 * mostly-static marketing site's static generation and CDN caching.
 *
 * - `script-src 'unsafe-inline'` is required by Next's inline bootstrap script;
 *   `'unsafe-eval'` is only added in dev (React's dev tooling uses eval).
 * - `style-src 'unsafe-inline'` is required by Tailwind's injected styles and
 *   framer-motion's inline `style` attributes.
 * - `img-src` allows the two remote image CDNs configured below plus data/blob.
 * If stricter script protection is ever needed, migrate to a nonce-based CSP in
 * a `proxy.ts` (Next 16's renamed middleware) — see the Next.js CSP guide.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Google Maps embed on the contact page is framed here; keep this list tight.
  "frame-src 'self' https://www.google.com",
  "object-src 'none'",
  "img-src 'self' blob: data: https://images.unsplash.com https://images.pexels.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Enabled for the production deployment: the app is served over HTTPS behind
  // a TLS-terminating reverse proxy. Starting at 1 year without `preload` — once
  // every subdomain is confirmed HTTPS-only in prod, extend max-age and add
  // `preload` (submitting to the preload list is irreversible for ~months).
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply the security headers to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    // Limits the number of build workers to prevent Out Of Memory (OOM) errors
    // on servers with many CPU cores but limited RAM.
    cpus: 1,
    workerThreads: false,
  },
  output: process.env.NEXT_STANDALONE === "true" ? "standalone" : undefined,
  // Keep nodemailer out of the bundle and load it as a real Node module.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
