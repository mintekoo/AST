
"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface CarouselProps {
  children: ReactNode[];
  slidesPerView?: number;
  autoplayDelay?: number;
  continuous?: boolean;
  reverse?: boolean;
  breakpoints?: Record<number, { slidesPerView: number }>;
}

export default function Carousel({
  children,
  slidesPerView = 1,
  autoplayDelay = 3000,
  continuous = false,
  reverse = false,
  breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
}: CarouselProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, FreeMode]}
      spaceBetween={20}
      slidesPerView={slidesPerView}
      loop
      speed={continuous ? 5000 : 500}
      autoplay={
        continuous
          ? {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            reverseDirection: reverse,
          }
          : {
            delay: autoplayDelay,
            disableOnInteraction: false,
            reverseDirection: reverse,
          }
      }
      pagination={continuous ? false : { clickable: true }}
      navigation={!continuous}
      breakpoints={breakpoints}
      freeMode={continuous ? { enabled: true, momentum: false } : false}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

// "use client";

// import { ReactNode } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";

// interface CarouselProps {
//   children: ReactNode[];
//   slidesPerView?: number;
//   autoplayDelay?: number;
//   continuous?: boolean;
//   breakpoints?: Record<number, { slidesPerView: number }>;
// }

// export default function Carousel({
//   children,
//   slidesPerView = 1,
//   autoplayDelay = 3000,
//   continuous = false,
//   breakpoints = {
//     640: { slidesPerView: 1 },
//     768: { slidesPerView: 2 },
//     1024: { slidesPerView: 3 },
//   },
// }: CarouselProps) {
//   return (
//     <Swiper
//       modules={[Autoplay, Pagination, Navigation, FreeMode]}
//       spaceBetween={20}
//       slidesPerView={slidesPerView}
//       loop
//       speed={continuous ? 5000 : 500}
//       autoplay={
//         continuous
//           ? { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }
//           : { delay: autoplayDelay, disableOnInteraction: false }
//       }
//       pagination={continuous ? false : { clickable: true }}
//       navigation={!continuous}
//       breakpoints={breakpoints}
//       freeMode={continuous ? { enabled: true, momentum: false } : false}
//     >
//       {children.map((child, index) => (
//         <SwiperSlide key={index}>{child}</SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }
