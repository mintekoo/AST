"use client";

import BlogCard from "@/components/cards/BlogCard";
import type { Blog } from "@/lib/types";
import Link from "next/link";
import AutoCarousel from "@/components/ui/AutoCarousel";

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">
            Latest Articles
          </h2>

          <p className="text-muted-foreground mt-2 max-w-xl">
            Insights, updates, and engineering thoughts from Abyssinia Software.
          </p>
        </div>

        <Link
          href="/blogs"
          className="text-sm font-medium text-primary hover:opacity-80 transition"
        >
          Read all →
        </Link>
      </div>

      {/* Full width carousel */}
      <div className="w-full">
        <AutoCarousel speed={7000} gap={24} pauseOnHover>
          {blogs.map((b) => (
            <div
              key={b.id}
              className="w-[280px] sm:w-[350px] lg:w-[400px] flex-shrink-0"
            >
              <BlogCard blog={b} />
            </div>
          ))}
        </AutoCarousel>
      </div>

    </section>
  );
}