import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AnalyzePage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Analyze My Bad DM
          </h1>

          <p className="text-zinc-400 text-lg">
            Find out why your outreach gets ignored and how to improve it.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 space-y-6">
          <Textarea
            placeholder="Paste your cold DM here..."
            className="min-h-[300px] resize-none"
          />

          <Button className="w-full">Analyze DM</Button>
        </div>
      </div>
    </div>
  );
}
