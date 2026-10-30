"use client";

import {
  ArrowRight,
  Compass,
  Home,
  Library,
  Music2,
  Plus,
  Search,
  X,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type AppSidebarProps = {
  activeNav: string;
  setActiveNav: Dispatch<SetStateAction<string>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const navigation = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Explore", icon: Compass },
];

export default function AppSidebar({
  activeNav,
  setActiveNav,
  mobileMenuOpen,
  setMobileMenuOpen,
}: AppSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        aria-hidden={!mobileMenuOpen ? undefined : false}
        className={`fixed inset-y-2 left-2 z-50 flex w-[min(320px,calc(100vw-16px))] flex-col gap-2 rounded-lg bg-black p-2 transition-transform duration-200 ease-in-out md:static md:z-auto md:w-70 md:shrink-0 md:translate-x-0 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-[calc(100%+16px)] md:translate-x-0"
        }`}
      >
        {/* Navigation and logo */}
        <div className="rounded-lg bg-[#121212] p-5">
          {/* Logo + mobile close button */}
          <div className="mb-7 flex items-center justify-between">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-w-0 items-center gap-2 text-xl font-bold tracking-tight text-white"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-black">
                <Music2 size={22} />
              </span>

              <span>Moodzik</span>
            </a>

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="shrink-0 rounded-full p-2 text-gray-400 transition-colors hover:bg-[#282828] hover:text-white md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-5">
            {navigation.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setActiveNav(label);

                  if (label === "Search") {
                    setMobileMenuOpen(false);

                    requestAnimationFrame(() => {
                      document.getElementById("music-search")?.focus();
                    });

                    return;
                  }

                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-4 text-left text-sm font-semibold transition hover:text-white ${
                  activeNav === label ? "text-white" : "text-[#b3b3b3]"
                }`}
              >
                <Icon size={23} strokeWidth={2.2} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Your Library */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto rounded-lg bg-[#121212]">
          <div className="flex items-center justify-between px-5 py-4">
            <button
              type="button"
              onClick={() => {
                setActiveNav("Your Library");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-sm font-semibold text-[#b3b3b3] transition hover:text-white"
            >
              <Library size={23} />
              Your Library
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Create playlist"
                onClick={() =>
                  alert("Playlist creation will be connected to your backend.")
                }
                className="rounded-full p-2 text-[#b3b3b3] hover:bg-[#282828] hover:text-white"
              >
                <Plus size={20} />
              </button>

              <button
                type="button"
                aria-label="Expand library"
                className="rounded-full p-2 text-[#b3b3b3] hover:bg-[#282828] hover:text-white"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="mx-3 mb-3 rounded-lg bg-[#242424] p-4">
            <p className="text-sm font-semibold">Create your first playlist</p>

            <p className="mt-2 text-xs text-[#d0d0d0]">
              It&apos;s easy. We&apos;ll help you get started.
            </p>

            <button
              type="button"
              onClick={() =>
                alert("Playlist creation will be connected to your backend.")
              }
              className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:scale-105"
            >
              Create playlist
            </button>
          </div>

          <div className="mx-3 rounded-lg bg-[#242424] p-4">
            <p className="text-sm font-semibold">Discover new music</p>

            <p className="mt-2 text-xs text-[#d0d0d0]">
              Find sounds for every moment.
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveNav("Explore");
                setMobileMenuOpen(false);
              }}
              className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:scale-105"
            >
              Explore music
            </button>
          </div>

          {/* Footer links */}
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 px-5 py-5 text-[10px] text-[#a7a7a7]">
            <a href="#privacy" className="hover:underline">
              Privacy
            </a>

            <a href="#terms" className="hover:underline">
              Terms
            </a>

            <a href="#about" className="hover:underline">
              About
            </a>

            <span className="w-full">© 2026 Moodzik</span>
          </div>
        </div>
      </aside>
    </>
  );
}
