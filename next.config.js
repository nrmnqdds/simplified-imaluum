/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

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
  sentry: {
    tunnelRoute: "/monitoring-tunnel",
    autoInstrumentServerFunctions: true,
  },
};

const sentryWebpackPluginOptions = {
  //bnew fix2
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: "nuriman-quddus",
  project: "simplified-imaluum",

  // An auth token is required for uploading source maps.
  authToken:
    "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",

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
