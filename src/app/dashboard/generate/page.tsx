import { GenerateForm } from "@/features/outreach/components/generate-form";
import { PageWrapper } from "@/components/shared/page.wrapper";

export default function GeneratePage() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            AI Outreach Generator
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Generate Outreach Script
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Generate personalized cold outreach messages optimized for replies
            and conversions.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-2xl md:p-8">
          <GenerateForm />
        </div>
      </div>
    </PageWrapper>
  );
}
