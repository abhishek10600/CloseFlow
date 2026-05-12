export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">History</h1>

        <p className="mt-2 text-zinc-400">
          View your previously generated outreach scripts.
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/40">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">No History Yet</h3>

          <p className="mt-2 text-sm text-zinc-500">
            Your generated scripts will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
