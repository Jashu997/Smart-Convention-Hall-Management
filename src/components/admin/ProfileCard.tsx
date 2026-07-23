"use client";

import { Mail, ShieldCheck, Sparkles } from "lucide-react";

type ProfileCardProps = {
  theme: "dark" | "light";
};

export default function ProfileCard({ theme }: ProfileCardProps) {
  const cardClass = theme === "dark"
    ? "border-white/10 bg-slate-900/80"
    : "border-slate-200 bg-white/90";

  const textClass = theme === "dark" ? "text-white" : "text-slate-900";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${mutedText}`}>Admin profile</p>
          <h2 className={`text-xl font-semibold ${textClass}`}>Operations lead</h2>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-500">
          Online
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-[24px] border border-white/10 bg-slate-950/70 p-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 text-xl font-semibold text-white">
          AC
        </div>
        <h3 className={`mt-4 text-lg font-semibold ${textClass}`}>Ava Chen</h3>
        <p className={`mt-1 text-sm ${mutedText}`}>ava@smartconvention.com</p>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-500">
          <ShieldCheck className="h-4 w-4" />
          Super Admin
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
          <Mail className="h-4 w-4" />
          Last login: 2h ago
        </div>
      </div>

      <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-3 font-semibold text-white transition hover:opacity-90">
        Edit profile
      </button>
    </div>
  );
}
