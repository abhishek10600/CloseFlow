"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { analyzeSchema } from "../schemas/analyze-schema";
import { analyzePrompt } from "@/lib/prompts/analyze-prompt";
import { analyzeResponseSchema } from "../schemas/analyze-response-schema";

export async function analyzeDM(data: unknown) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const validatedData = analyzeSchema.parse(data);

    const prompt = analyzePrompt(validatedData);

    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      messages: [
        {
          role: "system",
          content: `
You are a world-class outreach analyst.

Your job is to diagnose why outreach messages fail.

Be honest and strategic.

Return ONLY valid JSON.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
    });

    const rawContent = completion.choices[0].message.content;

    if (!rawContent) {
      throw new Error("No analysis generated");
    }

    let parsedResult;

    try {
      parsedResult = JSON.parse(rawContent);
    } catch {
      throw new Error("Invalid AI response format");
    }

    const validatedResponse = analyzeResponseSchema.parse(parsedResult);

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!dbUser) {
      throw new Error("User not found");
    }

    await prisma.generation.create({
      data: {
        userId: dbUser.id,
        type: "ANALYZE",
        platform: "unknown",
        niche: "unknown",
        target: "unknown",
        offer: "unknown",
        tone: "analysis",
        input: validatedData,
        output: validatedResponse,
      },
    });

    return {
      success: true,
      data: validatedResponse,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
