// BookingSection.tsx
"use client";
import Button from "../ui/Button";

import { useState } from "react";
import BookingForm from "./BookingForm";

export default function BookingSection({ productId }: { productId: number }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div className="space-y-4 relative">
            {!isBookingOpen ? (

                <Button
                    onClick={() => setIsBookingOpen(true)}
                    size="lg" variant="primary"
                    aria-label="Close Booking Form"
                >
                    Book Now
                </Button>
            ) : (
                <div className="relative border rounded-lg p-4 bg-white shadow-md">
                    {/* Close Button */}
                    <Button
                        onClick={() => setIsBookingOpen(false)}
                        size="lg" variant="primary"
                        aria-label="Close Booking Form"
                    >
                        ×
                    </Button>

                    <BookingForm productId={productId} />
                </div>
            )}
        </div>
    );
}
