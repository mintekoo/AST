// app/rentals/page.tsx
import RentalForm from "@/components/form/RentalForm";

export default function RentalPage() {
    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <h1 className="text-2xl font-semibold mb-6 text-center">Book a Rental</h1>
                <RentalForm />
            </div>
        </main>
    );
}
