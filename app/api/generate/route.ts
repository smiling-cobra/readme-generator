import { NextRequest } from "next/server";
import { createContext } from "@/app/helpers/createContext";
import { processError } from "@/app/helpers/processError";
import { generateReadme } from "@/app/helpers/generateReadme";

interface GenerateRequest {
  type: "url" | "description";
  input: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { type, input } = body;

    if (!input || !type) {
      processError("Missing required fields", 400);
    }

    const context = await createContext(type, input);

    // Call Claude API
    const message = await generateReadme(context as string);

    if (!message) {
      throw new Error("Failed to get response from AI model");
    }

    const content = message.content[0];

    if (!content || "text" in content === false) {
      throw new Error("Invalid content format from AI model");
    }

    const readme = content.text;

    return Response.json({ readme });
  } catch (error) {
    console.error("API Error:", error);
    processError("Failed to generate README. Please try again.", 500);
  }
}
