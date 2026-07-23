"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  packageType: string;
  status: string;
  estimatedTotal: number;

  services?: string;
  notes?: string;
  createdAt: string;
};

const statuses = ["Pending", "Approved", "Confirmed", "Cancelled"];

export function BookingStatusManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState("All");

  const loadBookings = async () => {
    const response = await fetch("/api/booking");
    const data = await response.json();

    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    void (async () => {
      try {
        await loadBookings();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const updateStatus = async (
    bookingId: string,
    status: string
  ) => {
    await fetch(`/api/booking/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    loadBookings();
  };

    const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    await fetch(`/api/booking/${bookingId}`, {
      method: "DELETE",
    });

    loadBookings();
  };

  const generateInvoice = async (bookingId: string) => {
  try {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    });

    if (!response.ok) {
      throw new Error("Invoice generation failed");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Sri-Sarvamangala-Invoice.pdf";

    document.body.appendChild(link);
    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Unable to generate invoice");
  }
};

  const filteredBookings = bookings.filter((booking) => {
    const text = search.toLowerCase();

    const matchesSearch =
      booking.customerName.toLowerCase().includes(text) ||
      booking.email.toLowerCase().includes(text) ||
      booking.eventType.toLowerCase().includes(text) ||
      booking.packageType.toLowerCase().includes(text) ||
      booking.status.toLowerCase().includes(text);

    const matchesPackage =
      selectedPackage === "All" ||
      booking.packageType === selectedPackage;

    const matchesEvent =
      selectedEvent === "All" ||
      booking.eventType === selectedEvent;

    const matchesDate =
      selectedDate === "" ||
      booking.eventDate.slice(0, 10) === selectedDate;

    return (
      matchesSearch &&
      matchesPackage &&
      matchesEvent &&
      matchesDate
    );
  });

  if (loading) {
    return (
      <p className="text-slate-400">
        Loading bookings...
      </p>
    );
  }
    return (
    <div className="space-y-5">

      {/* Search & Filters */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">

        <input
          type="text"
          placeholder="🔍 Search customer, email, package, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none"
        />

        <div className="mt-4 grid gap-3 md:grid-cols-3">

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white"
          />

          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="All">All Packages</option>

            {[...new Set(bookings.map((b) => b.packageType))].map((pkg) => (
              <option key={pkg} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>

          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="All">All Events</option>

            {[...new Set(bookings.map((b) => b.eventType))].map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>

        </div>

      </div>
            {filteredBookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
        >
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {booking.customerName}
              </h3>

              <p className="text-slate-400">
                📧 {booking.email}
              </p>

              <p className="text-slate-400">
                📅 {new Date(booking.eventDate).toLocaleDateString()}
              </p>

              <p className="text-slate-400">
                🎉 {booking.eventType}
              </p>

              <p className="text-slate-400">
                📦 {booking.packageType}
              </p>

              <p className="text-lg font-bold text-cyan-400">
                ₹{booking.estimatedTotal.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(booking.id, status)}
                  className={`
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    ${
                      booking.status === status
                        ? status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : status === "Approved"
                          ? "bg-green-500 text-white"
                          : status === "Confirmed"
                          ? "bg-blue-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }
                  `}
                >
                  {status}
                </button>
              ))}

              <button
                onClick={() => setSelectedBooking(booking)}
                className="rounded-full bg-blue-500 px-3 py-2 text-sm text-white"
              >
                View
              </button>

              <button
                onClick={() => generateInvoice(booking.id)}
                className="
                  rounded-full 
                  bg-emerald-500 
                  px-3 py-2 
                  text-sm 
                  text-slate-950
                "
              >
                🧾 Invoice
              </button>

              <button
                onClick={() => deleteBooking(booking.id)}
                className="rounded-full bg-red-500 px-3 py-2 text-sm text-white"
              >
                🗑 Delete
              </button>

            </div>

          </div>
        </div>
      ))}

      {filteredBookings.length === 0 && (
        <p className="text-center text-slate-400">
          No bookings found.
        </p>
      )}
            {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-cyan-500 bg-slate-900 p-6 shadow-2xl">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-cyan-400">
                Booking Details
              </h2>

              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

              <div>
                <p className="text-slate-400">Customer</p>
                <p>{selectedBooking.customerName}</p>
              </div>

              <div>
                <p className="text-slate-400">Email</p>
                <p>{selectedBooking.email}</p>
              </div>

              <div>
                <p className="text-slate-400">Phone</p>
                <p>{selectedBooking.phone}</p>
              </div>

              <div>
                <p className="text-slate-400">Event</p>
                <p>{selectedBooking.eventType}</p>
              </div>

              <div>
                <p className="text-slate-400">Package</p>
                <p>{selectedBooking.packageType}</p>
              </div>

              <div>
                <p className="text-slate-400">Event Date</p>
                <p>{new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-slate-400">Services</p>
                <p>{selectedBooking.services || "None"}</p>
              </div>

              <div>
                <p className="text-slate-400">Status</p>
                <p>{selectedBooking.status}</p>
              </div>

              <div className="col-span-2">
                <p className="text-slate-400">Notes</p>
                <p>{selectedBooking.notes || "No Notes"}</p>
              </div>

              <div>
                <p className="text-slate-400">Estimated Total</p>
                <p>₹{selectedBooking.estimatedTotal.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-slate-400">Created At</p>
                <p>{new Date(selectedBooking.createdAt).toLocaleString()}</p>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}