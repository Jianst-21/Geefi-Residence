"use client";

import { useState } from "react";
import { Home, Layers, BedDouble, Bath, Calendar, MessageCircleMore } from "lucide-react";

export default function UnitTypeTabs({ types, children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = types[activeIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: specs */}
        <div className="flex-1">

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {[
              { label: "LUAS BANGUNAN", value: `${active.buildingArea} m²`, Icon: Home },
              { label: "LUAS TANAH", value: `${active.landArea} m²`, Icon: Layers },
              { label: "KAMAR TIDUR", value: `${active.bedrooms} Kamar`, Icon: BedDouble },
              { label: "KAMAR MANDI", value: `${active.bathrooms} Kamar`, Icon: Bath },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[11px] sm:text-xs font-bold text-secondary tracking-widest">{s.label}</span>
                <div className="flex items-center gap-2">
                  <s.Icon size={20} className="text-primary" />
                  <span className="font-bold text-foreground text-xl sm:text-2xl">{s.value}</span>
                </div>
              </div>
            ))}
          </div>

          {children}
        </div>

        {/* Right: pricing sidebar */}
        <div className="lg:w-92 flex-shrink-0">
          <UnitPriceCard unit={active} />
        </div>
      </div>
    </section>
  );
}

function UnitPriceCard({ unit }) {
  const wa = `https://wa.me/${unit.whatsappNumber || "6281234567890"}?text=Halo, saya tertarik dengan ${unit.label}`;

  return (
    <div className="bg-background-secondary rounded-[48px] p-8 flex flex-col h-full min-h-[400px]">
      <p className="text-sm text-secondary mb-2">Mulai Dari</p>
      <div className="mb-1">
        <span className="text-[28px] sm:text-[36px] font-bold text-primary leading-none">
          Rp {unit.price}
        </span>
      </div>
      <p className="text-xs text-secondary mb-10">*S&K Berlaku | Harga Estimasi</p>

      <div className="flex flex-col gap-4 mt-auto">
        <button className="w-full bg-[#936615] hover:bg-[#7e5610] text-white font-semibold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <Calendar size={20} /> Jadwalkan Kunjungan
        </button>
        
        <div className="mt-8">
          <p className="text-xs text-secondary mb-4 leading-relaxed">
            Ingin konsultasi lebih lanjut mengenai simulasi KPR atau promo bulan ini?
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#936615] font-bold text-sm hover:underline flex items-center gap-2"
          >
            <MessageCircleMore size={18} /> Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
