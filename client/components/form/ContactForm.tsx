"use client";

import { useState } from "react";
import { createContact } from "@/lib/api";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        const form = new FormData(e.currentTarget);
        const data = {
            fullName: form.get("fullName") as string,
            email: form.get("email") as string,
            phone: form.get("phone") as string,
            message: form.get("message") as string,
        };

        if (!data.email && !data.phone) {
            alert("Either email or phone is required");
            setLoading(false);
            return;
        }

        try {
            const res = await createContact(data);
            // Check if the response actually indicates success
            if (res.success) {
                setSuccess("Message sent successfully!");
                (e.target as HTMLFormElement).reset();
            } else {
                throw new Error("Server responded with failure");
            }
        } catch (err) {
            alert("Failed to send message. Please check your connection.");
            console.error("Submission error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        /* REMOVED: max-w-xl, mx-auto, bg-card, and p-6 to fix alignment with the page grid */
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-60 px-1">Full Name</label>
                    <input
                        name="fullName"
                        placeholder="e.g. John Doe"
                        required
                        className="w-full p-4 rounded-2xl bg-background border border-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-60 px-1">Phone Number</label>
                    <input
                        name="phone"
                        placeholder="+251..."
                        className="w-full p-4 rounded-2xl bg-background border border-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 px-1">Email Address</label>
                <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full p-4 rounded-2xl bg-background border border-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 px-1">Your Message</label>
                <textarea
                    name="message"
                    placeholder="How can we help you?"
                    required
                    className="w-full p-4 rounded-2xl bg-background border border-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[150px] resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
                {loading ? "Sending Message..." : "Send Message"}
            </button>

            {success && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
                    {success}
                </div>
            )}
        </form>
    );
}