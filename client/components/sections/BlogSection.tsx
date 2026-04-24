"use client";

import Container from "@/components/ui/Container";
import BlogCard from "@/components/cards/BlogCard";
import type { Blog } from "@/lib/types";
import Link from "next/link";
import AutoCarousel from "@/components/ui/AutoCarousel";

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section id="blog" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Latest Articles
          </h2>

          <Link
            href="/blogs"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            Read all
          </Link>
        </div>

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
      </Container>
    </section>
  );
}