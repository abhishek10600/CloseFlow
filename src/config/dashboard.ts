import { Brain, CreditCard, History, Settings, Sparkles } from "lucide-react";

export const dashboardLinks = [
  {
    title: "Generate",
    href: "/dashboard/generate",
    icon: Sparkles,
  },
  {
    title: "Analyze DM",
    href: "/dashboard/analyze",
    icon: Brain,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
