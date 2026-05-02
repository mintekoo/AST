"use client";

import Image from "next/image";
import type { Testimonial } from "@/lib/types";
import Link from "next/link";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const stars = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <Link
      href={`/testimonials/${testimonial.id}`}
      className="
        group relative flex flex-col justify-between
        rounded-2xl p-6

        backdrop-blur-xl
        bg-background/60
        border border-border

        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-4 text-5xl text-primary/10 select-none">
        “
      </div>

      {/* Content */}
      <blockquote className="text-sm leading-relaxed text-muted-foreground text-center mb-6 line-clamp-5">
        {testimonial.content}
      </blockquote>

      {/* Stars */}
      <div className="mb-5 flex items-center justify-center gap-0.5 text-primary text-base">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < stars ? "★" : "☆"}</span>
        ))}
      </div>

      {/* User */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {testimonial.image ? (
          <div className="h-11 w-11 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src={testimonial.image}
              alt={testimonial.fullName}
              width={44}
              height={44}
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="h-11 w-11 flex items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
            {testimonial.fullName.charAt(0)}
          </div>
        )}

        <div className="flex flex-col text-sm">
          <span className="font-medium text-foreground">
            {testimonial.fullName}
          </span>

          {(testimonial.position || testimonial.company) && (
            <span className="text-xs text-muted-foreground">
              {testimonial.position}
              {testimonial.position && testimonial.company && " • "}
              {testimonial.company}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}