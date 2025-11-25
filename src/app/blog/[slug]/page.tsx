// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";

import { MDXComponents } from "@/components/MDXComponents";
import { listPosts, getPost } from "@/lib/blog";

// Pre-generate pages for all posts
export async function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

// Metadata (Next 15: params is a Promise)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = listPosts().find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — Blog` : "Blog post",
    description: post?.summary ?? "Diary entry",
  };
}

function formatLocalDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Page (Next 15: params is a Promise)
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPost(slug);
  if (!post) return notFound();

  const components = MDXComponents as unknown as Record<string, ComponentType>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-sm underline text-slate-600 hover:text-slate-900">
        ← Back to Blog
      </Link>

      {/* Title + date */}
      <header className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight">{post.title}</h1>
        <time className="mt-1 block text-sm text-slate-500">
          {formatLocalDate(post.date)}
        </time>

        {/* Optional cover image (optimized) */}
        {post.cover ? (
          <Image
            src={post.cover}                 // e.g. "/blog/east-coast/cover.jpg" in /public
            alt=""                           // add a description if you want it announced
            width={1200}
            height={630}
            className="mt-6 w-full rounded-xl border border-slate-200 h-auto"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
          />
        ) : null}
      </header>

      {/* MDX body (front-matter already stripped in getPost) */}
      <article className="prose prose-slate max-w-none mt-8">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={components}
        />
      </article>
    </main>
  );
}
