interface AnalyzeScoreCardProps {
  score: number;
}

export function AnalyzeScoreCard({ score }: AnalyzeScoreCardProps) {
  const color =
    score <= 3
      ? "text-red-500"
      : score <= 6
        ? "text-yellow-500"
        : "text-green-500";

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-8 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-zinc-500">
          Outreach Score
        </p>

        <h2 className={`text-7xl font-bold ${color}`}>{score}/10</h2>

        <p className="text-zinc-400">
          AI analysis of your cold outreach effectiveness.
        </p>
      </div>
    </div>
  );
}
