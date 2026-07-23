"use client";

import Link from "next/link";
import { BellRing, Sparkles, CalendarDays } from "lucide-react";
import NotificationBell from "./NotificationBell";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

type BookingSummary = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  packageType: string;
  eventDate: string;
  status: string;
  estimatedTotal: number;
  createdAt: string;
};

type DashboardHeaderProps = {
  greeting: string;
  currentDate: string;
  currentTime: string;
  bookings: BookingSummary[];
};

export default function DashboardHeader({
  greeting,
  currentDate,
  currentTime,
  bookings,
}: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const notifications = [
    {
      id: "n1",
      title: "New booking received",
      detail: "A premium wedding package is awaiting review.",
      read: false,
    },
    {
      id: "n2",
      title: "Invoice generated",
      detail: "A new invoice was created for the latest event.",
      read: false,
    },
    {
      id: "n3",
      title: "Status updated",
      detail: "One booking was approved and moved to confirmed.",
      read: true,
    },
  ];

  return (
    <header
      className={`rounded-[28px] border p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl ${
        theme === "dark"
          ? "border-white/10 bg-slate-900/80"
          : "border-slate-200 bg-white/80"
      }`}
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-cyan-500">
            <Sparkles className="h-4 w-4" />
            Smart Convention Operations
          </div>

          <div>
            <p className="text-sm text-slate-400">
              {greeting}, Admin
            </p>
            <h1
              className={`text-3xl font-semibold sm:text-4xl ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Welcome back to your command center.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-2 ${
                theme === "dark"
                  ? "bg-slate-800/80 text-slate-300"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <CalendarDays className="h-4 w-4 text-cyan-500" />
              <span>{currentDate}</span>
            </div>
            <div
              className={`rounded-full px-3 py-2 ${
                theme === "dark"
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "bg-cyan-500/10 text-cyan-700"
              }`}
            >
              {currentTime}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SearchBar bookings={bookings} theme={theme} />
          <NotificationBell notifications={notifications} theme={theme} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition hover:-translate-y-0.5 ${
              theme === "dark"
                ? "border-white/10 bg-slate-800/80 text-slate-100"
                : "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 font-semibold text-white">
              AC
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Ava Chen</p>
              <p className="text-xs text-slate-400">Operations Lead</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
