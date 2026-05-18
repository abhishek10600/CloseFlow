"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AnalyzeResultCardProps {
  title: string;

  content?: string;

  list?: string[];

  copyable?: boolean;
}

export function AnalyzeResultCard({
  title,
  content,
  list,
  copyable,
}: AnalyzeResultCardProps) {
  async function handleCopy() {
    if (!content) return;

    await navigator.clipboard.writeText(content);
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>

        {copyable && content && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCopy}
            className="border-zinc-800 bg-black hover:bg-zinc-900"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>

      {content && (
        <p className="whitespace-pre-wrap leading-8 text-zinc-300">{content}</p>
      )}

      {list && (
        <ul className="space-y-4">
          {list.map((item, index) => (
            <li key={index} className="flex gap-3 text-zinc-300">
              <span className="mt-2 h-2 w-2 rounded-full bg-white" />

              <span className="leading-7">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
