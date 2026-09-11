import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-d9ee631e-75e4-4aa2-bfcd-a1e4b163df70.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
