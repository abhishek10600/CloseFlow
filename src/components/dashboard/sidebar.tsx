"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-zinc-800 bg-zinc-950/80 backdrop-blur-xl md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-zinc-800 px-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            CloseFlow
          </h2>

          <p className="text-xs text-zinc-500">Outreach OS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {dashboardLinks.map((link) => {
          const Icon = link.icon;

          const isActive = pathname === link.href;

          return (
            <motion.div
              key={link.href}
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.15,
              }}
            >
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-110",
                  )}
                />

                {link.title}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm font-medium text-white">Upgrade to Pro</p>

          <p className="mt-1 text-xs text-zinc-400">
            Unlock unlimited AI generations.
          </p>
        </div>
      </div>
    </aside>
  );
}
