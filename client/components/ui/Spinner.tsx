"use client";

import React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      className={[
        "inline-block rounded-full border-2 border-zinc-300 border-t-primary-600 dark:border-zinc-700 animate-spin",
        sizeClasses[size],
        className ?? "",
      ].join(" ")}
      aria-label="Loading"
      role="status"
    />
  );
}

export default Spinner;


