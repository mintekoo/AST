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
            await createContact(data);
            setSuccess("Message sent successfully!");
            e.currentTarget.reset();
        } catch (err) {
            alert("Failed to send message");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-xl mx-auto bg-card-background dark:bg-card-background-dark p-6 rounded-2xl ring-1 ring-border"
        >
            <input
                name="fullName"
                placeholder="Full Name"
                required
                className="w-full p-3 rounded-lg border"
            />

            <input
                name="email"
                type="email"
                placeholder="Email (optional)"
                className="w-full p-3 rounded-lg border"
            />

            <input
                name="phone"
                placeholder="Phone (optional)"
                className="w-full p-3 rounded-lg border"
            />

            <textarea
                name="message"
                placeholder="Message"
                required
                className="w-full p-3 rounded-lg border min-h-[120px]"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
                <p className="text-green-500 text-sm text-center">{success}</p>
            )}
        </form>
    );
}