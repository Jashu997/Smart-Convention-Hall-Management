import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    title: "Spacious Main Hall",
    description:
      "Comfortable seating arrangement for weddings, receptions, and large celebrations.",
  },
  {
    title: "Fully Air Conditioned",
    description:
      "Modern air-conditioned hall for a pleasant experience throughout every event.",
  },
  {
    title: "Large Dining Hall",
    description:
      "Separate dining area with ample seating for guests.",
  },
  {
    title: "Ample Parking",
    description:
      "Dedicated parking space for guests with easy access to the venue.",
  },
  {
    title: "24×7 Generator Backup",
    description:
      "Reliable power backup ensures uninterrupted celebrations.",
  },
  {
    title: "Multiple Event Packages",
    description:
      "Suitable for weddings, receptions, engagements, birthdays, baby showers, and corporate events.",
  },
];

export function FeaturesSection() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 sm:p-10">
      <SectionHeading
        eyebrow="Our Facilities"
        title="Everything You Need for a Perfect Celebration"
        description="Sri Sarvamangala Kalyana Mandapam provides modern facilities and comfortable spaces to make every event memorable."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-3 text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
