import { AnalyzeForm } from "@/features/analyze-dm/components/analyze-form";

export default function AnalyzePage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            AI DM Analyzer
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Analyze My Bad DM
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Discover why your cold outreach gets ignored and learn how to
            improve response rates.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-2xl md:p-8">
          <AnalyzeForm />
        </div>
      </div>
    </div>
  );
}
