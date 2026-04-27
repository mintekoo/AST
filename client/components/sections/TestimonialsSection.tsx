"use client";

import Container from "@/components/ui/Container";
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

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const normalized = testimonials.map(normalizeImage);

  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <Container>
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              What our customers say
            </h2>
            <p className="text-sm text-muted mt-2 max-w-md">
              Real feedback from clients who’ve worked with us and trust our solutions.
            </p>
          </div>

          <Link
            href="/testimonials"
            className="text-sm font-medium text-primary hover:underline"
          >
            Read all →
          </Link>
        </div>

        {/* Carousel */}
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
      </Container>
    </section>
  );
}