// app/about/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchAbouts, fetchPartners, API_BASE_URL } from "@/lib/api";
import type { About } from "@/lib/types";
import Image from "next/image";
import Excellence from "@/app/staticsPages/Excellence";
import PartnersSection from "@/components/sections/PartnersSection";

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
    const raw = sp?.[key];
    const str = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(str || "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function AboutPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = getPageParam(sp, "page");
    const resp = await fetchAbouts({ page });
    const data = resp?.abouts ?? [];

    const respartners = await fetchPartners();
    const partners = respartners?.data ?? [];

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="About Us"
                    subtitle="Learn more about our company, vision, and values."
                />

                <div className="space-y-16">
                    {data.map((a: About) => {
                        const fullImage = a.image ? `${API_BASE_URL}/${a.image}` : "/window.svg";

                        return (
                            <section key={a.id} className="flex flex-col lg:flex-row lg:items-center gap-8">
                                {/* Image */}
                                <div className="relative w-full lg:w-1/2 h-64 lg:h-96 flex-shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        src={fullImage}
                                        alt={a.title}
                                        width={1200}
                                        height={675}
                                        className="object-cover w-full h-full"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <div className="lg:w-1/2 space-y-4">
                                    {/* <time className="text-sm text-zinc-500 block">
                                        {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}
                                    </time> */}

                                    <h2 className="text-3xl font-bold">{a.title}</h2>

                                    {a.description && <p className="text-lg ">{a.description}</p>}
                                    {a.mission && <p className="text-lg "><strong>Mission:</strong> {a.mission}</p>}
                                    {a.vision && <p className="text-lg "><strong>Vision:</strong> {a.vision}</p>}
                                    {a.values && <p className="text-lg "><strong>Values:</strong> {a.values}</p>}

                                    {/* Optional CTA */}
                                    {/* <a
                                        href={`/abouts/${a.id}`}
                                        className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        Learn More &rarr;
                                    </a> */}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Excellence Section */}
                <div className="mt-20">
                    <Excellence />
                </div>
                {/* Partners Section */}
                <div className="mt-20">
                    <PartnersSection partners={partners} />
                </div>
            </Container>
        </main>
    );
}
