// app/galleries/[id]/page.tsx
import Container from "@/components/ui/Container";
import Image from "next/image";
import { fetchGallery, API_BASE_URL } from "@/lib/api";
import type { Gallery } from "@/lib/types";
import BounceCards from "@/components/ui/BounceCards";

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gallery: Gallery = await fetchGallery(id);
    const heroImages = gallery.images.slice(0, 5).map(img => `${API_BASE_URL}/${img}`);

    return (
        <main className="text-foreground transition-colors backdrop-blur ">
            <Container className="py-10 sm:py-14 lg:py-16">
                <h1 className="text-3xl font-bold mb-10 text-center">{gallery.title}</h1>

                {heroImages.length >= 3 && (
                    <div className="flex flex-col items-center justify-center mb-16 overflow-hidden hidden sm:flex">
                        <BounceCards
                            className="scale-75 sm:scale-100"
                            images={heroImages}
                            containerWidth={600}
                            containerHeight={350}
                            animationDelay={0.5}
                            animationStagger={0.08}
                            enableHover={true}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.images.map((img, idx) => (
                        <div key={idx} className="relative w-full h-64 rounded-xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg group">
                            <Image
                                src={`${API_BASE_URL}/${img}`}
                                alt={`${gallery.title} image ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}
