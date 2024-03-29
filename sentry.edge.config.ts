import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a1558f232851f6058239386fb9b3351a@o4506737831444480.ingest.sentry.io/4506737839177728",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
