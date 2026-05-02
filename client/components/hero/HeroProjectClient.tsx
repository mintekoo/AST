// HeroProjectClient.tsx
"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { Project } from "@/lib/types";

export default function HeroProjectClient({
  products = [],
}: {
  products?: Project[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={products.length}
      config={{
        type: "project",
        size: "compact",
      }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={products}
          currentSlide={index}
        />
      )}
    >
      {(index) => {
        const item = products[index];

        return (
          <div className="text-white max-w-3xl px-4">
            <h1 className="text-4xl font-bold">
              {item?.title}
            </h1>

            <p className="mt-4 text-white/80">
              {item?.content}
            </p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}
