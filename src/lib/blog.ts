import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogMeta = {
  title: string;
  date: string;              // ISO date, e.g. "2025-09-10"
  summary?: string;
  tags?: string[];
  cover?: string;
  slug: string;              // filename after the YYYY-MM-DD- prefix
};

export type BlogPost = BlogMeta & {
  content: string;           // MDX body with front-matter removed
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function isMDX(filename: string) {
  return filename.toLowerCase().endsWith(".mdx");
}

function fileToSlug(filename: string) {
  // "2025-09-10-my-post.mdx" -> "my-post"
  return filename.replace(/\.mdx$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function readMDX(filename: string) {
  const fullPath = path.join(BLOG_DIR, filename);
  return fs.readFileSync(fullPath, "utf8");
}

/** List posts (newest first) with metadata only */
export function listPosts(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(isMDX);

  const posts = files.map((file) => {
    const raw = readMDX(file);
    const { data } = matter(raw);
    const slug = fileToSlug(file);

    return {
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      summary: data.summary ?? "",
      tags: data.tags ?? [],
      cover: data.cover,
      slug,
    } as BlogMeta;
  });

  // Sort by date desc (fallback keeps stable order)
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

/** Get the full post (content + meta) by slug */
export function getPost(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const match = fs
    .readdirSync(BLOG_DIR)
    .filter(isMDX)
    .find((f) => fileToSlug(f) === slug);

  if (!match) return null;

  const raw = readMDX(match);
  const parsed = matter(raw);

  return {
    title: parsed.data.title ?? slug,
    date: parsed.data.date ?? "1970-01-01",
    summary: parsed.data.summary ?? "",
    tags: parsed.data.tags ?? [],
    cover: parsed.data.cover,
    slug,
    content: parsed.content, // <-- front-matter stripped here
  };
}
