import { packages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
             Our Packages
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Choose the Perfect Package for Your Special Occasion
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            From weddings to corporate events, we offer thoughtfully designed packages to make every celebration memorable at Sri Sarvamangala Kalyana Mandapam.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                pkg.title === "Marriage" || pkg.title === "Half Saree Function"
                  ? "border-2 border-cyan-400 bg-gradient-to-br from-cyan-500/10 to-slate-900"
                  : "border border-white/10 bg-slate-900/70"
            }`}
        >

          {(pkg.title === "Marriage" || pkg.title === "Half Saree Function") && (
            <div className="mb-4">
              <span className="rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
                ⭐ Most Popular
              </span>
            </div>
          )}

          <div className="text-5xl">
            {pkg.icon}
          </div>

          <h2 className="mt-4 text-2xl font-semibold">
            {pkg.title}
          </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {pkg.description}
              </p>

              <p className="mt-4 text-cyan-300 font-semibold">
                Duration: {pkg.duration}
              </p>

              <p className="text-cyan-300 font-semibold">
                Guests: {pkg.guests}
              </p>

              <p className="mt-4 text-3xl font-semibold text-cyan-300">
                Starting from ₹{pkg.price.toLocaleString()}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

      </div>
    </main>
  );
}