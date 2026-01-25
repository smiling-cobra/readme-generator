# README Generator

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Claude AI](https://img.shields.io/badge/Claude_AI-FF6B35?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.ai/)
[![GitHub](https://img.shields.io/github/stars/smiling-cobra/readme-generator?style=for-the-badge)](https://github.com/smiling-cobra/readme-generator)

An intelligent README generator that creates comprehensive, professional documentation for your projects using AI-powered analysis. Built with Next.js and powered by Anthropic's Claude AI, this tool automatically generates well-structured README files by analyzing your repository structure, code, and project metadata.

## ✨ Features

- **AI-Powered Analysis**: Leverages Claude AI to understand your project structure and generate contextually relevant documentation
- **Intelligent Content Generation**: Creates appropriate sections including installation, usage, API documentation, and more
- **Multiple Input Methods**: Support for GitHub repository URLs, local file analysis, or manual project description
- **Customizable Templates**: Choose from various README templates or create custom formats
- **Real-time Preview**: Live markdown preview with syntax highlighting
- **Export Options**: Download as `.md` file or copy to clipboard
- **Badge Generation**: Automatically generates relevant shields.io badges based on detected technologies
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager
- Anthropic API key (for Claude AI integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/smiling-cobra/readme-generator.git
   cd readme-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Anthropic API key to `.env.local`:
   ```env
   ANTHROPIC_API_KEY=your_claude_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Basic Usage

1. **Enter Project Information**
   - Paste a GitHub repository URL, or
   - Manually enter project details (name, description, technologies)

2. **Configure Generation Options**
   ```typescript
   interface GenerationOptions {
     includeInstallation: boolean;
     includeUsage: boolean;
     includeAPI: boolean;
     includeBadges: boolean;
     template: 'standard' | 'minimal' | 'comprehensive';
   }
   ```

3. **Generate README**
   - Click "Generate README" to create your documentation
   - Preview the result in real-time
   - Make adjustments using the built-in editor

### Advanced Configuration

```typescript
// Example API usage
const generateReadme = async (projectData: ProjectData) => {
  const response = await fetch('/api/generate-readme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      repository: projectData.repository,
      options: {
        includeInstallation: true,
        includeUsage: true,
        includeAPI: projectData.hasAPI,
        includeBadges: true,
        template: 'comprehensive'
      }
    })
  });
  
  return await response.json();
};
```

### GitHub Integration

```bash
# Generate README for a public repository
curl -X POST http://localhost:3000/api/generate-readme \
  -H "Content-Type: application/json" \
  -d '{
    "repository": "https://github.com/username/repository",
    "options": {
      "template": "standard",
      "includeBadges": true
    }
  }'
```

## 🔧 API Reference

### POST `/api/generate-readme`

Generates a README file based on provided project data.

**Request Body:**
```typescript
interface GenerateReadmeRequest {
  repository?: string;           // GitHub repository URL
  projectData?: {               // Manual project data
    name: string;
    description: string;
    language: string;
    features?: string[];
    installation?: string;
    usage?: string;
  };
  options: GenerationOptions;
}
```

**Response:**
```typescript
interface GenerateReadmeResponse {
  success: boolean;
  readme: string;              // Generated markdown content
  metadata: {
    wordCount: number;
    sections: string[];
    generationTime: number;
  };
  error?: string;
}
```

**Example:**
```javascript
// Success Response
{
  "success": true,
  "readme": "# Project Name\n\n![License](https://img.shields.io/badge/...)...",
  "metadata": {
    "wordCount": 847,
    "sections": ["Installation", "Usage", "API", "Contributing"],
    "generationTime": 1.2
  }
}
```

### GET `/api/analyze-repository`

Analyzes a GitHub repository to extract project information.

**Query Parameters:**
- `url` - GitHub repository URL

**Response:**
```typescript
interface RepositoryAnalysis {
  name: string;
  description: string;
  language: string;
  topics: string[];
  hasDocumentation: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm' | null;
  framework?: string;
}
```

## 🛠️ Development

### Project Structure

```
readme-generator/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── components/     # React components
│   │   └── lib/           # Utility functions
│   ├── styles/            # CSS modules and globals
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── .env.example          # Environment variables template
└── next.config.js        # Next.js configuration
```

### Running Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Run Prettier
npm run format

# Type checking
npm run type-check
```

## 🤝 Contributing

We welcome contributions to the README Generator! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use conventional commit messages

### Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 📄 License

This project is currently unlicensed. All rights reserved to the project authors. Please contact the maintainers for information about usage permissions.

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com/) for providing the Claude AI API
- [Next.js](https://nextjs.org/) team for the excellent React framework
- [Shields.io](https://shields.io/) for badge generation services
- All contributors who help improve this project

## 📞 Support

- 🐛 [Report a Bug](https://github.com/smiling-cobra/readme-generator/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/smiling-cobra/readme-generator/issues/new?template=feature_request.md)
- 💬 [Discussions](https://github.com/smiling-cobra/readme-generator/discussions)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/smiling-cobra">smiling-cobra</a>
</p>