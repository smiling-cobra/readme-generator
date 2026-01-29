interface GitHubRepoData {
  name: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  license: string;
  homepage: string;
}

export const fetchGitHubRepo = async (
  url: string,
): Promise<GitHubRepoData | null> => {
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
          // Token is needed for higher rate limits
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
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
};
