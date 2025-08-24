import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";

import { MDXComponents } from "@/components/MDXComponents";
import { listPosts, getPostSource } from "@/lib/blog";

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

// In Next 15, params is also a Promise for the page
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const source = getPostSource(slug);
  if (!source) return notFound();

  const components = MDXComponents as unknown as Record<string, ComponentType>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-sm underline text-slate-600 hover:text-slate-900">
        ← Back to Blog
      </Link>
      <article className="mt-6 prose prose-slate">
        <MDXRemote
          source={source}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={components}
        />
      </article>
    </main>
  );
}
