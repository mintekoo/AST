"use client";

import { useEffect, useState } from "react";

export default function useCountUp(target: number, duration: number = 5000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    let rafId: number;

    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return count;
}
