import { packages, services } from "@/lib/data";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Transparent pricing and easy estimates.
          </h1>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Popular Packages</h2>
            <div className="mt-6 space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{pkg.title}</p>
                    <p className="text-cyan-300">
                      ₹{pkg.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-2xl font-semibold">Extra Services</h2>
            <div className="mt-6 space-y-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span>{service.name}</span>
                  <span className="text-cyan-300">
                    ₹{service.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
