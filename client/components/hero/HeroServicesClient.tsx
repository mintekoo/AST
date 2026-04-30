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
        size: "medium",
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
          <div className="text-white max-w-3xl px-6 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-primary rounded-full">
              Our Expertise
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {item?.title}
            </h1>
            <p className="mt-6 text-white/90 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
              {item?.content}
            </p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}