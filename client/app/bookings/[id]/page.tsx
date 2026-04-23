// app/bookings/[id]/page.tsx
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fetchBooking } from "@/lib/api";
import type { Booking } from "@/lib/types";
import Link from "next/link";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking: Booking = await fetchBooking(id);

  const productTitle = booking.Product?.title ?? "Untitled";
  const renterName = `${booking.User?.firstName ?? ""} ${booking.User?.lastName ?? ""}`.trim() || "Unknown Renter";
  const productId = booking.Product?.id ?? "";

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <h1 className="text-2xl font-heading font-semibold sm:text-3xl">Booking Details</h1>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 animate-fade-in">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div><span className="font-medium">Product:</span> {productTitle}</div>
              <div><span className="font-medium">Renter:</span> {renterName}</div>
              <div><span className="font-medium">Dates:</span> {new Date(booking.startDate).toLocaleString()} → {new Date(booking.endDate).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{booking.status}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{booking.paymentStatus}</span>
            </div>
          </div>
          <aside className="space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 animate-slide-up">
            <div className="text-sm">Total price</div>
            <div className="text-2xl font-semibold">ETB {booking.totalPrice.toFixed(2)}</div>
            <Link href={`/cars/${productId}`}>
              <Button className="w-full">View Car</Button>
            </Link>
          </aside>
        </div>
      </Container>
    </main>
  );
}