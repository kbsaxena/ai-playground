"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const questions = [
  { q: "What is a Large Language Model (LLM)?", a: "A neural network trained on massive text data (billions of tokens) that can generate, understand, and manipulate human language. It predicts the next token given previous context. Examples: GPT-4, Claude, Llama, Gemini." },
  { q: "How does an LLM generate text?", a: "Autoregressive generation: it predicts one token at a time, appends it to the input, then predicts the next. Repeats until a stop condition. Each prediction is a probability distribution over the entire vocabulary." },
  { q: "What is temperature in LLMs?", a: "A parameter that controls randomness. Temperature=0: always picks the most likely token (deterministic). Temperature=1: samples proportionally to probabilities. Temperature>1: more random/creative. Lower = factual, higher = creative." },
  { q: "What is top-p (nucleus) sampling?", a: "Instead of considering all tokens, only sample from the smallest set whose cumulative probability exceeds p. Top-p=0.9 means consider tokens until you've covered 90% probability mass. More dynamic than top-k." },
  { q: "What is the context window?", a: "The maximum number of tokens an LLM can process at once (input + output). GPT-4: 128K tokens. Claude: 200K. Longer context = can handle bigger documents but costs more compute and money." },
  { q: "What is tokenization?", a: "Breaking text into tokens (subwords) the model can process. BPE (Byte Pair Encoding) is most common. 'unbelievable' → ['un', 'believ', 'able']. ~1 token ≈ 4 characters in English. Affects cost and context limits." },
  { q: "What is fine-tuning an LLM?", a: "Further training a pre-trained LLM on specific data to specialize it. Full fine-tuning updates all weights (expensive). LoRA/QLoRA update only a small fraction (0.1%) — much cheaper. Used for: custom style, domain expertise, instruction following." },
  { q: "What is RLHF?", a: "Reinforcement Learning from Human Feedback. After pre-training, humans rank model outputs. A reward model learns these preferences. The LLM is then fine-tuned to maximize the reward model's score. Makes models helpful, harmless, and honest." },
  { q: "What is prompt engineering?", a: "Crafting inputs to get better outputs from LLMs without changing the model. Techniques: few-shot examples, chain-of-thought, role-playing, structured output formats, system prompts. A skill that significantly affects output quality." },
  { q: "What is chain-of-thought prompting?", a: "Asking the model to 'think step by step' before giving a final answer. Dramatically improves reasoning on math, logic, and complex tasks. The intermediate steps help the model arrive at correct conclusions." },
  { q: "What are hallucinations?", a: "When an LLM generates confident but factually incorrect information. Causes: training data gaps, pattern completion without understanding, no grounding in real-time facts. Mitigation: RAG, citations, lower temperature, fact-checking." },
  { q: "What is the difference between GPT and BERT?", a: "GPT: decoder-only, autoregressive (predicts next token), good for generation. BERT: encoder-only, bidirectional (sees full context), good for understanding/classification. GPT generates text; BERT understands text." },
  { q: "What is LoRA?", a: "Low-Rank Adaptation: a parameter-efficient fine-tuning method. Instead of updating all weights, it adds small trainable matrices (rank 4-64) alongside frozen original weights. 100x fewer parameters to train. Can fine-tune on a single GPU." },
  { q: "What is quantization?", a: "Reducing model precision from 32-bit to 16-bit, 8-bit, or 4-bit. Dramatically reduces memory and speeds up inference with minimal quality loss. GPTQ, AWQ, GGUF are popular formats. Enables running large models on consumer hardware." },
  { q: "What is the difference between inference and training?", a: "Training: learning weights from data (expensive, done once, needs GPUs for days/weeks). Inference: using the trained model to make predictions (cheaper, done millions of times, needs to be fast). Different optimization strategies for each." },
  { q: "What is a system prompt?", a: "Instructions given to the LLM that define its behavior, personality, and constraints. Set before the user's message. Examples: 'You are a helpful coding assistant' or 'Always respond in JSON format'. Shapes all subsequent responses." },
  { q: "What is function calling / tool use?", a: "LLMs can output structured requests to call external functions (APIs, databases, calculators). The model decides when to use a tool, generates the parameters, and incorporates the result. Enables: web search, code execution, data retrieval." },
  { q: "What is the scaling law?", a: "Performance improves predictably with more: compute, data, and parameters. Doubling model size gives consistent improvement. This is why companies keep making bigger models. But there are diminishing returns and cost constraints." },
  { q: "What is an embedding model vs a generative model?", a: "Embedding model: converts text to fixed-size vectors (for search, similarity, clustering). Generative model: produces new text token by token. Different architectures optimized for different tasks. You often use both together (RAG)." },
  { q: "What is model distillation?", a: "Training a smaller 'student' model to mimic a larger 'teacher' model. The student learns from the teacher's output probabilities (soft labels), not just correct answers. Result: smaller, faster model with most of the teacher's capability." },
  { q: "What are the main LLM safety concerns?", a: "Hallucinations (false info), bias (from training data), jailbreaking (bypassing safety), privacy (memorizing training data), misuse (spam, deepfakes), over-reliance (humans trusting AI too much), job displacement." },
  { q: "What is the difference between open-source and closed-source LLMs?", a: "Closed: GPT-4, Claude — API access only, no weights. Open: Llama, Mistral — downloadable weights, can run locally, fine-tune, modify. Open = more control, privacy, cost savings. Closed = usually better performance, easier to use." },
  { q: "How do you evaluate LLM performance?", a: "Benchmarks: MMLU (knowledge), HumanEval (coding), GSM8K (math), TruthfulQA (honesty). Also: human evaluation, task-specific metrics, A/B testing in production. No single metric captures everything." },
  { q: "What is multi-modal AI?", a: "Models that process multiple types of input: text + images (GPT-4V), text + audio (Whisper), text + video. Can describe images, answer questions about photos, generate images from text. The trend is toward unified models." },
  { q: "What is an AI agent?", a: "An LLM that can: plan multi-step tasks, use tools, maintain memory, and act autonomously. Goes beyond single-turn Q&A. Examples: AutoGPT, LangChain agents, Devin. Can browse web, write code, manage files." },
];

export default function LLMInterviewPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">LLM Interview Questions</h1>
          <p className="text-xs text-slate-400">{questions.length} questions · Click to reveal answers</p>
        </div>
      </div>

      <div className="space-y-2">
        {questions.map((item, i) => (
          <div key={i} className="rounded-xl bg-slate-900/80 border border-slate-700/40 overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors">
              <span className="text-sm text-white font-medium pr-4">{item.q}</span>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
            </button>
            {openIdx === i && (
              <div className="px-4 pb-4 border-t border-slate-800">
                <p className="text-sm text-slate-300 leading-relaxed pt-3">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
