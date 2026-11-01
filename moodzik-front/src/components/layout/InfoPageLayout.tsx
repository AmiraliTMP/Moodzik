import { ArrowLeft, Music2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Suspense } from "react";
import CurrentYear from "./CurrentYear";

type InfoPageLayoutProps = {
  activePage: "about" | "privacy" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

const navigationItems = [
  {
    label: "About Moodzik",
    href: "/about",
    id: "about",
  },
  {
    label: "Privacy policy",
    href: "/privacy",
    id: "privacy",
  },
  {
    label: "Terms of service",
    href: "/terms",
    id: "terms",
  },
] as const;

export default function InfoPageLayout({
  activePage,
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: InfoPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-42">
        <div className="container-main flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-2">
            <Music2 className="text-[#1ed760]" size={25} />

            <span className="text-xl font-bold tracking-tight">Moodzik</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container-main py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          {/* Page Heading */}
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#1ed760]">
              {eyebrow}
            </p>

            <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="text-base leading-8 text-white/60 md:text-lg">
              {description}
            </p>

            {updatedAt && (
              <p className="mt-5 text-sm text-white/40">
                Last updated: {updatedAt}
              </p>
            )}
          </div>

          {/* Content + Sidebar */}
          <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
            {/* Sidebar Navigation */}
            <aside>
              <nav className="flex flex-col gap-2 lg:sticky lg:top-8">
                {navigationItems.map((item) => {
                  const isActive = activePage === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-[#1ed760]/10 font-semibold text-[#1ed760]"
                          : "text-white/50 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Page Content */}
            <article className="min-w-0">
              <div className="space-y-10 text-sm leading-8 text-white/70 md:text-base">
                {children}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-42">
        <div className="container-main flex flex-col items-center justify-between gap-4 text-sm text-white/40 md:flex-row">
          <p>
            ©{" "}
            <Suspense fallback="...">
              <CurrentYear />
            </Suspense>{" "}
            Moodzik. All rights reserved.
          </p>

          <Link href="/" className="transition-colors hover:text-white">
            Moodzik Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
