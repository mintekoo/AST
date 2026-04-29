"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { Service } from "@/lib/types";

export default function HeroServicesClient({
  services = [],
}: {
  services?: Service[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={services.length}
      config={{
        type: "service",
        size: "half",
      }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={services}
          currentSlide={index}
        />
      )}
    >
      {(index: number) => {
        const item = services[index];

        return (
          <div className="text-white max-w-2xl px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold">
              {item?.title}
            </h1>

            <p className="mt-4 text-white/80 text-base sm:text-lg">
              {item?.content}
            </p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}