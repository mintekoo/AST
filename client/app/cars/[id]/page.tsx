// app/cars/[id]/page.tsx
import Container from "@/components/ui/Container";
import { fetchProduct } from "@/lib/api";
import { API_BASE_URL } from "@/lib/api";
import type { Product } from "@/lib/types";
import BookingSection from "@/components/form/BookingSection";
import CarGallery from "@/components/ui/CarGallery";

function parseArrayField(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value !== "string") return [];
  try {
    let parsed: unknown = JSON.parse(value);
    if (typeof parsed === "string") parsed = JSON.parse(parsed);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function getFullImageUrl(img: string): string {
  return img.startsWith("http") ? img : `${API_BASE_URL}/${img}`;
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await fetchProduct(id);

  const rawImages = parseArrayField(product.images);
  const images = rawImages.length
    ? rawImages.map(getFullImageUrl)
    : ["https://via.placeholder.com/800x450?text=No+Image"];

  const features = parseArrayField(product.features);

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-semibold">{product.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {product.make} {product.model} • {product.year}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Gallery */}
          <div className="lg:col-span-2">
            <CarGallery 
              title={product.title} 
              images={images} 
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 rounded-2xl bg-background shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 p-5 animate-slide-up">
            {/* Status Badge */}
            <div className="flex justify-between items-center">
              <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-primary-100">
                {product.status}
              </span>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <div className="text-sm font-medium">Features</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-muted">
                  {features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <div className="text-sm font-medium">About this car</div>
                <p className="mt-1 text-sm text-muted">{product.description}</p>
              </div>
            )}

            {/* Booking Section */}
            <BookingSection productId={product.id} />
          </aside>
        </div>
      </Container>
    </main>
  );
}
