"use client";

import Container from "@/components/ui/Container";
import { About as BackendAbout } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface AboutSectionProps {
  abouts: BackendAbout[];
}

export default function AboutSection({ abouts }: AboutSectionProps) {
  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20">
      <Container className="max-w-7xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl text-foreground">
            About Us
          </h2>

          <Link
            href="/abouts"
            className="text-sm font-medium text-primary hover:opacity-80 transition"
          >
            Read all
          </Link>
        </div>

        <div className="space-y-12">
          {abouts.map((about) => (
            <AboutItem key={about.id} about={about} />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface AboutItemProps {
  about: BackendAbout;
}

function AboutItem({ about }: AboutItemProps) {
  const fullImage = about.image
    ? `${API_BASE_URL}/${about.image}`
    : "/window.svg";

  return (
    <div
      className="
        group flex flex-col md:flex-row items-center
        mx-auto max-w-6xl rounded-2xl overflow-hidden

        backdrop-blur-xl
        bg-white/40 dark:bg-black/30
        border border-white/20 dark:border-white/10

        shadow-lg
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="ml-0 md:ml-8 w-full lg:w-1/2 relative aspect-[16/9] lg:h-[400px]">
        <Image
          src={fullImage}
          alt={about.title}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold sm:text-3xl text-foreground">
          {about.title}
        </h3>

        {about.description && (
          <p className="text-lg italic text-foreground">
            {about.description}
          </p>
        )}

        {about.mission && (
          <section>
            <h4 className="text-primary text-xl font-semibold border-b border-main pb-1 mb-1 transition hover:opacity-80">
              Our Mission
            </h4>
            <p className="text-foreground">{about.mission}</p>
          </section>
        )}

        {about.vision && (
          <section>
            <h4 className="text-primary text-xl font-semibold border-b border-main pb-1 mb-1 transition hover:opacity-80">
              Our Vision
            </h4>
            <p className="text-foreground">{about.vision}</p>
          </section>
        )}

        {about.values && (
          <section>
            <h4 className="text-primary text-xl font-semibold border-b border-main pb-1 mb-1 transition hover:opacity-80">
              Our Values
            </h4>
            <p className="text-foreground">{about.values}</p>
          </section>
        )}

        <div className="mt-4">
          <Link href="/abouts">
            <Button size="lg" className="w-full md:w-auto">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}