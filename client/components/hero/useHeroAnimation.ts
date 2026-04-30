"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { HeroAnimationConfig } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function useHeroAnimation(
  totalItems: number,
  config?: HeroAnimationConfig
) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const scrollActiveRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const type = config?.type ?? "project";
  const disableAutoplay = config?.disableAutoplay ?? false;

  // 🎯 UPDATED SIZE SYSTEM
  const sizeClass = 
    config?.size === "full" ? "h-screen" :
    config?.size === "half" ? "h-[60vh]" :
    config?.size === "medium" ? "h-[45vh]" :
    config?.size === "compact" ? "h-[30vh]" : 
    config?.size === "small" ? "h-[20vh]" :
    "h-screen";

  // 🔥 AUTOPLAY LOGIC
  useEffect(() => {
    if (disableAutoplay || type === "simple" || totalItems <= 1) return;

    const interval = setInterval(() => {
      // Only auto-advance if user isn't actively scrolling
      if (!scrollActiveRef.current) {
        setCurrentSlide((prev) => (prev + 1) % totalItems);
      }
    }, type === "service" ? 6000 : 5000);

    return () => clearInterval(interval);
  }, [totalItems, type, disableAutoplay]);

  // 🔥 SCROLL SYNC
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || totalItems <= 1) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom+=100%",
      scrub: true,
      onUpdate: (self) => {
        if (type === "simple") return;

        // Set scroll flag to pause autoplay
        scrollActiveRef.current = true;
        
        // Calculate index based on progress
        const rawIndex = Math.floor(self.progress * totalItems);
        const index = Math.min(rawIndex, totalItems - 1);

        // Only update state if the index actually changed
        setCurrentSlide(index);

        // Clear existing timeout
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        // Resume autoplay after 200ms of no scrolling
        scrollTimeoutRef.current = setTimeout(() => {
          scrollActiveRef.current = false;
        }, 200);
      },
    });

    return () => {
      trigger.kill();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [totalItems, type]);

  // 🎬 ANIMATIONS
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // 🟣 PROJECT
      if (type === "project") {
        gsap.fromTo(textRef.current, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 });
        gsap.to(mediaRef.current, {
          yPercent: -10,
          scale: 0.98,
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom+=100%", scrub: true }
        });
      }

      // 🟢 SERVICE
      if (type === "service") {
        gsap.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
        gsap.to(mediaRef.current, {
          scale: 1.1,
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom+=100%", scrub: true }
        });
      }

      // ⚪ SIMPLE
      if (type === "simple") {
        gsap.fromTo(textRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [type]);

  return {
    currentSlide,
    heroRef,
    textRef,
    mediaRef,
    bgRef,
    sizeClass,
  };
}