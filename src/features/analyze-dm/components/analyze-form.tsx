"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { analyzeSchema, AnalyzeSchemaType } from "../schemas/analyze-schema";

import { AnalyzeResponseType } from "../schemas/analyze-response-schema";

import { analyzeDM } from "../actions/analyze-dm";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainer } from "@/lib/motion";

import { AnalyzeScoreCard } from "./analyze-score-card";

import { AnalyzeResultCard } from "./analyze-result-card";

export function AnalyzeForm() {
  const [result, setResult] = useState<AnalyzeResponseType | null>(null);

  const [serverError, setServerError] = useState("");

  const {
    register,

    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<AnalyzeSchemaType>({
    resolver: zodResolver(analyzeSchema),

    defaultValues: {
      dm: "",
    },
  });

  async function onSubmit(values: AnalyzeSchemaType) {
    setServerError("");

    const response = await analyzeDM(values);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setServerError(response.message || "Something went wrong");
    }
  }

  return (
    <div className="space-y-10">
      <motion.form
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">
            Paste Your DM
          </label>

          <Textarea
            placeholder="Hey bro, I saw your profile and wanted to offer my services..."
            className="min-h-[320px] resize-none border-zinc-800 bg-zinc-900 focus-visible:ring-1 focus-visible:ring-white"
            {...register("dm")}
          />

          {errors.dm && (
            <p className="text-sm text-red-500">{errors.dm.message}</p>
          )}
        </motion.div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <motion.div
          variants={fadeInUp}
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.98,
          }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-white font-semibold text-black hover:bg-zinc-200"
          >
            {isSubmitting ? "Analyzing..." : "Analyze DM"}
          </Button>
        </motion.div>
      </motion.form>

      {result && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="space-y-6"
        >
          <AnalyzeScoreCard score={result.overallScore} />

          <AnalyzeResultCard
            title="Main Problem"
            content={result.mainProblem}
          />

          <AnalyzeResultCard title="Problems" list={result.problems} />

          <AnalyzeResultCard title="Improvements" list={result.improvements} />

          <AnalyzeResultCard
            title="Rewritten Version"
            content={result.rewriteVersion}
            copyable
          />
        </motion.div>
      )}
    </div>
  );
}
