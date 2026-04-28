"use client";

import Container from "@/components/ui/Container";
import CategoryCard from "@/components/cards/CategoryCard";
import CategoryFilter from "@/components/filters/CategoryFilters";
import type { Category } from "@/lib/types";
import Link from "next/link";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const {
    selected,
    setSelected,
    filteredCategories,
  } = useCategoryFilter(categories);

  return (
    <section id="categories" className="py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Browse by Our Categories
          </h2>

          <Link
            href="/categories"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {/* FILTER */}
        <CategoryFilter selected={selected} onChange={setSelected} />

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <CategoryCard category={category} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}