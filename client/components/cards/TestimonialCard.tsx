import React from "react";
import Image from "next/image";

export type TestimonialCardType = {
  id: string;
  name: string;
  content: string;
  rating?: number;
  imageUrl?: string;
  email?: string;
  position?: string;
  company?: string;
};

export default function TestimonialCard({ testimonial }: { testimonial: TestimonialCardType }) {
  const stars = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <figure className="flex flex-col rounded-2xl bg-background p-5 shadow-sm ring-1 ring-muted animate-fade-in h-[300px]"> {/* Fixed height */}
      {/* Top row: Image + Name */}
      <div className="mb-2 flex items-center gap-3">
        {testimonial.imageUrl && (
          <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-muted">
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              width={48}
              height={48}
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="text-sm font-medium text-foreground">
          {testimonial.name}
          {testimonial.email && <span className="text-muted"> • {testimonial.email}</span>}
        </div>
      </div>

      {/* Stars */}
      <div className="mb-2 flex items-center gap-1 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < stars ? "★" : "☆"}</span>
        ))}
      </div>

      {/* Position / Company */}
      {(testimonial.position || testimonial.company) && (
        <div className="mb-3 text-xs text-muted">
          {testimonial.position && <span>{testimonial.position}</span>}
          {testimonial.position && testimonial.company && <span> • </span>}
          {testimonial.company && <span>{testimonial.company}</span>}
        </div>
      )}

      {/* Scrollable Quote */}
      <blockquote className="text-sm text-foreground/70 overflow-y-auto max-h-[120px]">
        “{testimonial.content}”
      </blockquote>
    </figure>
  );
}

