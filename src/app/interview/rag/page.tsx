"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const questions = [
  { q: "What is RAG?", a: "Retrieval-Augmented Generation combines a retrieval system with a language model. Instead of relying solely on trained knowledge, the LLM first retrieves relevant documents from a knowledge base, then generates answers grounded in that retrieved context." },
  { q: "Why use RAG instead of fine-tuning?", a: "RAG is better when: knowledge changes frequently (no retraining needed), you need source citations, you want to reduce hallucinations, or you have proprietary data. Fine-tuning is better for changing the model's style/behavior." },
  { q: "What are the components of a RAG pipeline?", a: "1) Document loader (ingest data), 2) Text splitter (chunk documents), 3) Embedding model (convert text to vectors), 4) Vector store (store and search embeddings), 5) Retriever (find relevant chunks), 6) LLM (generate answer from context)." },
  { q: "What is a vector database?", a: "A database optimized for storing and searching high-dimensional vectors (embeddings). Supports similarity search — finding the closest vectors to a query. Examples: Pinecone, Weaviate, Chroma, Milvus, pgvector." },
  { q: "What is chunking and why does it matter?", a: "Splitting documents into smaller pieces for embedding. Too large = diluted meaning, poor retrieval. Too small = missing context. Common strategies: fixed-size, sentence-based, recursive character splitting, semantic chunking." },
  { q: "What is the optimal chunk size?", a: "Depends on use case. Typically 200-1000 tokens. Smaller chunks (200-500) for precise Q&A. Larger chunks (500-1000) for summarization. Always include overlap (50-200 tokens) to avoid cutting context." },
  { q: "What are embeddings in the context of RAG?", a: "Dense vector representations of text that capture semantic meaning. Similar texts have similar embeddings (close in vector space). Models: OpenAI ada-002, Cohere embed, sentence-transformers. Dimension: typically 768-1536." },
  { q: "How does similarity search work?", a: "Query is embedded into a vector. The vector DB finds the K nearest vectors using distance metrics: cosine similarity (most common), Euclidean distance, or dot product. Returns the most semantically similar chunks." },
  { q: "What is hybrid search?", a: "Combining vector (semantic) search with keyword (BM25) search. Semantic catches meaning ('car' matches 'automobile'), keyword catches exact terms (product IDs, names). Reciprocal Rank Fusion merges results." },
  { q: "How do you evaluate RAG performance?", a: "Metrics: Retrieval quality (precision@k, recall@k, MRR), Generation quality (faithfulness, relevance, answer correctness). Frameworks: RAGAS, TruLens. Also measure: latency, cost, hallucination rate." },
  { q: "What is the 'lost in the middle' problem?", a: "LLMs tend to focus on information at the beginning and end of the context window, ignoring the middle. Solution: rerank retrieved chunks by relevance, put most important first, or use smaller focused contexts." },
  { q: "What is a reranker?", a: "A model that re-scores retrieved documents for relevance to the query. Applied after initial retrieval to improve precision. Cross-encoders (like Cohere Rerank) are more accurate than bi-encoders for this task." },
  { q: "How do you handle hallucinations in RAG?", a: "Constrain the LLM to only use retrieved context, add 'if not in context, say I don't know' instructions, use citation/attribution, implement fact-checking, lower temperature, use smaller focused contexts." },
  { q: "What is the difference between RAG and long-context models?", a: "Long-context (128K+ tokens) can process entire documents at once but: costs more per query, slower, still can miss details. RAG: cheaper per query, always finds relevant parts, scales to unlimited knowledge, but adds retrieval complexity." },
  { q: "What is metadata filtering in RAG?", a: "Adding metadata (date, source, category) to chunks and filtering during retrieval. Example: 'only search documents from 2024' or 'only search the legal department's docs'. Improves precision significantly." },
  { q: "What is multi-query RAG?", a: "Generating multiple variations of the user's query to improve retrieval coverage. The LLM rephrases the question in different ways, retrieves for each, then combines results. Catches documents that match different phrasings." },
  { q: "What is agentic RAG?", a: "Using an AI agent that can decide: whether to retrieve, what to search for, which tools to use, and when to ask follow-up questions. More flexible than a fixed pipeline. Can route to different knowledge bases." },
  { q: "How do you handle multi-modal RAG?", a: "Extending RAG to images, tables, and PDFs. Approaches: convert everything to text (OCR, table extraction), use multi-modal embeddings (CLIP), or use vision-language models to understand non-text content." },
  { q: "What is GraphRAG?", a: "Using knowledge graphs instead of (or alongside) vector search. Entities and relationships are stored as a graph. Better for: multi-hop reasoning, understanding relationships, and structured data. Microsoft's GraphRAG builds graphs from documents automatically." },
  { q: "How do you deploy RAG in production?", a: "Key considerations: caching frequent queries, async retrieval, monitoring retrieval quality, handling document updates (incremental indexing), rate limiting, fallback strategies, A/B testing different configurations." },
];

export default function RAGInterviewPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">RAG Interview Questions</h1>
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
