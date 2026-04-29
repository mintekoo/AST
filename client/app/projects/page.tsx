import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/filters/CategoryFilter";
import { fetchProjects, fetchCategories, API_BASE_URL } from "@/lib/api";
import type { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import Hero from "@/components/hero/Hero";

/* ✅ FIX: proper type instead of any */
type SearchParams = Promise<{
    page?: string | string[];
    categoryId?: string | string[];
}>;

export default async function ProjectsPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    /* ✅ FIX: await params correctly */
    const sp = await searchParams;

    /* ✅ FIX: safe parsing */
    const page = Number(Array.isArray(sp?.page) ? sp.page[0] : sp?.page || 1);

    const categoryIdRaw = Array.isArray(sp?.categoryId)
        ? sp.categoryId[0]
        : sp?.categoryId;

    const categoryId = categoryIdRaw ? Number(categoryIdRaw) : undefined;

    const [catsRes, projRes] = await Promise.all([
        fetchCategories({ typeIs: "project", perPage: 1000, }),
        fetchProjects({ page, categoryId }),
    ]);

    const categories = catsRes.data ?? [];
    const data = projRes.data ?? [];
    const meta = projRes.meta;

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <Hero
                    variant="project"
                />
                <SectionHeader
                    title="Our Projects"
                    subtitle="Showcasing our completed and ongoing work."
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

                <Pagination meta={meta} basePath="/projects" />
            </Container>
        </main>
    );
}