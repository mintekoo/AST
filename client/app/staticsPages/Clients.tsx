"use client";

import React from "react";
import { Users } from "lucide-react";

const clientsData = [
  "International NGOs",
  "Embassies & Diplomatic Missions",
  "Government Agencies",
  "Private Corporations",
];

export default function Clients() {
  return (
    <section className="py-16">
      
      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-foreground mb-4">
          Clients & Partners
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Abyssinia Software Technology PLC has successfully delivered
          innovative software solutions for organizations across multiple
          sectors, including government and enterprise clients.
        </p>

        {/* Glass container */}
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {clientsData.map((client, index) => (
              <li
                key={index}
                className="
                  flex items-start gap-3
                  p-4 rounded-xl

                  backdrop-blur-md
                  bg-background/40
                  border border-border

                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md
                "
              >
                <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground">
                  {client}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}