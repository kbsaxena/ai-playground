"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain, Dog, Database, Hash, MapPin, Layers, MessageSquare,
  Highlighter, TrendingDown, Eye, BookOpen, Wrench, Sparkles,
  Network, Gamepad2, Scale, Search, GraduationCap, Send,
} from "lucide-react";

const modules = [
  { id: "training-data", title: "Training Data", subtitle: "The Textbook Collection", icon: Database, color: "from-teal-500 to-green-600", section: 0 },
  { id: "neural-network", title: "Neural Network", subtitle: "The Domino Chain", icon: Brain, color: "from-purple-500 to-indigo-600", section: 0 },
  { id: "training", title: "Training", subtitle: "Teaching a Dog Tricks", icon: Dog, color: "from-amber-500 to-orange-600", section: 0 },
  { id: "gradient-descent", title: "Gradient Descent", subtitle: "Rolling Downhill", icon: TrendingDown, color: "from-red-500 to-pink-600", section: 0 },
  { id: "bias-variance", title: "Bias vs Variance", subtitle: "The Goldilocks Problem", icon: Scale, color: "from-indigo-500 to-violet-600", section: 0 },
  { id: "tokens", title: "Tokens", subtitle: "Breaking Words Apart", icon: Hash, color: "from-cyan-500 to-blue-600", section: 1 },
  { id: "embeddings", title: "Embeddings", subtitle: "Words on a Map", icon: MapPin, color: "from-rose-500 to-red-600", section: 1 },
  { id: "attention", title: "Attention", subtitle: "Highlighting a Textbook", icon: Highlighter, color: "from-yellow-500 to-amber-600", section: 1 },
  { id: "transformers", title: "Transformers", subtitle: "The Assembly Line", icon: Layers, color: "from-violet-500 to-purple-600", section: 2 },
  { id: "llm", title: "LLMs", subtitle: "World's Best Autocomplete", icon: MessageSquare, color: "from-green-500 to-emerald-600", section: 2 },
  { id: "cnn", title: "CNNs", subtitle: "The Magnifying Glass", icon: Eye, color: "from-sky-500 to-blue-600", section: 2 },
  { id: "rag", title: "RAG", subtitle: "Open Book Exam", icon: BookOpen, color: "from-blue-500 to-cyan-600", section: 3 },
  { id: "fine-tuning", title: "Fine-Tuning", subtitle: "Specialization School", icon: Wrench, color: "from-orange-500 to-amber-600", section: 3 },
  { id: "diffusion", title: "Diffusion", subtitle: "Unscrambling Noise", icon: Sparkles, color: "from-fuchsia-500 to-purple-600", section: 3 },
  { id: "gan", title: "GANs", subtitle: "Forger vs Detective", icon: Network, color: "from-pink-500 to-rose-600", section: 3 },
  { id: "reinforcement-learning", title: "RL", subtitle: "Learning by Playing", icon: Gamepad2, color: "from-lime-500 to-green-600", section: 3 },
];

const sections = [
  { emoji: "🧱", name: "Fundamentals" },
  { emoji: "📖", name: "Language" },
  { emoji: "🏗️", name: "Architectures" },
  { emoji: "🚀", name: "Advanced" },
];

const interviewTopics = [
  { title: "AI Interview Questions", href: "/interview/ai", count: 25 },
  { title: "ML Interview Questions", href: "/interview/ml", count: 30 },
  { title: "RAG Interview Questions", href: "/interview/rag", count: 20 },
  { title: "LLM Interview Questions", href: "/interview/llm", count: 25 },
  { title: "Transformer Interview Questions", href: "/interview/transformers", count: 20 },
];

const roadmap = [
  { level: "Beginner", items: ["Training Data", "Neural Networks", "Training", "Gradient Descent"] },
  { level: "Intermediate", items: ["Tokens", "Embeddings", "Attention", "Transformers", "LLMs"] },
  { level: "Advanced", items: ["RAG", "Fine-Tuning", "Diffusion", "GANs", "RL"] },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-playground-completed");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const filteredModules = searchQuery
    ? modules.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : modules;

  const progress = Math.round((completed.length / modules.length) * 100);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-float-slow" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] animate-float-medium" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[140px] animate-float-fast" />
        <div className="absolute top-[60%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-600/8 blur-[100px] animate-float-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Hero */}
      <section className="text-center pt-16 pb-8 px-4 relative">
        {/* Neural network background animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-[0.07]" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            {/* Nodes */}
            <circle cx="80" cy="100" r="4" fill="#818cf8"><animate attributeName="cy" values="100;120;100" dur="6s" repeatCount="indefinite" /></circle>
            <circle cx="200" cy="200" r="3" fill="#a78bfa"><animate attributeName="cy" values="200;180;200" dur="5s" repeatCount="indefinite" /></circle>
            <circle cx="350" cy="80" r="5" fill="#818cf8"><animate attributeName="cx" values="350;370;350" dur="7s" repeatCount="indefinite" /></circle>
            <circle cx="500" cy="150" r="3.5" fill="#c084fc"><animate attributeName="cy" values="150;170;150" dur="4s" repeatCount="indefinite" /></circle>
            <circle cx="650" cy="100" r="4" fill="#818cf8"><animate attributeName="cx" values="650;630;650" dur="6s" repeatCount="indefinite" /></circle>
            <circle cx="720" cy="250" r="3" fill="#a78bfa"><animate attributeName="cy" values="250;230;250" dur="5s" repeatCount="indefinite" /></circle>
            <circle cx="100" cy="350" r="3.5" fill="#c084fc"><animate attributeName="cx" values="100;120;100" dur="7s" repeatCount="indefinite" /></circle>
            <circle cx="250" cy="400" r="4" fill="#818cf8"><animate attributeName="cy" values="400;380;400" dur="4.5s" repeatCount="indefinite" /></circle>
            <circle cx="400" cy="300" r="5" fill="#a78bfa"><animate attributeName="cx" values="400;420;400" dur="8s" repeatCount="indefinite" /></circle>
            <circle cx="550" cy="380" r="3" fill="#818cf8"><animate attributeName="cy" values="380;360;380" dur="5.5s" repeatCount="indefinite" /></circle>
            <circle cx="700" cy="420" r="4" fill="#c084fc"><animate attributeName="cx" values="700;680;700" dur="6.5s" repeatCount="indefinite" /></circle>
            <circle cx="150" cy="250" r="3" fill="#818cf8"><animate attributeName="cy" values="250;270;250" dur="5s" repeatCount="indefinite" /></circle>
            <circle cx="450" cy="450" r="3.5" fill="#a78bfa"><animate attributeName="cx" values="450;430;450" dur="7s" repeatCount="indefinite" /></circle>
            <circle cx="600" cy="50" r="3" fill="#c084fc"><animate attributeName="cy" values="50;70;50" dur="4s" repeatCount="indefinite" /></circle>

            {/* Connections */}
            <line x1="80" y1="100" x2="200" y2="200" stroke="#818cf8" strokeWidth="0.5" opacity="0.6"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" /></line>
            <line x1="200" y1="200" x2="350" y2="80" stroke="#a78bfa" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite" /></line>
            <line x1="350" y1="80" x2="500" y2="150" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="6s" repeatCount="indefinite" /></line>
            <line x1="500" y1="150" x2="650" y2="100" stroke="#c084fc" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="4.5s" repeatCount="indefinite" /></line>
            <line x1="650" y1="100" x2="720" y2="250" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="5.5s" repeatCount="indefinite" /></line>
            <line x1="100" y1="350" x2="250" y2="400" stroke="#a78bfa" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="6s" repeatCount="indefinite" /></line>
            <line x1="250" y1="400" x2="400" y2="300" stroke="#818cf8" strokeWidth="0.5" opacity="0.6"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="5s" repeatCount="indefinite" /></line>
            <line x1="400" y1="300" x2="550" y2="380" stroke="#c084fc" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="7s" repeatCount="indefinite" /></line>
            <line x1="550" y1="380" x2="700" y2="420" stroke="#818cf8" strokeWidth="0.5" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" /></line>
            <line x1="150" y1="250" x2="350" y2="80" stroke="#a78bfa" strokeWidth="0.5" opacity="0.3"><animate attributeName="opacity" values="0.3;0.1;0.3" dur="6s" repeatCount="indefinite" /></line>
            <line x1="200" y1="200" x2="400" y2="300" stroke="#818cf8" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite" /></line>
            <line x1="500" y1="150" x2="400" y2="300" stroke="#c084fc" strokeWidth="0.5" opacity="0.3"><animate attributeName="opacity" values="0.3;0.1;0.3" dur="7s" repeatCount="indefinite" /></line>
            <line x1="80" y1="100" x2="150" y2="250" stroke="#818cf8" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.2;0.4" dur="5.5s" repeatCount="indefinite" /></line>
            <line x1="450" y1="450" x2="550" y2="380" stroke="#a78bfa" strokeWidth="0.5" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="4.5s" repeatCount="indefinite" /></line>
            <line x1="600" y1="50" x2="650" y2="100" stroke="#c084fc" strokeWidth="0.5" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="6s" repeatCount="indefinite" /></line>
            <line x1="720" y1="250" x2="700" y2="420" stroke="#818cf8" strokeWidth="0.5" opacity="0.3"><animate attributeName="opacity" values="0.3;0.1;0.3" dur="5s" repeatCount="indefinite" /></line>

            {/* Traveling pulses along connections */}
            <circle r="2" fill="#818cf8" opacity="0.8"><animateMotion dur="3s" repeatCount="indefinite" path="M80,100 L200,200" /></circle>
            <circle r="2" fill="#a78bfa" opacity="0.8"><animateMotion dur="4s" repeatCount="indefinite" path="M350,80 L500,150" /></circle>
            <circle r="2" fill="#c084fc" opacity="0.8"><animateMotion dur="3.5s" repeatCount="indefinite" path="M400,300 L550,380" /></circle>
            <circle r="1.5" fill="#818cf8" opacity="0.7"><animateMotion dur="5s" repeatCount="indefinite" path="M200,200 L400,300" /></circle>
            <circle r="1.5" fill="#a78bfa" opacity="0.7"><animateMotion dur="4.5s" repeatCount="indefinite" path="M650,100 L720,250" /></circle>
          </svg>
        </div>

        <div className="relative z-10">
        <div className="text-6xl mb-5 animate-bounce-slow">🧠</div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-5 animate-title">
          <span className="inline-block animate-letter" style={{ animationDelay: "0ms" }}>A</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "50ms" }}>I</span>
          <span className="inline-block mr-4" />
          <span className="inline-block animate-letter" style={{ animationDelay: "150ms" }}>P</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "200ms" }}>l</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "250ms" }}>a</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "300ms" }}>y</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "350ms" }}>g</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "400ms" }}>r</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "450ms" }}>o</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "500ms" }}>u</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "550ms" }}>n</span>
          <span className="inline-block animate-letter" style={{ animationDelay: "600ms" }}>d</span>
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-slate-300 mb-3 max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: "700ms" }}>
          Learn Artificial Intelligence &amp; Machine Learning Through Interactive Visualizations
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "900ms" }}>
          Master AI, Machine Learning, Transformers, LLMs, RAG, Fine-Tuning and Deep Learning with simple interactive lessons.
        </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "1000ms" }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI Concepts..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="mb-10 p-4 rounded-xl bg-slate-900/70 border border-slate-700/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">📊 Your Progress</span>
            <span className="text-xs text-slate-400">
              Completed: {completed.length}/{modules.length} concepts
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-xs text-green-400 mt-2">🎉 You&apos;ve completed all concepts!</p>
          )}
        </div>

        {/* Module Cards */}
        {searchQuery ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
            {filteredModules.map((module) => (
              <Link key={module.id} href={`/modules/${module.id}`}>
                <div className="group relative rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 h-full cursor-pointer transition-all duration-200 hover:bg-slate-800/80 hover:border-slate-500/50 hover:shadow-lg hover:-translate-y-1">
                  <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <module.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-0.5">{module.title}</h3>
                  <p className="text-[11px] text-slate-500">{module.subtitle}</p>
                </div>
              </Link>
            ))}
            {filteredModules.length === 0 && (
              <p className="col-span-full text-center text-slate-500 py-8">No concepts found for &ldquo;{searchQuery}&rdquo;</p>
            )}
          </div>
        ) : (
          sections.map((section, si) => {
            const items = modules.filter((m) => m.section === si);
            return (
              <section key={section.name} className="mb-10">
                <div className="flex items-center gap-2 mb-4 ml-1">
                  <span className="text-xl">{section.emoji}</span>
                  <span className="text-sm font-semibold text-slate-300">{section.name}</span>
                  <div className="flex-1 h-px bg-slate-800 ml-3" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map((module) => (
                    <div key={module.id} className="relative">
                      <Link href={`/modules/${module.id}`}>
                        <div className={`group relative rounded-xl bg-slate-900/70 border p-4 h-full cursor-pointer transition-all duration-200 hover:bg-slate-800/80 hover:border-slate-500/50 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] ${completed.includes(module.id) ? "border-green-500/40" : "border-slate-700/40"}`}>
                          <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <module.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-sm font-bold text-white mb-0.5 leading-tight">{module.title}</h3>
                          <p className="text-[11px] text-slate-500 leading-snug">{module.subtitle}</p>
                          {completed.includes(module.id) && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">✓</div>
                          )}
                          <div className={`absolute top-3 right-3 text-xs transition-colors ${completed.includes(module.id) ? "hidden" : "text-slate-700 group-hover:text-indigo-400"}`}>→</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}

        {/* Learning Roadmap */}
        <section className="mb-12 mt-4">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🗺️</span>
            <span className="text-sm font-semibold text-slate-300">Learning Roadmap</span>
            <div className="flex-1 h-px bg-slate-800 ml-3" />
          </div>
          <div className="rounded-xl bg-slate-900/70 border border-slate-700/40 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmap.map((level, i) => (
                <div key={level.level}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-yellow-500" : "bg-red-500"}`} />
                    <h4 className="text-sm font-bold text-white">{level.level}</h4>
                  </div>
                  <div className="space-y-1.5 pl-5 border-l border-slate-700">
                    {level.items.map((item, j) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="text-slate-600 text-xs">{j < level.items.length - 1 ? "├─" : "└─"}</span>
                        <span className="text-xs text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                  {i < roadmap.length - 1 && (
                    <div className="hidden md:flex justify-center mt-4">
                      <span className="text-slate-600">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview Questions Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-300">Interview Prep</span>
            <div className="flex-1 h-px bg-slate-800 ml-3" />
          </div>
          <p className="text-xs text-slate-500 mb-4 ml-1">Prepare for AI/ML interviews with curated questions on each topic.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {interviewTopics.map((topic) => (
              <Link key={topic.title} href={topic.href}>
                <div className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 transition-all duration-200 hover:bg-slate-800/80 hover:border-indigo-500/40 hover:-translate-y-0.5 cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-white">{topic.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{topic.count} questions</span>
                    <span className="text-slate-600 group-hover:text-indigo-400 transition-colors text-xs">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Feedback & Suggestions */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">💬</span>
            <span className="text-sm font-semibold text-slate-300">Feedback &amp; Suggestions</span>
            <div className="flex-1 h-px bg-slate-800 ml-3" />
          </div>
          <div className="rounded-xl bg-slate-900/70 border border-slate-700/40 p-6">
            <p className="text-sm text-slate-400 mb-4">
              Missing a concept? Found a bug? Have an idea to make this better? Let us know!
            </p>
            {feedbackSent ? (
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-500/30 text-center">
                <p className="text-sm text-green-400 font-medium">✅ Thanks for your feedback!</p>
                <p className="text-xs text-slate-500 mt-1">We&apos;ll review it and improve the playground.</p>
                <button
                  onClick={() => { setFeedbackSent(false); setFeedback(""); }}
                  className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g. 'Add a module on object detection' or 'The attention page could show more examples'..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/50 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none mb-3"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-slate-600">Your feedback helps us improve this for everyone.</p>
                  <button
                    onClick={() => {
                      if (feedback.trim()) {
                        const existing = JSON.parse(localStorage.getItem("ai-playground-feedback") || "[]");
                        existing.push({ text: feedback, date: new Date().toISOString() });
                        localStorage.setItem("ai-playground-feedback", JSON.stringify(existing));
                        setFeedbackSent(true);
                      }
                    }}
                    disabled={!feedback.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Resources - Read More */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">📚</span>
            <span className="text-sm font-semibold text-slate-300">Resources &amp; Further Reading</span>
            <div className="flex-1 h-px bg-slate-800 ml-3" />
          </div>
          <p className="text-xs text-slate-500 mb-4 ml-1">Want to go deeper? Here are the best free resources to continue learning.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="https://www.3blue1brown.com/topics/neural-networks" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">3Blue1Brown — Neural Networks</h4>
              <p className="text-[11px] text-slate-500">The best visual explanation of neural networks on YouTube. Beautiful animations.</p>
            </a>
            <a href="https://jalammar.github.io/illustrated-transformer/" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">The Illustrated Transformer</h4>
              <p className="text-[11px] text-slate-500">Jay Alammar&apos;s legendary visual guide to how transformers work step by step.</p>
            </a>
            <a href="https://karpathy.ai/zero-to-hero.html" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">Karpathy — Neural Networks: Zero to Hero</h4>
              <p className="text-[11px] text-slate-500">Build GPT from scratch. The best free course for understanding LLMs deeply.</p>
            </a>
            <a href="https://huggingface.co/learn/nlp-course" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">Hugging Face NLP Course</h4>
              <p className="text-[11px] text-slate-500">Free hands-on course covering transformers, fine-tuning, and NLP with code.</p>
            </a>
            <a href="https://www.deeplearning.ai/short-courses/" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">DeepLearning.AI Short Courses</h4>
              <p className="text-[11px] text-slate-500">Free 1-hour courses on RAG, LangChain, fine-tuning, agents, and more by Andrew Ng.</p>
            </a>
            <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">Attention Is All You Need (Paper)</h4>
              <p className="text-[11px] text-slate-500">The 2017 paper that started it all. The original Transformer architecture.</p>
            </a>
            <a href="https://lilianweng.github.io/" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">Lilian Weng&apos;s Blog</h4>
              <p className="text-[11px] text-slate-500">In-depth posts on diffusion models, RLHF, RAG, agents, and more. OpenAI researcher.</p>
            </a>
            <a href="https://course.fast.ai/" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">fast.ai — Practical Deep Learning</h4>
              <p className="text-[11px] text-slate-500">Free course that teaches deep learning top-down. Build things first, theory later.</p>
            </a>
            <a href="https://github.com/mlabonne/llm-course" target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-slate-900/70 border border-slate-700/40 p-4 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all">
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300">LLM Course (GitHub)</h4>
              <p className="text-[11px] text-slate-500">Complete roadmap to learn LLMs from scratch — fundamentals to production deployment.</p>
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs text-slate-600">
        Built by <span className="text-slate-400 font-medium">Kulbhushan Saxena (KB)</span> · Making AI understandable for everyone 🌍
      </footer>
    </main>
  );
}
