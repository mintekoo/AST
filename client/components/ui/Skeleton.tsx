"use client";

import React from "react";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={[
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800",
        className ?? "",
      ].join(" ")}
      aria-hidden
    />
  );
}

export default Skeleton;


