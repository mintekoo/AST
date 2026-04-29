"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { Blog } from "@/lib/types";

export default function HeroBlogClient({
  blogs = [],
}: {
  blogs?: Blog[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={blogs.length}
      config={{
        type: "blog",
        size: "compact",
      }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={blogs}   // ✅ pass raw blogs
          currentSlide={index}
        />
      )}
    >
      {(index) => {
        const item = blogs[index];

        return (
          <div className="text-white max-w-3xl px-4 text-center">
            <h1 className="text-4xl font-bold">
              {item?.title}
            </h1>

            <p className="mt-4 text-white/80 line-clamp-3">
              {item?.description}
            </p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}