import { GenerateForm } from "@/features/outreach/components/generate-form";

export default function GeneratePage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Generate Outreach Script
          </h1>

          <p className="text-zinc-400 text-lg">
            Generate high-converting cold outreach messages using AI.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8">
          <GenerateForm />
        </div>
      </div>
    </div>
  );
}
