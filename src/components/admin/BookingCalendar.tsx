"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  packageType: string;
  eventType: string;
  eventDate: Date | string;
  status: string;
  estimatedTotal: number;
};

type Props = {
  bookings: Booking[];
  theme: "dark" | "light";
};

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-500",
  Approved: "bg-emerald-500/15 text-emerald-500",
  Confirmed: "bg-cyan-500/15 text-cyan-500",
  Cancelled: "bg-rose-500/15 text-rose-500",
};

export default function BookingCalendar({ bookings, theme }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarDays = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Array<{ date: Date; key: string }> = [];

    for (let index = 0; index < firstDay.getDay(); index += 1) {
      days.push({ date: new Date(year, month, index - firstDay.getDay() + 1), key: `prev-${index}` });
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
      days.push({ date: new Date(year, month, day), key: `day-${day}` });
    }

    return days;
  }, []);

  const selectedBookings = useMemo(() => {
    if (!selectedDate) return [];
    return bookings.filter((booking) => new Date(booking.eventDate).toDateString() === new Date(selectedDate).toDateString());
  }, [bookings, selectedDate]);

  const cardClass = theme === "dark"
    ? "border-white/10 bg-slate-900/80"
    : "border-slate-200 bg-white/90";

  const textClass = theme === "dark" ? "text-white" : "text-slate-900";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";

  const formatDate = (value: Date | string) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className={`text-sm font-medium ${mutedText}`}>Event timeline</p>
          <h2 className={`text-xl font-semibold ${textClass}`}>Interactive booking calendar</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-500">
          <CalendarDays className="h-4 w-4" />
          Click a date to view bookings
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
          <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const dayValue = day.date.getDate();
              const dateKey = day.date.toDateString();
              const dayBookings = bookings.filter((booking) => new Date(booking.eventDate).toDateString() === dateKey);
              const isToday = dateKey === new Date().toDateString();
              return (
                <button
                  key={day.key}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`rounded-2xl border p-2 text-left transition ${
                    isToday ? "border-cyan-400/50 bg-cyan-500/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className={`text-sm font-semibold ${isToday ? "text-cyan-400" : textClass}`}>{dayValue}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {dayBookings.slice(0, 2).map((booking) => (
                      <span
                        key={booking.id}
                        className={`h-2.5 w-2.5 rounded-full ${statusStyles[booking.status] || "bg-slate-500/40"}`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className={`text-sm font-semibold ${textClass}`}>Selected day</p>
              <p className="text-sm text-cyan-500">{selectedDate ? formatDate(selectedDate) : "Choose a date"}</p>
            </div>
            {selectedBookings.length > 0 ? (
              <div className="space-y-2">
                {selectedBookings.map((booking) => (
                  <div key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${textClass}`}>{booking.customerName}</p>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[booking.status] || "bg-slate-500/20 text-slate-400"}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className={`mt-1 text-xs ${mutedText}`}>{booking.packageType} • {booking.eventType}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" />{formatDate(booking.eventDate)}</span>
                      <span>₹{booking.estimatedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`rounded-2xl border border-dashed border-white/10 p-4 text-sm ${mutedText}`}>
                No bookings for the selected date yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}