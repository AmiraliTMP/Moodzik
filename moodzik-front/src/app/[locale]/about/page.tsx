import { ArrowRight, Headphones, Heart, Music2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import InfoPageLayout from "@/components/layout/InfoPageLayout";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "About Moodzik | Music, Your Way",
  description:
    "Discover Moodzik, a music-focused experience built around discovery, listening, and your personal music collection.",
};

const values = [
  {
    icon: Music2,
    title: "Music comes first",
    description:
      "A clean, focused listening experience that keeps your music at the center.",
  },
  {
    icon: Sparkles,
    title: "Discover something new",
    description:
      "Explore tracks, revisit favorites, and find inspiration in the music you enjoy.",
  },
  {
    icon: Heart,
    title: "Make it yours",
    description:
      "Build a more personal listening experience with favorites and your own local audio files.",
  },
];

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  return (
    <InfoPageLayout
      locale={locale}
      eyebrow="A little about us"
      title="Music makes every moment different."
      description="Moodzik is a music-focused experience built to make listening feel simple, personal, and enjoyable."
    >
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#173b29] via-[#14251d] to-[#121212] p-6 sm:p-10">
        <div className="relative z-10 max-w-xl">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#1ed760] text-black">
            <Headphones size={29} />
          </div>

          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Your music.
            <br />
            Your mood.
            <br />
            Your space.
          </h2>

          <p className="mt-5 leading-7 text-white/75">
            Whether you are discovering a new sound or returning to a familiar
            favorite, Moodzik aims to give you a comfortable place to enjoy the
            music that fits your moment.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-12 size-64 rounded-full bg-[#1ed760]/10 blur-3xl sm:size-80"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">What is Moodzik?</h2>

        <p>
          Moodzik is a music player and discovery interface designed around the
          everyday experience of listening. It brings together a music
          catalogue, playback controls, favorite tracks, and a local MP3
          metadata explorer in one place.
        </p>

        <p>
          The project is being developed with a focus on a responsive interface,
          clear navigation, and a consistent visual identity. As it evolves, its
          goal is to make the experience more useful without making it feel
          complicated.
        </p>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">What matters to us</h2>

          <p className="mt-3">
            These are the principles behind the Moodzik experience.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-2xl border border-white/10 bg-[#121212] p-5 transition hover:border-[#1ed760]/30 hover:bg-[#161616]"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#1ed760]/10 text-[#1ed760]">
                  <Icon size={22} />
                </div>

                <h3 className="font-bold text-white">{value.title}</h3>

                <p className="mt-3 text-sm leading-7">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Built for your listening experience
        </h2>

        <p>
          Moodzik currently includes a browser-based music interface and support
          for importing local MP3 files to inspect their metadata and play them.
          Imported tracks are temporary in the current implementation; they are
          not a permanent cloud music library.
        </p>

        <p>
          Demo audio and artwork may come from external providers. Their
          availability and usage conditions are controlled by those providers
          and the applicable rights holders.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">Ready to listen?</h2>

        <p className="mt-3">
          Head back to Moodzik and explore the music available in the player.
        </p>

        <Link
          href={basePath}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1ed760] px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-[#3be477]"
        >
          Explore Moodzik
          <ArrowRight size={17} />
        </Link>
      </section>
    </InfoPageLayout>
  );
}
