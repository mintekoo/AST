// app/staticsPages/Clients.tsx
"use client";

import React from "react";
import { Users } from "lucide-react";
import LineWaves from "@/components/ui/LineWaves";

const clientsData = [
  "International NGOs",
  "Embassies & Diplomatic Missions",
  "Government Agencies",
  "Private Corporations",
];

export default function Clients() {
  return (
    <section className="relative py-16 overflow-hidden">
      
      {/* 🎨 Animated Background (subtle) */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <LineWaves
          speed={0.2}
          innerLineCount={20}
          outerLineCount={24}
          warpIntensity={0.6}
          brightness={0.12}
          color1="#089d25"
          color2="#089d25"
          color3="#089d25"
        />
      </div>

      {/* 🌫 Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-sm" />

      {/* 📦 Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-primary mb-10">
          Clients & Past Performance
        </h2>

        <p className="text-muted mb-8">
          Abyssinia Softwareal has successfully provided transport services to numerous reputable organizations, including:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {clientsData.map((client, index) => (
            <li key={index} className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <span className="text-foreground/70">{client}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}