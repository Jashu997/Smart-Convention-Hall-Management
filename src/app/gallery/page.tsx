import Image from "next/image";
import { galleryItems } from "@/lib/data";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Our Gallery
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Take a glimpse of the beautiful celebrations at Sri Sarvamangala Kalyana Mandapam.
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            Explore our venue through beautiful photographs. These are temporary showcase images and will be replaced with original photos of Sri Sarvamangala Kalyana Mandapam soon.
          </p>
        </section>
        <section className="grid gap-6 md:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <p className="mt-2 text-sm leading-6 text-slate-400">
                   Beautiful moments captured during celebrations at our venue.
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
