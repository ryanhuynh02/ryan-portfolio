import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";
import { MDXComponents } from "@/components/MDXComponents";

const components = MDXComponents as Record<string, ComponentType>;

function sanitizeForMDX(raw: string): string {
  return raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<![^>]*>/g, "")
    .replace(/<=/g, "&lt;=")
    .replace(/<(?=\s|\d)/g, "&lt;");
}

function readColorGamesMDX(): string | null {
  const candidates = [
    path.join(process.cwd(), "src", "app", "projects", "color-games", "color-games.mdx"),
    path.join(process.cwd(), "app", "projects", "color-games", "color-games.mdx"),
  ];
  for (const f of candidates) {
    if (fs.existsSync(f)) return sanitizeForMDX(fs.readFileSync(f, "utf8"));
  }
  return null;
}

export default function ColorGamesProjectPage() {
  const mdx = readColorGamesMDX();

  return (
    <main
      className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 bg-white text-slate-900 min-h-screen"
      style={{ "--background": "white", "--foreground": "#0f172a" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Color &amp; Math Game (Ionic)
        </h1>
        <Link href="/#projects" className="text-sm underline text-slate-600 hover:text-slate-900">
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
            (Couldn’t load <code>color-games.mdx</code> at build time.)
          </p>
        )}
      </div>
    </main>
  );
}
