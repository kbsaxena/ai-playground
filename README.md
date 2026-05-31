# 🧠 AI Playground

**Learn Artificial Intelligence & Machine Learning Through Interactive Visualizations**

Master AI, Machine Learning, Transformers, LLMs, RAG, Fine-Tuning and Deep Learning with simple interactive lessons. No math, no code — just play and understand.

🔗 **Live Demo:** [Coming Soon]

---

## What is this?

AI Playground is an interactive learning platform that explains complex AI/ML concepts through visual toys and animations. Each concept is a standalone interactive module where you can drag sliders, click buttons, and watch how AI actually works under the hood.

Built for:
- Students learning AI/ML for the first time
- Engineers transitioning into AI roles
- Anyone curious about how ChatGPT, DALL-E, and modern AI works
- Interview preparation for AI/ML roles

---

## Features

### 🎮 16 Interactive Modules

| # | Module | What You Learn |
|---|--------|---------------|
| 1 | Training Data | How data quality affects AI learning |
| 2 | Neural Network | How signals flow through layers of neurons |
| 3 | Training | Epochs, learning rate, and how models improve |
| 4 | Gradient Descent | How AI finds the best answer by rolling downhill |
| 5 | Bias vs Variance | Underfitting, overfitting, and the sweet spot |
| 6 | Tokens | How AI breaks text into processable pieces |
| 7 | Embeddings | How words become numbers on a map |
| 8 | Attention | How AI knows which words relate to which |
| 9 | Transformers | The full architecture behind ChatGPT |
| 10 | LLMs | Next-word prediction and temperature |
| 11 | CNNs | How AI sees images layer by layer |
| 12 | RAG | Retrieval-Augmented Generation explained |
| 13 | Fine-Tuning | How general AI becomes a specialist |
| 14 | Diffusion | How DALL-E creates images from noise |
| 15 | GANs | Generator vs Discriminator competition |
| 16 | Reinforcement Learning | Learning by trial, error, and rewards |

### 🎓 Interview Prep
- 25 AI Interview Questions
- 30 ML Interview Questions
- 20 RAG Interview Questions
- 25 LLM Interview Questions
- 20 Transformer Interview Questions

### 📊 Progress Tracking
- Mark concepts as complete
- Visual progress bar
- Persists across sessions (localStorage)

### 🗺️ Learning Roadmap
- Beginner → Intermediate → Advanced path
- Clear progression from fundamentals to cutting-edge

### 🔍 Search
- Instantly filter concepts by name

### 💬 Feedback
- Built-in suggestion box for community input

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** CSS animations + Framer Motion (selective)
- **Deployment:** Static export (Cloudflare Pages compatible)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/kbsaxena/ai-playground.git
cd ai-playground

# Install dependencies
npm install

# Run development server
npm run dev

# Or build for production (recommended - much faster)
npm run build
npx serve out -l 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** Development mode (`npm run dev`) compiles pages on-demand which causes a delay on first visit. Production build (`npm run build`) pre-compiles everything for instant page loads.

---

## Project Structure

```
ai-playground/
├── src/app/
│   ├── page.tsx                    # Landing page (search, progress, roadmap)
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Theme, animations, styles
│   ├── modules/
│   │   ├── layout.tsx              # Shared module layout (back nav, mark complete)
│   │   ├── neural-network/         # Each module is a folder with page.tsx
│   │   ├── training/
│   │   ├── training-data/
│   │   ├── gradient-descent/
│   │   ├── bias-variance/
│   │   ├── tokens/
│   │   ├── embeddings/
│   │   ├── attention/
│   │   ├── transformers/
│   │   ├── llm/
│   │   ├── cnn/
│   │   ├── rag/
│   │   ├── fine-tuning/
│   │   ├── diffusion/
│   │   ├── gan/
│   │   └── reinforcement-learning/
│   └── interview/
│       ├── layout.tsx
│       ├── ai/
│       ├── ml/
│       ├── rag/
│       ├── llm/
│       └── transformers/
├── public/
│   └── icon.svg                    # Favicon
├── package.json
├── next.config.ts                  # Static export config
├── tsconfig.json
└── tailwind / postcss configs
```

---

## Deployment

This project uses `output: "export"` in `next.config.ts`, generating a static `out/` folder.

### Cloudflare Pages
1. Connect your GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `out`

### Vercel
1. Import the repo on Vercel
2. It auto-detects Next.js — just deploy

### Any Static Host
```bash
npm run build
# Upload the `out/` folder to any static hosting
```

---

## Contributing

Contributions welcome! Ideas for new modules, bug fixes, or improvements — open an issue or PR.

---

## License

MIT

---

Built with ❤️ to make AI understandable for everyone.
