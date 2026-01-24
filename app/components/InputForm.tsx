"use client";

import { useState, FormEvent } from "react";

interface InputFormProps {
  onGenerate: (data: { type: string; input: string }) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [inputType, setInputType] = useState<"url" | "description">("url");
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onGenerate({ type: inputType, input: input.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Toggle Input Type */}
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={() => setInputType("url")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            inputType === "url"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          GitHub URL
        </button>
        <button
          type="button"
          onClick={() => setInputType("description")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            inputType === "description"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Describe Project
        </button>
      </div>

      {/* Input Field */}
      <div>
        <label
          htmlFor="input"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {inputType === "url"
            ? "Enter GitHub Repository URL"
            : "Describe Your Project"}
        </label>
        {inputType === "url" ? (
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
        ) : (
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., A React component library for building dashboards with charts, tables, and analytics widgets..."
            rows={5}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            disabled={isLoading}
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </span>
        ) : (
          "✨ Generate README"
        )}
      </button>

      {/* Example links */}
      {inputType === "url" && (
        <p className="text-sm text-slate-500 text-center">
          Try an example:
          <button
            type="button"
            onClick={() => setInput("https://github.com/vercel/next.js")}
            className="text-blue-600 hover:underline ml-1"
          >
            Next.js
          </button>
        </p>
      )}
    </form>
  );
}
