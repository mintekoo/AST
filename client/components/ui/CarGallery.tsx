// components/cars/CarGallery.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";

interface CarGalleryProps {
    title: string;
    images: string[];
}

export default function CarGallery({ title, images }: CarGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0] || "https://via.placeholder.com/800x450?text=No+Image");

    const displayImages = images.length ? images : [mainImage];
    const thumbnails = displayImages.slice(0, 9);

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                <Image
                    src={mainImage}
                    alt={`Main image of ${title}`}
                    fill
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    key={mainImage}
                    loading="eager"
                    unoptimized
                />
            </div>

            <div className="grid grid-cols-4 gap-3">
                {thumbnails.map((src, i) => (
                    <div
                        key={src + i}
                        onClick={() => setMainImage(src)}
                        className={`
              relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer 
              ring-2 transition-all duration-300 hover:scale-[1.03]
              ${src === mainImage
                                ? "ring-primary-500 shadow-lg"
                                : "ring-zinc-200 dark:ring-zinc-800 opacity-80 hover:opacity-100"
                            }
            `}
                    >
                        <Image src={src} alt={`${title} thumbnail ${i + 1}`} fill className="object-cover" unoptimized />
                    </div>
                ))}
            </div>
        </div>
    );
}