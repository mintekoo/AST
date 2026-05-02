import Hero from "@/components/hero/Hero";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchCertifications, API_BASE_URL } from "@/lib/api";
import type { Certification } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

function getPageParam(
    sp: { [key: string]: string | string[] | undefined },
    key: string
) {
    const raw = sp?.[key];
    const str = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(str || "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function CertificationsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = getPageParam(sp, "page");

    const resp = await fetchCertifications({ page });
    const data = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="backdrop-blur-sm text-foreground ">
            <div className="mt-20">
                <Hero variant="certifications" />
            </div>
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Certifications"
                    subtitle="Our professional certifications and achievements."
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((c: Certification) => {
                        const fullImage = c.image
                            ? `${API_BASE_URL}/${c.image}`
                            : "/window.svg";

                        return (
                            <div
                                key={c.id}
                                className="flex flex-col justify-between rounded-2xl shadow-sm ring-1 ring-border bg-card-background dark:bg-card-background-dark transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <Link
                                    key={c.id}
                                    href={`/certifications/${c.id}`}
                                    className="flex flex-col justify-between rounded-2xl shadow-sm ring-1 ring-border bg-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={fullImage}
                                            alt={c.title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                            unoptimized
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2 p-4">
                                        <h3 className="text-base font-semibold line-clamp-2">
                                            {c.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Issued by:</span>{" "}
                                            {c.issuingOrganization}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Date:</span>{" "}
                                            {new Date(c.issueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="p-4 pt-0">
                                        <Button size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <Pagination meta={meta} basePath="/certifications" />
            </Container>
        </main>
    );
}