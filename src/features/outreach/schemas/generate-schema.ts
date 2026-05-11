import { z } from "zod";

export const generateSchema = z.object({
  niche: z.string().min(2).max(100),
  target: z.string().min(2).max(100),
  offer: z.string().min(5).max(500),
  platform: z.enum(["instagram", "linkedin", "twitter", "email"]),
  tone: z.enum(["professional", "casual", "direct", "authority"]),
});

export type GenerateSchemaType = z.infer<typeof generateSchema>;
