"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { useState } from "react";

// Wider shell than the cards so left feels more-left and right more-right
const SHELL = "max-w-7xl mx-auto pl-2 pr-6 sm:pl-3 sm:pr-8";

export default function SiteHeader({
  resumeUrl = "/Ryan_Huynh_Resume.pdf",
  logoSrc = "/profile-logo.svg",
  name = "Ryan Huynh",
  location = "Hayward, CA",
}: {
  resumeUrl?: string;
  logoSrc?: string;
  name?: string;
  location?: string;
}) {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Taller fixed header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className={`${SHELL} h-20 flex items-center justify-between`}>
          {/* Left group — logo + name (nudged left via smaller padding) */}
          <Link href="/" className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <Image
                src={logoSrc}
                alt="Site logo"
                width={112}
                height={112}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">{location}</div>
            </div>
          </Link>

          {/* Right group — desktop nav (nudged right via larger padding) */}
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
      </header>

      {/* Mobile drawer (keeps the same alignment feel) */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white border-r border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <Image
                    src={logoSrc}
                    alt="Site logo"
                    width={112}
                    height={112}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="leading-tight">
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-slate-500">{location}</div>
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
    </>
  );
}
