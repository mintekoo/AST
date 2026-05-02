import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function ServiceCard({ service }: { service: Service }) {
    const imageUrl = service.image
        ? `${API_BASE_URL}/${service.image}`
        : null;

    return (
        <Link
            href={`/services/${service.id}`}
            className="group flex flex-col h-[300px] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-muted/50">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 justify-between space-y-3">
                <div>
                    <h3 className="text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-sm line-clamp-3 mt-1 text-muted-foreground">
                        {service.content}
                    </p>
                </div>

                <div className="mt-3 flex justify-center">
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground group-hover:bg-primary/90 h-9 px-4">
                        View Details
                    </div>
                </div>
            </div>
        </Link>
    );
}