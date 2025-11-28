// src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { listPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Ryan Huynh",
  description: "Daily/weekly diary posts.",
};

// local date formatter so YYYY-MM-DD doesn't shift a day
function formatLocalDate(iso: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = listPosts(); // newest → oldest

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
      {/* Page title under your global SiteHeader */}
      <h1 className="text-3xl md:text-4xl font-bold text-center">Blog</h1>

      {/* List */}
      <main className="mt-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="font-medium">No posts yet</div>
            <p className="text-slate-600 mt-1">I’ll start posting soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-sm transition no-underline"
              >
                <div className="flex items-start gap-4">
                  {/* text (left) */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold leading-snug">
                      <span
                        className="
                          group-hover:text-[#007AFF]
                          bg-[linear-gradient(#007AFF,#007AFF)]
                          bg-no-repeat
                          [background-position:0_100%]
                          [background-size:0%_2px]
                          group-hover:[background-size:100%_2px]
                          transition-[background-size] duration-300
                        "
                      >
                        {p.title}
                      </span>
                    </h2>
                    <time className="block text-xs text-slate-500 mt-1">
                      {formatLocalDate(p.date)}
                    </time>
                    {p.summary && (
                      <p className="text-slate-700 mt-2 line-clamp-2">
                        {p.summary}
                      </p>
                    )}
                    {p.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* thumbnail (right) */}
                  {p.cover ? (
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200 ml-2">
                      <Image
                        src={p.cover}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="112px"
                        priority={false}
                      />
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
