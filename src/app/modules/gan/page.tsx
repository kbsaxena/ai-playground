"use client";

import { useState, useEffect, useCallback } from "react";
import { Network, Play, RotateCcw } from "lucide-react";

interface Round {
  id: number;
  generatorSkill: number;
  discriminatorSkill: number;
  fooled: boolean;
}

export default function GANPage() {
  const [playing, setPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [generatorSkill, setGeneratorSkill] = useState(10);
  const [discriminatorSkill, setDiscriminatorSkill] = useState(50);
  const [history, setHistory] = useState<Round[]>([]);

  const step = useCallback(() => {
    const fooled = Math.random() * 100 < generatorSkill - discriminatorSkill * 0.3 + 30;
    const newRound: Round = { id: round + 1, generatorSkill, discriminatorSkill, fooled };
    setHistory((prev) => [...prev.slice(-9), newRound]);
    setRound((r) => r + 1);

    if (fooled) {
      setDiscriminatorSkill((d) => Math.min(95, d + Math.random() * 5 + 2));
    } else {
      setGeneratorSkill((g) => Math.min(95, g + Math.random() * 5 + 3));
    }
  }, [round, generatorSkill, discriminatorSkill]);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(step, 800);
    return () => clearInterval(iv);
  }, [playing, step]);

  const reset = () => {
    setPlaying(false);
    setRound(0);
    setGeneratorSkill(10);
    setDiscriminatorSkill(50);
    setHistory([]);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
          <Network className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Generative Adversarial Network</h1>
          <p className="text-xs text-pink-400">The Forger vs The Detective</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          A GAN is two AIs competing: a Generator creates fakes, a Discriminator catches them. As they battle, both improve — until the fakes are indistinguishable from reality.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hit &apos;Start Training&apos; and watch the forger&apos;s skill improve round by round as both AIs level up.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button
          onClick={() => setPlaying(!playing)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" />
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <span className="flex items-center text-xs text-slate-400">Round: {round}</span>
      </div>

      {/* Skill Bars */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-5">
        <h3 className="text-sm font-semibold text-white mb-3">Skill Levels</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-emerald-400">🎨 Generator (Forger)</span>
              <span className="text-slate-400">{generatorSkill.toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
                style={{ width: `${generatorSkill}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-400">🔍 Discriminator (Detective)</span>
              <span className="text-slate-400">{discriminatorSkill.toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-300"
                style={{ width: `${discriminatorSkill}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Round History */}
      {history.length > 0 && (
        <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-5">
          <h3 className="text-sm font-semibold text-white mb-3">Round History</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((r) => (
              <div
                key={r.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                  r.fooled
                    ? "bg-emerald-900/30 border-emerald-500/40 text-emerald-300"
                    : "bg-red-900/30 border-red-500/40 text-red-300"
                }`}
              >
                R{r.id}: {r.fooled ? "🎨 Fooled!" : "🔍 Caught!"}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🎨 Generator</h4>
          <p className="text-[11px] text-slate-400">Creates fake data trying to fool the discriminator. Gets better each time it fails.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🔍 Discriminator</h4>
          <p className="text-[11px] text-slate-400">Learns to tell real from fake. Gets better each time it&apos;s fooled.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">⚔️ Adversarial Training</h4>
          <p className="text-[11px] text-slate-400">Competition drives both to improve. The result: a generator that creates incredibly realistic outputs.</p>
        </div>
      </div>
    </div>
  );
}
