// app/services/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchServices, API_BASE_URL } from "@/lib/api";
import type { Service } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import Hero from "@/components/hero/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Software & App Development Ethiopia",
  description: "We offer comprehensive IT solutions including ERP systems, school management, custom web development, and mobile apps.",
};

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
    const raw = sp?.[key];
    const str = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(str || "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function ServicesPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = getPageParam(sp, "page");
    const resp = await fetchServices({ page });
    const data = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="bg-background text-foreground min-h-screen">
            <Hero variant="service" />
            
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Our Services"
                    subtitle="Discover the range of professional software and technology solutions we provide."
                />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((s: Service) => {
                        const fullImage = s.image ? `${API_BASE_URL}/${s.image}` : "/window.svg";

                        return (
                            <Link
                                href={`/services/${s.id}`}
                                key={s.id}
                                className="group flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={fullImage}
                                        alt={s.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        unoptimized
                                    />
                                    {/* Subtle overlay for image depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-6 space-y-3">
                                    <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                                        {s.title}
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground leading-relaxed flex-1">
                                        {s.content}
                                    </p>
                                    
                                    <div className="mt-auto pt-6">
                                        <div className="flex items-center text-primary text-sm font-bold">
                                            View Details
                                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="mt-12">
                    <Pagination meta={meta} basePath="/services" />
                </div>
            </Container>
        </main>
    );
}