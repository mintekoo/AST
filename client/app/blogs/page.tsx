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
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
        <Hero variant="blog" />
      <Container className="py-12 sm:py-16 lg:py-20">


        <SectionHeader
          title="Latest Articles"
          subtitle="News, tips, and stories from the road."
        />

        {/* FILTER UI */}
        <div className="mb-10 rounded-2xl border border-border p-4 sm:p-6 bg-card-background dark:bg-card-background-dark">
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
                  className="flex flex-col justify-between rounded-2xl bg-card-background dark:bg-card-background-dark shadow-sm ring-1 ring-border hover:-translate-y-0.5 hover:shadow-md transition"
                >
                  {/* MEDIA */}
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
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
                        className="object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-2">
                    <time className="text-xs text-muted-foreground">
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString()
                        : ""}
                    </time>

                    <h3 className="text-base font-semibold">
                      {b.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {b.description}
                    </p>
                  </div>

                  <div className="p-4 pt-0">
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
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