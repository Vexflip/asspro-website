import type { NextConfig } from "next";

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
  typescript: {
    ignoreBuildErrors: true,
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
