import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "payments.pre-bnvo.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
