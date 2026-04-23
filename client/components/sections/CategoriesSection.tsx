import Container from "@/components/ui/Container";
import CategoryCard, { CategoryCardType } from "@/components/cards/CategoryCard";
import { Category as BackendCategory } from "@/lib/types";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

function mapBackendCategory(c: BackendCategory): CategoryCardType {
  const fullImage = c.image ? `${API_BASE_URL}/${c.image}` : "/window.svg";

  return {
    id: c.id.toString(),
    name: c.name,
    imageUrl: fullImage,
    // count: c.productCount ?? 0,
  };
}

interface CategoriesSectionProps {
  categories: BackendCategory[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const cardCategories = categories.map(mapBackendCategory);

  return (
    <section id="categories" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Browse by Our Fleet</h2>
          <Link href="/categories" className="text-sm font-medium text-primary-600 hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardCategories.map((c) => (
            <Link key={c.id} href={`/cars?categoryId=${c.id}`}>
              <CategoryCard category={c} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
