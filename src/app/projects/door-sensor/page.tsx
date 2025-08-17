import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";
import { MDXComponents } from "@/components/MDXComponents";

const components = MDXComponents as Record<string, ComponentType>;

export const metadata = {
  title: "Door Sensor w/ Reed Switch & Piezo — Project",
  description: "Full write-up with images, BOM, analysis, and appendix.",
};

export default function DoorSensorProjectPage() {
  // Read MDX that lives next to this page: src/app/projects/door-sensor/door-sensor.mdx
  const file = path.join(
    process.cwd(),
    "src",
    "app",
    "projects",
    "door-sensor",
    "door-sensor.mdx"
  );

  let mdx = "# Coming soon";
  try {
    if (fs.existsSync(file)) {
      mdx = fs.readFileSync(file, "utf8");
    }
  } catch {}

  return (
    <main
      className="max-w-4xl mx-auto px-4 py-10 bg-white text-slate-900 min-h-screen"
      style={
        {
          // Ensure any var-based colors resolve to light-on-white
          "--background": "white",
          "--foreground": "#0f172a",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Door Sensor w/ Reed Switch &amp; Piezo
        </h1>
        <Link
          href="/#projects"
          className="text-sm underline text-slate-600 hover:text-slate-900"
        >
          ← Back to Projects
        </Link>
      </div>
  
      <div className="mt-6 prose prose-slate max-w-none prose-img:rounded-xl">
        <MDXRemote
          source={mdx}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={components}
        />
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
