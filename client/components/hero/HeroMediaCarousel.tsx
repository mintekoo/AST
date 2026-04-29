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

function getImage(image: unknown): string {
  if (!image) return "https://picsum.photos/1920/1080"; // Fallback
  if (typeof image === "string") return image;
  return "https://picsum.photos/1920/1080";
}

export default function HeroMediaCarousel<T extends MediaItem>({
  items,
  currentSlide,
}: CarouselProps<T>) {
  const item = items[currentSlide];
  const imagePath = getImage(item?.image);

  const url = imagePath?.startsWith('http') 
    ? imagePath 
    : `${API_BASE_URL}/${imagePath.replace(/^\/+/, "")}`;

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Note: We use the URL as a key here. 
          This forces the GridDistortion component to re-mount and 
          re-initialize the WebGL texture when the slide changes.
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