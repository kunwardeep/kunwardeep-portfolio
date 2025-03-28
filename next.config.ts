import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static exports
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
