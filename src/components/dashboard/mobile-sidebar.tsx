"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { dashboardLinks } from "@/config/dashboard";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-white md:hidden" />
      </SheetTrigger>

      <SheetContent side="left" className="bg-black border-zinc-800">
        <div className="mt-10 space-y-3">
          {dashboardLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 hover:bg-zinc-900"
              >
                <Icon className="h-5 w-5" />
                {link.title}
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
