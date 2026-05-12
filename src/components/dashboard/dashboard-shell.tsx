import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:pl-72">
        <Navbar />

        <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-black via-zinc-950 to-black">
          <div className="mx-auto w-full max-w-7xl p-6 md:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
