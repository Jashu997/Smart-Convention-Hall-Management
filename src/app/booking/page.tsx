"use client";

import { useMemo, useState } from "react";
import { packages, services } from "@/lib/data";
import { addBooking, getAvailability } from "@/lib/store";

export default function BookingPage() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    eventType: "Wedding",
    eventDate: "",
    startTime: "18:00",
    endTime: "22:00",
    guests: 150,
    packageType: packages[0].title,
    services: [] as string[],
    notes: "",
    estimatedTotal: packages[0].price,
    advancePaid: 50000,
  });

  const [feedback, setFeedback] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string[]>([]);

  const selectedPackage = useMemo(
    () =>
      packages.find((item) => item.title === form.packageType) ?? packages[0],
    [form.packageType],
  );

  const selectedServicesTotal = useMemo(() => {
    const selected = services.filter((service) =>
      form.services.includes(service.name),
    );
    return selected.reduce((sum, item) => sum + item.price, 0);
  }, [form.services]);

  const estimate = selectedPackage.price + selectedServicesTotal + 5000;

  const handleCheckAvailability = () => {
    if (!form.eventDate) {
      setFeedback("Please select an event date first.");
      return;
    }

    const booked = getAvailability(form.eventDate);
    setAvailability(booked);
    setFeedback(
      booked.length
        ? `Booked slots: ${booked.join(", ")}`
        : "This date is available.",
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const record = addBooking({
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      eventType: form.eventType,
      eventDate: form.eventDate,
      startTime: form.startTime,
      endTime: form.endTime,
      guests: form.guests,
      packageType: form.packageType,
      services: form.services,
      notes: form.notes,
      estimatedTotal: estimate,
      advancePaid: form.advancePaid,
    });
    setFeedback(`Booking created successfully. Reference: ${record.id}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Booking
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Reserve your date in minutes.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Choose your event type, date, guest count, and services to generate
            an estimate and confirm your booking.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                required
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                placeholder="Full name"
              />
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                placeholder="Phone"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                placeholder="Email"
              />
              <select
                value={form.eventType}
                onChange={(e) =>
                  setForm({ ...form, eventType: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              >
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Reception</option>
                <option>Corporate</option>
              </select>
              <input
                required
                type="date"
                value={form.eventDate}
                onChange={(e) =>
                  setForm({ ...form, eventDate: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />
              <div className="flex gap-3">
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                />
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                />
              </div>
              <input
                type="number"
                min="50"
                value={form.guests}
                onChange={(e) =>
                  setForm({ ...form, guests: Number(e.target.value) })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />
              <select
                value={form.packageType}
                onChange={(e) =>
                  setForm({ ...form, packageType: e.target.value })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.title}>
                    {pkg.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <p className="font-semibold">Select additional services</p>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <label
                    key={service.name}
                    className="rounded-full border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(service.name)}
                      onChange={() => {
                        const next = form.services.includes(service.name)
                          ? form.services.filter(
                              (item) => item !== service.name,
                            )
                          : [...form.services, service.name];
                        setForm({ ...form, services: next });
                      }}
                      className="mr-2"
                    />
                    {service.name}
                  </label>
                ))}
              </div>
            </div>

            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              placeholder="Special requests"
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCheckAvailability}
                className="rounded-full border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-cyan-300"
              >
                Check Availability
              </button>
              <button
                type="submit"
                className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950"
              >
                Submit Booking
              </button>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">
            <div>
              <h2 className="text-2xl font-semibold">Estimate</h2>
              <div className="mt-4 space-y-3 text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 px-4 py-3">
                  <span>Package</span>
                  <span>₹{selectedPackage.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 px-4 py-3">
                  <span>Selected services</span>
                  <span>₹{selectedServicesTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 px-4 py-3">
                  <span>Service charges</span>
                  <span>₹5000</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-cyan-400/30 bg-slate-950/70 px-4 py-3 text-white">
                  <span>Estimated total</span>
                  <span>₹{estimate.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Availability</h2>
              <p className="mt-3 text-sm text-slate-300">
                {feedback ?? "Select a date and check availability."}
              </p>
              {availability.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {availability.map((slot) => (
                    <li
                      key={slot}
                      className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2"
                    >
                      {slot}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
