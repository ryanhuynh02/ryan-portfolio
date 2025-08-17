import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ryan-huynh",
    template: "%s | ryan-huynh",
  },
  description: "Personal site of Ryan Huynh",
  icons: {
    icon: [
      { url: "/favicon_rh.ico" },
      { url: "/favicon_rh-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon_rh-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon_rh-180.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
