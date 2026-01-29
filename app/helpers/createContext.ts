import { fetchGitHubRepo } from "./fetchGithubRepo";

export const createContext = async (
  type: "url" | "description",
  input: string,
) => {
  let context = "";

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

  return context;
};
