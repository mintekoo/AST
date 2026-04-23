"use client";
import StatCard from "@/components/cards/StatCard";

export default function Excellence() {
  const statsData = [
    { title: "Years of Experience", value: 10 },
    { title: "Vehicles Mobilized", value: 1000 },
    { title: "Owned and Leased Vehicles", value: 40 },
    { title: "Satellite Branches", value: 3 },
    { title: "ETB Managed in Transactions", value: 250_000_0 },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-foreground mb-8">
          Excellence in Action
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {statsData.map((stat, idx) => (
            <StatCard key={idx} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
}
