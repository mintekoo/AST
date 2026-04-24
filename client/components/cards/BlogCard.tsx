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
    blog.description.length > 150
      ? blog.description.slice(0, 150) + "..."
      : blog.description;

  return (
    <article className="group flex flex-col rounded-2xl shadow-sm ring-1 ring-muted bg-background transition-all hover:-translate-y-0.5 hover:shadow-md h-[400px]">

      {/* Media */}
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          {isVideo ? (
            <video
              src={imageUrl}
              controls
              className="w-full h-full object-cover bg-background"
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
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-3">

        <time className="text-xs text-muted block">
          {new Date(blog.createdAt).toLocaleDateString()}
        </time>

        <h3 className="text-base font-semibold leading-6 text-foreground">
          {blog.title}
        </h3>

        <p className="text-sm text-muted line-clamp-3 overflow-y-auto max-h-[80px]">
          {excerpt}
        </p>

        <Link
          href={`/blogs/${blog.id}`}
          className="text-sm font-medium text-primary hover:underline block mt-auto"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}