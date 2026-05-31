"use client";

import { useState, useEffect, useCallback } from "react";
import { Dog, Play, RotateCcw, Pause } from "lucide-react";

export default function TrainingPage() {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0.1);
  const [dogX, setDogX] = useState(14);
  const [caught, setCaught] = useState(false);
  const [overfitting, setOverfitting] = useState(false);
  const [history, setHistory] = useState<number[]>([0.1]);
  const [learningRate, setLearningRate] = useState(0.3);
  const [showOverfit, setShowOverfit] = useState(false);

  const trainStep = useCallback(() => {
    setEpoch((e) => {
      const newEpoch = e + 1;
      setAccuracy((prev) => {
        const improvement = learningRate * (1 - prev) * 0.15;
        let newAcc = Math.min(prev + improvement, 0.99);
        const isOverfit = showOverfit && newEpoch > 30;
        if (isOverfit) { newAcc = Math.max(0.6, newAcc - 0.008 * (newEpoch - 30)); setOverfitting(true); } else { setOverfitting(false); }
        setHistory((h) => [...h, newAcc]);
        const newDogX = 14 + (85 - 14) * newAcc + (Math.random() - 0.5) * (1 - newAcc) * 15;
        setDogX(newDogX);
        setCaught(newAcc > 0.9);
        return newAcc;
      });
      return newEpoch;
    });
  }, [learningRate, showOverfit]);

  useEffect(() => {
    if (!isTraining) return;
    const interval = setInterval(trainStep, 400);
    return () => clearInterval(interval);
  }, [isTraining, trainStep]);

  const reset = () => { setIsTraining(false); setEpoch(0); setAccuracy(0.1); setDogX(14); setCaught(false); setOverfitting(false); setHistory([0.1]); };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Dog className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Training</h1>
          <p className="text-xs text-indigo-400">Teaching a Dog Tricks</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Training is how AI improves — it makes a guess, checks how wrong it was (loss), adjusts its weights, and tries again. Each attempt is called an &apos;epoch&apos;. The learning rate controls how big each adjustment is.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hit &apos;Train&apos; and watch the dog get better at catching the ball. Try different learning rates!
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={() => setIsTraining(!isTraining)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
          {isTraining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isTraining ? "Pause" : "Train"}
        </button>
        <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-400">
          <input type="checkbox" checked={showOverfit} onChange={(e) => setShowOverfit(e.target.checked)} className="accent-indigo-500" />
          Show Overfitting
        </label>
      </div>

      <div className="p-3 rounded-lg bg-slate-800 border border-slate-700/50 mb-4 max-w-sm">
        <label className="text-xs text-slate-400 block mb-1">
          Learning Rate: {learningRate.toFixed(2)} {learningRate < 0.15 ? "🐌" : learningRate < 0.4 ? "🚶" : learningRate < 0.7 ? "🏃" : "🚀"}
        </label>
        <input type="range" min="0.01" max="1" step="0.01" value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))} className="w-full accent-indigo-500 h-1.5" />
      </div>

      {/* Dog animation area */}
      <div className="relative rounded-xl bg-slate-900 border border-slate-700/50 mb-4 overflow-hidden h-[160px]">
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-green-900/30 to-transparent" />
        {/* Ball */}
        <div className="absolute bottom-10 text-2xl" style={{ left: "85%" }}>🔴</div>
        {/* Dog */}
        <div className="absolute bottom-8 text-3xl transition-all duration-300 ease-out" style={{ left: `${dogX}%` }}>
          {caught ? "🐕" : "🐕‍🦺"}
        </div>
        {/* Stats */}
        <div className="absolute top-3 right-3 text-right">
          <p className="text-xs text-white font-mono">Epoch: {epoch}</p>
          <p className="text-xs text-white font-mono">Accuracy: {(accuracy * 100).toFixed(1)}%</p>
          {caught && <p className="text-xs text-green-400 font-bold">🎉 Caught it!</p>}
          {overfitting && <p className="text-xs text-red-400 font-bold">⚠️ Overfitting!</p>}
        </div>
      </div>

      {/* Live narration */}
      <div className="rounded-xl bg-slate-950 border border-slate-700/50 p-4 mb-4 font-mono">
        <h4 className="text-xs font-semibold text-slate-400 mb-1">📋 What&apos;s happening:</h4>
        <p className={`text-xs ${overfitting ? "text-red-400" : caught ? "text-green-400" : epoch > 0 ? "text-yellow-300" : "text-slate-500"}`}>
          {epoch === 0 && "Waiting to start training..."}
          {epoch > 0 && !caught && !overfitting && `Epoch ${epoch}: Dog missed! Accuracy ${(accuracy * 100).toFixed(1)}%. Adjusting weights by ${learningRate.toFixed(2)}... trying again.`}
          {caught && `Epoch ${epoch}: 🎉 Dog caught the ball! Accuracy ${(accuracy * 100).toFixed(1)}%. The model learned the pattern!`}
          {overfitting && `Epoch ${epoch}: ⚠️ Overfitting! Accuracy dropping to ${(accuracy * 100).toFixed(1)}%. The model memorized training data and forgot how to generalize.`}
        </p>
      </div>

      {/* Chart */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-6">
        <h3 className="text-xs font-semibold text-white mb-3">Training Progress</h3>
        <svg viewBox="0 0 400 80" className="w-full h-20" preserveAspectRatio="none">
          {[0.25, 0.5, 0.75].map((y) => (
            <line key={y} x1="0" y1={80 - y * 80} x2="400" y2={80 - y * 80} stroke="white" strokeOpacity="0.05" strokeDasharray="4" />
          ))}
          <polyline
            points={history.map((v, i) => `${(i / Math.max(history.length - 1, 1)) * 400},${80 - v * 80}`).join(" ")}
            fill="none" stroke="#818cf8" strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🎯 Epoch</h4>
          <p className="text-[11px] text-slate-400">One complete practice attempt. More epochs = more practice.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📈 Learning Rate</h4>
          <p className="text-[11px] text-slate-400">How big each adjustment is. Too high = jumps wildly. Too low = barely moves.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🔄 Overfitting</h4>
          <p className="text-[11px] text-slate-400">When the model memorizes training data instead of learning general patterns.</p>
        </div>
      </div>
    </div>
  );
}



