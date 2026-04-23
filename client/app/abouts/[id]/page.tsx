// app/about/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchAbout, API_BASE_URL } from "@/lib/api";
import type { About } from "@/lib/types";
import Image from "next/image";

export default async function AboutDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const about: About = await fetchAbout(id);

    const fullImage = about.image ? `${API_BASE_URL}/${about.image}` : "/window.svg";
    const publishDate = about.createdAt ? new Date(about.createdAt).toLocaleDateString() : "";

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-10 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-3xl animate-fade-in">
                    {fullImage && (
                        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                            <Image
                                src={fullImage}
                                alt={about.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-heading font-semibold sm:text-3xl">{about.title}</h1>
                    <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Published on {publishDate}
                    </div>
                    {/* Article Content */}
                    <article className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
                        {about.description && <p className="italic">{about.description}</p>}

                        {about.mission && (
                            <section className="mt-6">
                                <h2 className="text-2xl font-semibold border-b pb-1 mb-2 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
                                    Our Mission
                                </h2>

                                <p>{about.mission}</p>
                            </section>
                        )}

                        {about.vision && (
                            <section className="mt-6">
                                <h2 className="text-2xl font-semibold border-b pb-1 mb-2 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
                                    Our Vision
                                </h2>

                                <p>{about.vision}</p>
                            </section>
                        )}

                        {about.values && (
                            <section className="mt-6">
                                <h2 className="text-2xl font-semibold border-b pb-1 mb-2 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
                                    Our Values
                                </h2>
                                <p>{about.values}</p>
                            </section>
                        )}
                    </article>
                </div>
            </Container>
        </main>
    );
}
