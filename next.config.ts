import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    KYLAS_API_KEY: process.env.KYLAS_API_KEY,
    KYLAS_API_URL: process.env.KYLAS_API_URL,
  },
};

export default nextConfig;
