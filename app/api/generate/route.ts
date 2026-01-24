import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GitHubRepoData {
  name: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  license: string;
  homepage: string;
}

interface GenerateRequest {
  type: "url" | "description";
  input: string;
}

// Helper function to fetch GitHub repo data
async function fetchGitHubRepo(url: string): Promise<GitHubRepoData | null> {
  try {
    // Extract owner and repo from URL
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub URL");
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add token if you have one for higher rate limits
          // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Repository not found");
    }

    const data = await response.json();

    return {
      name: data.name,
      description: data.description || "No description provided",
      language: data.language || "Not specified",
      topics: data.topics || [],
      stars: data.stargazers_count,
      license: data.license?.name || "No license",
      homepage: data.homepage || "",
    };
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { type, input } = body;

    if (!input || !type) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    let context = "";

    // If GitHub URL, fetch repo data
    if (type === "url") {
      const repoData = await fetchGitHubRepo(input);

      if (!repoData) {
        return Response.json(
          { error: "Could not fetch repository data. Please check the URL." },
          { status: 400 },
        );
      }

      context = `
Repository Name: ${repoData.name}
Description: ${repoData.description}
Primary Language: ${repoData.language}
Topics/Tags: ${repoData.topics.join(", ") || "None"}
Stars: ${repoData.stars}
License: ${repoData.license}
${repoData.homepage ? `Homepage: ${repoData.homepage}` : ""}
GitHub URL: ${input}
      `.trim();
    } else {
      // Manual description
      context = `Project Description: ${input}`;
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2500,
      messages: [
        {
          role: "user",
          content: `You are an expert technical writer. Generate a comprehensive, professional README.md file for the following project:

${context}

Create a README that includes:
1. Project title with appropriate badges (shields.io format)
2. Clear, compelling description
3. Key features (bullet points)
4. Installation instructions
5. Usage examples with code blocks
6. API documentation (if applicable)
7. Contributing guidelines
8. License information

Format everything in proper markdown. Use appropriate headers (##, ###), code blocks with language specification, and make it visually appealing. Be specific and technical where appropriate.

Generate ONLY the README content, no preamble or explanation.`,
        },
      ],
    });

    const content = message.content[0] as any;
    const readme = content.text as string;

    return Response.json({ readme });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Failed to generate README. Please try again." },
      { status: 500 },
    );
  }
}
