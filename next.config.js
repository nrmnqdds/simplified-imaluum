/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    experimental: {
      serverActions: true,
    },
  },
};

module.exports = nextConfig;
