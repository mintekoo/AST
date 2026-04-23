"use client";

import { ReactNode } from "react";
import VerticalCarousel from "./VerticalCarousel";

export default function VerticalDualCarousel({
    children,
    speed = 8000,
}: {
    children: ReactNode[];
    speed?: number;
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Column A – scroll UP */}
            <VerticalCarousel speed={speed} reverse={false}>
                {children}
            </VerticalCarousel>

            {/* Column B – scroll DOWN */}
            <VerticalCarousel speed={speed} reverse={true}>
                {children}
            </VerticalCarousel>

        </div>
    );
}
