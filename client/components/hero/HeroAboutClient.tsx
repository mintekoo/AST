"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { About } from "@/lib/types";
import { useMemo } from "react";

export default function HeroAboutClient({
  abouts = [],
}: {
  abouts?: About[];
}) {
  // ✅ Match expected MediaItem shape
  const mediaItems = useMemo(
    () =>
      abouts.map((a) => ({
        image: a.image ?? null,
        title: a.title,
      })),
    [abouts]
  );

  // ✅ Fallback safety
  const safeItems =
    mediaItems.length > 0
      ? mediaItems
      : [{ image: null, title: "About" }];

  return (
    <HeroAnimatedLayout
      totalItems={safeItems.length}
      config={{
        type: "simple",
        size: "small",
      }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={safeItems}
          currentSlide={index}
        />
      )}
    >
      {(index: number) => {
        const item = abouts[index];

        return (
          <div className="max-w-3xl px-6 text-center">
            {/* title */}
            {item?.title && (
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                {item?.title || "Who We Are"}
              </p>
            )}
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}