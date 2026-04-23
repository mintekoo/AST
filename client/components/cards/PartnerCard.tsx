"use client";

import Image from "next/image";

export type PartnerCardType = {
    id: string | number;
    name: string;
    contact?: string[];
    imageUrl?: string | null;
};

export default function PartnerCard({ partner }: { partner: PartnerCardType }) {
    return (
        <div
            className="group transition-transform duration-300 hover:-translate-y-0.5 flex flex-col"
        >
            {/* Image */}
            <div
                className="relative aspect-video overflow-hidden rounded-t-2xl"
            >
                {partner.imageUrl ? (
                    <Image
                        src={partner.imageUrl}
                        alt={partner.name}
                        fill
                        unoptimized
                        className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                        sizes="100%"
                    />
                ) : (
                    <div
                        className="flex h-full w-full items-center justify-center"
                    >
                        No Image
                    </div>
                )}
            </div>

            {/* Content */}
            {/* <div className="p-4 flex flex-col flex-1">
                <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--color-foreground)" }}
                >
                    {partner.name}
                </h3>

                <div className="flex-1 overflow-y-auto text-sm">
                    {partner.contact && partner.contact.length > 0 ? (
                        <ul style={{ color: "var(--color-muted)" }} className="space-y-1">
                            {partner.contact.map((c, i) => (
                                <li key={i}>{c}</li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: "var(--color-muted)" }}>No contact info</p>
                    )}
                </div>
            </div> */}
        </div>
    );
}
