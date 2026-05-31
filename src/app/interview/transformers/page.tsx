"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const questions = [
  { q: "What is a Transformer?", a: "A neural network architecture introduced in 'Attention Is All You Need' (2017). It processes entire sequences in parallel using self-attention, replacing sequential RNNs. The foundation of GPT, BERT, T5, and all modern NLP models." },
  { q: "What is self-attention?", a: "A mechanism where each token in a sequence computes attention scores with every other token to determine relevance. Creates Query, Key, Value matrices. Attention(Q,K,V) = softmax(QK^T/√d)V. Allows capturing long-range dependencies." },
  { q: "What are Query, Key, and Value in attention?", a: "Query: 'what am I looking for?' Key: 'what do I contain?' Value: 'what information do I provide?' Each token generates all three. The dot product of Q and K determines how much attention to pay, then V provides the actual information." },
  { q: "What is multi-head attention?", a: "Running multiple attention operations in parallel with different learned projections. Each 'head' can focus on different types of relationships (syntax, semantics, position). Results are concatenated and projected. Typically 8-96 heads." },
  { q: "What is positional encoding?", a: "Since transformers process all tokens in parallel (no inherent order), positional encodings add position information. Original paper used sinusoidal functions. Modern models use learned positional embeddings or RoPE (Rotary Position Embedding)." },
  { q: "What is the feed-forward network in a transformer?", a: "A two-layer MLP applied independently to each position after attention. Typically: Linear → ReLU/GELU → Linear. Expands dimensionality (4x) then contracts back. Where much of the 'knowledge' is stored." },
  { q: "What is layer normalization?", a: "Normalizing activations across the feature dimension (not batch). Applied before or after each sub-layer. Pre-norm (before attention) is more stable for training deep models. Helps with gradient flow." },
  { q: "What is the difference between encoder and decoder?", a: "Encoder: processes input bidirectionally (sees all tokens). Used for understanding (BERT). Decoder: processes autoregressively (only sees previous tokens via causal mask). Used for generation (GPT). Encoder-decoder: both (T5, original transformer)." },
  { q: "What is causal masking?", a: "In decoder models, a mask prevents each token from attending to future tokens. Ensures autoregressive property — prediction at position i only depends on positions < i. Implemented as a triangular mask on attention scores." },
  { q: "What is the computational complexity of self-attention?", a: "O(n²d) where n is sequence length and d is dimension. Quadratic in sequence length — this is why long contexts are expensive. Solutions: sparse attention, linear attention, FlashAttention (memory-efficient), sliding window." },
  { q: "What is FlashAttention?", a: "An IO-aware exact attention algorithm that's 2-4x faster by minimizing memory reads/writes between GPU HBM and SRAM. Doesn't approximate — gives exact same results. Now standard in most transformer implementations." },
  { q: "What is KV-cache?", a: "During autoregressive generation, previously computed Key and Value matrices are cached so they don't need recomputation. Each new token only computes its own Q,K,V and attends to the full cached KV. Critical for fast inference." },
  { q: "What is RoPE (Rotary Position Embedding)?", a: "A positional encoding that applies rotation matrices to Q and K vectors based on position. Encodes relative position through the angle between rotated vectors. Better length generalization than absolute positions. Used in Llama, Mistral." },
  { q: "What is the difference between pre-training and fine-tuning?", a: "Pre-training: learning language from massive unlabeled text (next token prediction). Expensive ($millions). Fine-tuning: adapting to specific tasks with smaller labeled data. Cheap ($100s). Pre-training gives general knowledge; fine-tuning gives specific skills." },
  { q: "What is the attention sink phenomenon?", a: "First few tokens in a sequence receive disproportionately high attention regardless of content. They act as 'sinks' for attention that has nowhere else to go. Important for: streaming inference, context window management." },
  { q: "What is Mixture of Experts (MoE)?", a: "Architecture where only a subset of parameters are active for each input. A router network selects which 'expert' sub-networks to use. Allows much larger models without proportional compute increase. Used in Mixtral, GPT-4 (rumored)." },
  { q: "What is the difference between GPT-style and BERT-style models?", a: "GPT (decoder-only): causal attention, trained with next-token prediction, good for generation. BERT (encoder-only): bidirectional attention, trained with masked language modeling, good for understanding/classification. Different training objectives lead to different strengths." },
  { q: "What is grouped-query attention (GQA)?", a: "A middle ground between multi-head attention (each head has its own KV) and multi-query attention (all heads share one KV). Groups of heads share KV pairs. Reduces KV-cache memory while maintaining quality. Used in Llama 2." },
  { q: "What is speculative decoding?", a: "Using a small fast 'draft' model to generate candidate tokens, then verifying them in parallel with the large model. If the large model agrees, you get multiple tokens in one forward pass. 2-3x speedup without quality loss." },
  { q: "How do transformers handle different languages?", a: "Multilingual models (mBERT, XLM-R) are trained on text from 100+ languages. The shared vocabulary and attention mechanism learn cross-lingual representations. A model trained on English can often work on French with zero-shot transfer." },
];

export default function TransformersInterviewPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Transformer Interview Questions</h1>
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
