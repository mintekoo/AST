"use client";

import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function BlogCard({ blog }: { blog: Blog }) {
  const imageUrl = blog.image
    ? `${API_BASE_URL}/${blog.image}`
    : "/window.svg";

  const isVideo = imageUrl.match(/\.(mp4|webm|ogg|mkv)$/i);

  const excerpt =
    blog.description.length > 140
      ? blog.description.slice(0, 140) + "..."
      : blog.description;

  return (
    <article
      className="
        group flex flex-col overflow-hidden
        rounded-2xl

        backdrop-blur-xl
        bg-background/60
        border border-border

        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        h-[420px]
      "
    >
      {/* Media */}
      <div className="relative aspect-video overflow-hidden">
        {isVideo ? (
          <video
            src={imageUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">

        {/* <time className="text-xs text-muted-foreground">
          {new Date(blog.createdAt).toLocaleDateString()}
        </time> */}

        <h3 className="text-base font-semibold text-foreground line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>

        <Link
          href={`/blogs/${blog.id}`}
          className="
            mt-auto text-sm font-medium
            text-primary hover:opacity-80
            transition
          "
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}