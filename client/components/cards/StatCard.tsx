"use client";

import useCountUp from "@/lib/useCountUp";
import { useState } from "react";
import clsx from "clsx";

export default function StatCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    const animatedValue = useCountUp(value, 3000);
    const [hover, setHover] = useState(false);

    // Format numbers for display
    const formatDisplay = (num: number) => {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
        return num.toString();
    };

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="w-56 h-40 perspective-1000 cursor-pointer"
        >
            <div
                className={clsx(
                    "relative w-full h-full rounded-2xl shadow-sm bg-background transition-transform duration-700",
                    hover ? "rotate-y-180" : "rotate-y-0"
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-4">
                    <span className="text-4xl font-bold text-primary">
                        {formatDisplay(animatedValue)}+
                    </span>
                    <p className="mt-2 text-muted text-center">{title}</p>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden flex items-center justify-center rounded-2xl bg-primary text-background">
                    <p className="text-lg font-semibold">{title}</p>
                </div>
            </div>
        </div>
    );
}
