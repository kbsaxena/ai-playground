export default function ModuleLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin-slow" />
      <p className="text-sm text-slate-400">Loading module...</p>
    </div>
  );
}
