"use client";
import React from 'react';
import { BedDouble, Bath } from 'lucide-react';
import { PROPERTIES_DATA } from '@/constants/properties'; 

export default function HousingRecommendations() {
  return (
    <section className="w-full bg-[#FAF9F6] pt-0 pb-[77.69px] font-['Manrope']">
      <div className="max-w-[1184px] mx-auto px-4 xl:px-0">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-[64px]">
          <h2 className="text-[36px] font-bold leading-[40px] text-[#1A1C1A] mb-[16px]">
            Rekomendasi Hunian
          </h2>
          <div className="w-[96px] h-[4px] bg-[#B27C21] mb-[24px]"></div>
          <p className="text-[24px] font-normal leading-[36px] text-[#5F5E5E] max-w-[800px]">
            Temukan pilihan unit eksklusif kami yang dirancang dengan presisi untuk memenuhi standar gaya hidup modern Anda.
          </p>
        </div>

        {/* ================= GRID KARTU PROPERTI ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
          {/* Mapping menggunakan data dari constant */}
          {PROPERTIES_DATA.map((property) => (
            <div 
              key={property.id} 
              className="w-full flex flex-col group"
            >
              {/* ================= DIV GAMBAR ================= */}
              <div className="relative h-[453.31px] w-full overflow-hidden shrink-0 rounded-[48px] bg-[#F4F3F1] shadow-sm">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-[24px] left-[24px]">
                  <span className="bg-white/80 backdrop-blur-sm text-[#7E5300] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                    {property.type}
                  </span>
                </div>
              </div>

              {/* ================= KONTEN TEKS ================= */}
              <div className="flex flex-col mt-[32px]">
                <h3 className="text-[24px] font-bold leading-[32px] tracking-[-0.6px] text-[#1A1C1A] mb-[63px]">
                  {property.name}
                </h3>
                
                <div className="flex items-center gap-6 text-[#5F5E5E]">
                  <div className="flex items-center gap-2">
                    <BedDouble size={18} strokeWidth={2} />
                    <span className="text-[12px] font-bold">{property.bedrooms} KT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={18} strokeWidth={2} />
                    <span className="text-[12px] font-bold">{property.bathrooms} KM</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mt-[32px]">
                  <span className="text-[20px] font-bold text-[#7E5300]">
                    Rp {property.price}
                  </span>
                  <span className="text-[10px] text-[#5F5E5E] font-medium italic">mulai dari</span>
                </div>
                
                <button className="w-full bg-[#7E5300] hover:bg-[#634200] text-white text-[12px] font-bold py-[16px] rounded-full transition-colors uppercase tracking-widest mt-[16px]">
                  LIHAT DETAIL
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}