"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { Gallery } from "@/lib/types";

export default function HeroGalleryClient({
  galleries = [],
}: {
  galleries?: Gallery[];
}) {
  // 🔥 convert gallery → hero items
  const items = galleries.map((g) => ({
    title: g.title,
    image: g.images?.[0] ?? null,
  }));

  return (
    <HeroAnimatedLayout
      totalItems={items.length}
      config={{ type: "simple", size: "full" }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={items}
          currentSlide={index}
        />
      )}
    >
      {(index) => {
        const item = items[index];

        return (
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold">{item?.title}</h1>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}