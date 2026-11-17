"use client";

import { useState, type ReactNode } from "react";

import AppSidebar from "@/components/layout/AppSidebar";
import TrackSidebar from "@/components/layout/TrackSidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="h-dvh min-h-130 overflow-hidden bg-black p-2 text-white">
      <div className="flex h-full min-h-0 gap-2">
        {/* Left sidebar */}
        <AppSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>

        {/* Right sidebar */}
        <TrackSidebar />
      </div>
    </main>
  );
}
