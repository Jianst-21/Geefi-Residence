"use client";

import { useState } from "react";
import UnitFilter from "./UnitFilter";
import UnitCard from "./UnitCard";
import { units, categories } from "@/constants/unit";

export default function UnitGrid() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? units
      : units.filter((u) => u.category === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <UnitFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </section>
  );
}