"use client";

import Container from "@/components/ui/Container";
import ProductCard, { Product as CardProduct } from "@/components/cards/ProductCard";
import { Product as BackendProduct } from "@/lib/types";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import Carousel from "@/components/ui/Carousel";

function parseImages(images: unknown): string[] {
  if (Array.isArray(images)) return images;
  if (typeof images !== "string") return [];
  try {
    let parsed: unknown = JSON.parse(images);
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapBackendProduct(p: BackendProduct): CardProduct {
  const imgs = parseImages(p.images);
  const coverImage = imgs[0];
  const fullImage = coverImage.startsWith("http") ? coverImage : `${API_BASE_URL}/${coverImage}`;

  const tags =
    typeof p.features === "string"
      ? (() => {
        try {
          const f = JSON.parse(p.features);
          return Array.isArray(f) ? f : [];
        } catch {
          return [];
        }
      })()
      : p.features || [];

  return {
    id: p.id.toString(),
    name: p.title,
    price: `ETB ${p.pricePerDay}/day`,
    imageUrl: fullImage,
    tags,
  };
}

interface ProductsSectionProps {
  products: BackendProduct[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const cardProducts = products.map(mapBackendProduct);

  return (
    <section id="products" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Featured Cars</h2>

          {/* Center call-to-action */}
          <span className="text-sm text-primary-600 font-medium hidden sm:inline">
            Book your perfect ride today!
          </span>

          <Link href="/cars" className="text-sm font-medium text-primary-600 hover:underline">
            View all
          </Link>
        </div>
        {/* Carousel */}
        <Carousel
          slidesPerView={1}
          continuous={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {cardProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
