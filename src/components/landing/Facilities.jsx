"use client";
import React from "react";
// Import semua ikon murni dari lucide-react
import { Waves, Dumbbell, Smile, Landmark } from "lucide-react";

export default function Facilities() {
  const facilities = [
    {
      name: "Kolam Renang",
      // Menggunakan ikon Ombak untuk representasi air
      icon: <Waves size={28} strokeWidth={2} />
    },
    {
      name: "Clubhouse & Gym",
      icon: <Dumbbell size={28} strokeWidth={2} />
    },
    {
      name: "Playground",
      icon: <Smile size={28} strokeWidth={2} />
    },
    {
      name: "Masjid Modern",
      // Menggunakan ikon Landmark untuk representasi bangunan ikonik/arsitektur
      icon: <Landmark size={28} strokeWidth={2} />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        
        {/* BAGIAN JUDUL */}
        <div className="text-center flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-[32px] font-bold text-[#1A1C1A] mb-4 font-['Manrope']">
            Fasilitas Eksklusif
          </h2>
          <p className="w-full max-w-2xl text-gray-500 text-sm md:text-[16px] leading-[24px]">
            Dirancang untuk memenuhi gaya hidup modern dan memberikan kenyamanan maksimal bagi setiap penghuni.
          </p>
        </div>

        {/* BAGIAN GRID FASILITAS */}
        <div className="w-full max-w-[1216px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
          
          {facilities.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center w-full h-[130px] bg-white border border-[#D4C4B1]/30 rounded-2xl hover:border-[#7E5300]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group cursor-pointer"
            >
              {/* Wadah Ikon (Warna Emas Gelap #7E5300) */}
              <div className="text-[#7E5300] mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              {/* Teks Fasilitas (Warna Hitam Pekat #1A1C1A) */}
              <span className="font-bold text-[#1A1C1A] text-[14px] lg:text-[15px] font-['Manrope']">
                {item.name}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}