// app/bookings/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PaginationRouter from "@/components/navigation/PaginationRouter";
import { fetchBookings } from "@/lib/api";
import type { Booking } from "@/lib/types";
import Link from "next/link";

function getPageParam(sp: { [key: string]: string | string[] | undefined }, key: string) {
  const raw = sp?.[key];
  const str = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(str || "1");
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function BookingsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await props.searchParams;
  const page = getPageParam(sp, "page");
  const resp = await fetchBookings({ page });
  const data = resp?.bookings ?? [];
  const meta = resp?.meta ?? { currentPage: page, totalPages: 1 };
  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader title="Your Bookings" subtitle="Manage and review your rental bookings." />
        <div className="overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
          <div className="hidden grid-cols-6 gap-4 bg-muted-50 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 sm:grid">
            <div>Product</div>
            <div>Renter</div>
            <div>Dates</div>
            <div>Total</div>
            <div>Status</div>
            <div>Payment</div>
          </div>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {data.map((b: Booking) => (
              <li key={b.id} className="grid grid-cols-1 gap-3 px-4 py-4 text-sm sm:grid-cols-6 sm:items-center">
                <div>
                  <Link href={`/cars/${b.Product?.id ?? ""}`} className="font-medium hover:text-primary-600">
                    {b.Product?.title ?? "Untitled"}
                  </Link>
                  <div className="text-xs text-zinc-500">{b.Product?.pricePerDay ? `ETB ${b.Product.pricePerDay}/day` : ""}</div>
                </div>
                <div>{b.User?.firstName ?? ""} {b.User?.lastName ?? ""}</div>
                <div>
                  <div>{new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</div>
                </div>
                <div className="font-medium">ETB {b.totalPrice.toFixed(2)}</div>
                <div>
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{b.status}</span>
                </div>
                <div>
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{b.paymentStatus}</span>
                </div>
                <div className="sm:col-span-6">
                  <Link href={`/bookings/${b.id}`} className="text-primary-600 hover:underline">View details</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <PaginationRouter currentPage={meta.currentPage} totalPages={meta.totalPages} />
      </Container>
    </main>
  );
}