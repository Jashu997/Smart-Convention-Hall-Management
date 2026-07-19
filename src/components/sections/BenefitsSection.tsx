export function BenefitsSection() {
  const benefits = [
    {
      icon: "🏛️",
      title: "Premium Convention Hall",
      description:
        "A spacious and elegant venue suitable for weddings and grand celebrations.",
    },
    {
      icon: "❄️",
      title: "Fully Air Conditioned",
      description:
        "Enjoy a comfortable environment throughout your event.",
    },
    {
      icon: "🚗",
      title: "Spacious Parking",
      description:
        "Large parking area for guests with easy access to the venue.",
    },
    {
      icon: "⚡",
      title: "24×7 Power Backup",
      description:
        "Reliable generator backup ensures uninterrupted celebrations.",
    },
    {
      icon: "🍽️",
      title: "Dining Hall",
      description:
        "Separate dining area designed for smooth guest service.",
    },
    {
      icon: "🎉",
      title: "Multiple Event Packages",
      description:
        "Wedding, Reception, Engagement, Birthday, Corporate Events and more.",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-10">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Why Choose Us
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">
          Everything You Need In One Place
        </h2>

        <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
          Sri Sarvamangala Kalyana Mandapam offers modern facilities,
          spacious interiors, excellent service, and a comfortable
          environment for unforgettable celebrations.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 transition duration-300 hover:border-cyan-400 hover:-translate-y-1"
          >
            <div className="text-5xl">{benefit.icon}</div>

            <h3 className="mt-5 text-xl font-bold text-white">
              {benefit.title}
            </h3>

            <p className="mt-3 text-slate-400 leading-7">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}