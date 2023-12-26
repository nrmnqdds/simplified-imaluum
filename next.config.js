/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
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
};

module.exports = nextConfig;
