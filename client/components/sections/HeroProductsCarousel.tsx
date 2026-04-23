"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Product } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

interface CarouselProps {
  products: Product[];
  currentSlide: number;
}

function parseImages(images: unknown): string[] {
  if (!images) return [];
  try {
    if (typeof images === "string") images = JSON.parse(images);
    if (typeof images === "string") images = JSON.parse(images); // double encoded
  } catch {}
  return Array.isArray(images) ? images : [];
}

export default function HeroProductsCarousel({ products, currentSlide }: CarouselProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const product = products[currentSlide];
  const imgs = parseImages(product?.images);
  const url = imgs[0] ? `${API_BASE_URL}/${imgs[0].replace(/^\/+/, "")}` : "/placeholder.png";

  useEffect(() => {
    if (!imageRef.current) return;

    imageRef.current.classList.remove("fade-zoom");
    void imageRef.current.offsetWidth; // force reflow
    imageRef.current.classList.add("fade-zoom");
  }, [currentSlide]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        ref={imageRef}
        className="
          w-full h-full
          fade-zoom
          transition-all duration-600
          will-change-transform
        "
      >
        <Image
          src={url}
          alt={product?.title || "Car"}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
