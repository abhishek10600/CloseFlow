"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { generateSchema, GenerateSchemaType } from "../schemas/generate-schema";

import { GeneratedResponseType } from "../schemas/generate-response-schema";

import { generateScript } from "../actions/generate-script";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ResultCard } from "@/components/shared/result-card";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainer } from "@/lib/motion";

export function GenerateForm() {
  const [result, setResult] = useState<GeneratedResponseType | null>(null);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors, isSubmitting },
  } = useForm<GenerateSchemaType>({
    resolver: zodResolver(generateSchema),

    defaultValues: {
      niche: "",
      target: "",
      offer: "",
      platform: "instagram",
      tone: "professional",
    },
  });

  const platform = watch("platform");

  const tone = watch("tone");

  async function onSubmit(values: GenerateSchemaType) {
    setServerError("");

    const response = await generateScript(values);

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
        className="space-y-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Niche */}
          <motion.div className="space-y-2" variants={fadeInUp}>
            <label className="text-sm font-medium text-zinc-200">Niche</label>

            <Input
              placeholder="Fitness Coaches"
              className="h-12 border-zinc-800 bg-zinc-900 focus-visible:ring-1 focus-visible:ring-white"
              {...register("niche")}
            />

            {errors.niche && (
              <p className="text-sm text-red-500">{errors.niche.message}</p>
            )}
          </motion.div>

          {/* Target */}
          <motion.div className="space-y-2" variants={fadeInUp}>
            <label className="text-sm font-medium text-zinc-200">
              Target Person
            </label>

            <Input
              placeholder="Instagram Creators"
              className="h-12 border-zinc-800 bg-zinc-900 focus-visible:ring-1 focus-visible:ring-white"
              {...register("target")}
            />

            {errors.target && (
              <p className="text-sm text-red-500">{errors.target.message}</p>
            )}
          </motion.div>
        </div>

        {/* Offer */}
        <motion.div className="space-y-2" variants={fadeInUp}>
          <label className="text-sm font-medium text-zinc-200">Offer</label>

          <Textarea
            placeholder="Video Editing Service that helps creators increase retention and engagement..."
            className="min-h-[180px] resize-none border-zinc-800 bg-zinc-900 focus-visible:ring-1 focus-visible:ring-white"
            {...register("offer")}
          />

          {errors.offer && (
            <p className="text-sm text-red-500">{errors.offer.message}</p>
          )}
        </motion.div>

        {/* Selects */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Platform */}
          <motion.div className="space-y-2" variants={fadeInUp}>
            <label className="text-sm font-medium text-zinc-200">
              Platform
            </label>

            <Select
              value={platform}
              onValueChange={(value) =>
                setValue("platform", value as GenerateSchemaType["platform"])
              }
            >
              <SelectTrigger className="h-12 border-zinc-800 bg-zinc-900">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>

              <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                <SelectItem value="instagram">Instagram</SelectItem>

                <SelectItem value="linkedin">LinkedIn</SelectItem>

                <SelectItem value="twitter">Twitter / X</SelectItem>

                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Tone */}
          <motion.div className="space-y-2" variants={fadeInUp}>
            <label className="text-sm font-medium text-zinc-200">Tone</label>

            <Select
              value={tone}
              onValueChange={(value) =>
                setValue("tone", value as GenerateSchemaType["tone"])
              }
            >
              <SelectTrigger className="h-12 border-zinc-800 bg-zinc-900">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>

              <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                <SelectItem value="professional">Professional</SelectItem>

                <SelectItem value="casual">Casual</SelectItem>

                <SelectItem value="direct">Direct</SelectItem>

                <SelectItem value="authority">Authority</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        {/* Submit */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-white font-semibold text-black hover:bg-zinc-200"
          >
            {isSubmitting ? "Generating..." : "Generate Script"}
          </Button>
        </motion.div>
      </motion.form>

      {/* Results */}
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
          <ResultCard title="First Message" content={result.firstMessage} />

          <ResultCard title="Follow Up" content={result.followUp} />

          <ResultCard
            title="Personalization"
            content={result.personalization}
          />

          <ResultCard title="CTA" content={result.cta} />

          <ResultCard
            title="Objection Handling"
            content={result.objectionHandling}
          />
        </motion.div>
      )}
    </div>
  );
}
