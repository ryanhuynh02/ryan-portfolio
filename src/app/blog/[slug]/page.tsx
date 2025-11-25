import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";

import { MDXComponents } from "@/components/MDXComponents";
import { listPosts, getPost } from "@/lib/blog";

// Pre-generate one page per post
export async function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

// In Next 15, params is a Promise in generateMetadata
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

// In Next 15, params is also a Promise for the page
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

      {/* Title + date on top */}
      <header className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight">{post.title}</h1>
        <time className="mt-1 block text-sm text-slate-500">
          {formatLocalDate(post.date)}
        </time>

        {/* Optional cover image */}
        {post.cover ? (
          <img
            src={post.cover}
            alt=""
            className="mt-6 w-full rounded-xl border border-slate-200"
          />
        ) : null}
      </header>

      {/* MDX body (front-matter removed) */}
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
