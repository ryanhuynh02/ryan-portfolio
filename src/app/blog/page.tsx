import Link from "next/link";
import { listPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Ryan Huynh",
  description: "Daily/weekly diary posts.",
};

export default function BlogIndexPage() {
  const posts = listPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Blog</h1>
      <p className="text-slate-600 mt-2">My daily/weekly diary and notes.</p>

      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">
                <Link
                    href={`/blog/${p.slug}`}
                    className="group no-underline"
                >
                    <span
                    className="
                        group-hover:text-[#007AFF]
                        bg-[linear-gradient(#007AFF,#007AFF)]
                        bg-no-repeat
                        [background-position:0_100%]            /* bottom */
                        [background-size:0%_2px]                /* thin line */
                        group-hover:[background-size:100%_2px]  /* animate on hover */
                        transition-[background-size] duration-300
                    "
                    >
                    {p.title}
                    </span>
                </Link>
            </h2>
              <time className="text-xs text-slate-500">
                {new Date(p.date).toLocaleDateString()}
              </time>
            </div>
            {p.summary && <p className="text-slate-700 mt-2">{p.summary}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
