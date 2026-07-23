"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Search as SearchIcon } from "lucide-react";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  packageType: string;
  eventType: string;
  eventDate: Date | string;
  status: string;
  estimatedTotal: number;
  createdAt: string;
};

type BookingTableProps = {
  bookings: Booking[];
  theme: "dark" | "light";
};

const statusClasses: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-500",
  Approved: "bg-emerald-500/15 text-emerald-500",
  Confirmed: "bg-cyan-500/15 text-cyan-500",
  Cancelled: "bg-rose-500/15 text-rose-500",
};

export default function BookingTable({ bookings, theme }: BookingTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"newest" | "highest">("newest");

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    const data = bookings.filter((booking) => {
      const haystack = [booking.customerName, booking.email, booking.packageType, booking.eventType, booking.status].join(" ").toLowerCase();
      return haystack.includes(query);
    });

    return data.sort((left, right) => {
      if (sort === "highest") return right.estimatedTotal - left.estimatedTotal;
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
  }, [bookings, search, sort]);

  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

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
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className={`text-sm font-medium ${mutedText}`}>Operational view</p>
          <h2 className={`text-xl font-semibold ${textClass}`}>Booking table</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${theme === "dark" ? "border-white/10 bg-slate-950/70" : "border-slate-200 bg-slate-50"}`}>
            <SearchIcon className="h-4 w-4 text-cyan-500" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bookings" className={`bg-transparent text-sm outline-none ${theme === "dark" ? "text-white" : "text-slate-700"}`} />
          </label>
          <button onClick={() => setSort((value) => value === "newest" ? "highest" : "newest")} className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${theme === "dark" ? "border-white/10 bg-slate-950/70 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            <ArrowUpDown className="h-4 w-4 text-cyan-500" />
            {sort === "newest" ? "Newest first" : "Highest value"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className={`${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            <tr>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Package</th>
              <th className="px-3 py-3">Event</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((booking) => (
              <tr key={booking.id} className={`border-t ${theme === "dark" ? "border-white/10 hover:bg-white/5" : "border-slate-200 hover:bg-slate-50"}`}>
                <td className="px-3 py-3">
                  <div className={`font-semibold ${textClass}`}>{booking.customerName}</div>
                  <div className={`text-xs ${mutedText}`}>{booking.email}</div>
                </td>
                <td className="px-3 py-3">{booking.packageType}</td>
                <td className="px-3 py-3">{booking.eventType}</td>
                <td className="px-3 py-3">{formatDate(booking.eventDate)}</td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClasses[booking.status] || "bg-slate-500/20 text-slate-400"}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-3 py-3 font-semibold text-cyan-500">₹{booking.estimatedTotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className={`text-sm ${mutedText}`}>Showing {visible.length} of {filtered.length} bookings</p>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((value) => Math.max(1, value - 1))} className={`rounded-xl border px-3 py-2 text-sm ${theme === "dark" ? "border-white/10 bg-slate-950/70 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            Prev
          </button>
          <span className={`text-sm ${mutedText}`}>{page} / {pageCount}</span>
          <button onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className={`rounded-xl border px-3 py-2 text-sm ${theme === "dark" ? "border-white/10 bg-slate-950/70 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
