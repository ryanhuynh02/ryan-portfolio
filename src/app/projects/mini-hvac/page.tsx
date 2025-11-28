import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import type { MDXComponents as MDXRemoteComponents } from "mdx/types";
import type React from "react";
import { MDXComponents } from "@/components/MDXComponents";
import NextImage from "next/image";
import CompareSlider from "@/components/CompareSlider";

/** --- typed wrapper for Next/Image shown to MDX --- */
type NextImageProps = ComponentProps<typeof NextImage>;

function MdxImage(props: NextImageProps) {
  const { src, alt, ...rest } = props ?? {};
  // Pretty placeholder if you haven't uploaded images yet
  if (!src) {
    return (
      <div className="relative aspect-[4/3] rounded-xl border bg-slate-100 grid place-items-center text-xs text-slate-500">
        Image placeholder
      </div>
    );
  }
  return <NextImage src={src} alt={alt ?? ""} {...rest} />;
}

/** --- components passed into <MDXRemote> --- */
const components: MDXRemoteComponents = {
  ...MDXComponents,
  Image: MdxImage,
  CompareSlider,
};

function sanitizeForMDX(raw: string): string {
  return raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<![^>]*>/g, "")
    .replace(/<=/g, "&lt;=")
    .replace(/<(?=\s|\d)/g, "&lt;");
}

function readMiniHvacMDX(): string | null {
  const candidates = [
    path.join(
      process.cwd(),
      "src",
      "app",
      "projects",
      "mini-hvac",
      "mini-hvac.mdx"
    ),
    path.join(
      process.cwd(),
      "app",
      "projects",
      "mini-hvac",
      "mini-hvac.mdx"
    ),
  ];
  for (const f of candidates) {
    if (fs.existsSync(f)) {
      const raw = fs.readFileSync(f, "utf8");
      return sanitizeForMDX(raw);
    }
  }
  return null;
}

export default function MiniHVACProjectPage() {
  const mdx = readMiniHvacMDX();

  return (
    <main
      className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 bg-white text-slate-900 min-h-screen"
      style={
        {
          "--background": "white",
          "--foreground": "#0f172a",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Mini HVAC System
        </h1>
        <Link
          href="/#projects"
          className="text-sm underline text-slate-600 hover:text-slate-900"
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="mt-6 prose prose-slate max-w-none prose-img:rounded-xl">
        {mdx ? (
          <MDXRemote
            source={mdx}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={components}
          />
        ) : (
          <p className="text-slate-600">
            (Couldn’t load <code>mini-hvac.mdx</code> at build time.)
          </p>
        )}
      </div>
    </main>
  );
}
