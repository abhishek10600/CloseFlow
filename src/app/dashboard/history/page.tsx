import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

import { GenerationCard } from "@/features/history/components/generation-card";
import { EmptyHistoryState } from "@/features/history/components/empty-history-state";

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!dbUser) {
    redirect("/");
  }

  const generations = await prisma.generation.findMany({
    where: {
      userId: dbUser.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">History</h1>

          <p className="text-zinc-400 text-lg">
            View and manage your AI generations.
          </p>
        </div>

        {generations.length === 0 ? (
          <EmptyHistoryState />
        ) : (
          <div className="grid gap-6">
            {generations.map((generation) => (
              <GenerationCard key={generation.id} generation={generation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
