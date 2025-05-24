import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    // Add your Localtunnel domain and any other allowed origins here
    allowedDevOrigins: [
      "https://.*.loca.lt",
      "localhost",
      // Add other development domains as needed
    ],
  },
  // Other Next.js config options can go here
};

export default withNextIntl(nextConfig);
