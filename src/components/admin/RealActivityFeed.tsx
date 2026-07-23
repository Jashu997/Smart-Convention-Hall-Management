"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";

type Activity = {
  id: string;
  title: string;
  customer: string;
  status: string;
  time: string;
};

type RealActivityFeedProps = {
  bookings: Array<{
    id: string;
    customerName: string;
    status: string;
    createdAt: string;
  }>;
  theme: "dark" | "light";
};

export default function RealActivityFeed({ bookings, theme }: RealActivityFeedProps) {
  const activities = useMemo(() => {
    return bookings.slice(0, 4).map((booking, index) => ({
      id: booking.id,
      title: index % 2 === 0 ? "Booking created" : "Status updated",
      customer: booking.customerName,
      status: booking.status,
      time: new Date(booking.createdAt).toLocaleDateString(),
    }));
  }, [bookings]);

  const cardClass = theme === "dark" ? "border-white/10 bg-slate-900/80" : "border-slate-200 bg-white/90";
  const textClass = theme === "dark" ? "text-white" : "text-slate-900";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
      <div className="mb-4">
        <p className={`text-sm font-medium ${mutedText}`}>Live feed</p>
        <h3 className={`text-xl font-semibold ${textClass}`}>Recent activity</h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className={`rounded-2xl border px-3 py-3 ${theme === "dark" ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-500" />
                <span className={`text-sm font-medium ${textClass}`}>{activity.title}</span>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] ${theme === "dark" ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-500/10 text-cyan-700"}`}>
                {activity.status}
              </span>
            </div>
            <p className={`mt-1 text-sm ${mutedText}`}>{activity.customer}</p>
            <p className={`mt-1 text-xs ${mutedText}`}>{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
