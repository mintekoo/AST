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
      className={`relative w-full ${sizeClass} overflow-hidden bg-black`}
    >
      {/* 🎬 MEDIA LAYER (Moved to back) */}
      <div
        ref={mediaRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {renderMedia(currentSlide)}
      </div>

      {/* 🌑 OVERLAY LAYER (Between media and text) */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-background" 
      />

      {/* 🎯 TEXT LAYER (Front) */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-4xl">
          {typeof children === "function"
            ? children(currentSlide)
            : children}
        </div>
      </div>
    </section>
  );
}