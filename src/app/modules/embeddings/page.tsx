"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const WORDS = [
  { text: "cat", x: 120, y: 100, cat: "animal" }, { text: "dog", x: 150, y: 130, cat: "animal" }, { text: "fish", x: 100, y: 150, cat: "animal" }, { text: "bird", x: 140, y: 80, cat: "animal" },
  { text: "king", x: 450, y: 80, cat: "royalty" }, { text: "queen", x: 480, y: 110, cat: "royalty" }, { text: "prince", x: 430, y: 130, cat: "royalty" },
  { text: "pizza", x: 280, y: 320, cat: "food" }, { text: "burger", x: 310, y: 350, cat: "food" }, { text: "pasta", x: 260, y: 340, cat: "food" },
  { text: "computer", x: 480, y: 300, cat: "tech" }, { text: "phone", x: 510, y: 330, cat: "tech" }, { text: "laptop", x: 460, y: 340, cat: "tech" },
  { text: "happy", x: 80, y: 300, cat: "emotion" }, { text: "sad", x: 110, y: 330, cat: "emotion" }, { text: "angry", x: 90, y: 350, cat: "emotion" },
];

const COLORS: Record<string, string> = { animal: "#22c55e", royalty: "#a855f7", food: "#f59e0b", tech: "#3b82f6", emotion: "#ef4444" };

const ANALOGIES = [
  { eq: "King - Man + Woman = Queen", desc: "Gender relationship preserved as distance" },
  { eq: "Paris - France + Italy = Rome", desc: "Capital city relationship" },
  { eq: "Happy - Sad + Cold = Hot", desc: "Opposite relationship" },
];

export default function EmbeddingsPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [analogy, setAnalogy] = useState(0);
  const hoveredCat = WORDS.find(w => w.text === hovered)?.cat;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center"><MapPin className="w-5 h-5 text-white" /></div>
        <div><h1 className="text-2xl font-bold text-white">Embeddings</h1><p className="text-xs text-indigo-400">Words on a Map</p></div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          AI converts words into lists of numbers (vectors) that capture meaning. Similar words end up close together — &apos;cat&apos; is near &apos;dog&apos; but far from &apos;pizza&apos;. You can even do math: King - Man + Woman = Queen.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hover over words on the map to see clusters light up. Check the word math section below!
        </p>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-3 mb-5">
        <p className="text-[10px] text-slate-500 mb-2">👆 Hover words to see categories cluster</p>
        <svg viewBox="0 0 580 400" className="w-full h-auto max-h-[380px]">
          {WORDS.map(w => (
            <g key={w.text} onMouseEnter={() => setHovered(w.text)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
              <circle cx={w.x} cy={w.y} r={hovered === w.text ? 8 : 5} fill={COLORS[w.cat]} opacity={!hoveredCat || w.cat === hoveredCat ? 1 : 0.15} style={{ transition: "all 0.15s" }} />
              <text x={w.x} y={w.y - 10} textAnchor="middle" fill={!hoveredCat || w.cat === hoveredCat ? "white" : "#334155"} fontSize="10" style={{ transition: "all 0.15s" }}>{w.text}</text>
            </g>
          ))}
        </svg>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {Object.entries(COLORS).map(([cat, color]) => <div key={cat} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} /><span className="text-[10px] text-slate-500 capitalize">{cat}</span></div>)}
        </div>
      </div>

      {/* Word Math */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-5">
        <h3 className="text-xs font-semibold text-white mb-3">✨ Word Math — you can do arithmetic with words!</h3>
        <div className="flex gap-2 mb-3">
          {ANALOGIES.map((a, i) => <button key={i} onClick={() => setAnalogy(i)} className={`px-3 py-1.5 rounded-lg text-xs ${analogy === i ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>{a.eq.split("=")[0].trim()}</button>)}
        </div>
        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
          <p className="text-sm font-mono text-indigo-300">{ANALOGIES[analogy].eq}</p>
          <p className="text-[11px] text-slate-500 mt-1">{ANALOGIES[analogy].desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">📐 Dimensions</h4><p className="text-[11px] text-slate-400">Real embeddings have 768-1536 dimensions, not just 2D like our map.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🔍 Similarity</h4><p className="text-[11px] text-slate-400">Search engines find results by comparing embedding distances.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🧠 Learned</h4><p className="text-[11px] text-slate-400">Not hand-coded — learned from reading billions of words.</p></div>
      </div>
    </div>
  );
}
