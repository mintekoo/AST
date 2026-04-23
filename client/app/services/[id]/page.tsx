// app/services/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchService, API_BASE_URL } from "@/lib/api";
import type { Service } from "@/lib/types";
import Image from "next/image";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service: Service = await fetchService(id);

    const fullImage = service.image ? `${API_BASE_URL}/${service.image}` : "/window.svg";
    const publishDate = service.createdAt ? new Date(service.createdAt).toLocaleDateString() : "";

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-10 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-3xl animate-fade-in">
                    {fullImage && (
                        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                            <Image
                                src={fullImage}
                                alt={service.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-heading font-semibold sm:text-3xl">{service.name}</h1>
                    <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Published on {publishDate}
                    </div>

                    <article className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
                        <p>{service.description}</p>
                        {/* <p className="mt-6 text-lg font-semibold text-primary">
                            Price: ETB {service.price.toFixed(0)}
                        </p> */}
                    </article>
                </div>
            </Container>
        </main>
    );
}
