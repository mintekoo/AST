// app/partners/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchPartners, API_BASE_URL } from "@/lib/api";
import type { Partner } from "@/lib/types";
import Image from "next/image";
import Clients from "@/app/staticsPages/Clients";
import Pagination from "@/components/ui/Pagination";

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
    const raw = sp?.[key];
    const str = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(str || "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function PartnersPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = getPageParam(sp, "page");

    // Fetch partners data
    const resp = await fetchPartners({ page });
    const data: Partner[] = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Our Partners"
                    subtitle="Meet our trusted partners and collaborators."
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((p: Partner) => {
                        const fullImage = p.image ? `${API_BASE_URL}/${p.image}` : "/window.svg";

                        return (
                            <div
                                key={p.id}
                                className="group rounded-2xl shadow-sm ring-1 ring-zinc-200 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md "
                            ><div className="relative aspect-video overflow-hidden rounded-t-2xl ">
                                    <Image
                                        src={fullImage}
                                        alt={p.name}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{p.name}</h3>
                                </div>
                            </div>
                        );
                    })}

                </div>
                <Pagination meta={meta} basePath="/partners" />
                {/* ADD THIS Clients */}
                <div className="mt-20">
                    <Clients />
                </div>
            </Container>
        </main>
    );
}
