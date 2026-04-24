import Container from "@/components/ui/Container";
import { fetchProject, API_BASE_URL } from "@/lib/api";
import Image from "next/image";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const resp = await fetchProject(id);
  const project = resp.data;

  const fullImage = project.image
    ? `${API_BASE_URL}/${project.image}`
    : "/window.svg";

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl animate-fade-in">

          {/* Image */}
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-border">
            <Image
              src={fullImage}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {project.title}
          </h1>

          {/* Content */}
          <article className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
            {project.content}
          </article>

        </div>
      </Container>
    </main>
  );
}