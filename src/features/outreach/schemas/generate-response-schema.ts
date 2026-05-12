import { z } from "zod";

export const generatedResponseSchema = z.object({
  firstMessage: z.string(),

  followUp: z.string(),

  personalization: z.string(),

  cta: z.string(),

  objectionHandling: z.string(),
});

export type GeneratedResponseType = z.infer<typeof generatedResponseSchema>;
