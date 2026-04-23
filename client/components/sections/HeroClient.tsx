"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Product } from "@/lib/types";
import HeroProductsCarousel from "./HeroProductsCarousel";

gsap.registerPlugin(ScrollTrigger);

interface HeroClientProps {
    featuredProducts: Product[];
}

export default function HeroClient({ featuredProducts }: HeroClientProps) {
    const totalImages = Math.min(featuredProducts.length, 10);

    const [currentSlide, setCurrentSlide] = useState(0);

    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const scrollActiveRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollActiveRef.current) {
                setCurrentSlide((prev) => (prev + 1) % totalImages);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [totalImages]);

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "200px",
            scrub: true,
            onUpdate: (self) => {
                const index = Math.floor(self.progress * totalImages);
                scrollActiveRef.current = true;
                setCurrentSlide(index % totalImages);

                if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = setTimeout(() => {
                    scrollActiveRef.current = false;
                }, 200);
            },
        });

        return () => {
            trigger.kill();
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [totalImages]);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.from(heroRef.current, { opacity: 0, duration: 0.8 })
            .from(
                textRef.current?.children || [],
                { y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out" },
                "-=0.4"
            )
            .from(
                carRef.current,
                { y: 60, opacity: 0, scale: 1.15, duration: 1.3, ease: "power3.out" },
                "-=0.8"
            );
    }, []);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        
        gsap.to(textRef.current, {
            yPercent: 25,
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // 2. CAR IMAGE PARALLAX
        // The car moves slightly UPWARD, creating a layered effect against the downward-moving text.
        gsap.to(carRef.current, {
            yPercent: -10, // Subtle UPWARD move (parallax effect)
            scale: 0.95, // Subtle zoom out
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // 3. BACKGROUND PARALLAX (Most dramatic movement for depth)
        gsap.to(bgRef.current, {
            scale: 1.3,
            opacity: 0.3,
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(carRef.current, {
            rotateY: x / 40,
            rotateX: -y / 40,
            duration: 0.4,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(carRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
        });
    };

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* Background Layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-0"
            />

            {/* Hero Image Layer */}
            <div ref={carRef} className="absolute inset-0 z-10 pointer-events-none">
                <HeroProductsCarousel
                    products={featuredProducts.slice(0, 10)}
                    currentSlide={currentSlide}
                />
            </div>

            {/* Text Layer */}
            <div
                ref={textRef}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
            >
                <span className="mb-4 bg-white/20 backdrop-blur px-3 py-1 text-sm font-medium text-white rounded-full">
                    Premium Cars. Premium Experience.
                </span>

                <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-xl">
                    Find your next car with confidence
                </h1>

                <p className="text-lg sm:text-2xl text-white mt-4 drop-shadow-sm">
                    Elevate your travel experience with Adinas
                </p>
            </div>
        </section>
    );
}