"use client";

import React, { useState } from "react";
import { Highlighter } from "lucide-react";

interface AttentionData {
  sentence: string;
  words: string[];
  attention: number[][];
}

const EXAMPLES: AttentionData[] = [
  {
    sentence: "The cat sat on the mat",
    words: ["The", "cat", "sat", "on", "the", "mat"],
    attention: [
      [0.1, 0.6, 0.1, 0.05, 0.1, 0.05],
      [0.05, 0.2, 0.5, 0.05, 0.05, 0.15],
      [0.05, 0.5, 0.1, 0.15, 0.05, 0.15],
      [0.05, 0.1, 0.2, 0.1, 0.05, 0.5],
      [0.1, 0.05, 0.05, 0.1, 0.1, 0.6],
      [0.05, 0.15, 0.15, 0.4, 0.15, 0.1],
    ],
  },
  {
    sentence: "She gave him the book because he asked",
    words: ["She", "gave", "him", "the", "book", "because", "he", "asked"],
    attention: [
      [0.2, 0.3, 0.05, 0.05, 0.1, 0.1, 0.15, 0.05],
      [0.2, 0.1, 0.3, 0.05, 0.25, 0.02, 0.03, 0.05],
      [0.1, 0.3, 0.1, 0.05, 0.1, 0.05, 0.25, 0.05],
      [0.05, 0.05, 0.05, 0.1, 0.6, 0.05, 0.05, 0.05],
      [0.05, 0.3, 0.15, 0.2, 0.1, 0.05, 0.05, 0.1],
      [0.05, 0.1, 0.05, 0.05, 0.1, 0.1, 0.15, 0.4],
      [0.15, 0.05, 0.4, 0.05, 0.05, 0.1, 0.1, 0.1],
      [0.05, 0.1, 0.1, 0.05, 0.15, 0.2, 0.25, 0.1],
    ],
  },
  {
    sentence: "The bank by the river was steep",
    words: ["The", "bank", "by", "the", "river", "was", "steep"],
    attention: [
      [0.1, 0.6, 0.05, 0.1, 0.05, 0.05, 0.05],
      [0.05, 0.1, 0.15, 0.05, 0.4, 0.05, 0.2],
      [0.05, 0.2, 0.1, 0.1, 0.4, 0.1, 0.05],
      [0.1, 0.05, 0.05, 0.1, 0.6, 0.05, 0.05],
      [0.05, 0.4, 0.2, 0.1, 0.1, 0.05, 0.1],
      [0.05, 0.2, 0.05, 0.05, 0.1, 0.1, 0.45],
      [0.05, 0.3, 0.05, 0.05, 0.15, 0.3, 0.1],
    ],
  },
];

export default function AttentionPage() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const example = EXAMPLES[selectedExample];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center"><Highlighter className="w-5 h-5 text-white" /></div>
        <div><h1 className="text-2xl font-bold text-white">Attention Mechanism</h1><p className="text-xs text-indigo-400">Highlighting a Textbook</p></div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          When reading a sentence, each word figures out which other words matter most for understanding it. &ldquo;The cat sat on the mat&rdquo; — &ldquo;sat&rdquo; pays attention to &ldquo;cat&rdquo; (who sat?) more than &ldquo;the&rdquo;.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hover over any word to see glowing attention weights. Brighter = more attention.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {EXAMPLES.map((ex, i) => (
          <button key={i} onClick={() => { setSelectedExample(i); setHoveredWord(null); }} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedExample === i ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
            &ldquo;{ex.sentence}&rdquo;
          </button>
        ))}
      </div>

      {/* Interactive words */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-6 mb-5">
        <p className="text-[11px] text-slate-500 mb-4">👆 Hover over a word to see what it pays attention to:</p>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {example.words.map((word, i) => {
            const isHovered = hoveredWord === i;
            const attn = hoveredWord !== null ? example.attention[hoveredWord][i] : 0;
            return (
              <span
                key={`${selectedExample}-${i}`}
                onMouseEnter={() => setHoveredWord(i)}
                onMouseLeave={() => setHoveredWord(null)}
                className="px-4 py-2 rounded-lg cursor-pointer text-white font-medium text-lg transition-all duration-150"
                style={{
                  backgroundColor: hoveredWord === null ? "rgba(255,255,255,0.05)" : isHovered ? "rgba(99,102,241,0.8)" : `rgba(99,102,241,${attn})`,
                  transform: hoveredWord === null ? "scale(1)" : isHovered ? "scale(1.15)" : `scale(${0.85 + attn * 0.4})`,
                  border: hoveredWord !== null && attn > 0.3 ? "2px solid rgba(99,102,241,0.8)" : "2px solid transparent",
                }}
              >
                {word}
                {hoveredWord !== null && !isHovered && <span className="block text-[10px] text-center mt-0.5 opacity-80">{(attn * 100).toFixed(0)}%</span>}
              </span>
            );
          })}
        </div>
        {hoveredWord !== null && (
          <p className="text-center text-xs text-slate-400">
            &ldquo;<span className="text-white font-medium">{example.words[hoveredWord]}</span>&rdquo; pays most attention to:{" "}
            <span className="text-indigo-400">
              {example.attention[hoveredWord].map((v, i) => ({ word: example.words[i], v })).sort((a, b) => b.v - a.v).slice(0, 3).map(x => `${x.word} (${(x.v * 100).toFixed(0)}%)`).join(", ")}
            </span>
          </p>
        )}
      </div>

      {/* Matrix */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-5 overflow-x-auto">
        <h3 className="text-xs font-semibold text-white mb-3">Attention Matrix (brighter = more attention)</h3>
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: `60px repeat(${example.words.length}, 1fr)` }}>
          <div />
          {example.words.map((w, i) => <div key={`h-${i}`} className="text-[10px] text-slate-500 text-center truncate">{w}</div>)}
          {example.words.map((w, i) => (
            <React.Fragment key={`row-${i}`}>
              <div className="text-[10px] text-slate-500 flex items-center">{w}</div>
              {example.attention[i].map((v, j) => (
                <div key={`${i}-${j}`} className="aspect-square rounded-sm flex items-center justify-center text-[8px] text-white/70" style={{ backgroundColor: `rgba(99,102,241,${v})` }}>
                  {(v * 100).toFixed(0)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🔗 Self-Attention</h4><p className="text-[11px] text-slate-400">Each word asks every other word: &ldquo;How relevant are you to me?&rdquo;</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🎯 Disambiguation</h4><p className="text-[11px] text-slate-400">&ldquo;Bank&rdquo; near &ldquo;river&rdquo; = riverbank. Near &ldquo;money&rdquo; = financial bank.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🧠 Transformers</h4><p className="text-[11px] text-slate-400">This is the secret sauce behind ChatGPT — built entirely on attention!</p></div>
      </div>
    </div>
  );
}
