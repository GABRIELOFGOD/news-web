import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
  },
  images: {
    domains: ['via.placeholder.com', 'res.cloudinary.com', 'next/image'],
  },
};

export default nextConfig;
