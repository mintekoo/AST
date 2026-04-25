import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchTerms, API_BASE_URL } from "@/lib/api";
import type { Term } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function TermsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = Number(Array.isArray(sp?.page) ? sp.page[0] : sp?.page || 1);

    const resp = await fetchTerms({ page });
    const data = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Terms & Conditions"
                    subtitle="Legal information and usage policies."
                />

                <div className="space-y-6">
                    {data.map((t: Term) => {
                        const fullImage = t.image
                            ? `${API_BASE_URL}/${t.image}`
                            : "/window.svg";

                        return (
                            <Link
                                key={t.id}
                                href={`/terms/${t.id}`}
                                className="flex gap-4 p-4 rounded-2xl bg-card-background dark:bg-card-background-dark ring-1 ring-border hover:shadow-md transition"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                    <Image
                                        src={fullImage}
                                        alt={t.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-1">
                                    <h3 className="font-semibold">{t.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {t.content}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
            <Pagination meta={meta} basePath="/terms" />
        </main>
    );
}