// components/hero/useHeroAnimation.ts
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

  // 🎯 SIZE SYSTEM
  const sizeClass =
    config?.size === "half"
      ? "h-[60vh]"
      : config?.size === "compact"
      ? "h-[40vh]"
      : "h-screen";

  // 🔥 AUTOPLAY
  useEffect(() => {
    if (disableAutoplay || type === "simple") return;

    const interval = setInterval(() => {
      if (!scrollActiveRef.current && totalItems > 0) {
        setCurrentSlide((prev) => (prev + 1) % totalItems);
      }
    }, type === "service" ? 6000 : 5000);

    return () => clearInterval(interval);
  }, [totalItems, type, disableAutoplay]);

  // 🔥 SCROLL SYNC (FIXED RANGE)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom+=100%", // 🔥 FIX: proper scroll range
      scrub: true,

      onUpdate: (self) => {
        if (type === "simple") return;

        const index = Math.floor(self.progress * totalItems);

        scrollActiveRef.current = true;
        setCurrentSlide(index % totalItems);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          scrollActiveRef.current = false;
        }, 150);
      },
    });

    return () => {
      trigger.kill();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [totalItems, type]);

  // 🎬 ANIMATIONS
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // 🟣 PROJECT (cinematic)
    if (type === "project") {
      gsap.fromTo(
        textRef.current,
        { yPercent: 20, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.to(textRef.current, {
        yPercent: 30,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom+=100%",
          scrub: true,
        },
      });

      gsap.to(mediaRef.current, {
        yPercent: -12,
        scale: 0.95,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom+=100%",
          scrub: true,
        },
      });
    }

    // 🟢 SERVICE (clean)
    if (type === "service") {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.to(mediaRef.current, {
        scale: 1.05,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom+=100%",
          scrub: true,
        },
      });
    }

    // ⚪ SIMPLE (minimal but smooth)
    if (type === "simple") {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        mediaRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
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