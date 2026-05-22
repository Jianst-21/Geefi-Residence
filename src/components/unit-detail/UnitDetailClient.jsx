"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UnitDetailHero from "@/components/unit-detail/UnitDetailHero";
import UnitGallery from "@/components/unit-detail/UnitGallery";
import UnitTypeTabs from "@/components/unit-detail/UnitTypeTabs";
import UnitFeatures from "@/components/unit-detail/UnitFeatures";
import UnitFloorPlan from "@/components/unit-detail/UnitFloorPlan";
import UnitTechSpec from "@/components/unit-detail/UnitTechSpec";
import UnitMasterplan from "@/components/unit-detail/UnitMasterPlan";
import UnitAvailability from "@/components/unit-detail/UnitAvailability";
import { unitDetailService } from "@/services/unit-detail";

// Shimmering skeleton loader for the entire detail page
const DetailSkeleton = () => (
  <div className="min-h-screen bg-white animate-pulse">
    {/* Navbar Placeholder */}
    <div className="h-20 bg-gray-100 border-b border-gray-200"></div>
    {/* Hero Placeholder */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6 py-8">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-96 bg-gray-200 rounded-[48px]"></div>
    </div>
    {/* Gallery Placeholder */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="h-64 bg-gray-200 rounded-3xl"></div>
      <div className="h-64 bg-gray-200 rounded-3xl"></div>
      <div className="h-64 bg-gray-200 rounded-3xl"></div>
    </div>
  </div>
);

export default function UnitDetailClient({ slug }) {
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = () => {
    setLoading(true);
    setError(null);
    unitDetailService
      .getUnitDetailBySlug(slug)
      .then((data) => {
        setUnit(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat detail unit.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !unit) {
    return (
      <main className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="max-w-md mx-auto px-6 py-32 text-center">
          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Detail Tidak Ditemukan</h2>
            <p className="text-secondary text-sm mb-6">{error || "Unit yang Anda cari tidak dapat ditemukan."}</p>
            <button
              onClick={fetchDetail}
              className="px-6 py-2.5 bg-gradient-primary text-white text-sm font-bold rounded-full cursor-pointer hover:shadow-lg transition-all"
            >
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Merge whatsapp number into each type for the price card
  const typesWithContact = unit.types.map((t) => ({
    ...t,
    whatsappNumber: unit.whatsappNumber,
  }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <UnitDetailHero unit={unit} />
      <UnitGallery images={unit.images} extraPhotos={unit.extraPhotos} />
      
      <UnitTypeTabs types={typesWithContact}>
        <UnitFeatures features={unit.features} />
      </UnitTypeTabs>
      
      <UnitFloorPlan floorPlan={unit.floorPlan} />
      <UnitTechSpec techSpec={unit.techSpec} />
      
      {/* Dynamic Block Availability Section */}
      <UnitAvailability
        blocks={unit.blocks}
        whatsappNumber={unit.whatsappNumber}
        unitName={unit.name}
      />
      
      <UnitMasterplan masterplan={unit.masterplan} />
      <Footer />
    </main>
  );
}
