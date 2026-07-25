import { prisma } from "@/lib/prisma";
import { BookingStatusManager } from "@/components/admin/BookingStatusManager";

export default async function BookingsPage() {
  const totalBookings = await prisma.booking.count();

  const pending = await prisma.booking.count({
    where: { status: "Pending" },
  });

  const approved = await prisma.booking.count({
    where: { status: "Approved" },
  });

  const confirmed = await prisma.booking.count({
    where: { status: "Confirmed" },
  });

  const cancelled = await prisma.booking.count({
    where: { status: "Cancelled" },
  });

  const revenue = await prisma.booking.aggregate({
    _sum: {
      estimatedTotal: true,
    },
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <h1 className="text-3xl font-bold text-cyan-400">
          Booking Management
        </h1>

        <p className="mt-2 text-slate-400">
          Approve, confirm, cancel, delete bookings and generate invoices.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">

        <div className="rounded-2xl bg-slate-900 p-5 shadow-lg">
          <p className="text-sm text-slate-400">Total</p>
          <h2 className="mt-2 text-3xl font-bold text-cyan-400">
            {totalBookings}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-500/10 p-5 shadow-lg">
          <p className="text-sm text-yellow-300">Pending</p>
          <h2 className="mt-2 text-3xl font-bold text-yellow-400">
            {pending}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-500/10 p-5 shadow-lg">
          <p className="text-sm text-blue-300">Approved</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            {approved}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-500/10 p-5 shadow-lg">
          <p className="text-sm text-green-300">Confirmed</p>
          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {confirmed}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-500/10 p-5 shadow-lg">
          <p className="text-sm text-red-300">Cancelled</p>
          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {cancelled}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-500/10 p-5 shadow-lg">
          <p className="text-sm text-emerald-300">Revenue</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-400">
            ₹{(revenue._sum.estimatedTotal ?? 0).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Booking Manager */}
      <BookingStatusManager />

    </div>
  );
}