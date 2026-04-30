"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Project } from "@/lib/types";
import HeroProductsCarousel from "./HeroProductsCarousel";
import TrueFocus from "@/components/ui/TrueFocus";

gsap.registerPlugin(ScrollTrigger);

interface HeroClientProps {
    featuredProducts: Project[];
    textPosition?: "center" | "bottom";
}

export default function HeroClient({
    featuredProducts,
    textPosition = "bottom",
}: HeroClientProps) {
    const totalImages = Math.min(featuredProducts?.length ?? 0, 10);

    const [currentSlide, setCurrentSlide] = useState(0);
    
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const scrollActiveRef = useRef(false);

    // --------------------------------------------------
    // CORE GSAP LOGIC (Context-based)
    // --------------------------------------------------
    useEffect(() => {
        // gsap.context records all animations created inside it
        // so they can be cleaned up perfectly with ctx.revert()
        const ctx = gsap.context(() => {
            
            // 1. Intro animation
            const tl = gsap.timeline({ delay: 0.2 });
            tl.from(heroRef.current, { opacity: 0, duration: 0.8 })
              .from(textRef.current?.children || [], {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
              }, "-=0.4")
              .from(carRef.current, {
                y: 60,
                opacity: 0,
                scale: 1.1,
                duration: 1.2,
              }, "-=0.8");

            // 2. Parallax & Background Scale
            gsap.to(textRef.current, {
                yPercent: 20,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(carRef.current, {
                yPercent: -10,
                scale: 0.95,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(bgRef.current, {
                scale: 1.2,
                opacity: 0.4,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // 3. Scroll Sync for carousel
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: "top top",
                end: "+=300",
                scrub: true,
                onUpdate: (self) => {
                    const index = Math.floor(self.progress * totalImages);
                    scrollActiveRef.current = true;
                    setCurrentSlide(index % totalImages);

                    // Use GSAP's delayedCall for cleaner state management
                    gsap.delayedCall(0.2, () => {
                        scrollActiveRef.current = false;
                    });
                },
            });

        }, heroRef); // Scope everything to the hero container

        return () => ctx.revert(); // This replaces all those manual .kill() calls
    }, [totalImages]);

    // --------------------------------------------------
    // Auto slide
    // --------------------------------------------------
    useEffect(() => {
        if (!totalImages) return;

        const interval = setInterval(() => {
            if (!scrollActiveRef.current) {
                setCurrentSlide((prev) => (prev + 1) % totalImages);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [totalImages]);

    // --------------------------------------------------
    // Mouse tilt (isolated from context for performance)
    // --------------------------------------------------
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(carRef.current, {
            rotateY: x / 40,
            rotateX: -y / 40,
            duration: 0.4,
            overwrite: "auto" // Prevents conflict with parallax
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
            className="relative w-full h-[75vh] overflow-hidden pt-16"
        >
            <div
                ref={bgRef}
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-0"
            />

            <div ref={carRef} className="absolute inset-0 z-10 pointer-events-none">
                <HeroProductsCarousel
                    products={featuredProducts.slice(0, 10)}
                    currentSlide={currentSlide}
                />
            </div>

            <div
                ref={textRef}
                className={`absolute inset-0 z-20 flex flex-col items-center text-center px-4
                    ${textPosition === "center" ? "justify-center" : "justify-end pb-10"}
                `}
            >
                <div className="bg-black/30 backdrop-blur-md rounded-xl px-6 py-4">
                    <div className="mb-4">
                        <TrueFocus
                            sentence="Abyssinia Software Technology PLC"
                            blurAmount={3}
                            borderColor="#22c55e"
                            glowColor="rgba(34,197,94,0.6)"
                            animationDuration={0.6}
                            pauseBetweenAnimations={1.2}
                        />
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-bold text-white">
                        Innovating Software Solutions That Drive Growth
                    </h1>

                    <p className="text-base sm:text-xl text-white mt-4 max-w-2xl">
                        We build custom web and mobile applications tailored to your business needs.
                    </p>
                </div>
            </div>
        </section>
    );
}