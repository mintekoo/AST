// app/blogs/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchBlog } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Blog } from "@/lib/types";
import Image from "next/image";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog: Blog = await fetchBlog(id);

  const fullMedia = blog.image ? `${API_BASE_URL}/${blog.image}` : null;
  const isVideo = fullMedia?.match(/\.(mp4|webm|mkv|ogg)$/i);

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl animate-fade-in">
          {fullMedia && (
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
              {isVideo ? (
                <video
                  src={fullMedia}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={fullMedia}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          )}

          <h1 className="text-2xl font-heading font-semibold sm:text-3xl">{blog.title}</h1>

          <article className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
            {blog.content}
          </article>
        </div>
      </Container>
    </main>
  );
}
