"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  eventDate: string;
  packageType: string;
  status: string;
  estimatedTotal: number;
};

type ServiceItem = { id: string; name: string; price: number };
type PricePackage = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [packages, setPackages] = useState<PricePackage[]>([]);
  const [serviceForm, setServiceForm] = useState({ name: "", price: "" });
  const [packageForm, setPackageForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const loadData = async () => {
    const [bookingRes, serviceRes, packageRes] = await Promise.all([
      fetch("/api/bookings"),
      fetch("/api/services"),
      fetch("/api/packages"),
    ]);
    setBookings(await bookingRes.json());
    setServices(await serviceRes.json());
    setPackages(await packageRes.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  const createService = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceForm),
    });
    setServiceForm({ name: "", price: "" });
    loadData();
  };

  const createPackage = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageForm),
    });
    setPackageForm({ name: "", price: "", description: "" });
    loadData();
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Package</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-white/10">
                  <td className="px-3 py-3">{booking.customerName}</td>
                  <td className="px-3 py-3">{booking.eventDate}</td>
                  <td className="px-3 py-3">{booking.packageType}</td>
                  <td className="px-3 py-3">{booking.status}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">

                      <button
                        className="rounded-lg bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        className="rounded-lg bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        Reject
                      </button>

                      <button
                        className="rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-semibold">Manage services</h2>
          <form onSubmit={createService} className="mt-6 space-y-3">
            <input
              required
              value={serviceForm.name}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, name: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              placeholder="Service name"
            />
            <input
              required
              type="number"
              value={serviceForm.price}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, price: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              placeholder="Price"
            />
            <button className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
              Add service
            </button>
          </form>
          <div className="mt-6 space-y-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {service.name} - ₹{service.price}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-semibold">Manage packages</h2>
          <form onSubmit={createPackage} className="mt-6 space-y-3">
            <input
              required
              value={packageForm.name}
              onChange={(e) =>
                setPackageForm({ ...packageForm, name: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              placeholder="Package name"
            />
            <input
              required
              type="number"
              value={packageForm.price}
              onChange={(e) =>
                setPackageForm({ ...packageForm, price: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              placeholder="Price"
            />
            <textarea
              required
              value={packageForm.description}
              onChange={(e) =>
                setPackageForm({ ...packageForm, description: e.target.value })
              }
              className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              placeholder="Description"
            />
            <button className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
              Add package
            </button>
          </form>
          <div className="mt-6 space-y-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {pkg.name} - ₹{pkg.price}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
