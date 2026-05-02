"use client";

import React from "react";
import { Check } from "lucide-react";
import VerticalDualCarousel from "@/components/ui/VerticalDualCarousel";

const differentiatorsData = [
  {
    title: "15+ Years of Proven Excellence",
    description: "Ethiopia’s trusted software powerhouse delivering long-term innovation."
  },
  {
    title: "Enterprise & Government Expertise",
    description: "Custom software for ministries, schools, hospitals, and large enterprises."
  },
  {
    title: "Industry-Specific Solutions",
    description: "Tailored systems for real estate, manufacturing, healthcare, and more."
  },
  {
    title: "Technology-Driven Engineering",
    description: "Modern architectures with scalable, automated digital systems."
  },
  {
    title: "High-Performance Delivery",
    description: "98–100% success rate in mission-critical software projects."
  },
  {
    title: "24/7 Dedicated Support",
    description: "Always-available technical support for continuous business operations."
  },
];

export default function Differentiators() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
          Why Choose Us
        </h2>

        {/* Glass wrapper */}
        <div
          className="
            backdrop-blur-xl
            bg-background/60
            border border-border
            rounded-2xl
            p-6 sm:p-8
            shadow-lg
          "
        >
          <VerticalDualCarousel>
            {differentiatorsData.map((item, i) => (
              <div
                key={i}
                className="
                  flex items-start gap-4 p-5
                  rounded-xl

                  backdrop-blur-md
                  bg-background/40
                  border border-border

                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md
                "
              >
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />

                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </VerticalDualCarousel>
        </div>

      </div>
    </section>
  );
}