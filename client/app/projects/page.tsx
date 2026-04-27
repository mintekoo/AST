// app/projects/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchProjects, API_BASE_URL } from "@/lib/api";
import type { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
export default async function ProjectsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = Number(Array.isArray(sp?.page) ? sp.page[0] : sp?.page || 1);

    const resp = await fetchProjects({ page });
    const data = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Our Projects"
                    subtitle="Showcasing our completed and ongoing work."
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((p: Project) => {
                        const fullImage = p.image
                            ? `${API_BASE_URL}/${p.image}`
                            : "/window.svg";

                        return (
                            <Link
                                key={p.id}
                                href={`/projects/${p.id}`}
                                className="flex flex-col justify-between rounded-2xl bg-card-background dark:bg-card-background-dark shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md"
                            >
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={fullImage}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-2">
                                    <h3 className="text-base font-semibold">{p.title}</h3>
                                    <p className="line-clamp-3 text-sm text-muted-foreground">
                                        {p.content}
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
                    })}
                </div>


                {/* Pagination */}
                <Pagination meta={meta} basePath="/projects" />
            </Container>
        </main>
    );
}