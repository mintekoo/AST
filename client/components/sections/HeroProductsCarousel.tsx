"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

interface CarouselProps {
  products: Project[];
  currentSlide: number;
}

function getImage(image: unknown): string {
  if (!image) return "/placeholder.png";

  if (typeof image === "string") {
    return image;
  }

  return "/placeholder.png";
}

export default function HeroProductsCarousel({ products, currentSlide }: CarouselProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const Project = products[currentSlide];
  const imagePath = getImage(Project?.image);

  const url = imagePath
    ? `${API_BASE_URL}/${imagePath.replace(/^\/+/, "")}`
    : "/placeholder.png";

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
          alt={Project?.title ?? "Project"}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
