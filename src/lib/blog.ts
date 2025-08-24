// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Frontmatter = {
  title?: string;
  date?: string;     // ISO date
  summary?: string;
  tags?: string[];
};

export type BlogMeta = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  slug: string;      // derived from filename after date prefix
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

// List posts (newest first)
export function listPosts(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.toLowerCase().endsWith(".mdx"));

  const posts: BlogMeta[] = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");

    // Version-agnostic: parse and cast frontmatter only
    const fm = matter(raw).data as Frontmatter;

    // filename: YYYY-MM-DD-your-slug.mdx -> "your-slug"
    const base = file.replace(/\.mdx$/i, "");
    const slug = base.replace(/^\d{4}-\d{2}-\d{2}-/, "");

    return {
      title: fm.title ?? slug,
      date: fm.date ?? "1970-01-01",
      summary: fm.summary ?? "",
      tags: fm.tags ?? [],
      slug,
    };
  });

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

// Read full MDX source for a given slug
export function getPostSource(slug: string): string | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.toLowerCase().endsWith(".mdx"));

  const match = files.find(
    (f) =>
      f
        .replace(/\.mdx$/i, "")
        .replace(/^\d{4}-\d{2}-\d{2}-/, "") === slug
  );

  if (!match) return null;
  return fs.readFileSync(path.join(BLOG_DIR, match), "utf8");
}
