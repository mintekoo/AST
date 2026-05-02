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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | Top Software Solutions in Ethiopia",
  description: "Explore our portfolio of successful software, web, and mobile app projects delivered by Abyssinia Software Technology.",
};

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
        <main className="backdrop-blur text-foreground ">
            <Container className="py-12 sm:py-16 lg:py-20">
                <Hero
                    variant="project"
                />
                <SectionHeader
                    title="Our Projects"
                    subtitle="Showcasing our completed and ongoing work."
                />


                {/* FILTER UI */}
                <div className="backdrop-blur-xl mb-10 rounded-3xl border border-white/20 dark:border-white/10 p-4 sm:p-6 bg-white/40 dark:bg-black/30 shadow-lg">
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
                                className="group flex flex-col justify-between rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={fullImage}
                                        alt={p.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-3 flex-1 flex flex-col">
                                    <h3 className="text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                                    <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
                                        {p.content}
                                    </p>
                                </div>

                                {/* Button */}
                                <div className="p-5 pt-0 mt-auto">
                                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground group-hover:bg-primary/90 h-9 px-3 w-full">
                                        View Details
                                    </div>
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