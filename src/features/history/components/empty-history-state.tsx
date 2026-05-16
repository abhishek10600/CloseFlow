import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyHistoryState() {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-800 p-14 text-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">No generations yet</h2>

        <p className="text-zinc-400 max-w-md mx-auto">
          Generate your first outreach script and your history will appear here.
        </p>

        <Button asChild className="mt-4">
          <Link href="/dashboard/generate">Generate Script</Link>
        </Button>
      </div>
    </div>
  );
}
