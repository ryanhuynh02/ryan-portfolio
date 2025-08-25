// src/app/api/blog/route.ts
import { NextResponse } from "next/server";
import { listPosts } from "@/lib/blog";

export async function GET() {
  // send only the fields we need for the home preview
  const posts = listPosts()
    .slice(0, 3)
    .map(({ title, date, summary, slug, tags }) => ({
      title,
      date,
      summary,
      slug,
      tags: tags ?? [],
    }));

  return NextResponse.json(posts);
}
