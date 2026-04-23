"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

interface AutoCarouselProps {
    children: ReactNode[];
    speed?: number;
    gap?: number;
    reverse?: boolean;
    pauseOnHover?: boolean;
}

/**
 * AutoCarousel — slidesPerView="auto" continuous marquee-style scroll.
 */
export default function AutoCarousel({
    children,
    speed = 6000,
    gap = 20,
    reverse = false,
    pauseOnHover = false,
}: AutoCarouselProps) {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView="auto"
            spaceBetween={gap}
            loop
            freeMode={{ enabled: true, momentum: false }}
            speed={speed}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: pauseOnHover,
                reverseDirection: reverse,
            }}
            className="w-full"
        >
            {children.map((child, index) => (
                <SwiperSlide
                    key={index}
                    className="!w-auto" 
                >
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
