import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import type { Service } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function ServiceCard({ service }: { service: Service }) {
    const imageUrl = service.image
        ? `${API_BASE_URL}/${service.image}`
        : null;

    return (
        <Link
            href={`/services/${service.id}`}
            className="group flex flex-col h-[300px] rounded-2xl shadow-sm ring-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            style={{
                backgroundColor: "var(--color-background)",
                borderColor: "var(--color-muted)",
            }}
        >
            {/* Image */}
            <div
                className="relative h-40 overflow-hidden rounded-t-2xl"
                style={{ backgroundColor: "var(--color-muted)" }}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted">
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                    <h3
                        className="text-base font-semibold leading-6"
                        style={{ color: "var(--color-foreground)" }}
                    >
                        {service.title}
                    </h3>

                    <p
                        className="text-sm line-clamp-3 mt-1"
                        style={{ color: "var(--color-muted)" }}
                    >
                        {service.content}
                    </p>
                </div>

                <div className="mt-3 flex justify-center">
                    <Button size="sm" variant="primary">
                        View Details
                    </Button>
                </div>
            </div>
        </Link>
    );
}