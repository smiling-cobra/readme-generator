"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ResultsDisplayProps {
  readme: string;
  onReset: () => void;
}

export default function ResultsDisplay({
  readme,
  onReset,
}: ResultsDisplayProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(readme);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-between items-center bg-slate-50 p-4 rounded-lg">
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              showPreview
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setShowPreview(false)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              !showPreview
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Markdown
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md font-medium text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>

          <button
            onClick={onReset}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md font-medium text-slate-700 hover:bg-slate-50 transition-all"
          >
            Generate Another
          </button>
        </div>
      </div>

      {/* Content Display */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {showPreview ? (
          <div className="p-8 prose prose-slate max-w-none">
            <MarkdownPreview content={readme} />
          </div>
        ) : (
          <pre className="p-6 overflow-x-auto text-sm bg-slate-900 text-slate-100">
            <code>{readme}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

interface MarkdownPreviewProps {
  content: string;
}

function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }: any) {
          return inline ? (
            <code
              className="bg-slate-100 px-1 py-0.5 rounded text-sm"
              {...props}
            >
              {children}
            </code>
          ) : (
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code {...props}>{children}</code>
            </pre>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
