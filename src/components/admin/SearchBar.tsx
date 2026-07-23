"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";

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

type SearchBarProps = {
  bookings: BookingSummary[];
  theme: "dark" | "light";
};

export default function SearchBar({ bookings, theme }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const value = query.toLowerCase();

    return bookings.filter((booking) => {
      const searchable = [
        booking.customerName,
        booking.email,
        booking.phone,
        booking.packageType,
        booking.status,
        booking.eventType,
        new Date(booking.eventDate).toLocaleDateString(),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(value);
    });
  }, [bookings, query]);

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 rounded-2xl border px-3 py-2 ${
          theme === "dark"
            ? "border-white/10 bg-slate-800/80 text-slate-300"
            : "border-slate-200 bg-slate-50 text-slate-700"
        }`}
      >
        <Search className="h-4 w-4 text-cyan-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search bookings"
          className={`w-44 bg-transparent text-sm outline-none sm:w-56 ${
            theme === "dark" ? "text-slate-100" : "text-slate-700"
          }`}
        />
      </div>

      {query && (
        <div
          className={`absolute right-0 z-20 mt-2 max-h-72 w-80 overflow-auto rounded-2xl border shadow-2xl ${
            theme === "dark"
              ? "border-white/10 bg-slate-900/95 text-slate-100"
              : "border-slate-200 bg-white/95 text-slate-700"
          }`}
        >
          {results.length > 0 ? (
            <div className="p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
                <Sparkles className="h-3.5 w-3.5" />
                Instant results
              </div>
              {results.slice(0, 6).map((booking) => (
                <div key={booking.id} className="rounded-xl border border-white/5 px-3 py-2.5 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{booking.customerName}</span>
                    <span className="text-xs text-cyan-500">{booking.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {booking.packageType} • {new Date(booking.eventDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-slate-400">No matching results.</div>
          )}
        </div>
      )}
    </div>
  );
}
