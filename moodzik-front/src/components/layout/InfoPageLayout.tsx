import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Music2 } from "lucide-react";

type InfoPageLayoutProps = {
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

export default function InfoPageLayout({
  locale,
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: InfoPageLayoutProps) {
  const basePath = `/${locale}`;

  return (
    <main className="min-h-dvh bg-[#0b0b0b] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={`${basePath}`}
            className="flex items-center gap-3"
            aria-label="Moodzik home"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#1ed760] text-black">
              <Music2 size={23} strokeWidth={2.5} />
            </span>

            <span className="text-xl font-extrabold tracking-tight">
              moodzik<span className="text-[#1ed760]">.</span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex items-center gap-4 text-sm text-[#b3b3b3] sm:gap-6"
          >
            <Link
              href={`${basePath}/about`}
              className="transition hover:text-white"
            >
              About
            </Link>

            <Link
              href={`${basePath}/privacy`}
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href={`${basePath}/terms`}
              className="transition hover:text-white"
            >
              Terms
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-36 size-96 rounded-full bg-[#1ed760]/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Link
            href={basePath}
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#b3b3b3] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Moodzik
          </Link>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#1ed760]">
            {eyebrow}
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b3b3b3] sm:text-lg">
            {description}
          </p>

          {updatedAt && (
            <p className="mt-6 text-xs text-[#777]">
              Last updated: {updatedAt}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#121212] p-5 lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#777]">
            Explore
          </p>

          <nav aria-label="Information pages" className="space-y-1">
            {[
              { label: "About Moodzik", href: `${basePath}/about` },
              { label: "Privacy policy", href: `${basePath}/privacy` },
              { label: "Terms of service", href: `${basePath}/terms` },
            ].map((item) => {
              const isActive =
                item.href === `${basePath}/${locale === "about" ? "" : ""}`;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[#b3b3b3] transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-xl bg-[#1ed760]/10 p-4">
            <Music2 size={20} className="text-[#1ed760]" />

            <p className="mt-3 text-sm font-semibold">Music, your way.</p>

            <p className="mt-2 text-xs leading-5 text-[#b3b3b3]">
              Questions or feedback? We welcome your thoughts as Moodzik
              continues to grow.
            </p>
          </div>
        </aside>

        <article className="min-w-0 space-y-10 text-sm leading-8 text-[#b3b3b3] sm:text-base">
          {children}
        </article>
      </div>

      <footer className="border-t border-white/10 bg-[#090909]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href={basePath} className="flex items-center gap-2">
            <Music2 size={19} className="text-[#1ed760]" />
            <span className="font-bold text-white">Moodzik</span>
          </Link>

          <p className="text-xs text-[#777]">
            Made for the moments that matter.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-[#b3b3b3]">
            <Link href={`${basePath}/about`} className="hover:text-white">
              About
            </Link>
            <Link href={`${basePath}/privacy`} className="hover:text-white">
              Privacy
            </Link>
            <Link href={`${basePath}/terms`} className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
