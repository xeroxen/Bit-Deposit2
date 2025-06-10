import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bitdeposit-production.s3.ap-southeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'fnd777.online',
      },
      {
        protocol: 'https',
        hostname: 'fnd777.pro',
      },
      {
        protocol: 'https',
        hostname: 'mybet24.online',
      },
    ],
  },
};

export default nextConfig;
