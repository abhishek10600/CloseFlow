import { currentUser } from "@clerk/nextjs/server";
import { UserMenu } from "@/components/auth/user-menu";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Welcome {user?.firstName}</h1>

          <p className="text-zinc-400 mt-2">Your AI outreach dashboard</p>
        </div>

        <UserMenu />
      </div>
    </main>
  );
}
