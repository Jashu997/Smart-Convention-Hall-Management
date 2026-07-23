import { BookingStatusManager } from "@/components/admin/BookingStatusManager";

async function getStats() {
  const response = await fetch("http://localhost:3000/api/admin/stats", {
    cache: "no-store",
  });

  return response.json();
}

export default async function BookingsPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
        <p className="mt-2 text-slate-400">
          Approve, confirm, cancel, and generate invoices for customer bookings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl bg-slate-900 p-5">
          <p className="text-slate-400 text-sm">Total</p>
          <h2 className="text-3xl font-bold">{stats.totalBookings}</h2>
        </div>

        <div className="rounded-2xl bg-yellow-900/30 p-5">
          <p className="text-yellow-300 text-sm">Pending</p>
          <h2 className="text-3xl font-bold">{stats.pending}</h2>
        </div>

        <div className="rounded-2xl bg-blue-900/30 p-5">
          <p className="text-blue-300 text-sm">Approved</p>
          <h2 className="text-3xl font-bold">{stats.approved}</h2>
        </div>

        <div className="rounded-2xl bg-green-900/30 p-5">
          <p className="text-green-300 text-sm">Confirmed</p>
          <h2 className="text-3xl font-bold">{stats.confirmed}</h2>
        </div>

        <div className="rounded-2xl bg-red-900/30 p-5">
          <p className="text-red-300 text-sm">Cancelled</p>
          <h2 className="text-3xl font-bold">{stats.cancelled}</h2>
        </div>

        <div className="rounded-2xl bg-cyan-900/30 p-5">
          <p className="text-cyan-300 text-sm">Revenue</p>
          <h2 className="text-xl font-bold">
            ₹{stats.totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      <BookingStatusManager />
    </div>
  );
}