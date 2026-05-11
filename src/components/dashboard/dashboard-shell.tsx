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

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
