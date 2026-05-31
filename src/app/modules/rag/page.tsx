"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen } from "lucide-react";

type Phase = "idle" | "searching" | "reading" | "answering" | "done";

interface QA {
  question: string;
  answer: string;
  source: string;
}

const QUESTIONS: QA[] = [
  { question: "What is photosynthesis?", answer: "Photosynthesis is the process by which plants convert sunlight, water, and CO₂ into glucose and oxygen using chlorophyll.", source: "Biology Textbook, Ch. 6" },
  { question: "How do black holes form?", answer: "Black holes form when massive stars exhaust their fuel and collapse under their own gravity, compressing matter into an infinitely dense point.", source: "Astrophysics Journal, 2023" },
  { question: "What causes rain?", answer: "Rain occurs when water vapor in clouds condenses into droplets heavy enough to fall. This happens when moist air rises and cools.", source: "Earth Science Reference, Ch. 4" },
];

export default function RAGPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const [studentPos, setStudentPos] = useState(0);
  const [highlightBook, setHighlightBook] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);

  const runAnimation = useCallback((qIndex: number) => {
    setSelectedQ(qIndex);
    setPhase("searching");
    setShowAnswer(false);
    setStudentPos(0);
    setHighlightBook(-1);

    // Phase 1: student moves to bookshelf
    let pos = 0;
    const moveInterval = setInterval(() => {
      pos += 10;
      setStudentPos(pos);
      if (pos >= 100) {
        clearInterval(moveInterval);
        setPhase("reading");
        // Phase 2: highlight books
        let bookIdx = 0;
        const bookInterval = setInterval(() => {
          setHighlightBook(bookIdx);
          bookIdx++;
          if (bookIdx >= 3) {
            clearInterval(bookInterval);
            setPhase("answering");
            // Phase 3: show answer
            setTimeout(() => {
              setShowAnswer(true);
              setPhase("done");
            }, 800);
          }
        }, 500);
      }
    }, 80);
  }, []);

  const reset = () => {
    setPhase("idle");
    setSelectedQ(null);
    setStudentPos(0);
    setHighlightBook(-1);
    setShowAnswer(false);
  };

  useEffect(() => {
    return () => {
      // cleanup on unmount
    };
  }, []);

  const phaseLabel: Record<Phase, string> = {
    idle: "Ask a question to start",
    searching: "🔍 Searching knowledge base...",
    reading: "📖 Reading relevant documents...",
    answering: "✍️ Generating answer...",
    done: "✅ Answer ready!",
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">RAG</h1>
          <p className="text-xs text-violet-400">Retrieval Augmented Generation</p>
        </div>
      </div>
      {/* What's happening */}
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">🎯 What&apos;s happening here?</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          RAG lets AI look up facts before answering instead of relying on memory. It searches a knowledge base, reads relevant documents, then generates an informed answer — like an open-book exam.
        </p>
        <p className="text-xs text-slate-400">
          👇 <strong>Try it:</strong> Click a question and watch the AI student search the bookshelf, grab the right book, and answer.
        </p>
      </div>

      {/* Question Buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => phase === "idle" || phase === "done" ? runAnimation(i) : null}
            disabled={phase !== "idle" && phase !== "done"}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/50 text-sm text-slate-300 disabled:opacity-50 transition-all duration-200"
          >
            {q.question}
          </button>
        ))}
        {phase === "done" && (
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm text-white transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Animation Area */}
      <div className="rounded-xl bg-slate-900 border border-slate-700/50 p-5 mb-4 min-h-[140px] relative overflow-hidden">
        {/* Phase indicator */}
        <p className="text-xs text-slate-400 mb-3">{phaseLabel[phase]}</p>

        <div className="flex items-end gap-6 h-20">
          {/* Student */}
          <div
            className="text-3xl transition-all duration-300 ease-out"
            style={{ transform: `translateX(${studentPos}px)` }}
          >
            🧑‍🎓
          </div>

          {/* Bookshelf */}
          <div className="flex gap-2 ml-auto">
            {["📕", "📗", "📘"].map((book, i) => (
              <div
                key={i}
                className={`text-2xl p-2 rounded-lg transition-all duration-200 ${
                  highlightBook === i
                    ? "bg-violet-500/30 scale-110 ring-2 ring-violet-400"
                    : "bg-slate-800"
                }`}
              >
                {book}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Display */}
      {showAnswer && selectedQ !== null && (
        <div className="rounded-xl bg-slate-900 border border-violet-500/30 p-4 mb-5">
          <h3 className="text-sm font-semibold text-white mb-2">💡 Answer</h3>
          <p className="text-sm text-slate-300 mb-2">{QUESTIONS[selectedQ].answer}</p>
          <p className="text-[11px] text-violet-400">📚 Source: {QUESTIONS[selectedQ].source}</p>
        </div>
      )}

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">🔍 Retrieve</h4>
          <p className="text-[11px] text-slate-400">Search a knowledge base for documents relevant to the question. Like a student going to the library.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">📖 Augment</h4>
          <p className="text-[11px] text-slate-400">Feed the retrieved context into the language model alongside the question.</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-white mb-1">✍️ Generate</h4>
          <p className="text-[11px] text-slate-400">The model generates an answer grounded in real sources — reducing hallucination.</p>
        </div>
      </div>
    </div>
  );
}
