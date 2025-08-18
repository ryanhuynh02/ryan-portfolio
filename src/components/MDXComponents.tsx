// src/components/MDXComponents.tsx
import React from "react";
import type { ComponentProps } from "react";
export const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-8 text-3xl font-extrabold tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 text-2xl font-bold" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl overflow-x-auto" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-slate-100 text-slate-900 rounded px-1 py-0.5" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline hover:no-underline" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="text-[#4f81bd] mt-6 mb-4 font-semibold"
      {...props}
    />
  ),
};