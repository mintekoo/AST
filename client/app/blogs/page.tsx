// app/blogs/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/filters/CategoryFilter";
import { fetchBlogs, fetchCategories, API_BASE_URL } from "@/lib/api";
import type { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import Hero from "@/components/hero/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | Tech news from Ethiopia",
  description: "Read the latest news, updates, and technological insights from Abyssinia Software Technology.",
};

/* ✅ TYPES */
type SearchParams = {
  page?: string | string[];
  categoryId?: string | string[];
};

/* ✅ helper */
function toNumber(value?: string | string[], fallback = 1) {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  /* ✅ FIX: must await first */
  const sp = await searchParams;

  const page = toNumber(sp.page);
  const categoryId = sp.categoryId
    ? toNumber(sp.categoryId)
    : undefined;

  /* ✅ FETCH */
  const [catsRes, blogRes] = await Promise.all([
    fetchCategories({ typeIs: "blog", perPage: 1000, }),
    fetchBlogs({ page, categoryId }),
  ]);

  const categories = catsRes.data ?? [];
  const data = blogRes.data ?? [];
  const meta = blogRes.meta;

  return (
    <main className="backdrop-blur text-foreground  overflow-hidden">
      <div className="mt-20">
        <Hero variant="blog" />
      </div>
      <Container className="py-12 sm:py-16 lg:py-20">


        <SectionHeader
          title="Latest Articles"
          subtitle="News, tips, and stories from the road."
        />

        {/* FILTER UI */}
        <div className="backdrop-blur-xl mb-10 rounded-3xl border border-white/20 dark:border-white/10 p-4 sm:p-6 bg-white/40 dark:bg-black/30 shadow-lg">
          <h2 className="text-sm font-semibold mb-1">
            Filter by Category
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Explore blogs by category
          </p>

          <CategoryFilter categories={categories} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.length ? (
            data.map((b: Blog) => {
              const fullMedia = b.image
                ? `${API_BASE_URL}/${b.image}`
                : "/window.svg";

              const isVideo = fullMedia.match(/\.(mp4|webm|mkv|ogg)$/i);

              return (
                <Link
                  href={`/blogs/${b.id}`}
                  key={b.id}
                  className="group flex flex-col justify-between rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* MEDIA */}
                  <div className="relative aspect-video overflow-hidden">
                    {isVideo ? (
                      <video
                        src={fullMedia}
                        controls
                        className="w-full h-full object-cover bg-black"
                      />
                    ) : (
                      <Image
                        src={fullMedia}
                        alt={b.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <time className="text-xs text-muted-foreground">
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString()
                        : ""}
                    </time>

                    <h3 className="text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                      {b.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {b.description}
                    </p>
                  </div>

                  <div className="p-5 pt-0 mt-auto">
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground group-hover:bg-primary/90 h-9 px-3 w-full">
                      View Details
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No blogs found.
            </p>
          )}
        </div>

        <Pagination meta={meta} basePath="/blogs" />
      </Container>
    </main>
  );
}