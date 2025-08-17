import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";
import { MDXComponents } from "@/components/MDXComponents";

const components = MDXComponents as Record<string, ComponentType>;

// --- Add this helper ---
function sanitizeForMDX(raw: string): string {
  return raw
    // remove things MDX can't parse
    .replace(/<!--[\s\S]*?-->/g, "")        // HTML comments
    .replace(/<!DOCTYPE[^>]*>/gi, "")       // <!DOCTYPE ...>
    .replace(/<![^>]*>/g, "")               // any other <! ... >
    // escape raw comparison operators
    .replace(/<=/g, "&lt;=")                // <=
    .replace(/<(?=\s|\d)/g, "&lt;");        // < 1, < 5, < (space)
}

// (Optional) try both common paths: with and without "src"
function readDoorSensorMDX(): string | null {
  const candidates = [
    path.join(process.cwd(), "src", "app", "projects", "door-sensor", "door-sensor.mdx"),
    path.join(process.cwd(), "app", "projects", "door-sensor", "door-sensor.mdx"),
  ];
  for (const f of candidates) {
    if (fs.existsSync(f)) return sanitizeForMDX(fs.readFileSync(f, "utf8"));
  }
  return null;
}

export default function DoorSensorProjectPage() {
  const mdx = readDoorSensorMDX();

  return (
    <main
      className="max-w-4xl mx-auto px-4 py-10 bg-white text-slate-900 min-h-screen"
      style={
        {
          "--background": "white",
          "--foreground": "#0f172a",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Door Sensor w/ Reed Switch &amp; Piezo
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
            (Couldn’t load <code>door-sensor.mdx</code> at build time.)
          </p>
        )}
      </div>

      <div className="mt-8">
        <a
          href="/projects/door-sensor/Door_Sensor_Final_Report.pdf"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm"
        >
          Download PDF
        </a>
      </div>
    </main>
  );
}
