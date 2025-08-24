import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentType } from "react";

import { MDXComponents } from "@/components/MDXComponents";
import { listPosts, getPostSource } from "@/lib/blog";

export async function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = listPosts().find((p) => p.slug === params.slug);
  return {
    title: post ? `${post.title} — Blog` : "Blog post",
    description: post?.summary ?? "Diary entry",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const source = getPostSource(params.slug);
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
