import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";
import { MDXComponents } from "@/components/MDXComponents";

const components = MDXComponents as Record<string, ComponentType>;

function readDoorSensorMDX() {
  const candidates = [
    path.join(process.cwd(), "src", "app", "projects", "door-sensor", "door-sensor.mdx"),
    path.join(process.cwd(), "app", "projects", "door-sensor", "door-sensor.mdx"),
  ];
  for (const f of candidates) {
    if (fs.existsSync(f)) {
      const raw = fs.readFileSync(f, "utf8");
      // Remove HTML comments and <!DOCTYPE ...> or any <! ... >
      return raw
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<!DOCTYPE[^>]*>/gi, "")
        .replace(/<![^>]*>/g, "");
    }
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
    </main>
  );
}
