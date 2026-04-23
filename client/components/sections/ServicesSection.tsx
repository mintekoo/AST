"use client";
import Container from "@/components/ui/Container";
import ServiceCard, { ServiceCardType } from "@/components/cards/ServiceCard";
import { Service as BackendService } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";

interface ServicesSectionProps {
  services: BackendService[];
  title?: string;
  subtitle?: string;
}

export default function ServicesSection({
  services,
  title = "Our Services",
  subtitle,
}: ServicesSectionProps) {
  // Map backend services to ServiceCardType
  const cardServices: ServiceCardType[] = services.map((s) => ({
    id: s.id.toString(),
    name: s.name,
    description: s.description,
    price: s.price,
    imageUrl: s.image ? `${API_BASE_URL}/${s.image}` : undefined,
    createdAt: s.createdAt ? new Date(s.createdAt).toLocaleDateString() : undefined,
  }));

  return (
    <section id="services" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
          {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          <Link href="/services" className="text-sm font-medium text-primary-600 hover:underline">
            View all
          </Link>
        </div>

        {/* Continuous Carousel for all services */}
        <Carousel
          slidesPerView={1}
          continuous={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {cardServices.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
