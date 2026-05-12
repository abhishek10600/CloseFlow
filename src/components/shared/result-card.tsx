"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  title: string;
  content: string;
}

export function ResultCard({ title, content }: ResultCardProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(content);
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handleCopy}
          className="border-zinc-800 bg-black hover:bg-zinc-900"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="whitespace-pre-wrap text-zinc-300 leading-8">
        {content}
      </div>
    </div>
  );
}
