"use client";

import Container from "@/components/ui/Container";
import ServiceCard from "@/components/cards/ServiceCard";
import type { Service } from "@/lib/types";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({
  services,
}: ServicesSectionProps) {
  return (
    <section id="services" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Our Services
          </h2>

          <span className="text-sm text-primary-600 font-medium hidden sm:inline">
            What we offer to our clients
          </span>

          <Link
            href="/services"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            View all
          </Link>
        </div>

        <Carousel
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}