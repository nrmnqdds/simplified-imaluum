import { type TypeOf, z } from "zod";

const envVariables = z.object({
  // REDIS
  REDIS_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof envVariables> {}
  }
}
