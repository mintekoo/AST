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
          "relative w-full h-full rounded-2xl transition-transform duration-700",
          hover ? "rotate-y-180" : "rotate-y-0"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="
            absolute inset-0 backface-hidden
            flex flex-col items-center justify-center p-4

            backdrop-blur-md
            bg-background/60
            border border-border
            rounded-2xl

            shadow-sm
          "
        >
          <span className="text-4xl font-bold text-primary">
            {formatDisplay(animatedValue)}+
          </span>
          <p className="mt-2 text-muted-foreground text-center">
            {title}
          </p>
        </div>

        {/* Back */}
        <div
          className="
            absolute inset-0 rotate-y-180 backface-hidden
            flex items-center justify-center rounded-2xl

            backdrop-blur-md
            bg-background/70
            border border-border

            shadow-inner
          "
        >
          <p className="text-lg font-semibold text-center px-2 text-foreground">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}