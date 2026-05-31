"use client";

import { useState } from "react";
import { MessageSquare, Sparkles } from "lucide-react";

const PREDICTIONS: Record<string, { word: string; probability: number }[]> = {
  the: [{ word: "cat", probability: 0.25 }, { word: "dog", probability: 0.2 }, { word: "world", probability: 0.15 }, { word: "sun", probability: 0.12 }, { word: "best", probability: 0.1 }],
  i: [{ word: "love", probability: 0.3 }, { word: "think", probability: 0.25 }, { word: "want", probability: 0.2 }, { word: "am", probability: 0.15 }, { word: "need", probability: 0.1 }],
  artificial: [{ word: "intelligence", probability: 0.7 }, { word: "flowers", probability: 0.1 }, { word: "light", probability: 0.08 }, { word: "sweetener", probability: 0.07 }, { word: "turf", probability: 0.05 }],
  machine: [{ word: "learning", probability: 0.6 }, { word: "gun", probability: 0.1 }, { word: "code", probability: 0.1 }, { word: "wash", probability: 0.08 }, { word: "shop", probability: 0.07 }],
  hello: [{ word: "world", probability: 0.4 }, { word: "there", probability: 0.3 }, { word: "everyone", probability: 0.15 }, { word: "friend", probability: 0.1 }, { word: "darkness", probability: 0.05 }],
  deep: [{ word: "learning", probability: 0.5 }, { word: "sea", probability: 0.2 }, { word: "breath", probability: 0.12 }, { word: "sleep", probability: 0.1 }, { word: "blue", probability: 0.08 }],
  neural: [{ word: "network", probability: 0.75 }, { word: "pathway", probability: 0.1 }, { word: "connection", probability: 0.08 }, { word: "signal", probability: 0.05 }, { word: "link", probability: 0.02 }],
  data: [{ word: "science", probability: 0.35 }, { word: "analysis", probability: 0.25 }, { word: "driven", probability: 0.2 }, { word: "set", probability: 0.12 }, { word: "lake", probability: 0.08 }],
};

const DEFAULT_PREDICTIONS = [{ word: "is", probability: 0.2 }, { word: "the", probability: 0.18 }, { word: "and", probability: 0.15 }, { word: "of", probability: 0.12 }, { word: "to", probability: 0.1 }];

function adjustTemp(predictions: { word: string; probability: number }[], temp: number) {
  const adj = predictions.map((p) => ({ ...p, probability: Math.pow(p.probability, 1 / Math.max(temp, 0.1)) }));
  const total = adj.reduce((s, p) => s + p.probability, 0);
  return adj.map((p) => ({ ...p, probability: p.probability / total })).sort((a, b) => b.probability - a.probability);
}

export default function LLMPage() {
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const lastWord = input.trim().split(" ").pop()?.toLowerCase() || "";
  const predictions = adjustTemp(PREDICTIONS[lastWord] || DEFAULT_PREDICTIONS, temperature);

  const selectWord = (word: string) => {
    setSelectedWords([...selectedWords, word]);
    setInput((prev) => prev + (prev.endsWith(" ") ? "" : " ") + word + " ");
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Large Language Models</h1>
          <p className="text-xs text-indigo-400">World&apos;s Best Autocomplete</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          A Large Language Model predicts the most likely next word based on patterns from billions of sentences. It doesn&apos;t &apos;understand&apos; — it&apos;s the world&apos;s best autocomplete. Temperature controls creativity.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Type a word and see probability bars for predictions. Click words to build a sentence. Adjust temperature!
        </p>
      </div>

      {/* Temperature */}
      <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50 mb-4 max-w-lg">
        <label className="text-xs text-slate-400 block mb-1">
          🌡️ Temperature: {temperature.toFixed(2)}
          <span className="ml-2">{temperature < 0.3 ? "🧊 Predictable" : temperature < 0.7 ? "😊 Balanced" : temperature < 1.2 ? "🎨 Creative" : "🤪 Chaotic"}</span>
        </label>
        <input type="range" min="0.1" max="2" step="0.05" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="w-full accent-indigo-500 h-1.5" />
      </div>

      {/* Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a word (try: the, artificial, machine, hello, deep, neural, data, i)"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/50 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button onClick={() => { setInput(""); setSelectedWords([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white">Clear</button>
      </div>

      {/* Predictions */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-4">
        <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-400" /> Next Word Predictions
        </h3>
        <div className="space-y-2">
          {predictions.map((pred) => (
            <div key={pred.word} className="flex items-center gap-3 cursor-pointer group" onClick={() => selectWord(pred.word)}>
              <span className="text-sm text-white w-20 group-hover:text-indigo-400 transition-colors">{pred.word}</span>
              <div className="flex-1 h-6 rounded bg-slate-800 overflow-hidden relative">
                <div className="h-full rounded bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-300" style={{ width: `${pred.probability * 100}%` }} />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{(pred.probability * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-3">💡 Click a word to add it and see next predictions</p>
      </div>

      {/* Generated */}
      {selectedWords.length > 0 && (
        <div className="rounded-xl bg-slate-800 border border-slate-700/50 p-3 mb-6">
          <p className="text-[10px] text-slate-500 mb-1.5">Generated sequence:</p>
          <div className="flex flex-wrap gap-1">
            {selectedWords.map((w, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 text-xs">{w}</span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📖 How It Works</h4>
          <p className="text-[11px] text-slate-400">It asks: &ldquo;Based on all text I&apos;ve read, what word usually comes next?&rdquo;</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🌡️ Temperature</h4>
          <p className="text-[11px] text-slate-400">Low = always picks the obvious word. High = picks surprising words.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🤔 Understanding?</h4>
          <p className="text-[11px] text-slate-400">Not really! It&apos;s pattern matching at massive scale, not true comprehension.</p>
        </div>
      </div>
    </div>
  );
}



