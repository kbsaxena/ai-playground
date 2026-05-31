import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Playground – Learn AI, Machine Learning, LLMs & RAG Visually",
  description:
    "Master AI, Machine Learning, Transformers, LLMs, RAG, Fine-Tuning and Deep Learning with simple interactive visualizations. No math, no code — just play and understand. By Kulbhushan Saxena.",
  authors: [{ name: "Kulbhushan Saxena" }],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
