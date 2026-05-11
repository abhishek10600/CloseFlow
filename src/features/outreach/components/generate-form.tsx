"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { generateSchema, GenerateSchemaType } from "../schemas/generate-schema";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export function GenerateForm() {
  const {
    register,
    handleSubmit,
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

  async function onSubmit(values: GenerateSchemaType) {
    console.log(values);
  }

  return (
    <div className="max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Niche
          </label>

          <Input
            placeholder="Fitness Coaches"
            {...register("niche")}
          />

          {errors.niche && (
            <p className="text-sm text-red-500">
              {errors.niche.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Target Person
          </label>

          <Input
            placeholder="Instagram Creators"
            {...register("target")}
          />

          {errors.target && (
            <p className="text-sm text-red-500">
              {errors.target.message}
            </p>
          )}

          </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Offer
          </label>

          <Textarea
            placeholder="Video Editing Service"
            className="min-h-32"
            {...register("offer")}
          />

          {errors.offer && (
            <p className="text-sm text-red-500">
              {errors.offer.message}
            </p>
          )}
        </div>

         <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Generating..."
            : "Generate Script"}
        </Button>
      </form>
    </div>
  );
}