import Container from "@/components/ui/Container";
import { fetchService, API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import Script from "next/script";
import { buildSEO, buildServiceSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ id: string }>;
};

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const { data: service } = await fetchService(id);

  return buildSEO({
    title: service.title,
    content: service.content,
    image: service.image
      ? `${API_BASE_URL}/${service.image}`
      : undefined,
    path: `/services/${id}`,
  });
}

/* =========================
   PAGE
========================= */
export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;

  const { data: service } = await fetchService(id);

  const fullImage = service.image
    ? `${API_BASE_URL}/${service.image}`
    : "/window.svg";

  const publishDate = service.createdAt
    ? new Date(service.createdAt).toLocaleDateString()
    : "";

  const schema = buildServiceSchema({
    title: service.title,
    content: service.content,
    image: fullImage,
  });

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">

      {/* JSON-LD Structured Data */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl">

          {/* Image */}
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={fullImage}
              alt={service.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {service.title}
          </h1>

          {/* Date */}
          <div className="mt-2 text-sm text-gray-500">
            Published on {publishDate}
          </div>

          {/* Content */}
          <article className="prose mt-6 max-w-none">
            <p>{service.content}</p>
          </article>

        </div>
      </Container>
    </main>
  );
}