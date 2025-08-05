import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
        hostname: 'new.fnd777.pro',
      },
      {
        protocol: 'https',
        hostname: 'mybet24.online',
      },
      {
        protocol: 'https',
        hostname: 'www.upaybd.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bankasia-bd.com',
      },
    ],
  },
};

export default nextConfig;
