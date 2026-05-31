"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Play, Pause, RotateCcw } from "lucide-react";

const SIZE = 16, STEPS = 25;

const TARGET: boolean[][] = Array.from({ length: SIZE }, (_, r) =>
  Array.from({ length: SIZE }, (_, c) => {
    const dx = c - SIZE / 2, dy = r - SIZE / 2, dist = Math.sqrt(dx * dx + dy * dy);
    if (Math.abs(dist - 6) < 1.2) return true;
    if ((Math.abs(c - 5) < 1.5 && Math.abs(r - 5) < 1.5) || (Math.abs(c - 11) < 1.5 && Math.abs(r - 5) < 1.5)) return true;
    if (r >= 9 && r <= 11 && c >= 5 && c <= 11 && Math.abs(dist - 5) < 2) return true;
    return false;
  })
);

function makeNoise() { return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => Math.random())); }

export default function DiffusionPage() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState(makeNoise);
  const [speed, setSpeed] = useState(150);
  const noiseRef = useRef(grid);

  const updateGrid = useCallback((s: number) => {
    const p = s / STEPS;
    setGrid(noiseRef.current.map((row, i) => row.map((nv, j) => {
      const tv = TARGET[i][j] ? 1 : 0;
      return Math.max(0, Math.min(1, nv * (1 - p) + tv * p + (Math.random() - 0.5) * 0.2 * (1 - p)));
    })));
  }, []);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setStep(prev => {
        if (prev >= STEPS) { setRunning(false); return prev; }
        const next = prev + 1;
        updateGrid(next);
        return next;
      });
    }, speed);
    return () => clearInterval(iv);
  }, [running, speed, updateGrid]);

  const reset = () => { setRunning(false); setStep(0); const n = makeNoise(); noiseRef.current = n; setGrid(n); };

  const getColor = (v: number) => {
    const p = step / STEPS;
    const int = Math.round(v * 255);
    if (p < 0.3) return `rgb(${int * 0.8 + Math.random() * 40},${int * 0.4},${180 + int * 0.3})`;
    return `rgb(${int * 0.5},${int * 0.3},${int})`;
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
        <div><h1 className="text-2xl font-bold text-white">Diffusion Models</h1><p className="text-xs text-indigo-400">Unscrambling a Puzzle</p></div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Diffusion models (DALL-E, Midjourney) start with pure noise and remove it step by step until a clear image appears. They learned this by studying how to reverse the process of adding noise to real images.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hit &apos;Denoise&apos; and watch random pixels slowly transform into a recognizable shape, step by step.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={() => setRunning(!running)} disabled={step >= STEPS && !running} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50 transition-colors">
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}{running ? "Pause" : step >= STEPS ? "Done!" : "Denoise"}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"><RotateCcw className="w-4 h-4" />Reset</button>
      </div>

      <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50 mb-4 max-w-xs">
        <label className="text-[11px] text-slate-500 block mb-1">Speed: {speed}ms/step</label>
        <input type="range" min="50" max="400" step="50" value={speed} onChange={e => setSpeed(+e.target.value)} className="w-full accent-indigo-500 h-1.5" />
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-slate-500">Step {step}/{STEPS}</span>
        <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-200" style={{ width: `${(step / STEPS) * 100}%` }} />
        </div>
        <span className="text-xs text-slate-500">{step === 0 ? "Noise" : step < STEPS * 0.5 ? "Forming..." : step < STEPS ? "Almost!" : "✨ Done"}</span>
      </div>

      {/* Grid */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 flex justify-center mb-5">
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, width: "min(100%, 320px)", aspectRatio: "1" }}>
          {grid.flat().map((v, i) => <div key={i} className="rounded-sm" style={{ backgroundColor: getColor(v), aspectRatio: "1" }} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🎨 DALL-E & Midjourney</h4><p className="text-[11px] text-slate-400">Type a description → AI denoises random static into a matching image.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🔢 Many Steps</h4><p className="text-[11px] text-slate-400">Real models use 20-1000 steps. More = better quality but slower.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🎯 Guidance</h4><p className="text-[11px] text-slate-400">Text prompts steer the denoising toward your desired image.</p></div>
      </div>
    </div>
  );
}
