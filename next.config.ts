import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.cloud.appwrite.io",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
