"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

export default function StatsMarquee({
    children,
    speed = 7000,
}: {
    children: ReactNode[];
    speed?: number;
}) {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={{ enabled: true, momentum: false }}
            loop
            direction="horizontal"
            slidesPerView="auto"
            spaceBetween={20}
            autoplay={{
                delay: 0,
                pauseOnMouseEnter: false,
                disableOnInteraction: false,
            }}
            speed={speed}
        >
            {children.map((child, i) => (
                <SwiperSlide
                    key={i}
                    className="!w-auto" // important for marquee-style
                >
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
