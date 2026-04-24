"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export type ProjectCardType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <article
      className="group rounded-2xl shadow-sm ring-1 transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-muted)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <h3
          className="text-base font-semibold leading-6"
          style={{ color: "var(--color-foreground)" }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm line-clamp-3"
          style={{ color: "var(--color-muted)" }}
        >
          {project.description}
        </p>

        <div className="pt-2">
          <Link href={`/projects/${project.id}`}>
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}