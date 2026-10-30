import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Moodzik — Music for Every Moment",
    template: "%s | Moodzik",
  },
  description:
    "Discover new music, explore your favorite artists, and create your own playlists with Moodzik.",
  applicationName: "Moodzik",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Moodzik",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121212",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#121212] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
