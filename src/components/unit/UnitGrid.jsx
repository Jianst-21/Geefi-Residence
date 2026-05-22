"use client";

import { useState, useEffect } from "react";
import UnitFilter from "./UnitFilter";
import UnitCard from "./UnitCard";
import { unitService } from "@/services/unit";

// Shimmering skeleton loader for premium UI loading states
const SkeletonCard = () => (
  <div className="bg-white rounded-b-2xl rounded-t-[48px] overflow-hidden p-6 animate-pulse border border-gray-100">
    <div className="w-full h-100 bg-gray-200 rounded-[48px]"></div>
    <div className="py-5 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="flex gap-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="h-11 bg-gray-200 rounded-full w-full"></div>
    </div>
  </div>
);

export default function UnitGrid() {
  const [unitsData, setUnitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const loadUnits = () => {
    setLoading(true);
    setError(null);
    unitService
      .getUnits()
      .then((data) => {
        setUnitsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat data unit");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUnits();
  }, []);

  // Filter unit based on house_name attribute dynamically from API data
  const categories = ["Semua", ...new Set(unitsData.map((u) => u.house_name))];

  const filtered =
    activeCategory === "Semua"
      ? unitsData
      : unitsData.filter((u) => u.house_name === activeCategory);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex justify-center px-6 pb-24">
          <div className="flex flex-wrap justify-center gap-4 rounded-full w-full max-w-lg">
            <div className="h-11 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            <div className="h-11 bg-gray-200 rounded-full w-36 animate-pulse"></div>
            <div className="h-11 bg-gray-200 rounded-full w-36 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-md mx-auto">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={loadUnits}
            className="px-6 py-2.5 bg-red-600 text-white rounded-full text-sm font-bold shadow-md hover:bg-red-700 transition-all cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <UnitFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary text-base">Tidak ada unit yang tersedia untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filtered.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      )}
    </section>
  );
}