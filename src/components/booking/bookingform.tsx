"use client";

export function BookingForm() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">

      <h2 className="text-3xl font-bold text-white">
        Book Your Event
      </h2>

      <p className="mt-2 text-slate-400">
        Fill in your event details and our team will contact you shortly.
      </p>

      <form className="mt-8 space-y-6">

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
        </div>

      </form>

    </section>
  );
}