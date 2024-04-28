import z from "zod";

const envSchema = z.object({
  VITE_RAPID_API_KEY: z.string(),
});

export const env = envSchema.parse({
  VITE_RAPID_API_KEY: import.meta.env.VITE_RAPID_API_KEY,
});
