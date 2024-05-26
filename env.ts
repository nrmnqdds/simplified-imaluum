import { type TypeOf, z } from "zod";

const envVariables = z.object({
  // SENTRY
  SENTRY_PROJECT_ID: z.string(),
  SENTRY_AUTH_TOKEN: z.string(),
  SENTRY_ORG: z.string(),
  SENTRY_DSN: z.string(),

  // REDIS
  REDIS_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof envVariables> {}
  }
}
