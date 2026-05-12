// "use server";

// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";
// import { openai } from "@/lib/openai";

// import { generateSchema } from "../schemas/generate-schema";
// import { generatePrompt } from "@/lib/prompts/generate-prompt";

// export async function generateScript(data: unknown) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     const validatedData = generateSchema.parse(data);

//     const prompt = generatePrompt(validatedData);

//     const completion = await openai.chat.completions.create({
//       model: "gpt-5.4",
//       messages: [
//         {
//           role: "system",
//           content: "You are a world-class cold outreach expert",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//     });

//     const result = completion.choices[0].message.content;

//     if (!result) {
//       throw new Error("Failed to generate response");
//     }

//     const dbUser = await prisma.user.findUnique({
//       where: {
//         clerkId: userId,
//       },
//     });

//     if (!dbUser) {
//       throw new Error("User not found");
//     }

//     await prisma.generation.create({
//       data: {
//         userId: dbUser.id,
//         type: "GENERATE",
//         platform: validatedData.platform,
//         niche: validatedData.niche,
//         target: validatedData.target,
//         offer: validatedData.offer,
//         tone: validatedData.tone,

//         input: validatedData,
//         output: {
//           content: result,
//         },
//       },
//     });

//     return {
//       success: true,
//       content: result,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Something went wrong",
//     };
//   }
// }

"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { openai } from "@/lib/openai";

import { generateSchema } from "../schemas/generate-schema";

import { generatePrompt } from "@/lib/prompts/generate-prompt";

import { generatedResponseSchema } from "../schemas/generate-response-schema";

export async function generateScript(data: unknown) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const validatedData = generateSchema.parse(data);

    const prompt = generatePrompt(validatedData);

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
You are a world-class cold outreach expert.

Your responses must:
- sound natural
- be concise
- feel confident
- avoid robotic wording
- avoid desperation

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
      throw new Error("No response generated");
    }

    let parsedResult;

    try {
      parsedResult = JSON.parse(rawContent);
    } catch {
      throw new Error("Invalid AI response format");
    }

    const validatedResponse = generatedResponseSchema.parse(parsedResult);

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

        type: "GENERATE",

        platform: validatedData.platform,

        niche: validatedData.niche,

        target: validatedData.target,

        offer: validatedData.offer,

        tone: validatedData.tone,

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
