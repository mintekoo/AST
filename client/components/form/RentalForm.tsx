"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import {
    formatPhoneInput,
    isValidEthiopianPhone,
    normalizeForBackend,
} from "@/utils/phoneUtils";
import { useRouter } from "next/navigation";


type RentalFormProps = {
    rentalId?: number;
    onSuccess?: () => void;
};

export default function RentalForm({ rentalId, onSuccess }: RentalFormProps) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [features, setFeatures] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // 🚀 Handle features
    const handleFeatureChange = (index: number, value: string) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

    // 🚀 Handle images
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages([...images, ...files]);
            setPreviewImages([...previewImages, ...files.map((file) => URL.createObjectURL(file))]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    // 🚀 Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEthiopianPhone(phone)) {
            return setToast({ message: "Invalid phone number format", type: "error" });
        }

        const normalizedPhone = normalizeForBackend(phone);
        if (!normalizedPhone) {
            return setToast({ message: "Could not normalize phone number", type: "error" });
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("Phone", normalizedPhone);
        formData.append("price", price.toString());
        formData.append("features", JSON.stringify(features));
        images.forEach((file) => formData.append("images", file));

        try {
            const res = await fetch(`${API_BASE_URL}/api/rentals${rentalId ? `/${rentalId}` : ""}`, {
                method: rentalId ? "PUT" : "POST",
                body: formData,
            });

            if (!res.ok) throw new Error((await res.json()).error || "Something went wrong");

            setToast({
                message: rentalId ? "Rental updated!" : "Rental created!",
                type: "success",
            });

            setTimeout(() => {
                if (onSuccess) onSuccess();
                router.push("/"); // 🔥 Redirect to homepage
            }, 1500);
        } catch (err: any) {
            setToast({ message: err.message || "Error submitting form", type: "error" });
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded shadow-md">
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            {/* Features */}
            <div>
                <label className="block text-sm font-medium">Features</label>
                {features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2 mt-1">
                        <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                            className="flex-1 border rounded-md px-2 py-1"
                        />
                        <button type="button" onClick={() => removeFeature(idx)} className="text-red-500 text-sm">
                            ✖
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addFeature} className="mt-1 text-blue-500 text-sm">
                    + Add Feature
                </button>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium">Images</label>
                <input type="file" multiple onChange={handleFileChange} className="mt-1" />
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {previewImages.map((src, idx) => (
                        <div key={idx} className="relative w-24 h-24">
                            <Image src={src} alt="Preview" fill className="rounded object-cover" />
                            <button
                                onClick={() => removeImage(idx)}
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? (rentalId ? "Updating..." : "Creating...") : rentalId ? "Update Rental" : "Create Rental"}
            </Button>

            {/* Toast Notification */}
            {toast && (
                <div
                    className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            px-4 py-3 rounded shadow-lg text-white z-[1000]
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
        `}
                >
                    {toast.message}
                </div>
            )}
        </form>
    );
}
