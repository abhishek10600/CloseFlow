import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Get Replies From Cold Outreach</h1>

        <p className="text-zinc-400 max-w-xl mx-auto">
          Generate high-converting cold DMs and outreach scripts using AI.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-6 py-3 rounded-lg"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
