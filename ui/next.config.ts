import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: ["@template/ui", "@template/core", "@template/contracts"],
};

export default nextConfig;
