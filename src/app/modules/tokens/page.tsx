"use client";

import { useState } from "react";
import { Hash } from "lucide-react";

const SUBWORDS: Record<string, string[]> = {
  unbelievable: ["un", "believ", "able"],
  understanding: ["under", "stand", "ing"],
  transformer: ["transform", "er"],
  artificial: ["art", "ificial"],
  intelligence: ["intelli", "gence"],
  programming: ["program", "ming"],
  beautiful: ["beauti", "ful"],
  impossible: ["im", "possible"],
  uncomfortable: ["un", "comfort", "able"],
  international: ["inter", "national"],
  unfortunately: ["un", "fortunate", "ly"],
  extraordinary: ["extra", "ordinary"],
  communication: ["commun", "ication"],
  the: ["the"], is: ["is"], a: ["a"], of: ["of"], and: ["and"],
  to: ["to"], in: ["in"], it: ["it"], for: ["for"], on: ["on"],
  hello: ["hello"], world: ["world"], machine: ["machine"],
  learning: ["learn", "ing"], neural: ["neural"], network: ["net", "work"], deep: ["deep"],
};

const COLORS = [
  "bg-blue-500/30 border-blue-500/50",
  "bg-green-500/30 border-green-500/50",
  "bg-purple-500/30 border-purple-500/50",
  "bg-amber-500/30 border-amber-500/50",
  "bg-pink-500/30 border-pink-500/50",
  "bg-cyan-500/30 border-cyan-500/50",
  "bg-red-500/30 border-red-500/50",
  "bg-indigo-500/30 border-indigo-500/50",
];

function tokenize(text: string) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const tokens: { token: string; color: string }[] = [];
  words.forEach((word) => {
    const clean = word.replace(/[^a-z]/g, "");
    if (!clean) return;
    const parts = SUBWORDS[clean] || [clean];
    parts.forEach((part) => {
      tokens.push({ token: part, color: COLORS[tokens.length % COLORS.length] });
    });
  });
  return tokens;
}

const EXAMPLES = [
  "The transformer is unbelievable",
  "Artificial intelligence is extraordinary",
  "Deep learning neural network",
  "Understanding machine learning programming",
];

export default function TokensPage() {
  const [input, setInput] = useState("The transformer is unbelievable");
  const tokens = tokenize(input);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <Hash className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Tokens</h1>
          <p className="text-xs text-indigo-400">Breaking Words into Pieces</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          AI doesn&apos;t read words — it breaks text into &apos;tokens&apos; (small pieces). Common words stay whole, but rare words get split into subwords. This is how AI handles any text, even words it&apos;s never seen.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Type any text below and watch it get split into colored tokens instantly. Try long words!
        </p>
      </div>

      {/* Input */}
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type any text..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/50 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EXAMPLES.map((ex) => (
          <button key={ex} onClick={() => setInput(ex)} className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            {ex}
          </button>
        ))}
      </div>

      {/* Token visualization */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-white">Tokens ({tokens.length})</h3>
          <span className="text-[10px] text-slate-500">Each box = 1 token the AI sees</span>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[50px]">
          {tokens.map((t, i) => (
            <span key={`${t.token}-${i}`} className={`px-3 py-1.5 rounded-lg border text-sm font-mono text-white ${t.color}`}>
              {t.token}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-6">
          <div>
            <span className="text-[10px] text-slate-500">Characters</span>
            <p className="text-base font-mono text-white">{input.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Words</span>
            <p className="text-base font-mono text-white">{input.split(/\s+/).filter(Boolean).length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500">Tokens</span>
            <p className="text-base font-mono text-white">{tokens.length}</p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">✂️ Why Split?</h4>
          <p className="text-[11px] text-slate-400">Infinite possible words exist (slang, names, typos). Subwords let AI handle ANY text.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">💰 Token = Cost</h4>
          <p className="text-[11px] text-slate-400">ChatGPT charges per token. A 1000-word essay ≈ 1300 tokens.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📏 Context Window</h4>
          <p className="text-[11px] text-slate-400">GPT-4 handles ~128K tokens at once — roughly a 300-page book!</p>
        </div>
      </div>
    </div>
  );
}
