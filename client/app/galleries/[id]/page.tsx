// app/galleries/[id]/page.tsx
import Container from "@/components/ui/Container";
import Image from "next/image";
import { fetchGallery, API_BASE_URL } from "@/lib/api";
import type { Gallery } from "@/lib/types";

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gallery: Gallery = await fetchGallery(id);

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-10 sm:py-14 lg:py-16">
                <h1 className="text-2xl font-bold mb-6">{gallery.title}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.images.map((img, idx) => (
                        <div key={idx} className="relative w-full h-64 rounded-lg overflow-hidden">
                            <Image
                                src={`${API_BASE_URL}/${img}`}
                                alt={`${gallery.title} image ${idx + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}
