"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const moduleId = pathname.split("/modules/")[1] || "";
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-playground-completed");
    if (saved) {
      const list: string[] = JSON.parse(saved);
      setCompleted(list.includes(moduleId));
    }
  }, [moduleId]);

  const toggleComplete = () => {
    const saved = localStorage.getItem("ai-playground-completed");
    const list: string[] = saved ? JSON.parse(saved) : [];

    let updated: string[];
    if (list.includes(moduleId)) {
      updated = list.filter((id) => id !== moduleId);
      setCompleted(false);
    } else {
      updated = [...list, moduleId];
      setCompleted(true);
    }

    localStorage.setItem("ai-playground-completed", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Playground
        </Link>

        {/* Inline complete toggle */}
        <button
          onClick={toggleComplete}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            completed
              ? "bg-green-600/20 border border-green-500/40 text-green-400"
              : "bg-slate-800 border border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-400"
          }`}
        >
          {completed ? (
            <CheckCircle className="w-3.5 h-3.5" />
          ) : (
            <Circle className="w-3.5 h-3.5" />
          )}
          {completed ? "Completed ✓" : "Mark Complete"}
        </button>
      </div>

      {/* Module content */}
      {children}

      {/* Bottom CTA */}
      <div className="mt-12 mb-4 flex flex-col items-center gap-3 py-6 border-t border-slate-800">
        <button
          onClick={toggleComplete}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
            completed
              ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
          }`}
        >
          {completed ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Completed! Click to undo
            </>
          ) : (
            <>
              <Circle className="w-4 h-4" />
              I understand this — Mark Complete
            </>
          )}
        </button>
        <p className="text-[11px] text-slate-600">
          {completed
            ? "This concept is tracked in your progress on the homepage."
            : "Mark this concept as done to track your learning progress."}
        </p>
      </div>
    </div>
  );
}
