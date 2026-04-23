// app/categories/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function CategoriesPage() {
  const resp = await fetchCategories();
  const categories: Category[] = resp?.categories ?? [];

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader
          title="Browse by Our Fleet"
          subtitle="Explore vehicles by type and purpose."
        />

        {categories.length === 0 ? (
          <p className="text-center text-muted-foreground dark:text-muted-foreground-dark">
            No categories available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (

              // inside your map
              <Link
                key={c.id}
                href={`/cars?categoryId=${c.id}`}
                className="group relative isolate overflow-hidden rounded-2xl p-4 shadow-sm ring-1 ring-border transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md block bg-card-background dark:bg-card-background-dark"
              >
                {/* Background image */}
                {c.image && (
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${c.image}`}
                      alt={c.name}
                      fill
                      className="object-cover opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                      unoptimized
                    />
                  </div>
                )}

                {/* Category content */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-base font-semibold text-foreground dark:text-foreground-dark">
                      {c.name}
                    </h3>
                    {c.description && (
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark line-clamp-2">
                        {c.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow icon */}
                  <div className="mt-4 flex justify-end">
                    <div className="flex items-center justify-center aspect-square h-10 w-10 rounded-full bg-primary shadow-sm transition-colors duration-300 group-hover:bg-primary-hover">
                      <ArrowRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </Link>

            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
