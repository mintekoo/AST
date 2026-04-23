// components/sections/PartnersSection.tsx
"use client";

import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import PartnerCard, { PartnerCardType } from "@/components/cards/PartnerCard";
import Link from "next/link";
import { Partner as BackendPartner } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

interface PartnersSectionProps {
  partners: BackendPartner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  // Map backend Partner to frontend PartnerCardType
  const cardPartners: PartnerCardType[] = partners.map((p) => ({
    id: p.id ?? p.name, // fallback to name if id missing
    name: p.name,
    contact: p.contact,
    imageUrl: p.image ? `${API_BASE_URL}/${p.image}` : undefined,
  }));

  return (
    <section id="partners" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold sm:text-3xl">Our Partners</h2>
          <Link href="/partners" className="text-sm font-medium text-primary-600 hover:underline">
            See all
          </Link>
        </div>

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
      </Container>
    </section>
  );
}
