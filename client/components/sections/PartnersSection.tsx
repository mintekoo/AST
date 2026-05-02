"use client";

import Carousel from "@/components/ui/Carousel";
import PartnerCard, { PartnerCardType } from "@/components/cards/PartnerCard";
import Link from "next/link";
import { Partner as BackendPartner } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

interface PartnersSectionProps {
  partners: BackendPartner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const cardPartners: PartnerCardType[] = partners.map((p) => ({
    id: p.id ?? p.name,
    name: p.name,
    contact: p.contact,
    imageUrl: p.image ? `${API_BASE_URL}/${p.image}` : undefined,
  }));

  return (
    <section id="partners" className="py-16 w-full">
      
      {/* Inner content wrapper (only for text alignment) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold sm:text-3xl text-foreground">
            Our Partners
          </h2>

          <Link
            href="/partners"
            className="text-sm font-medium text-primary hover:opacity-80 transition"
          >
            See all
          </Link>
        </div>

      </div>

      {/* FULL WIDTH CAROUSEL */}
      <div className="w-full">
        <Carousel
          slidesPerView={1}
          continuous={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {cardPartners.map((p) => (
            <PartnerCard key={p.id} partner={p} />
          ))}
        </Carousel>
      </div>

    </section>
  );
}