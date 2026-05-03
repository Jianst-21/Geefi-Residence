"use client";
import React from "react";
import { Bed, Bath } from "lucide-react";

// IMPORT DATA DARI CONSTANTS YANG BARU
import { units } from "../../constants/unitTypes";

export default function UnitTypes() {
  return (
    <>
      {/* Padding mobile atas-bawah 48.17px, Desktop atas 60px dan bawah 96px */}
      <section className="bg-[#F4F3F1] pt-[48.17px] pb-[48.17px] md:pt-[60px] md:pb-[96px]">
        <div className="max-w-[1184px] mx-auto px-6 lg:px-0">
          
          {/* HEADER SECTION */}
          <div className="text-center mb-[32px] md:mb-[50px] flex flex-col items-center">
            <h2 className="text-[36px] md:text-[36px] font-extrabold text-[#1A1A1A] font-['Manrope']">
              Pilihan Tipe Unit
            </h2>
          </div>

          {/* GRID KARTU UNIT */}
          <div className="flex flex-col md:flex-row justify-between gap-[18px] md:gap-6 lg:gap-[32px]">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="w-full md:w-[363px] flex flex-col mx-auto font-['Manrope']"
              >
                {/* GAMBAR RUMAH */}
                <div className="relative w-full h-[453px] rounded-[48px] overflow-hidden mb-6 group cursor-pointer bg-gray-200">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />

                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 h-[28px] flex items-center justify-center rounded-full shadow-sm">
                    <span className="text-[#8E6319] text-[10px] font-bold tracking-widest uppercase leading-none pt-[1px]">
                      {unit.badge}
                    </span>
                  </div>
                </div>

                {/* INFORMASI UNIT */}
                <div className="flex flex-col px-1">
                  <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-2 leading-tight">
                    {unit.name}
                  </h3>

                  <div className="flex items-center gap-5 text-[#757575] mb-5 text-[13px]">
                    <div className="flex items-center gap-1.5">
                      <Bed size={16} strokeWidth={1.5} />
                      <span>{unit.beds} KT</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath size={16} strokeWidth={1.5} />
                      <span>{unit.baths} KM</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-[22px] font-bold text-[#9D6A0C]">
                      {unit.price}
                    </span>
                    <span className="text-[11px] text-[#A3A3A3]">mulai dari</span>
                  </div>

                  {/* TOMBOL AKSI */}
                  <div className="flex items-center gap-[16px] mt-auto">
                    {/* Tombol Utama */}
                    <button className="flex-1 h-[50px] bg-[#9D6A0C] text-white font-bold text-[12px] tracking-[0.05em] uppercase rounded-full hover:bg-[#7E5300] transition-colors">
                      LIHAT DETAIL
                    </button>

                    {/* Tombol Ikon Kalkulator (Hanya muncul di Desktop) */}
                    <button className="hidden md:flex shrink-0 items-center justify-center text-[#9D6A0C] hover:text-[#7E5300] transition-colors pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="12" y1="3" x2="12" y2="21"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="6.5" y1="7.5" x2="8.5" y2="7.5"></line>
                        <line x1="15.5" y1="6.5" x2="17.5" y2="8.5"></line>
                        <line x1="17.5" y1="6.5" x2="15.5" y2="8.5"></line>
                        <line x1="7.5" y1="15.5" x2="7.5" y2="17.5"></line>
                        <line x1="6.5" y1="16.5" x2="8.5" y2="16.5"></line>
                        <line x1="15.5" y1="16" x2="17.5" y2="16"></line>
                        <line x1="15.5" y1="17.5" x2="17.5" y2="17.5"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Div background tambahan untuk mobile (h-[24px]) */}
      <div className="w-full h-[24px] bg-[#FAF9F6]"></div>
    </>
  );
}