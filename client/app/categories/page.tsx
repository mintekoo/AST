import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchCategories, API_BASE_URL } from "@/lib/api";
import type { Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import CategoryFilter from "./CategoryFilter";
import HeroCategory from "@/components/hero/HeroCategory";
import Hero from "@/components/hero/Hero";

export const dynamic = "force-dynamic";

function getPageParam(
  sp: { [key: string]: string | string[] | undefined },
  key: string
) {
  const raw = sp?.[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function CategoriesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;

  const page = getPageParam(sp, "page");
  const typeIs = typeof sp.typeIs === "string" ? sp.typeIs : undefined;

  const resp = await fetchCategories({ page, typeIs });

  const categories: Category[] = resp?.data ?? [];
  const meta = resp?.meta;

  return (
    <main className="backdrop-blur-sm  text-foreground">
      <div className="mt-20">
        <Hero
          variant="category"
        />
      </div>
      <Container className="py-12 sm:py-16 lg:py-20">

        <SectionHeader
          title="Browse Categories"
          subtitle="Explore content by type and purpose."
        />

        {/* 🔥 FILTER */}
        <CategoryFilter selected={typeIs} />

        {/* GRID */}
        {categories.length === 0 ? (
          <p className="text-center text-muted-foreground dark:text-muted-foreground-dark">
            No categories available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c: Category) => {
              const fullImg = c.image
                ? `${API_BASE_URL}/${c.image}`
                : "/window.svg";

              return (
                <Link
                  key={c.id}
                  href={`/categories/${c.id}`}
                  className="group relative isolate overflow-hidden rounded-2xl p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl block backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg"
                >
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={fullImg}
                      alt={c.title}
                      fill
                      className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-col justify-between h-full min-h-[140px]">
                    <h3 className="text-base font-semibold">{c.title}</h3>

                    <div className="mt-4 flex justify-end">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary">
                        <ArrowRight className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <Pagination meta={meta} basePath="/categories" />
      </Container>
    </main>
  );
}