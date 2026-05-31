import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Playground
      </Link>
      {children}
    </div>
  );
}
