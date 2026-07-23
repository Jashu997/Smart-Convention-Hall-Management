"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

type Stat = {
  title: string;
  value: string | number;
  detail: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
};

type DashboardStatsProps = {
  stats: Stat[];
  theme: "dark" | "light";
};

export default function DashboardStats({ stats, theme }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <motion.article
          key={stat.title}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className={`rounded-[24px] border p-5 shadow-[0_16px_60px_rgba(15,23,42,0.08)] ${
            theme === "dark"
              ? "border-white/10 bg-slate-900/80"
              : "border-slate-200 bg-white/90"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                {stat.title}
              </p>
              <p className={`mt-3 text-3xl font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {typeof stat.value === "number" ? (
                  <AnimatedCounter value={stat.value} className="inline-block" />
                ) : (
                  stat.value
                )}
              </p>
            </div>
            <div className={`rounded-2xl p-3 ${stat.glow}`}>
              {stat.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
            <ArrowUpRight className="h-4 w-4" />
            <span>{stat.detail}</span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
