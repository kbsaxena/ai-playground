"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

const LAYERS = [
  { name: "Input Image", emoji: "🖼️", desc: "Raw pixels enter the network", detects: ["Pixel values", "Colors", "Brightness"] },
  { name: "Conv 1: Edges", emoji: "📐", desc: "Small filters detect basic edges", detects: ["Horizontal edges", "Vertical edges", "Diagonals"] },
  { name: "Conv 2: Textures", emoji: "🧩", desc: "Combines edges into textures", detects: ["Fur texture", "Stripes", "Circles", "Corners"] },
  { name: "Conv 3: Parts", emoji: "👁️", desc: "Combines textures into parts", detects: ["Eyes", "Ears", "Whiskers", "Paws"] },
  { name: "Conv 4: Objects", emoji: "🐱", desc: "Combines parts into objects", detects: ["Cat face", "Cat body", "Full shape"] },
  { name: "Output", emoji: "✅", desc: "Final classification", detects: ["Cat (95%)", "Dog (3%)", "Bird (2%)"] },
];

export default function CNNPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center"><Eye className="w-5 h-5 text-white" /></div>
        <div><h1 className="text-2xl font-bold text-white">CNNs</h1><p className="text-xs text-indigo-400">The Detective&apos;s Magnifying Glass</p></div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          A CNN scans images with small filters, building up from simple to complex. Layer 1 finds edges, Layer 2 finds textures, Layer 3 finds parts (eyes, ears), Layer 4 recognizes whole objects.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Click through each layer to see what it detects — from raw pixels all the way to &apos;that&apos;s a cat!&apos;
        </p>
      </div>

      {/* Layer pipeline */}
      <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-2">
        {LAYERS.map((l, i) => (
          <div key={i} className="flex items-center shrink-0">
            <button onClick={() => setActive(i)} className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border transition-all ${active === i ? "border-indigo-500 bg-indigo-900/30 scale-110" : "border-slate-700 bg-slate-800/50 opacity-50 hover:opacity-80"}`}>
              {l.emoji}
            </button>
            {i < LAYERS.length - 1 && <div className="w-4 h-0.5 bg-slate-700" />}
          </div>
        ))}
      </div>

      {/* Active layer */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 mb-5">
        <h3 className="text-base font-semibold text-white mb-1">{LAYERS[active].emoji} {LAYERS[active].name}</h3>
        <p className="text-sm text-slate-400 mb-4">{LAYERS[active].desc}</p>
        <div className="flex flex-wrap gap-2">
          {LAYERS[active].detects.map((d, i) => (
            <span key={i} className="px-3 py-1.5 rounded-lg bg-sky-900/30 border border-sky-500/30 text-xs text-sky-300">{d}</span>
          ))}
        </div>
      </div>

      {/* Scanning animation */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 mb-5">
        <h3 className="text-xs font-semibold text-white mb-3">🔍 How a Filter Scans</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="relative">
            <div className="grid grid-cols-6 gap-0.5">
              {Array.from({ length: 36 }).map((_, i) => <div key={i} className="w-7 h-7 rounded-sm bg-slate-700/50" style={{ opacity: 0.3 + Math.random() * 0.7 }} />)}
            </div>
            <div className="absolute w-[66px] h-[66px] border-2 border-yellow-400 rounded-sm animate-[scan_4s_ease-in-out_infinite]" style={{ top: 0, left: 0 }} />
          </div>
          <p className="text-xs text-slate-400 max-w-xs">A small 3×3 filter slides across the image checking: &ldquo;Does this area match the pattern I&apos;m looking for?&rdquo;</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">📸 Used For</h4><p className="text-[11px] text-slate-400">Image recognition, self-driving cars, medical imaging, face detection.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🏊 Pooling</h4><p className="text-[11px] text-slate-400">After each layer, shrinks the image — keeping important info, losing detail.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🎯 Position Invariant</h4><p className="text-[11px] text-slate-400">Recognizes a cat whether it&apos;s top-left or bottom-right!</p></div>
      </div>
    </div>
  );
}
