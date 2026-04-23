// app/categories/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resp = await fetchCategories();
  const category: Category | undefined = resp.categories?.find((c) => c.id === parseInt(id, 10));

  if (!category) {
    return (
      <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
        <Container className="py-16">
          <p className="text-sm">Category not found.</p>
        </Container>
      </main>
    );
  }

  const fullImage = category.image ? `${API_BASE_URL}/${category.image}` : "/window.svg";

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        {/* Background image */}
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={fullImage}
            alt={category.name}
            fill
            className="object-cover opacity-20"
            unoptimized
          />
        </div>

        <h1 className="text-2xl font-heading font-semibold sm:text-3xl">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{category.description}</p>
        )}
        <div className="mt-6">
          <Link href={`/cars?categoryId=${category.id}`} className="text-primary-600 hover:underline">
            View cars in this category →
          </Link>
        </div>
      </Container>
    </main>
  );
}
