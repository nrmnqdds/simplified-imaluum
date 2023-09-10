/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
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
