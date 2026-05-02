// app/galleries/page.tsx
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { fetchGalleries, API_BASE_URL } from "@/lib/api";
import type { Gallery } from "@/lib/types";
import Pagination from "@/components/ui/Pagination";
import BounceCards from "@/components/ui/BounceCards";

export default async function GalleriesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const page = Number(sp?.page ?? "1");
    const resp = await fetchGalleries({ page });
    const galleries: Gallery[] = resp.data ?? [];
    const meta = resp?.meta;

    const allImages = galleries.flatMap(g => g.images || []).map(img => `${API_BASE_URL}/${img}`);
    const heroImages = allImages.slice(0, 5);

    return (
        <main className="text-foreground transition-colors">
            <Container className="py-12 sm:py-16 lg:py-20">
                {heroImages.length > 0 && (
                    <div className="flex flex-col items-center justify-center mb-16 overflow-hidden hidden sm:flex">
                        <BounceCards
                            className="custom-bounceCards scale-75 sm:scale-100"
                            images={heroImages}
                            containerWidth={600}
                            containerHeight={350}
                            animationDelay={0.5}
                            animationStagger={0.08}
                            enableHover={true}
                        />
                    </div>
                )}
                
                <h1 className="text-3xl font-extrabold mb-10 text-center">Our Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleries.map((gallery) => (
                        <Link
                            href={`/galleries/${gallery.id}`}
                            key={gallery.id}
                            className="group flex flex-col rounded-2xl p-4 backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {gallery.images[0] && (
                                <div className="relative h-56 w-full mb-4 rounded-xl overflow-hidden">
                                    <Image
                                        src={`${API_BASE_URL}/${gallery.images[0]}`}
                                        alt={gallery.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        unoptimized
                                    />
                                </div>
                            )}
                            <div className="text-lg font-medium">{gallery.title}</div>
                            {gallery.images.length > 1 && (
                                <div className="text-xs text-zinc-500 mt-1">{gallery.images.length} images</div>
                            )}
                        </Link>
                    ))}
                </div>
                <Pagination meta={meta} basePath="/galleries" />
            </Container>
        </main>
    );
}
