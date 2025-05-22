import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
<<<<<<< HEAD
 images: {
    domains: ['res.cloudinary.com'],
  },
};

const withNextIntl = createNextIntlPlugin();
=======
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

>>>>>>> bf78b3866195c9d5774f7187cefe6c20b9654fc4
export default withNextIntl(nextConfig);
