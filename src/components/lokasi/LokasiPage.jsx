"use client";

import dynamic from "next/dynamic";
import React, { useState, useCallback, useEffect } from "react";
import { Navigation, Loader2 } from "lucide-react";

// Import LeafletMap secara dinamis (no SSR) karena Leaflet butuh browser APIs
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 h-full min-h-[400px] flex items-center justify-center bg-stone-100">
      <Loader2 className="animate-spin text-[#9c7524]" size={32} />
    </div>
  ),
});

// ─── Koordinat & info Geefi Residence ────────────────────────────────────────
const PERUMAHAN = {
  lat: -7.6882,
  lng: 110.8299,
};

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Geefi+Residence+Sukoharjo";

// ─── Kategori filter yang tersedia ───────────────────────────────────────────
const CATEGORIES = [
  "Semua",
  "Pusat Pendidikan",
  "Perbelanjaan",
  "Kesehatan",
  "Layanan Publik",
];

// ─── Icon per kategori ────────────────────────────────────────────────────────
const CATEGORY_ICONS = {
  "Pusat Pendidikan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Kesehatan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  Perbelanjaan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  Transportasi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
      <path d="M3 8h18" />
    </svg>
  ),
  Keuangan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  "Tempat Ibadah": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2L4 8v14h16V8z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  Kuliner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 2v7c0 2.8 2.2 5 5 5s5-2.2 5-5V2M8 14v8M21 2v4c0 1.6-1 3-2.5 3.5L18 22" />
    </svg>
  ),
  Lainnya: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
};

const CATEGORY_COLORS = {
  "Pusat Pendidikan": { bg: "#FEF3C7", color: "#B45309" },
  Kesehatan: { bg: "#FEE2E2", color: "#DC2626" },
  Perbelanjaan: { bg: "#DCFCE7", color: "#16A34A" },
  Transportasi: { bg: "#DBEAFE", color: "#2563EB" },
  Keuangan: { bg: "#EDE9FE", color: "#7C3AED" },
  "Tempat Ibadah": { bg: "#CFFAFE", color: "#0891B2" },
  Kuliner: { bg: "#FFEDD5", color: "#EA580C" },
  Lainnya: { bg: "#F3F4F6", color: "#6B7280" },
};

// Filter sidebar: hanya kategori yang relevan sesuai desain
const SIDEBAR_FILTER_MAP = {
  Semua: "Semua",
  "Pusat Pendidikan": "Pusat Pendidikan",
  Perbelanjaan: "Perbelanjaan",
  Kesehatan: "Kesehatan",
  "Layanan Publik": "Transportasi",
};

// ─── Komponen Kartu Fasilitas ─────────────────────────────────────────────────
function FasilitasCard({ facility, isFirst, onClick }) {
  const cfg = CATEGORY_COLORS[facility.kategori] || CATEGORY_COLORS.Lainnya;
  const icon = CATEGORY_ICONS[facility.kategori] || CATEGORY_ICONS.Lainnya;

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-4 p-4 rounded-2xl bg-white transition-all duration-200 cursor-pointer ${isFirst
          ? "border-l-4 border-[#9c7524] border-t border-r border-b border-stone-100 shadow-sm"
          : "border border-stone-100 hover:shadow-sm hover:border-[#9c7524]/30"
        }`}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: cfg.bg, color: cfg.color }}
      >
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-[#1A1C1A] leading-tight">
          {facility.nama}
        </p>
        <p className="text-[12px] text-[#5F5E5E] mt-0.5">{facility.kategori}</p>
      </div>

      {/* Jarak */}
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[15px] font-bold text-[#9c7524]">
          {facility.jarakKm} km
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-[#5F5E5E] uppercase">
          {facility.menit} menit
        </span>
      </div>
    </div>
  );
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────
export default function LokasiPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [fasilitas, setFasilitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleFasilitasLoaded = useCallback((data) => {
    setFasilitas(data);
    setLoading(false);
  }, []);

  const handleFasilitasClick = useCallback((f) => {
    setHighlightId(f.id);
    setSelectedFacility(f);
  }, []);

  // Reset selected facility when active category changes
  useEffect(() => {
    setSelectedFacility(null);
    setHighlightId(null);
  }, [activeCategory]);

  // Filter untuk sidebar berdasarkan active category
  const mapCategory = SIDEBAR_FILTER_MAP[activeCategory] || "Semua";

  // Jika "Semua", hanya tampilkan kategori yang ditentukan
  const allowedSemua = ["Pusat Pendidikan", "Perbelanjaan", "Kesehatan", "Transportasi"];
  const filtered =
    mapCategory === "Semua"
      ? fasilitas.filter((f) => allowedSemua.includes(f.kategori))
      : fasilitas.filter((f) => f.kategori === mapCategory);

  // Tampilkan semua data
  const displayed = filtered;

  const mapsHref = selectedFacility
    ? `https://www.google.com/maps/dir/?api=1&origin=${PERUMAHAN.lat},${PERUMAHAN.lng}&destination=${selectedFacility.lat},${selectedFacility.lng}`
    : MAPS_LINK;

  const buttonText = selectedFacility
    ? `Rute ke ${selectedFacility.nama}`
    : "Buka Google Maps";

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* ── SECTION 1: Hero Split ── */}
      <section
        className="flex flex-col-reverse lg:flex-row"
        style={{ minHeight: "calc(100vh - 66px)" }}
      >
        {/* ── SIDEBAR KIRI ── */}
        <div className="w-full lg:w-[390px] xl:w-[420px] shrink-0 bg-[#FFF] flex flex-col px-8 py-10 lg:py-14 overflow-y-auto">
          {/* Label */}
          <p className="text-xs font-bold tracking-[0.18em] text-[#9c7524] uppercase mb-3">
            Konektivitas Urban
          </p>

          {/* Judul */}
          <h1 className="text-[32px] lg:text-[36px] font-manrope font-bold leading-[1.15] text-[#1A1C1A] mb-4">
            Lokasi Strategis &<br />Aksesibilitas
          </h1>

          {/* Deskripsi */}
          <p className="text-[14px] text-[#5F5E5E] leading-[1.65] mb-8">
            Pusat gaya hidup modern di Sukoharjo. Temukan kemudahan menjangkau
            fasilitas publik terbaik dalam hitungan menit.
          </p>

          {/* ── Filter Kategori ── */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 cursor-pointer ${activeCategory === cat
                    ? "bg-[#9c7524] text-white border-[#9c7524]"
                    : "bg-transparent text-[#5F5E5E] border-stone-300 hover:border-[#9c7524] hover:text-[#9c7524]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Daftar Fasilitas ── */}
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[460px] pr-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-[#9c7524]">
                <Loader2 className="animate-spin" size={28} />
                <p className="text-[13px] text-[#5F5E5E]">
                  Memuat fasilitas dari OpenStreetMap…
                </p>
              </div>
            ) : displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <p className="text-[14px] text-[#5F5E5E] text-center">
                  Tidak ada fasilitas ditemukan<br />untuk kategori ini.
                </p>
              </div>
            ) : (
              displayed.map((f, idx) => (
                <FasilitasCard 
                  key={f.id} 
                  facility={f} 
                  isFirst={idx === 0} 
                  onClick={() => handleFasilitasClick(f)}
                />
              ))
            )}
          </div>

          {/* ── Tombol Buka Google Maps ── */}
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full py-4 rounded-2xl bg-[#1A1C1A] text-white font-semibold text-[14px] flex items-center justify-center gap-2.5 hover:bg-[#333] transition-colors duration-200 text-center px-4 shrink-0"
          >
            <Navigation size={16} className="shrink-0" />
            <span className="truncate">{buttonText}</span>
          </a>
        </div>

        {/* ── PETA KANAN (Leaflet + OSM) ── */}
        <div className="relative flex-1 h-[400px] lg:h-auto z-0">
          <LeafletMap
            activeCategory={mapCategory}
            onFasilitasLoaded={handleFasilitasLoaded}
            onFasilitasClick={handleFasilitasClick}
            highlightId={highlightId}
          />
        </div>
      </section>

      {/* ── SECTION 2: Stats + CTA ── */}
      <section className="bg-[#F5F4F1] border-t border-stone-200">
        <div className="max-w-[1100px] mx-auto px-6 xl:px-0">
          <div className="flex flex-col md:flex-row gap-4 py-10">
            {/* Stat 1 */}
            <div className="flex-1 bg-white rounded-2xl md:rounded-[48px] p-8 flex flex-col items-center justify-center min-h-[130px]">
              <p className="text-[42px] font-extrabold text-[#9c7524] leading-none tracking-tight mb-2">
                05
              </p>
              <p className="text-[11px] font-bold text-[#5F5E5E] uppercase">
                Menit ke Pusat Kota
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex-1 bg-white rounded-2xl md:rounded-[48px] p-8 flex flex-col items-center justify-center min-h-[130px]">
              <p className="text-[42px] font-extrabold text-[#9c7524] leading-none tracking-tight mb-2">
                02
              </p>
              <p className="text-[11px] font-bold text-[#5F5E5E] uppercase">
                Akses Jalur Provinsi
              </p>
            </div>

            {/* CTA Card */}
            <div
              className="flex-[2] rounded-2xl md:rounded-[48px] p-8 px-10 flex flex-col justify-center min-h-[130px]"
              style={{ backgroundColor: "#8B6914" }}
            >
              <h2 className="text-[20px] font-bold text-white mb-2 leading-tight">
                Kawasan Berkembang Begajah
              </h2>
              <p className="text-[13px] text-white/80 leading-relaxed mb-4">
                Investasi properti paling menjanjikan di Sukoharjo dengan
                kenaikan nilai lahan yang signifikan setiap tahunnya.
              </p>
              <a
                href="/tentang"
                className="text-[13px] font-semibold text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all inline-flex items-center gap-1.5"
              >
                Pelajari Selengkapnya →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
