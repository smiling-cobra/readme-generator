export const createContent = (context: string) => {
  return `You are an expert technical writer. Generate a comprehensive, professional README.md file for the following project:

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

Generate ONLY the README content, no preamble or explanation.`;
};
