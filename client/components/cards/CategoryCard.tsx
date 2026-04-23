"use client";

import React from "react";
import Image from "next/image";

export type CategoryCardType = {
  id: string;
  name: string;
  imageUrl?: string;
  count?: number;
  description?: string;
};

export default function CategoryCard({ category }: { category: CategoryCardType }) {
  return (
    <div
      className="group relative isolate overflow-hidden rounded-2xl p-4 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-muted)",
      }}
    >
      {category.imageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover opacity-10 transition duration-300 group-hover:opacity-20"
            unoptimized
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 style={{ color: "var(--color-foreground)" }} className="text-base font-semibold">
            {category.name}
          </h3>

          {category.count !== undefined && (
            <p style={{ color: "var(--color-muted)" }} className="text-sm">
              {category.count} items
            </p>
          )}

          {category.description && (
            <p style={{ color: "var(--color-muted)" }} className="text-sm line-clamp-2">
              {category.description}
            </p>
          )}
        </div>

        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-background)" }}
        >
          →
        </span>
      </div>
    </div>
  );
}
