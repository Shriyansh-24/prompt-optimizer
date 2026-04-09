"use client";

import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError("Please enter a prompt to optimize");
      return;
    }

    setLoading(true);
    setError("");
    setOptimizedPrompt("");

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorCode = data.code || "UNKNOWN_ERROR";
        const errorMessage = data.error || "Failed to optimize prompt";
        setError(`[${errorCode}] ${errorMessage}`);
        return;
      }

      setOptimizedPrompt(data.optimizedPrompt);
    } catch (err) {
      setError(`[NETWORK_ERROR] ${err instanceof Error ? err.message : "Network request failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedPrompt);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Prompt Optimizer
          </h1>
          <p className="text-xl text-gray-600">
            Transform your prompts into Claude-optimized versions using Google Gemini
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleOptimize} className="space-y-6">
            <div>
              <label
                htmlFor="userInput"
                className="block text-lg font-semibold text-gray-700 mb-3"
              >
                Enter Your Prompt
              </label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Paste your prompt here... It can be anything you want to optimize for Claude."
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 text-xl">⚠️</div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-900 mb-1">Error</p>
                    <p className="text-red-700 font-mono text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              {loading ? "Optimizing..." : "Optimize Prompt"}
            </button>
          </form>

          {optimizedPrompt && (
            <div className="mt-8 space-y-4">
              <div className="border-t-2 border-gray-200 pt-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Optimized Prompt
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 whitespace-pre-wrap text-gray-700 max-h-96 overflow-y-auto font-mono text-sm">
                  {optimizedPrompt}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Powered by Google Gemini AI</p>
        </div>
      </div>
    </main>
  );
}
