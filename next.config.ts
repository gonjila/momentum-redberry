import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "momentum.redberryinternship.ge" },
      { hostname: "www.pacific-research.com" },
      { hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
