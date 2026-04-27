// components/sections/ProjectsSection.tsx
"use client";

import Container from "@/components/ui/Container";
import ProjectCard from "@/components/cards/ProjectCard";
import { Project as BackendProject } from "@/lib/types";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";

interface ProjectsSectionProps {
  projects: BackendProject[];
}


export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Our Projects
          </h2>

          <span className="text-sm text-primary-600 font-medium hidden sm:inline">
            Innovative solutions we’ve built
          </span>

          <Link href="/projects" className="text-sm font-medium text-primary-600 hover:underline">
            View all
          </Link>
        </div>

        <Carousel
          slidesPerView={1}
          continuous
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}