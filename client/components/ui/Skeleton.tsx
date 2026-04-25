"use client";

import React from "react";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={[
        "animate-pulse rounded-xl bg-skeleton",
        className ?? "",
      ].join(" ")}
      aria-hidden
    />
  );
}

export default Skeleton;


