"use client";

import { useState, useCallback } from "react";
import { Brain, Play, RotateCcw } from "lucide-react";

const LAYER_SIZES = [3, 4, 4, 2];
const W = 700, H = 380;

interface Neuron { id: string; x: number; y: number; value: number; layer: number; }
interface Conn { from: string; to: string; weight: number; }

function buildNetwork() {
  const neurons: Neuron[] = [], connections: Conn[] = [];
  const spacing = W / (LAYER_SIZES.length + 1);
  LAYER_SIZES.forEach((size, li) => {
    const x = spacing * (li + 1), gap = H / (size + 1);
    for (let i = 0; i < size; i++) {
      neurons.push({ id: `${li}-${i}`, x, y: gap * (i + 1), value: li === 0 ? Math.random() : 0, layer: li });
      if (li > 0) for (let j = 0; j < LAYER_SIZES[li - 1]; j++) connections.push({ from: `${li - 1}-${j}`, to: `${li}-${i}`, weight: Math.random() * 2 - 1 });
    }
  });
  return { neurons, connections };
}

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

export default function NeuralNetworkPage() {
  const [net, setNet] = useState(buildNetwork);
  const [animating, setAnimating] = useState(false);
  const [activeLayer, setActiveLayer] = useState(-1);
  const [inputs, setInputs] = useState([0.8, 0.5, 0.3]);
  const [log, setLog] = useState<string[]>([]);

  const forward = useCallback(() => {
    setAnimating(true); setActiveLayer(0);
    setLog(["▶ Starting forward pass..."]);
    const n = [...net.neurons];
    n.filter(x => x.layer === 0).forEach((x, i) => { x.value = inputs[i]; });
    setNet({ neurons: n, connections: net.connections });
    setLog(prev => [...prev, `📥 Input layer set: [${inputs.map(v => v.toFixed(2)).join(", ")}]`]);
    let layer = 1;
    const iv = setInterval(() => {
      if (layer >= LAYER_SIZES.length) {
        clearInterval(iv); setAnimating(false); setActiveLayer(-1);
        const outputs = n.filter(x => x.layer === LAYER_SIZES.length - 1).map(x => x.value.toFixed(3));
        setLog(prev => [...prev, `✅ Done! Output: [${outputs.join(", ")}]`]);
        return;
      }
      setActiveLayer(layer);
      const layerName = layer === LAYER_SIZES.length - 1 ? "Output" : `Hidden ${layer}`;
      setLog(prev => [...prev, `⚡ Processing ${layerName} layer...`]);
      n.filter(x => x.layer === layer).forEach(neuron => {
        let sum = 0;
        net.connections.filter(c => c.to === neuron.id).forEach(c => { const f = n.find(x => x.id === c.from); if (f) sum += f.value * c.weight; });
        neuron.value = sigmoid(sum);
      });
      const values = n.filter(x => x.layer === layer).map(x => x.value.toFixed(3));
      setLog(prev => [...prev, `   → ${layerName} outputs: [${values.join(", ")}]`]);
      setNet({ neurons: [...n], connections: net.connections });
      layer++;
    }, 600);
  }, [net, inputs]);

  const reset = () => { setNet(buildNetwork()); setAnimating(false); setActiveLayer(-1); setLog([]); };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div>
        <div><h1 className="text-2xl font-bold text-white">Neural Network</h1><p className="text-xs text-indigo-400">The Domino Chain</p></div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          A neural network passes information through layers of connected nodes (neurons). Each connection has a &apos;weight&apos; that strengthens or weakens the signal. Together, they transform inputs into predictions.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Adjust the input sliders, then hit &apos;Send Signal&apos; to watch data flow through the network layer by layer.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button onClick={forward} disabled={animating} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50 transition-colors"><Play className="w-4 h-4" />Send Signal</button>
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"><RotateCcw className="w-4 h-4" />Reset</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {inputs.map((v, i) => (
          <div key={i} className="p-2 rounded-lg bg-slate-800 border border-slate-700/50">
            <label className="text-[11px] text-slate-500 block mb-1">Input {i + 1}: {v.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={v} onChange={e => { const a = [...inputs]; a[i] = +e.target.value; setInputs(a); }} className="w-full accent-indigo-500 h-1.5" />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-3 mb-5">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[380px]">
          {net.connections.map((c, i) => {
            const f = net.neurons.find(n => n.id === c.from), t = net.neurons.find(n => n.id === c.to);
            if (!f || !t) return null;
            return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke={c.weight > 0 ? "#818cf8" : "#f87171"} strokeWidth={Math.abs(c.weight) * 1.5 + 0.3} opacity={0.1 + Math.abs(c.weight) * f.value * 0.5} />;
          })}
          {net.neurons.map(n => {
            const int = Math.round(n.value * 255);
            const fill = n.layer === 0 ? `rgb(99,${int},241)` : n.layer === LAYER_SIZES.length - 1 ? `rgb(${int},200,100)` : `rgb(${int},${Math.round(int * 0.6)},241)`;
            return (
              <g key={n.id}>
                {activeLayer === n.layer && <circle cx={n.x} cy={n.y} r={22} fill="none" stroke={fill} strokeWidth={2} opacity={0.6}><animate attributeName="r" values="18;24;18" dur="0.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.8s" repeatCount="indefinite" /></circle>}
                <circle cx={n.x} cy={n.y} r={16} fill={fill} stroke="white" strokeWidth={0.5} strokeOpacity={0.3} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{n.value.toFixed(2)}</text>
              </g>
            );
          })}
          {LAYER_SIZES.map((_, i) => <text key={i} x={(W / (LAYER_SIZES.length + 1)) * (i + 1)} y={H - 8} textAnchor="middle" fill="#64748b" fontSize="10">{["Input", "Hidden 1", "Hidden 2", "Output"][i]}</text>)}
        </svg>
      </div>

      {/* Live Log */}
      {log.length > 0 && (
        <div className="rounded-xl bg-slate-950 border border-slate-700/50 p-4 mb-5 font-mono">
          <h4 className="text-xs font-semibold text-slate-400 mb-2">📋 What&apos;s happening:</h4>
          <div className="space-y-1 max-h-[150px] overflow-y-auto">
            {log.map((msg, i) => (
              <p key={i} className={`text-xs ${msg.startsWith("✅") ? "text-green-400" : msg.startsWith("⚡") ? "text-yellow-300" : msg.startsWith("   →") ? "text-indigo-300" : "text-slate-400"}`}>
                {msg}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🔵 Input Layer</h4><p className="text-[11px] text-slate-400">What the network sees — numbers between 0 and 1.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🟣 Hidden Layers</h4><p className="text-[11px] text-slate-400">The thinking — combining signals and deciding how excited to get.</p></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50"><h4 className="text-xs font-semibold text-white mb-1">🟢 Output Layer</h4><p className="text-[11px] text-slate-400">The answer! Higher = more confident.</p></div>
      </div>
    </div>
  );
}

