"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  tags?: string[];
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article
      className="group rounded-2xl shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-muted)",
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-base font-semibold leading-6"
            style={{ color: "var(--color-foreground)" }}
          >
            {product.name}
          </h3>
        </div>

        {product.tags && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-xs ring-1"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-background)",
                  borderColor: "var(--color-primary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link href={`/cars/${product.id}`} passHref>
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
