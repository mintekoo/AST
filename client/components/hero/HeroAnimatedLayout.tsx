// components/hero/HeroAnimatedLayout.tsx
"use client";

import React from "react";
import { useHeroAnimation } from "./useHeroAnimation";
import type { HeroAnimationConfig } from "@/lib/types";

type Props = {
  totalItems: number;
  renderMedia: (index: number) => React.ReactNode;
  children:
  | React.ReactNode
  | ((index: number) => React.ReactNode);
  config?: HeroAnimationConfig;
};

export default function HeroAnimatedLayout({
  totalItems,
  renderMedia,
  children,
  config,
}: Props) {
  const {
    currentSlide,
    heroRef,
    textRef,
    mediaRef,
    bgRef,
    sizeClass,
  } = useHeroAnimation(totalItems, config);

  return (
    <section
      ref={heroRef}
      className={`relative w-full ${sizeClass} overflow-hidden`}
    >
      {/* 🌑 Background overlay */}
      <div ref={bgRef} className="absolute inset-0 bg-black/40 z-0" />

      {/* 🎬 MEDIA LAYER (FIXED FOR GSAP ANIMATION) */}
      <div
        ref={mediaRef}
        className="absolute inset-0 z-10 will-change-transform"
      >
        {/* 🔥 IMPORTANT: stable wrapper prevents GSAP break */}
        <div className="w-full h-full">
          {renderMedia(currentSlide)}
        </div>
      </div>

      {/* 🎯 TEXT LAYER */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto">
          {typeof children === "function"
            ? children(currentSlide)
            : children}
        </div>
      </div>
    </section>
  );
}