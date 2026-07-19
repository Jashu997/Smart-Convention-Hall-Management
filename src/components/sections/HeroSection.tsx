import Link from "next/link";

export function HeroSection() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl sm:p-12 lg:p-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
           Welcome to Sri Sarvamangala Kalyana Mandapam
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl">
           Celebrate Every Occasion with Elegance
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Sri Sarvamangala Kalyana Mandapam is the perfect destination for
            weddings, receptions, engagements, half saree ceremonies, baby showers,
            birthdays, corporate events, and many more memorable celebrations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/booking"
               className="rounded-full bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition duration-300 hover:bg-cyan-400 hover:scale-105"
            >
               📅 Book Now
            </Link>
            <Link
              href="/packages"
              className="rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-white/10 hover:scale-105"
            >
              🎉 View Packages
            </Link>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-cyan-400/30 bg-slate-900/80 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white">
            Hall Highlights
          </h2>
          <p className="mt-2 text-slate-400">
           Everything you need for a memorable celebration.
          </p>
           <div className="mt-8 space-y-4">
           <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <h3 className="text-lg font-semibold text-cyan-300">
            👥 Up to 1000 Guests
          </h3>
           <p className="mt-1 text-sm text-slate-300">
            Spacious seating arrangement for weddings and large gatherings.
           </p>
           </div>
           <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <h3 className="text-lg font-semibold text-cyan-300">
            🚗 Spacious Parking
          </h3>
           <p className="mt-1 text-sm text-slate-300">
             Ample parking space for guests with convenient access.
           </p>
           </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <h3 className="text-lg font-semibold text-cyan-300">
           ❄ Fully Air Conditioned
          </h3>
           <p className="mt-1 text-sm text-slate-300">
             Comfortable indoor environment throughout every event.
           </p>
          </div>
           <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <h3 className="text-lg font-semibold text-cyan-300">
              ⚡ 24×7 Power Backup
          </h3>
            <p className="mt-1 text-sm text-slate-300">
              Uninterrupted celebrations with reliable generator support.
            </p>
           </div>

          </div>

        </div>    
      </div>
    </section>
  );
}
