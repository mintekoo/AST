import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PaginationRouter from "@/components/navigation/PaginationRouter";
import { fetchProducts, fetchProductsByCategory, fetchCategories } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Product, Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import BookingSection from "@/components/form/BookingSection";

interface CarsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// --- Product Card Inline ---
function ProductCardInline({ p }: { p: Product }) {
  let images: string[] = [];
  if (typeof p.images === "string") {
    try {
      images = JSON.parse(p.images);
      if (typeof images === "string") images = JSON.parse(images);
    } catch {
      images = [];
    }
  } else if (Array.isArray(p.images)) images = p.images;

  const cover = images?.[0];
  const fullCover = cover ? `${API_BASE_URL}/${cover}` : "/window.svg";

  return (
    <div className="flex flex-col justify-between group overflow-hidden rounded-2xl shadow-sm ring-1 ring-zinc-200 transition-[transform,box-shadow] duration-standard ease-standard hover:-translate-y-0.5 hover:shadow-md dark:ring-zinc-800 animate-fade-in">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {fullCover ? (
          <Image
            src={fullCover}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-muted-100" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-black/5 dark:bg-black/60 dark:text-foregroundDark">
          {p.status}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="text-base font-semibold leading-6">{p.title}</h3>
        <p className="text-sm">{p.make} {p.model} • {p.year}</p>
      </div>

      <div className="flex items-start gap-2 p-4">
        <Link href={`/cars/${p.id}`} className="flex-1">
          <Button size="lg" className="w-full">View Details</Button>
        </Link>
        <div className="flex-1">
          <BookingSection productId={p.id} />
        </div>
      </div>
    </div>
  );
}

// --- Helpers ---
function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function getStrParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp[key];
  return Array.isArray(raw) ? raw[0] : raw;
}

// --- Page Component ---
export default async function CarsPage({ searchParams }: CarsPageProps) {
  const sp = await searchParams;
  const page = getPageParam(sp, "page");
  const categoryId = getStrParam(sp, "categoryId");

  // --- Fetch categories ---
  const categoriesResp = await fetchCategories();
  const categories: Category[] = categoriesResp?.categories ?? [];

  // --- Fetch products ---
  const resp = categoryId
    ? await fetchProductsByCategory(categoryId, { page })
    : await fetchProducts({ page });

  const products: Product[] = resp?.products ?? [];
  const meta = resp?.meta ?? { currentPage: page, totalPages: 1 };

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">

      {/* Categories bar */}
      {categories.length > 0 && (
        <Container className="py-12 sm:py-16 lg:py-20">
          <SectionHeader
            title="Browse by Our Fleet"
            subtitle="Explore vehicles by type and purpose."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const fullCover = c.image ? `${API_BASE_URL}/${c.image}` : "/window.svg";

              return (
                <Link
                  key={c.id}
                  href={`/cars?categoryId=${c.id}`}
                  className="group relative isolate overflow-hidden rounded-2xl p-4 shadow-sm ring-1 ring-border transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md block bg-card-background dark:bg-card-background-dark"
                >
                  {c.image && (
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={fullCover}
                        alt={c.name}
                        fill
                        className="object-cover opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-base font-semibold text-foreground dark:text-foreground-dark">{c.name}</h3>
                      {c.description && (
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark line-clamp-2">{c.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      )}

      {/* Products */}
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader
          title="Explore Our Premium Vehicles"
          subtitle="Choose from a curated selection of high-quality cars ready for your next journey."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCardInline key={p.id} p={p} />
          ))}
        </div>
        <PaginationRouter currentPage={meta.currentPage} totalPages={meta.totalPages} />
      </Container>
    </main>
  );
}
