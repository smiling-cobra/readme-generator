"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";

interface GenerateData {
  type: string;
  input: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readme, setReadme] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: GenerateData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate README");
      }

      setReadme(result.readme);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReadme(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900">
            📝 README Generator
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {!readme ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-slate-900 mb-4">
                Generate Professional READMEs
                <span className="block text-blue-600 mt-2">in Seconds</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Stop spending hours writing documentation. Just paste your
                GitHub repo URL or describe your project, and get a beautiful
                README instantly.
              </p>
            </div>

            {/* Input Form Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <InputForm onGenerate={handleGenerate} isLoading={isLoading} />

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <p className="font-medium">Error:</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-slate-600 text-sm">
                  Generate comprehensive READMEs in under 10 seconds
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Professional Format
                </h3>
                <p className="text-slate-600 text-sm">
                  Proper markdown with badges, code blocks, and structure
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Smart & Accurate
                </h3>
                <p className="text-slate-600 text-sm">
                  AI-powered to understand your project context
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                ✨ Your README is Ready!
              </h2>
              <p className="text-slate-600">
                Copy it to your clipboard or download as README.md
              </p>
            </div>

            <ResultsDisplay readme={readme} onReset={handleReset} />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 text-center text-slate-500 text-sm">
        <p>Built with Next.js and Claude AI</p>
      </footer>
    </main>
  );
}
