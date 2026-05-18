import { z } from "zod";

export const analyzeResponseSchema = z.object({
  overallScore: z.number(),
  mainProblem: z.string(),
  problems: z.array(z.string()),
  improvements: z.array(z.string()),
  rewriteVersion: z.string(),
});

export type AnalyzeResponseType = z.infer<typeof analyzeResponseSchema>;
