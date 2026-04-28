"use client";

import React from "react";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function CategoryCard({ category }: { category: Category }) {
  const fullImage = category.image
    ? `${API_BASE_URL}/${category.image}`
    : "/window.svg";

  return (
    <div
      className="group relative isolate overflow-hidden rounded-2xl p-4 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={fullImage}
          alt={category.title}
          fill
          className="object-cover opacity-10 transition duration-300 group-hover:opacity-20"
          unoptimized
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          {category.title}
        </h3>

        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-background)",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
}