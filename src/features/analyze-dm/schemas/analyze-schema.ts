import { z } from "zod";

export const analyzeSchema = z.object({
  dm: z.string().min(1, "DM cannot be empty"),
});

export type AnalyzeSchemaType = z.infer<typeof analyzeSchema>;
