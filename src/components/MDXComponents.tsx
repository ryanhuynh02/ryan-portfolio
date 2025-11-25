// src/components/MDXComponents.tsx
import React from "react";
import Image from "next/image";
import type { ComponentProps, ImgHTMLAttributes } from "react";

/**
 * MDX <img> → Next/Image wrapped in <figure> with spacing + optional caption.
 * Caption comes from the Markdown image "title":
 *    ![alt text](/path/file.jpg "Your caption here")
 */
type MDXImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  // allow passing through a few safe extras if you ever add them in MDX
  decoding?: "sync" | "async" | "auto";
  loading?: "eager" | "lazy";
};

function MDXImage(props: MDXImgProps) {
  const { src = "", alt = "", title, width, height, className, decoding, loading } = props;

  // Respect explicit width/height in MDX when provided; otherwise, use sensible defaults.
  const w = typeof width === "number" ? width : Number(width) || 1200;
  const h = typeof height === "number" ? height : Number(height) || 800;

  // Type-safe: only pass props that Next/Image actually supports
  type NextImageExtras = Omit<
    ComponentProps<typeof Image>,
    "src" | "alt" | "width" | "height" | "fill"
  >;

  const extra: Partial<NextImageExtras> = {
    decoding,
    loading,
    sizes: "(min-width: 768px) 768px, 100vw",
  };

  return (
    <figure className="my-6">
      <Image
        src={String(src)}
        alt={alt}
        width={w}
        height={h}
        className={`rounded-lg w-full h-auto ${className ?? ""}`}
        {...extra}
      />
      {title ? (
        <figcaption className="mt-2 text-sm text-slate-600 text-center">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const MDXComponents = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-8 text-3xl font-extrabold tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 text-2xl font-bold" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-[#4f81bd] mt-6 mb-4 font-semibold" {...props} />
  ),

  // Code blocks
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl overflow-x-auto" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-slate-100 text-slate-900 rounded px-1 py-0.5" {...props} />
  ),

  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline hover:no-underline" {...props} />
  ),

  // Images (with captions + spacing)
  img: MDXImage,
};
