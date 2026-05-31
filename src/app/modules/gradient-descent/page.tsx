"use client";

import { useState, useEffect, useCallback } from "react";
import { TrendingDown, Play, Pause, SkipForward, RotateCcw } from "lucide-react";

const W = 600;
const H = 300;

function lossFunction(x: number): number {
  return 150 + 80 * Math.sin(x * 0.015) - 40 * Math.cos(x * 0.008) + 0.0003 * (x - 300) * (x - 300);
}

function gradient(x: number): number {
  const dx = 0.5;
  return (lossFunction(x + dx) - lossFunction(x - dx)) / (2 * dx);
}

export default function GradientDescentPage() {
  const [ballX, setBallX] = useState(80);
  const [playing, setPlaying] = useState(false);
  const [learningRate, setLearningRate] = useState(0.5);
  const [steps, setSteps] = useState(0);
  const [loss, setLoss] = useState(lossFunction(80));

  const step = useCallback(() => {
    setBallX((prev) => {
      const grad = gradient(prev);
      const next = prev - learningRate * grad;
      const clamped = Math.max(20, Math.min(W - 20, next));
      setLoss(lossFunction(clamped));
      setSteps((s) => s + 1);
      return clamped;
    });
  }, [learningRate]);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(step, 150);
    return () => clearInterval(iv);
  }, [playing, step]);

  const reset = () => {
    setPlaying(false);
    setBallX(80);
    setSteps(0);
    setLoss(lossFunction(80));
  };

  const ballY = lossFunction(ballX);

  // Build landscape path
  const pathPoints: string[] = [];
  for (let x = 0; x <= W; x += 3) {
    const y = lossFunction(x);
    pathPoints.push(`${pathPoints.length === 0 ? "M" : "L"} ${x} ${y}`);
  }
  const landscapePath = pathPoints.join(" ");

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <TrendingDown className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Gradient Descent</h1>
          <p className="text-xs text-cyan-400">Rolling Downhill to Find the Answer</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Gradient descent is the algorithm that finds the best answer. Imagine a ball rolling downhill — it follows the slope toward the lowest point (least error). The learning rate controls how big each step is.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hit &apos;Roll&apos; to watch the ball find the valley. Crank up the learning rate to see it overshoot!
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={step}
          disabled={playing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium disabled:opacity-50 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          Step
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Learning Rate Slider */}
      <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50 mb-4 max-w-sm">
        <label className="text-xs text-slate-400 block mb-1">
          Learning Rate: {learningRate.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={learningRate}
          onChange={(e) => setLearningRate(+e.target.value)}
          className="w-full accent-cyan-500 h-1.5"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>Small steps</span>
          <span>Big leaps</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 text-center">
          <p className="text-[10px] text-slate-500">Steps</p>
          <p className="text-sm font-bold text-white">{steps}</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 text-center">
          <p className="text-[10px] text-slate-500">Loss</p>
          <p className="text-sm font-bold text-cyan-400">{loss.toFixed(1)}</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 text-center">
          <p className="text-[10px] text-slate-500">Position</p>
          <p className="text-sm font-bold text-white">{ballX.toFixed(1)}</p>
        </div>
      </div>

      {/* SVG Visualization */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-3 mb-5">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[300px]">
          {/* Landscape */}
          <path d={landscapePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" opacity={0.8} />
          {/* Fill below */}
          <path d={`${landscapePath} L ${W} ${H} L 0 ${H} Z`} fill="url(#grad)" opacity={0.15} />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Ball */}
          <circle cx={ballX} cy={ballY} r={8} fill="#f59e0b" stroke="white" strokeWidth={2}>
            <animate attributeName="r" values="7;9;7" dur="1s" repeatCount="indefinite" />
          </circle>
          {/* Gradient arrow */}
          {steps > 0 && (
            <line
              x1={ballX}
              y1={ballY}
              x2={ballX - gradient(ballX) * learningRate * 0.5}
              y2={ballY - 20}
              stroke="#f59e0b"
              strokeWidth={1.5}
              markerEnd="url(#arrow)"
              opacity={0.7}
            />
          )}
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">⛰️ Loss Landscape</h4>
          <p className="text-[11px] text-slate-400">The curve shows how &ldquo;wrong&rdquo; the model is. Lower = better. We want to find the valley.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📐 Gradient</h4>
          <p className="text-[11px] text-slate-400">The slope tells us which direction is downhill. We always step opposite to the slope.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🎚️ Learning Rate</h4>
          <p className="text-[11px] text-slate-400">Too small = slow progress. Too large = overshoot the minimum. Finding the right balance is key.</p>
        </div>
      </div>
    </div>
  );
}
