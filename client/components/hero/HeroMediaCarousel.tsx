"use client";

import { API_BASE_URL } from "@/lib/api";
import GridDistortion from "@/components/ui/GridDistortion";

interface MediaItem {
  title?: string;
  image?: string | null;
}

interface CarouselProps<T extends MediaItem> {
  items: T[];
  currentSlide: number;
}

/**
 * Production URL generator
 * Uses a version query to ensure WebGL texture reloads and 
 * local logo.png as a safety fallback.
 */
function getImageUrl(image: unknown, index: number): string {
  if (!image || typeof image !== "string") {
    return "/logo.png";
  }

  const cleanPath = image.replace(/^\/+/, "");
  const baseUrl = image.startsWith("http")
    ? image
    : `${API_BASE_URL}/${cleanPath}`;

  // Unique versioning forces WebGL components to re-initialize 
  // correctly even if images are shared across slides.
  return `${baseUrl}?v=${index}`;
}

export default function HeroMediaCarousel<T extends MediaItem>({
  items,
  currentSlide,
}: CarouselProps<T>) {
  const item = items[currentSlide];
  const url = getImageUrl(item?.image, currentSlide);

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {/* 
          The 'key' is tied to the unique URL version. 
          This is the standard way to force WebGL/Canvas components 
          to refresh their internal textures during slide changes.
      */}
      <GridDistortion
        key={url}
        imageSrc={url}
        grid={12}
        mouse={0.2}
        strength={0.15}
        relaxation={0.9}
        className="w-full h-full"
      />
    </div>
  );
}