"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AnalyzePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
          AI DM Analyzer
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Analyze My Bad DM
        </h1>

        <p className="max-w-2xl text-lg text-zinc-400">
          Discover why your cold outreach gets ignored and learn how to improve
          response rates.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-2xl md:p-8">
        <div className="space-y-6">
          <Textarea
            placeholder="Paste your cold DM here..."
            className="min-h-[320px] resize-none border-zinc-800 bg-zinc-900 focus-visible:ring-1 focus-visible:ring-white"
          />

          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Button className="h-12 w-full rounded-xl bg-white font-semibold text-black hover:bg-zinc-200">
              Analyze DM
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
