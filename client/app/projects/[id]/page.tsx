// app/projects/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchProject, API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import Script from "next/script";
import { buildSEO, buildProjectSchema } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const { data: project } = await fetchProject(id);

  const image = project.image
    ? `${API_BASE_URL}/${project.image}`
    : undefined;

  return buildSEO({
    title: project.title,
    content: project.content,
    image,
    path: `/projects/${id}`,
    keywords: [
      project.title,
      "software project Ethiopia",
      "web development Ethiopia",
    ],
  });
}

/* =========================
   PAGE
========================= */
export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const res = await fetchProject(id);

    if (!res?.data) {
      return notFound();
    }

    const project = res.data;

    const fullImage = project.image
      ? `${API_BASE_URL}/${project.image}`
      : "/window.svg";

    const schema = buildProjectSchema({
      title: project.title,
      content: project.content,
      image: fullImage,
    });

    return (
      <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">

        <Script
          id="project-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-3xl animate-fade-in">

            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-border">
              <Image
                src={fullImage}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <h1 className="text-2xl font-semibold sm:text-3xl">
              {project.title}
            </h1>

            <article className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
              <p>{project.content}</p>
            </article>

          </div>
        </Container>
      </main>
    );
  } catch (err) {
    console.error("Project fetch error:", err);
    return notFound();
  }
}