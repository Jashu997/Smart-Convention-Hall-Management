"use client";

import { useState } from "react";
import { contactInfo } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      alert("Failed to send message.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Contact
          </p>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Reach us easily for bookings and venue tours.
          </h1>
        </section>

        {/* Three Cards */}
        <section className="grid gap-6 lg:grid-cols-3">

          {/* Venue Information */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">
              Venue Information
            </h2>

            <div className="mt-6 space-y-4 text-slate-300">
              <p>
                <strong>Phone:</strong> {contactInfo.phone}
              </p>

              <p>
                <strong>Email:</strong> {contactInfo.email}
              </p>

              <p>
                <strong>Address:</strong> {contactInfo.address}
              </p>

              <p>
                <strong>Working Hours:</strong> {contactInfo.hours}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">
              Send an Enquiry
            </h2>

            <form
              onSubmit={sendMessage}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                required
              />

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subject: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                required
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                required
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="overflow-hidden rounded-3xl border border-cyan-400/30 bg-slate-900/70">
            <iframe
              title="Sri Sarvamangala Kalyana Mandapam Location"
              src="https://maps.google.com/maps?q=Sri%20Sarvamangala%20Kalyana%20Mandapam%20Ravulavalasa%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-full min-h-[500px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </section>

      </div>
    </main>
  );
}