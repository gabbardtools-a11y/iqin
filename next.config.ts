import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow preview-* .space-z.ai subdomains (used by the preview iframe).
  // Next.js expects hostnames only (no protocol), and supports wildcards.
  allowedDevOrigins: [
    "preview-chat-d9ee631e-75e4-4aa2-bfcd-a1e4b163df70.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
