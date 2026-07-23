"use client";

import Link from "next/link";
import { Calculator, Image as ImageIcon, Package, ReceiptText, Settings, Sparkles, Users, BookOpenCheck, FileBarChart2 } from "lucide-react";

type QuickActionsProps = {
  theme: "dark" | "light";
};

const actions = [
  { href: "/booking", label: "New Booking", icon: BookOpenCheck, accent: "from-cyan-500 to-sky-500" },
  { href: "/admin/bookings", label: "Generate Invoice", icon: ReceiptText, accent: "from-emerald-500 to-lime-500" },
  { href: "/admin/packages", label: "Manage Packages", icon: Package, accent: "from-violet-500 to-fuchsia-500" },
  { href: "/admin/services", label: "Manage Services", icon: Calculator, accent: "from-amber-500 to-orange-500" },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon, accent: "from-pink-500 to-rose-500" },
  { href: "/admin/settings", label: "Settings", icon: Settings, accent: "from-slate-500 to-slate-600" },
  { href: "/admin", label: "Reports", icon: FileBarChart2, accent: "from-blue-500 to-indigo-500" },
  { href: "/admin/bookings", label: "Bookings", icon: Sparkles, accent: "from-teal-500 to-cyan-500" },
];

export default function QuickActions({ theme }: QuickActionsProps) {
  const cardClass = theme === "dark"
    ? "border-white/10 bg-slate-900/80"
    : "border-slate-200 bg-white/90";

  return (
    <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Fast access</p>
          <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Quick actions</h2>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`group rounded-2xl border p-4 transition hover:-translate-y-1 ${theme === "dark" ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}
            >
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${action.accent} text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{action.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
