import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export type ServiceCardType = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    createdAt?: string;
};

export default function ServiceCard({ service }: { service: ServiceCardType }) {
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
                {service.imageUrl ? (
                    <Image
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div
                        className="flex items-center justify-center h-full"
                        style={{ color: "var(--color-muted)" }}
                    >
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                    <h3 style={{ color: "var(--color-foreground)" }} className="text-base font-semibold leading-6">
                        {service.name}
                    </h3>
                    <p
                        className="text-sm line-clamp-3 mt-1"
                        style={{ color: "var(--color-muted)" }}
                    >
                        {service.description}
                    </p>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                    {/* <p style={{ color: "var(--color-primary)" }} className="text-sm font-medium">
                        ETB {service.price.toFixed(0)}
                    </p> */}
                    <Button size="sm" variant="primary" >
                        View Details
                    </Button>
                </div>
            </div>
        </Link>
    );
}
