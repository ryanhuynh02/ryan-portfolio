"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { useState } from "react";

/**
 * A site-wide header that matches your homepage look, but uses real links
 * (so it works on /blog pages too). Edit the links and resumeUrl as needed.
 */
export default function SiteHeader({
  resumeUrl = "/Ryan_Huynh_Resume.pdf", // <- update if your path/filename differs
}: {
  resumeUrl?: string;
}) {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Blog", href: "/blog" }, // go to blog index
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: avatar + name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0">
            <Image
              src="/profile-picture.jpeg"
              alt="Ryan Huynh"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Ryan Huynh</div>
            <div className="text-xs text-slate-500">Hayward, CA</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 text-sm bg-slate-900 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow transition"
            aria-label="Download my resume (PDF)"
          >
            <Download className="size-4" /> Resume
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* dim background */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white border-r border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/profile-picture.jpeg"
                    alt="Ryan Huynh"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="leading-tight">
                  <div className="font-medium">Ryan Huynh</div>
                  <div className="text-xs text-slate-500">Hayward, CA</div>
                </div>
              </div>
              <button
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-4 space-y-1">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block w-full text-left px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100"
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={resumeUrl}
                download
                onClick={() => setOpen(false)}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 text-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-sm hover:shadow transition"
                aria-label="Download my resume (PDF)"
              >
                <Download className="size-4" /> Download Resume
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
