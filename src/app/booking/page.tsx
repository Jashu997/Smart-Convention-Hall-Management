"use client";

import { useMemo, useState } from "react";
import { packages, services } from "@/lib/data";
import { getAvailability } from "@/lib/store";

export default function BookingPage() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    eventType: "Marriage",
    eventDate: "",
    startTime: "18:00",
    endTime: "22:00",
    guests: 150,
    packageType: packages[0].title,
    services: [] as string[],
    notes: "",
    estimatedTotal: packages[0].price,
    advancePaid: 15000,
  });

  // Availability Message
  const [availabilityMessage, setAvailabilityMessage] =
    useState<string | null>(null);

  // Booking Success Message
  const [bookingMessage, setBookingMessage] =
    useState<string | null>(null);

  // Booked Slots
  const [availability, setAvailability] = useState<string[]>([]);

  const selectedPackage = useMemo(() => {
    return (
      packages.find(
        (item) => item.title === form.packageType
      ) ?? packages[0]
    );
  }, [form.packageType]);

  const selectedServicesTotal = useMemo(() => {
    const selected = services.filter((service) =>
      form.services.includes(service.name)
    );

    return selected.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [form.services]);

  const estimate =
    selectedPackage.price +
    selectedServicesTotal +
    5000;

  // Check Availability
  const handleCheckAvailability = () => {
    if (!form.eventDate) {
      setAvailabilityMessage(
        "Please select an event date first."
      );
      return;
    }

    const booked = getAvailability(form.eventDate);

    setAvailability(booked);

    setAvailabilityMessage(
      booked.length > 0
        ? `Booked Slots: ${booked.join(", ")}`
        : "✅ This date is available."
    );
  };

  // Submit Booking
  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          email: form.email,
          eventType: form.eventType,
          packageType: form.packageType,
          eventDate: form.eventDate,
          services: form.services,
          notes: form.notes,
          estimatedTotal: estimate,
        }),
      });
            if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const booking = await response.json();

      setBookingMessage(
        `✅ Booking created successfully. Reference: ${booking.id}`
      );

      setAvailabilityMessage(null);

      setForm({
        customerName: "",
        phone: "",
        email: "",
        eventType: "Marriage",
        eventDate: "",
        startTime: "18:00",
        endTime: "22:00",
        guests: 150,
        packageType: packages[0].title,
        services: [],
        notes: "",
        estimatedTotal: packages[0].price,
        advancePaid: 15000,
      });

    } catch (error) {
      console.error(error);

      setBookingMessage(
        "❌ Failed to create booking."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Booking
          </p>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Reserve your date in minutes
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Choose your package, event date and
            additional services to reserve your hall.
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
                placeholder="Customer Name"
                value={form.customerName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    customerName: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />

              <input
                required
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />
                            <select
                value={form.eventType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    eventType: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.title}>
                    {pkg.title}
                  </option>
                ))}
              </select>

              <input
                required
                type="date"
                value={form.eventDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    eventDate: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />

              <div className="flex gap-3">
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                />

                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
                />
              </div>

              <input
                type="number"
                min={50}
                value={form.guests}
                onChange={(e) =>
                  setForm({
                    ...form,
                    guests: Number(e.target.value),
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              />

              <select
                value={form.packageType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    packageType: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.title}>
                    {pkg.title} — ₹{pkg.price.toLocaleString()}
                  </option>
                ))}
              </select>

            </div>

            <div className="space-y-3">
              <p className="font-semibold">
                Select Additional Services
              </p>

              <div className="flex flex-wrap gap-3">

                {services.map((service) => (
                  <label
                    key={service.name}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(service.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            services: [
                              ...form.services,
                              service.name,
                            ],
                          });
                        } else {
                          setForm({
                            ...form,
                            services: form.services.filter(
                              (item) => item !== service.name
                            ),
                          });
                        }
                      }}
                    />

                    {service.name}
                    {" "}
                    (₹{service.price.toLocaleString()})
                  </label>
                ))}

              </div>
            </div>
                        <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              placeholder="Special Requests"
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3"
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
              <h2 className="text-2xl font-semibold">
                Estimated Cost
              </h2>

              <div className="mt-4 space-y-3 text-slate-300">

                <div className="flex justify-between rounded-2xl bg-slate-950/70 px-4 py-3">
                  <span>Package</span>
                  <span>₹{selectedPackage.price.toLocaleString()}</span>
                </div>

                <div className="flex justify-between rounded-2xl bg-slate-950/70 px-4 py-3">
                  <span>Selected Services</span>
                  <span>₹{selectedServicesTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between rounded-2xl bg-slate-950/70 px-4 py-3">
                  <span>Service Charges</span>
                  <span>₹5,000</span>
                </div>

                <div className="flex justify-between rounded-2xl border border-cyan-500 bg-slate-950/70 px-4 py-3 font-semibold text-white">
                  <span>Total Estimate</span>
                  <span>₹{estimate.toLocaleString()}</span>
                </div>

              </div>
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Availability
              </h2>

              <p className="mt-3 text-sm text-slate-300">
                {availabilityMessage ??
                  "Select a date and click Check Availability."}
              </p>

              {bookingMessage && (
                <div className="mt-4 rounded-xl border border-green-500 bg-green-500/10 p-4 text-green-300">
                  {bookingMessage}
                </div>
              )}

              {availability.length > 0 && (
                <ul className="mt-4 space-y-2">
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