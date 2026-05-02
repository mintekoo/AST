"use client";

import TestimonialCard from "@/components/cards/TestimonialCard";
import type { Testimonial } from "@/lib/types";
import AutoCarousel from "@/components/ui/AutoCarousel";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";

function normalizeImage(t: Testimonial): Testimonial {
  return {
    ...t,
    image: t.image
      ? t.image.startsWith("http")
        ? t.image
        : `${API_BASE_URL}/${t.image}`
      : null,
  };
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const normalized = testimonials.map(normalizeImage);

  return (
    <section id="testimonials" className="py-20">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

          <div>
            <h2 className="text-3xl font-semibold text-foreground">
              What Our Customers Say
            </h2>

            <p className="text-muted-foreground mt-2 max-w-xl">
              Trusted feedback from clients across government, enterprise,
              and private sectors who use our solutions daily.
            </p>
          </div>

          <Link
            href="/testimonials"
            className="text-sm font-medium text-primary hover:opacity-80 transition"
          >
            Read all →
          </Link>

        </div>
      </div>

      {/* FULL WIDTH CAROUSEL ZONE */}
      <div className="w-full">
        <AutoCarousel speed={7000} gap={24} pauseOnHover>
          {normalized.map((t) => (
            <div
              key={t.id}
              className="w-[85%] sm:w-[400px] md:w-[460px] flex-shrink-0"
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </AutoCarousel>
      </div>

    </section>
  );
}