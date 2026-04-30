"use client";

import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

type Props = {
    blogs: Blog[];
};

export default function RelatedBlogs({ blogs }: Props) {
    if (!blogs?.length) return null;

    return (
        <div className="space-y-4">
            {blogs.slice(0, 5).map((b) => {
                const img = b.image
                    ? `${API_BASE_URL}/${b.image}`
                    : "/window.svg";

                return (
                    <Link key={b.id} href={`/blogs/${b.id}`} className="block">
                        <Card
                            size="sm"
                            className="
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                hover:ring-primary/30
                cursor-pointer
              "
                        >
                            <div className="flex gap-3">
                                {/* Image */}
                                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                                    <Image
                                        src={img}
                                        alt={b.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <CardContent className="p-0 flex flex-col">
                                    <CardTitle className="text-sm line-clamp-2 group-hover/card:text-primary transition-colors">
                                        {b.title}
                                    </CardTitle>

                                    <CardDescription className="line-clamp-2 text-xs mt-1">
                                        {b.description}
                                    </CardDescription>

                                    <span className="text-xs text-primary mt-2 opacity-0 group-hover/card:opacity-100 transition">
                                        Read more →
                                    </span>
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}