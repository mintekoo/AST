"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import type { Testimonial } from "@/lib/types";

export default function HeroTestimonialClient({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={testimonials.length}
      config={{ type: "simple", size: "half" }}
      renderMedia={() => null}
    >
      {(index) => {
        const item = testimonials[index];

        return (
          <div className="text-white max-w-2xl text-center">
            <h1 className="text-xl font-semibold">{item?.fullName}</h1>
            <p className="mt-4 italic text-white/80">
              “{item?.content}”
            </p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}