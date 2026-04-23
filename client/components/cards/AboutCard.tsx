// components/cards/AboutCard.tsx
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export type AboutCardType = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    createdAt?: string;
};

export default function AboutCard({ about }: { about: AboutCardType }) {
    return (
        <Link
            href={`/abouts/${about.id}`}
            className="group block rounded-2xl bg-background shadow-sm ring-1 ring-muted transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-muted/10">
                {about.imageUrl ? (
                    <Image
                        src={about.imageUrl}
                        alt={about.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted">
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="space-y-3 p-4">
                {about.createdAt && (
                    <time className="text-xs text-muted">{about.createdAt}</time>
                )}
                <h3 className="text-base font-semibold leading-6 text-foreground">{about.title}</h3>
                <p className="text-sm text-muted line-clamp-3">{about.description}</p>
                {/* <button className="mt-2 w-full rounded-md bg-primary text-background py-2 text-sm font-medium hover:brightness-90 transition">
                    View Details
                </button> */}
                <Button size="sm" variant="primary" >
                    View Details
                </Button>
            </div>
        </Link>
    );
}
