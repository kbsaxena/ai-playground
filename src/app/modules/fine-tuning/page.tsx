"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";

type Specialization = "pretrained" | "medical" | "legal" | "code";

const SPECS: Record<Specialization, { label: string; emoji: string; color: string; skills: string[]; before: string; after: string }> = {
  pretrained: { label: "Pre-trained", emoji: "🧠", color: "from-slate-500 to-slate-600", skills: ["General knowledge", "Basic reasoning", "Language understanding"], before: "Knows a little about everything", after: "Jack of all trades, master of none" },
  medical: { label: "Medical AI", emoji: "🏥", color: "from-emerald-500 to-teal-600", skills: ["Diagnosis assistance", "Drug interactions", "Medical terminology", "Patient triage"], before: "Generic text generation", after: "Accurate medical Q&A with citations" },
  legal: { label: "Legal AI", emoji: "⚖️", color: "from-amber-500 to-orange-600", skills: ["Contract analysis", "Case law search", "Legal drafting", "Compliance checks"], before: "Vague legal summaries", after: "Precise clause extraction & risk flags" },
  code: { label: "Code AI", emoji: "💻", color: "from-blue-500 to-indigo-600", skills: ["Code generation", "Bug detection", "Refactoring", "Test writing"], before: "Simple code snippets", after: "Production-ready code with tests" },
};

export default function FineTuningPage() {
  const [selected, setSelected] = useState<Specialization>("medical");
  const spec = SPECS[selected];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Fine-Tuning</h1>
          <p className="text-xs text-orange-400">From Generalist to Specialist</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Fine-tuning takes a general AI and trains it further on specific data to make it an expert. It keeps its language skills but gains deep domain knowledge — medical, legal, coding, etc.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Switch between specializations to see how the same base model gives different expert-level answers.
        </p>
      </div>

      {/* Specialization Buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(Object.keys(SPECS) as Specialization[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selected === key
                ? `bg-gradient-to-r ${SPECS[key].color} text-white shadow-lg`
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/50"
            }`}
          >
            {SPECS[key].emoji} {SPECS[key].label}
          </button>
        ))}
      </div>

      {/* Flow Diagram */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 mb-5">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700/50 text-center">
            <p className="text-lg">🧠</p>
            <p className="text-xs text-slate-300 font-medium">Base Model</p>
            <p className="text-[10px] text-slate-500">General knowledge</p>
          </div>
          <span className="text-slate-500 text-xl">→</span>
          <div className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700/50 text-center">
            <p className="text-lg">📚</p>
            <p className="text-xs text-slate-300 font-medium">Specialized Data</p>
            <p className="text-[10px] text-slate-500">{spec.label} examples</p>
          </div>
          <span className="text-slate-500 text-xl">→</span>
          <div className={`px-4 py-3 rounded-lg bg-gradient-to-br ${spec.color} text-center shadow-lg`}>
            <p className="text-lg">{spec.emoji}</p>
            <p className="text-xs text-white font-medium">{spec.label}</p>
            <p className="text-[10px] text-white/70">Expert model</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4 mb-5">
        <h3 className="text-sm font-semibold text-white mb-3">{spec.emoji} {spec.label} Skills</h3>
        <div className="grid grid-cols-2 gap-2">
          {spec.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50">
              <span className="text-green-400 text-xs">✓</span>
              <span className="text-xs text-slate-300">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        <div className="p-4 rounded-xl bg-slate-900 border border-red-500/30">
          <h4 className="text-xs font-semibold text-red-400 mb-1">❌ Before Fine-Tuning</h4>
          <p className="text-sm text-slate-300">{spec.before}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-green-500/30">
          <h4 className="text-xs font-semibold text-green-400 mb-1">✅ After Fine-Tuning</h4>
          <p className="text-sm text-slate-300">{spec.after}</p>
        </div>
      </div>

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🎯 Why Fine-Tune?</h4>
          <p className="text-[11px] text-slate-400">General models know a bit of everything. Fine-tuning makes them deeply knowledgeable in one domain.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📊 How It Works</h4>
          <p className="text-[11px] text-slate-400">Feed the model thousands of domain-specific examples. It adjusts its weights to excel at that task.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">⚠️ Trade-offs</h4>
          <p className="text-[11px] text-slate-400">Gains expertise but may lose some general ability. Needs quality data and careful evaluation.</p>
        </div>
      </div>
    </div>
  );
}
