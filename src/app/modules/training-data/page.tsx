"use client";

import { useState } from "react";
import { Database } from "lucide-react";

const SCENARIOS = [
  {
    name: "Balanced Dataset",
    description: "Equal examples of cats and dogs — the AI learns both well!",
    data: [
      { id: 1, label: "Cat photo", emoji: "🐱", category: "good" as const },
      { id: 2, label: "Dog photo", emoji: "🐕", category: "good" as const },
      { id: 3, label: "Cat photo", emoji: "🐱", category: "good" as const },
      { id: 4, label: "Dog photo", emoji: "🐕", category: "good" as const },
      { id: 5, label: "Cat photo", emoji: "🐱", category: "good" as const },
      { id: 6, label: "Dog photo", emoji: "🐕", category: "good" as const },
    ],
    result: "✅ AI correctly identifies both cats and dogs (95% accuracy)",
    accuracy: 95,
  },
  {
    name: "Biased Dataset",
    description: "Mostly cats — the AI thinks everything is a cat!",
    data: [
      { id: 1, label: "Cat photo", emoji: "🐱", category: "biased" as const },
      { id: 2, label: "Cat photo", emoji: "🐱", category: "biased" as const },
      { id: 3, label: "Cat photo", emoji: "🐱", category: "biased" as const },
      { id: 4, label: "Cat photo", emoji: "🐱", category: "biased" as const },
      { id: 5, label: "Cat photo", emoji: "🐱", category: "biased" as const },
      { id: 6, label: "Dog photo", emoji: "🐕", category: "good" as const },
    ],
    result: "⚠️ AI calls everything a cat! It barely saw any dogs.",
    accuracy: 55,
  },
  {
    name: "Noisy Dataset",
    description: "Some labels are wrong — the AI gets confused!",
    data: [
      { id: 1, label: "Cat (correct)", emoji: "🐱", category: "good" as const },
      { id: 2, label: "Dog (correct)", emoji: "🐕", category: "good" as const },
      { id: 3, label: "Cat labeled as Dog!", emoji: "🐱❌", category: "bad" as const },
      { id: 4, label: "Dog labeled as Cat!", emoji: "🐕❌", category: "bad" as const },
      { id: 5, label: "Random noise", emoji: "📺", category: "bad" as const },
      { id: 6, label: "Cat (correct)", emoji: "🐱", category: "good" as const },
    ],
    result: "❌ AI is confused — wrong labels taught it wrong things!",
    accuracy: 60,
  },
  {
    name: "Too Little Data",
    description: "Only 2 examples — not enough to learn patterns!",
    data: [
      { id: 1, label: "Cat photo", emoji: "🐱", category: "good" as const },
      { id: 2, label: "Dog photo", emoji: "🐕", category: "good" as const },
    ],
    result: "❌ AI can't generalize from just 2 examples — it's guessing!",
    accuracy: 50,
  },
];

export default function TrainingDataPage() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const scenario = SCENARIOS[selectedScenario];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Training Data</h1>
          <p className="text-xs text-indigo-400">The Textbook Collection</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          An AI learns from examples you give it — called training data. If the data is biased, incomplete, or mislabeled, the AI will learn the wrong things. Garbage in = garbage out.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Pick different datasets below and hit &apos;Train&apos; to see how data quality affects accuracy.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => { setSelectedScenario(i); setShowResult(false); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedScenario === i
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Dataset Visualization */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-700/50 p-6 mb-6">
        <h3 className="text-white font-semibold mb-2">{scenario.name}</h3>
        <p className="text-sm text-slate-400 mb-6">{scenario.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {scenario.data.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl text-center border ${
                item.category === "good"
                  ? "bg-green-900/20 border-green-700/50"
                  : item.category === "bad"
                    ? "bg-red-900/20 border-red-700/50"
                    : "bg-yellow-900/20 border-yellow-700/50"
              }`}
            >
              <div className="text-3xl mb-1">{item.emoji}</div>
              <div className="text-[10px] text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowResult(true)}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
        >
          🚀 Train the AI on this data
        </button>

        {showResult && (
          <div className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700/50">
            <p className="text-sm text-white mb-3">{scenario.result}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Accuracy:</span>
              <div className="flex-1 h-3 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    scenario.accuracy > 80
                      ? "bg-green-500"
                      : scenario.accuracy > 65
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${scenario.accuracy}%` }}
                />
              </div>
              <span className="text-sm font-mono text-white">{scenario.accuracy}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📊 Quantity</h4>
          <p className="text-[11px] text-slate-400">More data = better learning. But quality matters more than quantity!</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">⚖️ Balance</h4>
          <p className="text-[11px] text-slate-400">If 90% of data is cats, the AI will be biased toward cats.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🏷️ Labels</h4>
          <p className="text-[11px] text-slate-400">Wrong labels = wrong learning. Data labeling is expensive but critical!</p>
        </div>
      </div>
    </div>
  );
}
