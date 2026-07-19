import { contactInfo } from "@/lib/data";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Reach us easily for bookings and venue tours.
          </h1>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Venue Information</h2>
            <div className="mt-6 space-y-4 text-slate-300">
              <p>Phone: {contactInfo.phone}</p>
              <p>Email: {contactInfo.email}</p>
              <p>Address: {contactInfo.address}</p>
              <p>Working hours: {contactInfo.hours}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-cyan-400/30 bg-slate-900/70">
           <iframe
             title="Sri Sarvamangala Kalyana Mandapam Location"
              src="https://maps.google.com/maps?q=Sri%20Sarvamangala%20Kalyana%20Mandapam%20Ravulavalasa%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[450px] w-full border-0"
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
