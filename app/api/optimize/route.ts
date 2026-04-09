import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const systemInstruction = `You are an expert Claude Prompt Engineer. Your task is to take a user's input and transform it into a comprehensive, well-structured XML prompt optimized for Claude AI.

When transforming a prompt, follow these guidelines:
1. Structure the prompt using XML tags for clarity
2. Include clear sections: <objective>, <context>, <instructions>, <constraints>, <output_format>
3. Make the prompt specific, detailed, and actionable
4. Add examples when helpful
5. Consider edge cases and potential ambiguities
6. Optimize for Claude's strengths in reasoning, analysis, and creative tasks
7. Include role-play instructions if appropriate

Return the optimized prompt wrapped in <optimized_prompt> tags.`;

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "userInput is required and must be a string" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });

    const prompt = `${systemInstruction}\n\nUser input: ${userInput}`;
    const result = await model.generateContent(prompt);
    const optimizedPrompt = result.response.text();

    return NextResponse.json({ optimizedPrompt }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to optimize prompt" },
      { status: 500 }
    );
  }
}
