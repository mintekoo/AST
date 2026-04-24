import Container from "@/components/ui/Container";
import { fetchFAQ } from "@/lib/api";

export default async function FAQDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const resp = await fetchFAQ(id);
    const faq = resp.data;

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-10 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-2xl">

                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        {faq.question}
                    </h1>

                    <div className="mt-6 text-muted-foreground">
                        {faq.answer}
                    </div>

                </div>
            </Container>
        </main>
    );
}