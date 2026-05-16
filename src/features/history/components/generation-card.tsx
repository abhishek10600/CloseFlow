"use client";

import { useState } from "react";

import { Copy, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatDistanceToNow } from "date-fns";

interface GenerationCardProps {
  generation: {
    id: string;

    platform: string;
    niche: string;
    target: string;
    tone: string;

    output: any;

    createdAt: Date;
  };
}

export function GenerationCard({ generation }: GenerationCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(
      JSON.stringify(generation.output, null, 2),
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black capitalize">
              {generation.platform}
            </span>

            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300 capitalize">
              {generation.tone}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold">{generation.niche}</h3>

            <p className="text-zinc-400">Target: {generation.target}</p>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          {formatDistanceToNow(generation.createdAt, {
            addSuffix: true,
          })}
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-2xl bg-black/40 p-5 border border-zinc-800">
        <p className="line-clamp-4 whitespace-pre-wrap text-zinc-300 leading-7">
          {generation.output?.firstMessage}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="border-zinc-800 bg-black hover:bg-zinc-900"
        >
          <Copy className="mr-2 h-4 w-4" />

          {copied ? "Copied" : "Copy"}
        </Button>

        <Button
          variant="destructive"
          className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
