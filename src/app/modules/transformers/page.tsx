"use client";

import { useState } from "react";
import { Layers, Play } from "lucide-react";

const STEPS = [
  { title: "1. Input Text", emoji: "📝", description: "The sentence enters the transformer", detail: "\"The cat sat on the mat\"" },
  { title: "2. Tokenization", emoji: "✂️", description: "Break into tokens (word pieces)", detail: "[The] [cat] [sat] [on] [the] [mat]" },
  { title: "3. Embedding", emoji: "📍", description: "Convert tokens to numbers (vectors)", detail: "Each word becomes a list of 768 numbers" },
  { title: "4. Positional Encoding", emoji: "📐", description: "Add position info (word order matters!)", detail: "\"cat sat\" ≠ \"sat cat\" — position tells order" },
  { title: "5. Self-Attention", emoji: "🔍", description: "Each word looks at every other word", detail: "\"sat\" attends to \"cat\" (who?) and \"mat\" (where?)" },
  { title: "6. Feed-Forward Network", emoji: "🧮", description: "Process the attention output", detail: "A small neural network at each position" },
  { title: "7. Repeat × 12-96 layers", emoji: "🔄", description: "Stack many attention + FFN layers", detail: "GPT-3 has 96 layers! Each understands deeper" },
  { title: "8. Output", emoji: "💬", description: "Predict the next word", detail: "Next word is probably \"and\" or \".\"" },
];

export default function TransformersPage() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setIsPlaying(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= STEPS.length) { clearInterval(interval); setIsPlaying(false); return; }
      setActiveStep(step);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Transformers</h1>
          <p className="text-xs text-indigo-400">The Assembly Line</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          The Transformer is the architecture behind ChatGPT. Text flows through 8 stages: tokenize → embed → add position → self-attention → feed-forward → repeat many times → output prediction.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Hit &apos;Watch it process text&apos; to see each stage activate in sequence with explanations.
        </p>
      </div>

      {/* Play Button */}
      <button
        onClick={playAnimation}
        disabled={isPlaying}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors disabled:opacity-50 mb-6"
      >
        <Play className="w-4 h-4" />
        {isPlaying ? "Processing..." : "Watch it process text"}
      </button>

      {/* Pipeline */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 mb-6">
        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ${
                activeStep === i
                  ? "bg-indigo-900/30 border-indigo-500/50"
                  : activeStep > i
                    ? "bg-slate-800/50 border-slate-700/30 opacity-50"
                    : "bg-slate-800/30 border-slate-700/30"
              }`}
            >
              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg ${activeStep >= i ? "bg-indigo-600" : "bg-slate-700"} transition-colors`}>
                {step.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-white">{step.title}</h4>
                <p className="text-[11px] text-slate-400">{step.description}</p>
                {activeStep === i && (
                  <p className="text-[11px] text-indigo-300 mt-1 font-mono bg-indigo-900/20 p-1.5 rounded">{step.detail}</p>
                )}
              </div>
              <div className="shrink-0 text-xs">
                {activeStep > i && <span className="text-green-400">✓</span>}
                {activeStep === i && <span className="text-yellow-400 animate-pulse">⚡</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🏭 Why &ldquo;Transformer&rdquo;?</h4>
          <p className="text-[11px] text-slate-400">It transforms input into understanding. Unlike older models that read word-by-word, transformers see everything at once.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📏 Scale</h4>
          <p className="text-[11px] text-slate-400">GPT-2: 1.5B params. GPT-3: 175B. GPT-4: rumored 1.7T. More layers = deeper understanding.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🔑 Key Innovation</h4>
          <p className="text-[11px] text-slate-400">Self-attention lets every word &ldquo;talk to&rdquo; every other word simultaneously. Old models forgot earlier words.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🌍 Used Everywhere</h4>
          <p className="text-[11px] text-slate-400">ChatGPT, Google Search, Copilot, DALL-E, translation — all transformers. The 2017 paper changed everything.</p>
        </div>
      </div>
    </div>
  );
}
