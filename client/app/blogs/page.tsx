// app/blogs/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchBlogs } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";


function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp?.[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function BlogsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const page = getPageParam(sp, "page");
  const resp = await fetchBlogs({ page });
  const data = resp?.blogs ?? [];

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader title="Latest Articles" subtitle="News, tips, and stories from the road." />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.length > 0 ? (
            data.map((b: Blog) => {
              const fullMedia = b?.image ? `${API_BASE_URL}/${b.image}` : "/window.svg";
              const isVideo = fullMedia?.match(/\.(mp4|webm|mkv|ogg)$/i);

              return (
                <Link
                  href={`/blogs/${b.id}`}
                  key={b.id}
                  className="flex flex-col justify-between group rounded-2xl bg-card-background dark:bg-card-background-dark shadow-sm ring-1 ring-border transition-transform duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md animate-fade-in"
                >
                  {/* Media */}
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
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 space-y-2">
                    <time className="text-xs text-muted">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ""}
                    </time>
                    <h3 className="text-base font-semibold leading-6 text-foreground dark:text-foreground-dark">
                      {b.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-muted-foreground dark:text-muted-foreground-dark">
                      {b.content}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="p-4 pt-0">
                    <Button variant="primary" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>

      </Container>
    </main>
  );
}
