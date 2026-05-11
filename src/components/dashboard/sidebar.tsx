"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/config/dashboard";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-72 border-r border-zinc-800 bg-black flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <h2 className="text-2xl font-bold text-white">CloseFlow</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {dashboardLinks.map((link) => {
          const Icon = link.icon;

          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              {link.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
