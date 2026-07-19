import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalBookings = await prisma.booking.count();
  const totalServices = await prisma.service.count();
  const totalPackages = await prisma.package.count();

  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const revenue = await prisma.booking.aggregate({
    _sum: {
      estimatedTotal: true,
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-cyan-400">
        Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400">Total Bookings</p>
          <h2 className="mt-3 text-4xl font-bold text-cyan-400">
            {totalBookings}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400">Services</p>
          <h2 className="mt-3 text-4xl font-bold text-cyan-400">
            {totalServices}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400">Packages</p>
          <h2 className="mt-3 text-4xl font-bold text-cyan-400">
            {totalPackages}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
          <p className="text-slate-400">Revenue</p>
          <h2 className="mt-3 text-4xl font-bold text-green-400">
            ₹{revenue._sum.estimatedTotal ?? 0}
          </h2>
        </div>

      </div>

      {/* Recent Bookings */}
      <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-cyan-400">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">

            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-3">Customer</th>
                <th className="py-3">Package</th>
                <th className="py-3">Date</th>
                <th className="py-3">Status</th>
                <th className="py-3">Amount</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-3">{booking.customerName}</td>
                  <td>{booking.packageType}</td>
                  <td>
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </td>
                  <td>{booking.status}</td>
                  <td>₹{booking.estimatedTotal}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}