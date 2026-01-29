import Anthropic from "@anthropic-ai/sdk";
import { createContent } from "@/app/api/generate/lib/createContent";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const generateReadme = async (context: string) => {
  try {
    // Call Claude API
    const message = await anthropic.messages.create({
      model: `${process.env.MODEL_NAME}`,
      max_tokens: 2500,
      messages: [
        {
          role: "user",
          content: createContent(context),
        },
      ],
    });

    return message;
  } catch (error) {
    console.error("Claude API Error:", error);
    return null;
  }
};
