import Hero from "@/components/hero/Hero";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchFAQs } from "@/lib/api";
import type { FAQ } from "@/lib/types";

export default async function FAQPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const sp = await props.searchParams;
    const page = Number(Array.isArray(sp?.page) ? sp.page[0] : sp?.page || 1);
    const resp = await fetchFAQs({ page });
    const data = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <Hero
                    variant="simple"
                />
                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Find answers to common questions."
                />

                <div className="space-y-4">
                    {data.map((f: FAQ) => (
                        <details
                            key={f.id}
                            className="group rounded-xl border border-border bg-card-background dark:bg-card-background-dark p-4"
                        >
                            <summary className="cursor-pointer font-medium text-foreground dark:text-foreground-dark">
                                {f.question}
                            </summary>

                            <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground-dark">
                                {f.answer}
                            </p>
                        </details>
                    ))}
                </div>
                {/* Pagination */}
                <Pagination meta={meta} basePath="/faqs" />
            </Container>
        </main>
    );
}