"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { Category } from "@/lib/types";

export default function HeroCategoryClient({
  categories = [],
}: {
  categories?: Category[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={categories.length}
      config={{ type: "simple", size: "compact" }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={categories}
          currentSlide={index}
        />
      )}
    >
      {(index) => {
        const item = categories[index];

        return (
          <div className="text-white text-center max-w-2xl">
            <h1 className="text-4xl font-bold">{item?.title}</h1>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}