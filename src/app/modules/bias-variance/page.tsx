"use client";

import { useState } from "react";
import { Scale } from "lucide-react";

function generateData() {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 15; i++) { const x = i * 25 + 20 + (Math.random() - 0.5) * 10; pts.push({ x, y: 200 - Math.sin(x * 0.02) * 80 - x * 0.3 + (Math.random() - 0.5) * 40 }); }
  return pts;
}
const DATA = generateData();

export default function BiasVariancePage() {
  const [complexity, setComplexity] = useState(3);

  const getFitPath = () => {
    const pts: string[] = [];
    for (let x = 10; x <= 380; x += 5) {
      let y = 200 - Math.sin(x * 0.02) * 80 - x * 0.3;
      if (complexity <= 2) y = 220 - x * 0.3;
      else if (complexity > 4) { y += Math.sin(x * 0.1 * (complexity - 3)) * 30 + Math.cos(x * 0.15 * (complexity - 3)) * 20; }
      y = Math.max(20, Math.min(280, y));
      pts.push(`${pts.length === 0 ? "M" : "L"} ${x} ${y}`);
    }
    return pts.join(" ");
  };

  const label = complexity <= 2 ? { text: "Underfitting (High Bias)", color: "text-red-400", emoji: "📏" } : complexity <= 4 ? { text: "Good Fit", color: "text-green-400", emoji: "✅" } : { text: "Overfitting (High Variance)", color: "text-orange-400", emoji: "🌊" };
  const lineColor = complexity <= 2 ? "#ef4444" : complexity <= 4 ? "#22c55e" : "#f59e0b";

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Scale className="w-5 h-5 text-white" /></div>
        <div><h1 className="text-2xl font-bold text-white">Bias vs Variance</h1><p className="text-xs text-indigo-400">The Goldilocks Problem</p></div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Every model faces a tradeoff: too simple (underfitting) misses real patterns, too complex (overfitting) memorizes noise. The goal is the sweet spot in between.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Drag the complexity slider from left to right. Watch the line go from too straight → just right → too wiggly.
        </p>
      </div>

      <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50 mb-5 max-w-md">
        <label className="text-xs text-slate-400 block mb-1">
          Complexity: {complexity} <span className={`font-medium ${label.color}`}>{label.emoji} {label.text}</span>
        </label>
        <input type="range" min="1" max="7" step="1" value={complexity} onChange={e => setComplexity(+e.target.value)} className="w-full accent-indigo-500 h-1.5" />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1"><span>Too Simple</span><span>Just Right</span><span>Too Complex</span></div>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-5">
        <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[280px]">
          <path d={getFitPath()} fill="none" stroke={lineColor} strokeWidth="2.5" />
          {DATA.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#818cf8" stroke="white" strokeWidth={1} opacity={0.8} />)}
        </svg>
        <p className="text-xs text-slate-400 text-center mt-3">
          {complexity <= 2 && "📏 Too simple — can't capture the curve. Like drawing a straight line through a curvy road."}
          {complexity > 2 && complexity <= 4 && "✅ Follows the pattern without chasing noise. Will work on new data too!"}
          {complexity > 4 && "🌊 Wiggles through every point — memorized noise! Looks perfect here but fails on new data."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className={`p-3 rounded-xl border ${complexity <= 2 ? "bg-red-900/20 border-red-500/40" : "bg-slate-900 border-slate-700/50"}`}><h4 className="text-xs font-semibold text-white mb-1">📏 Underfitting</h4><p className="text-[11px] text-slate-400">Model too simple. Bad on training AND test data. Fix: more complexity.</p></div>
        <div className={`p-3 rounded-xl border ${complexity > 2 && complexity <= 4 ? "bg-green-900/20 border-green-500/40" : "bg-slate-900 border-slate-700/50"}`}><h4 className="text-xs font-semibold text-white mb-1">✅ Good Fit</h4><p className="text-[11px] text-slate-400">Captures real patterns, ignores noise. The sweet spot!</p></div>
        <div className={`p-3 rounded-xl border ${complexity > 4 ? "bg-orange-900/20 border-orange-500/40" : "bg-slate-900 border-slate-700/50"}`}><h4 className="text-xs font-semibold text-white mb-1">🌊 Overfitting</h4><p className="text-[11px] text-slate-400">Model too complex. Great on training, terrible on test. Fix: simplify or more data.</p></div>
      </div>
    </div>
  );
}
