import Container from "@/components/ui/Container";
import { fetchBlog, fetchBlogs, API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import RelatedBlogs from "../RelatedBlogs";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blogResp = await fetchBlog(id);
  const blog = blogResp.data;

  // 🔥 fetch related blogs (simple version)
  const relatedResp = await fetchBlogs({ page: 1, perPage: 6 });
  const relatedBlogs = relatedResp.data ?? [];

  const fullMedia = blog.image
    ? `${API_BASE_URL}/${blog.image}`
    : null;

  const isVideo = fullMedia?.match(/\.(mp4|webm|mkv|ogg)$/i);

  return (
    <main className="bg-background text-foreground">
      <Container className="py-20 mt-4 lg:py-16">

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2">

            {fullMedia && (
              <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl">
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

            <h1 className="text-3xl font-bold">
              {blog.title}
            </h1>

            <article className="prose mt-6 max-w-none">
              {blog.description}
            </article>
          </div>

          {/* ================= RIGHT ================= */}
          <aside className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              Related Blogs
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              Explore more articles and insights.
            </p>

            <RelatedBlogs blogs={relatedBlogs} />
          </aside>

        </div>
      </Container>
    </main>
  );
}