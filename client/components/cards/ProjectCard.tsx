"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.image
    ? `${API_BASE_URL}/${project.image}`
    : "/placeholder.png";

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3 className="text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-sm line-clamp-3 text-muted-foreground flex-1">
          {project.content}
        </p>

        <div className="pt-2">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground group-hover:bg-primary/90 h-9 px-3 w-full">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}