"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export type BlogCardType = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  category?: string;
};

export default function BlogCard({ blog }: { blog: BlogCardType }) {
  const isVideo = blog.imageUrl?.match(/\.(mp4|webm|ogg|mkv)$/i);

  return (
    <article className="group flex flex-col rounded-2xl shadow-sm ring-1 ring-muted bg-background transition-all hover:-translate-y-0.5 hover:shadow-md h-[400px]">
      {/* Media */}
      {blog.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          {isVideo ? (
            <video
              src={blog.imageUrl}
              controls
              className="w-full h-full object-cover bg-background"
            />
          ) : (
            <Image
              src={blog.imageUrl}
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
        {blog.date && <time className="text-xs text-muted block">{blog.date}</time>}

        <h3 className="text-base font-semibold leading-6 text-foreground">{blog.title}</h3>

        {/* Scrollable excerpt */}
        <p className="text-sm text-muted line-clamp-3 overflow-y-auto max-h-[80px]">
          {blog.excerpt}
        </p>

        {/* <div className="flex items-center justify-between text-xs text-muted">
          {blog.author && <span>By {blog.author}</span>}
          {blog.category && <span>{blog.category}</span>}
        </div> */}

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
