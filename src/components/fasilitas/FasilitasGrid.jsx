import React from "react";
import { IdCard, ShieldCheck, Building2 } from "lucide-react";

export default function FasilitasGrid() {
  return (
    <div className="max-w-6xl mx-auto px-4 mb-6 flex flex-col gap-6">
      
      {/* Top Row */}
      <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[380px]">
        
        {/* ONE GATE SYSTEM + Gate Image (Span 2/3) */}
        <div className="w-full md:w-2/3 bg-[#F8F7F5] rounded-[32px] flex flex-col md:flex-row overflow-hidden shadow-sm">
          {/* Text Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col items-start justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-[var(--color-primary)] shadow-sm">
              <IdCard className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">ONE GATE SYSTEM</h3>
            <p className="text-[var(--color-secondary)] text-base mb-8 leading-relaxed">
              Sistem akses tunggal yang menjamin privasi dan keamanan maksimal bagi setiap penghuni Geefi Residence.
            </p>
            <p className="text-[var(--color-primary)] text-[11px] font-bold tracking-widest uppercase mt-auto">
              SECURITY & PRIVACY FOCUSED
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-0">
            <img src="/images/fasilitas/1.png" className="absolute inset-0 w-full h-full object-cover" alt="Gate System" />
          </div>
        </div>

        {/* POS SATPAM (Span 1/3) */}
        <div className="w-full md:w-1/3 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 flex flex-col items-start shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#F8F7F5] flex items-center justify-center mb-6 text-[var(--color-primary)]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">POS SATPAM</h3>
          <p className="text-[var(--color-secondary)] text-base mb-8 leading-relaxed">
            Penjagaan profesional selama 24 jam penuh untuk memberikan rasa tenang bagi keluarga Anda.
          </p>
          <div className="mt-auto flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
            <p className="text-[var(--color-secondary)] text-[11px] font-bold tracking-widest uppercase">
              24/7 SECURITY PRESENCE
            </p>
          </div>
        </div>
        
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[380px]">
        
        {/* LOKASI STRATEGIS (Span 1/3) */}
        <div className="w-full md:w-1/3 relative rounded-[32px] overflow-hidden flex flex-col justify-end shadow-sm min-h-[300px] md:min-h-0">
          <img src="/images/fasilitas/2.png" className="absolute inset-0 w-full h-full object-cover" alt="Lokasi Strategis" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent"></div>
          <div className="relative z-10 p-8 md:p-10">
            <h3 className="text-2xl font-bold text-white mb-2">LOKASI STRATEGIS</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Berada tepat di poros utama kota untuk aksesibilitas tanpa batas.
            </p>
            <p className="text-white/70 text-[11px] font-bold tracking-widest uppercase">
              POROS UTAMA KOTA
            </p>
          </div>
        </div>

        {/* MASUK WILAYAH PERKOTAAN + Building Image (Span 2/3) */}
        <div className="w-full md:w-2/3 bg-[#F8F7F5] rounded-[32px] md:pr-12 md:py-12 md:pl-4 p-4 flex flex-col md:flex-row shadow-sm gap-4">
          
          {/* Text Section */}
          <div className="w-full md:w-1/2 p-4 md:pl-6 md:py-6 flex flex-col items-start justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-[var(--color-primary)] shadow-sm">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
              MASUK WILAYAH<br/>PERKOTAAN
            </h3>
            <p className="text-[var(--color-secondary)] text-base mb-8 leading-relaxed">
              Investasi cerdas di wilayah yang terus berkembang dengan konektivitas urban yang matang.
            </p>
            <div className="flex gap-3 mt-auto flex-wrap">
              <span className="bg-white px-5 py-2.5 rounded-full text-[10px] font-bold text-[var(--color-primary)] tracking-widest uppercase shadow-sm">
                HIGH GROWTH AREA
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-[10px] font-bold text-[var(--color-primary)] tracking-widest uppercase shadow-sm">
                URBAN CONNECTIVITY
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-[250px] md:h-full rounded-[24px] overflow-hidden shadow-sm relative">
            <img src="/images/fasilitas/3.png" className="absolute inset-0 w-full h-full object-cover" alt="Building" />
          </div>

        </div>
        
      </div>
    </div>
  );
}
