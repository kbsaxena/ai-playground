"use client";

import { useState, useCallback } from "react";
import { Gamepad2, RotateCcw } from "lucide-react";

const GRID_SIZE = 5;
const GOAL = { row: 0, col: 4 };
const TRAP = { row: 2, col: 2 };
const WALL = { row: 1, col: 2 };

export default function ReinforcementLearningPage() {
  const [row, setRow] = useState(4);
  const [col, setCol] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState("Use buttons to move the agent!");
  const [gameOver, setGameOver] = useState(false);
  const [visited, setVisited] = useState<string[]>(["4-0"]);

  const move = useCallback((dir: "up" | "down" | "left" | "right") => {
    if (gameOver) return;

    let newRow = row;
    let newCol = col;
    if (dir === "up") newRow--;
    if (dir === "down") newRow++;
    if (dir === "left") newCol--;
    if (dir === "right") newCol++;

    if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
      setMessage("💥 Hit boundary! -1"); setTotalReward((r) => r - 1); return;
    }
    if (newRow === WALL.row && newCol === WALL.col) {
      setMessage("🧱 Blocked! Try another way"); setTotalReward((r) => r - 1); return;
    }

    setRow(newRow); setCol(newCol); setSteps((s) => s + 1);
    setVisited((v) => [...v, `${newRow}-${newCol}`]);

    if (newRow === TRAP.row && newCol === TRAP.col) {
      setMessage("☠️ Fell into trap! -10"); setTotalReward((r) => r - 10); setGameOver(true);
    } else if (newRow === GOAL.row && newCol === GOAL.col) {
      setMessage("🎉 Reached the goal! +100"); setTotalReward((r) => r + 100); setGameOver(true);
    } else {
      setMessage("🚶 Moving... (-0.1 per step)"); setTotalReward((r) => Math.round((r - 0.1) * 10) / 10);
    }
  }, [row, col, gameOver]);

  const reset = () => {
    setRow(4); setCol(0); setTotalReward(0); setSteps(0);
    setMessage("Use buttons to move the agent!"); setGameOver(false); setVisited(["4-0"]);
  };

  const getCellContent = (r: number, c: number) => {
    if (r === row && c === col) return "🤖";
    if (r === GOAL.row && c === GOAL.col) return "⭐";
    if (r === TRAP.row && c === TRAP.col) return "🕳️";
    if (r === WALL.row && c === WALL.col) return "🧱";
    return "";
  };

  const getCellBg = (r: number, c: number) => {
    if (r === row && c === col) return "bg-blue-900/40 border-blue-500/50";
    if (r === GOAL.row && c === GOAL.col) return "bg-green-900/40 border-green-500/50";
    if (r === TRAP.row && c === TRAP.col) return "bg-red-900/40 border-red-500/50";
    if (r === WALL.row && c === WALL.col) return "bg-slate-600/40 border-slate-500/50";
    if (visited.includes(`${r}-${c}`)) return "bg-indigo-900/20 border-indigo-500/20";
    return "bg-slate-800/40 border-slate-700/30";
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center">
          <Gamepad2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Reinforcement Learning</h1>
          <p className="text-xs text-indigo-400">Learning by Playing</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Reinforcement Learning is trial-and-error learning. An agent takes actions in an environment, gets rewards for good moves and penalties for bad ones. Over time, it discovers the optimal strategy.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Use the arrow buttons to guide the robot to the star. Avoid the trap! Each step costs -0.1, so be efficient.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grid */}
        <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5">
          <div className="grid grid-cols-5 gap-1.5 mb-4">
            {Array.from({ length: GRID_SIZE }).map((_, r) =>
              Array.from({ length: GRID_SIZE }).map((_, c) => (
                <div key={`${r}-${c}`} className={`aspect-square rounded-lg border flex items-center justify-center text-2xl ${getCellBg(r, c)}`}>
                  {getCellContent(r, c)}
                </div>
              ))
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-1">
            <button onClick={() => move("up")} disabled={gameOver} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm disabled:opacity-30 transition-colors">↑</button>
            <div className="flex gap-1">
              <button onClick={() => move("left")} disabled={gameOver} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm disabled:opacity-30 transition-colors">←</button>
              <button onClick={() => move("down")} disabled={gameOver} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm disabled:opacity-30 transition-colors">↓</button>
              <button onClick={() => move("right")} disabled={gameOver} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm disabled:opacity-30 transition-colors">→</button>
            </div>
          </div>
          <button onClick={reset} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4">
            <p className="text-sm text-white mb-3">{message}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="text-[10px] text-slate-500">Total Reward</span>
                <p className={`text-lg font-mono ${totalReward >= 0 ? "text-green-400" : "text-red-400"}`}>{totalReward}</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50">
                <span className="text-[10px] text-slate-500">Steps</span>
                <p className="text-lg font-mono text-white">{steps}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4">
            <h4 className="text-xs font-semibold text-white mb-2">Legend</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>🤖 Agent (you control)</p>
              <p>⭐ Goal (+100 reward)</p>
              <p>🕳️ Trap (-10 reward)</p>
              <p>🧱 Wall (blocked)</p>
              <p>🚶 Each step costs -0.1</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-4">
            <h4 className="text-xs font-semibold text-white mb-2">Key Concepts</h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p><span className="text-white">Agent:</span> The learner (robot)</p>
              <p><span className="text-white">Environment:</span> The grid world</p>
              <p><span className="text-white">Reward:</span> Feedback for each action</p>
              <p><span className="text-white">Policy:</span> Strategy for choosing actions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
