import z from "zod";

const envSchema = z.object({
  VITE_RAPID_API_KEY: z.string(),
  VITE_BACKEND_URL: z.string().url(),
});

export const env = envSchema.parse({
  VITE_RAPID_API_KEY: import.meta.env.VITE_RAPID_API_KEY,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
});
