// app/galleries/page.tsx
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { fetchGalleries, API_BASE_URL } from "@/lib/api";
import type { Gallery } from "@/lib/types";

export default async function GalleriesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const page = Number(sp?.page ?? "1");
    const resp = await fetchGalleries({ page });
    const galleries: Gallery[] = resp.data ?? [];

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <h1 className="text-2xl font-bold mb-8">Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleries.map((gallery) => (
                        <Link
                            href={`/galleries/${gallery.id}`}
                            key={gallery.id}
                            className="rounded-2xl p-4 shadow-sm ring-1 ring-zinc-200 transition hover:shadow-md"
                        >
                            {gallery.images[0] && (
                                <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden">
                                    <Image
                                        src={`${API_BASE_URL}/${gallery.images[0]}`}
                                        alt={gallery.title}
                                        fill
                                        className="object-cover"
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
            </Container>
        </main>
    );
}
