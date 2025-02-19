import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   turbo: {
  //     rules: {
  //       "*.lottie": {
  //         loaders: ["@lottiefiles/dotlottie-react"],
  //       },
  //     },
  //   },
  // },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "souq.iium.edu.my",
        pathname: "**",
        port: "",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
