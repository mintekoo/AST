"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ManualCarouselProps {
    children: ReactNode[];
    slidesPerView?: number;
    spaceBetween?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    centered?: boolean;
    breakpoints?: Record<number, { slidesPerView: number }>;
}

/**
 * ManualCarousel
 * A reusable Swiper carousel with manual sliding, optional autoplay,
 * and support for responsive slidesPerView.
 */
export default function ManualCarousel({
    children,
    slidesPerView = 1,
    spaceBetween = 20,
    autoplay = false,
    autoplayDelay = 4000,
    centered = true,
    breakpoints = {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
}: ManualCarouselProps) {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            centeredSlides={centered}
            loop
            pagination={{ clickable: true }}
            navigation
            autoplay={
                autoplay
                    ? { delay: autoplayDelay, disableOnInteraction: false }
                    : false
            }
            breakpoints={breakpoints}
            className="w-full"
        >
            {children.map((child, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
