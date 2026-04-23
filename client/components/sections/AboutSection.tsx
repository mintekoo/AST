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
    <section id="about" className="py-14 sm:py-16 lg:py-20 bg-background dark:bg-backgroundDark">
      <Container className="max-w-7xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">About Us</h2>
          <Link href="/abouts" className="text-sm font-medium text-primary-600 hover:underline">
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
  const fullImage = about.image ? `${API_BASE_URL}/${about.image}` : "/window.svg";

  return (
    <div className="group flex flex-col md:flex-row items-center animate-fade-in mx-auto max-w-6xl rounded-2xl ring-1 ring-zinc-200 overflow-hidden">

      {/* Image - Left Column */}
      <div className="ml-8 w-full lg:w-1/2 relative aspect-[16/9] lg:h-[400px]">
        <Image
          src={fullImage}
          alt={about.title}
          width={600}
          height={400}
          className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

      </div>

      {/* Content - Right Column */}
      <div className="w-full md:w-1/2 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold sm:text-3xl">{about.title}</h3>

        {about.description && <p className="text-lg italic">{about.description}</p>}

        {about.mission && (
          <section>
            <h4 className="text-primary text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Mission
            </h4>
            <p>{about.mission}</p>
          </section>
        )}

        {about.vision && (
          <section>
            <h4 className="text-primary text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Vision
            </h4>
            <p>{about.vision}</p>
          </section>
        )}

        {about.values && (
          <section>
            <h4 className="text-primary text-xl font-semibold border-b pb-1 mb-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
              Our Values
            </h4>
            <p>{about.values}</p>
          </section>
        )}

        {/* Learn More Button */}
        <div className="mt-4">
          <Link href={`/abouts`}>
            <Button size="lg" className="w-full md:w-auto">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
