import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlightForge.ai — Master Your Private Pilot Training with AI",
  description:
    "The only platform where YOU teach the AI — because teaching is the fastest way to learn. Backed by real FAA references. No hallucinations. No shortcuts.",
  openGraph: {
    title: "FlightForge.ai — Master Your Private Pilot Training with AI",
    description:
      "The only platform where YOU teach the AI — because teaching is the fastest way to learn.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
