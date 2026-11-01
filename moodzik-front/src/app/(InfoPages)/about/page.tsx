import InfoPageLayout from "@/components/layout/InfoPageLayout";
import {
  ArrowRight,
  Disc3,
  Headphones,
  Heart,
  Music2,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Moodzik | Music for Every Mood",
  description:
    "Discover Moodzik, a modern music listening experience built around your music, your preferences, and your mood.",
};

const values = [
  {
    icon: Headphones,
    title: "Music comes first",
    description:
      "We believe music should be easy to access, enjoyable to explore, and always at the center of the experience.",
  },
  {
    icon: Sparkles,
    title: "Discover something new",
    description:
      "Explore music, browse collections, and find tracks that match your mood and interests.",
  },
  {
    icon: Heart,
    title: "Make it yours",
    description:
      "Save your favorite tracks, organize your listening experience, and bring your own music into Moodzik.",
  },
];

export default function AboutPage() {
  return (
    <InfoPageLayout
      activePage="about"
      eyebrow="About us"
      title="Music makes every moment different."
      description="Moodzik is a modern music listening experience designed to make discovering, organizing, and enjoying music simple."
    >
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1ed760]/10">
            <Music2 size={28} className="text-[#1ed760]" />
          </div>

          <h2 className="mb-4 text-2xl font-bold text-white">
            Your music. Your mood. Your space.
          </h2>

          <p className="leading-8">
            Moodzik is a Spotify-inspired music platform built to provide a
            clean, intuitive, and enjoyable music listening experience. Whether
            you want to explore music, revisit your favorite tracks, or listen
            to audio files from your own collection, Moodzik brings these
            experiences together in one place.
          </p>

          <p className="mt-4 leading-8">
            Our goal is to create a comfortable digital space where music
            discovery and personal listening come together through a simple and
            modern interface.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">
            What defines Moodzik
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-white/3 p-6"
                >
                  <Icon size={25} className="mb-5 text-[#1ed760]" />

                  <h3 className="mb-3 font-semibold text-white">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-7">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">
            What you can do with Moodzik
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4">
              <Disc3 size={22} className="mt-1 shrink-0 text-[#1ed760]" />
              <div>
                <h3 className="mb-1 font-semibold text-white">Explore music</h3>
                <p className="leading-7">
                  Browse music collections and discover tracks through a
                  visually engaging interface.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart size={22} className="mt-1 shrink-0 text-[#1ed760]" />
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  Save your favorites
                </h3>
                <p className="leading-7">
                  Keep your favorite tracks accessible and build a personal
                  collection of music you enjoy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Headphones size={22} className="mt-1 shrink-0 text-[#1ed760]" />
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  Play your own music
                </h3>
                <p className="leading-7">
                  Import local MP3 files, explore their embedded metadata and
                  artwork, and listen to them directly through the Moodzik
                  player.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local music note */}
        <section className="rounded-2xl border border-[#1ed760]/20 bg-[#1ed760]/5 p-6">
          <h2 className="mb-3 text-lg font-bold text-white">
            Your local music collection
          </h2>

          <p className="text-sm leading-7">
            Moodzik currently processes imported audio files in your browser.
            Imported tracks are temporary and are not automatically uploaded to
            a Moodzik server. They may disappear when you refresh or close the
            application.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Ready to enjoy your music?
          </h2>

          <p className="mb-6 text-sm leading-7">
            Head back to Moodzik and make your next listening session yours.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1ed760] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760]/90"
          >
            Explore Moodzik
            <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </InfoPageLayout>
  );
}
