import { TypeOf, z } from "zod";

const envVariables = z.object({
  // SENTRY
  SENTRY_PROJECT_ID: z.string(),
  SENTRY_AUTH_TOKEN: z.string(),
  SENTRY_ORG: z.string(),

  // REDIS
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof envVariables> {}
  }
}
