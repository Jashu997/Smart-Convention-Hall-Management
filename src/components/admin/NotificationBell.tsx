"use client";

import { useState } from "react";
import { BellRing, CheckCheck } from "lucide-react";

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  read: boolean;
};

type NotificationBellProps = {
  notifications: NotificationItem[];
  theme: "dark" | "light";
};

export default function NotificationBell({ notifications, theme }: NotificationBellProps) {
  const [items, setItems] = useState(notifications);
  const [open, setOpen] = useState(false);

  const unreadCount = items.filter((item) => !item.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border transition hover:-translate-y-0.5 ${
          theme === "dark"
            ? "border-white/10 bg-slate-800/80 text-slate-100"
            : "border-slate-200 bg-slate-50 text-slate-700"
        }`}
      >
        <BellRing className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          className={`absolute right-0 z-20 mt-2 w-80 rounded-2xl border p-3 shadow-2xl ${
            theme === "dark"
              ? "border-white/10 bg-slate-900/95"
              : "border-slate-200 bg-white/95"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Notifications
            </p>
            <button
              onClick={() => setItems((list) => list.map((item) => ({ ...item, read: true })))}
              className="flex items-center gap-1 text-xs text-cyan-500"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl border px-3 py-2.5 ${
                  item.read
                    ? theme === "dark"
                      ? "border-white/5 bg-white/5"
                      : "border-slate-100 bg-slate-50"
                    : "border-cyan-500/20 bg-cyan-500/10"
                }`}
              >
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </p>
                <p className={`mt-1 text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
