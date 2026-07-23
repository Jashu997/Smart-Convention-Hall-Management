"use client";

import { Clock3, Sparkles } from "lucide-react";
import RealActivityFeed from "./RealActivityFeed";

type Activity = {
  id: string;
  title: string;
  customer: string;
  status: string;
  time: string;
};

type RecentActivityProps = {
  activities: Activity[];
  theme: "dark" | "light";
  bookings?: Array<{
    id: string;
    customerName: string;
    status: string;
    createdAt: string;
  }>;
};

export default function RecentActivity({ activities, theme, bookings }: RecentActivityProps) {
  const cardClass = theme === "dark"
    ? "border-white/10 bg-slate-900/80"
    : "border-slate-200 bg-white/90";

  const textClass = theme === "dark" ? "text-white" : "text-slate-900";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";

  if (bookings && bookings.length > 0) {
    return <RealActivityFeed bookings={bookings} theme={theme} />;
  }

  return (
    <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${mutedText}`}>Live operations</p>
          <h2 className={`text-xl font-semibold ${textClass}`}>Recent activity</h2>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-500">
          Updated now
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${theme === "dark" ? "border-white/5 bg-white/5" : "border-slate-100 bg-slate-50"}`}>
            <div className="mt-0.5 rounded-xl bg-cyan-500/10 p-2 text-cyan-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={`text-sm font-semibold ${textClass}`}>{activity.title}</p>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
                  {activity.status}
                </span>
              </div>
              <p className={`mt-1 text-sm ${mutedText}`}>{activity.customer}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
