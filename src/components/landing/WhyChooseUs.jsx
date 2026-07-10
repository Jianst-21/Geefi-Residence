"use client";
import React from "react";
import { MapPin, Home, CircleDollarSign } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Lokasi Strategis",
      desc: "Berada tepat di akses utama kota dengan kemudahan jangkauan ke fasilitas umum penting.",
      icon: <MapPin size={32} strokeWidth={1.75} />
    },
    {
      title: "Perumahan Modern",
      desc: "Kawasan perumahan mewah dan modern, dikelola management profesional.",
      icon: <Home size={32} strokeWidth={1.75} />
    },
    {
      title: "Investasi Tinggi",
      desc: "Berada di kawasan dengan tingkat pembangunan tinggi yang punya potensi investasi menjanjikan",
      icon: <CircleDollarSign size={32} strokeWidth={1.75} />
    }
  ];

  return (
    <section className="bg-[#FAF9F6] pt-[48px] pb-0 md:pt-[80px] md:pb-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* BAGIAN JUDUL */}
        {/* PERUBAHAN: mb-[24px] untuk mobile, md:mb-[64px] untuk desktop */}
        <div className="text-center flex flex-col items-center mb-[24px] md:mb-[64px]">
          <h2 className="w-full max-w-[616px] md:h-[40px] text-3xl md:text-[32px] leading-[40px] font-bold text-gray-900 mb-4 font-['Manrope'] flex items-center justify-center">
            Mengapa Memilih Abyakta?
          </h2>
          <p className="w-full max-w-[672px] md:h-[24px] text-gray-500 text-sm md:text-[16px] leading-[24px] flex items-start justify-center">
            Kami mengedepankan kualitas hidup penghuni melalui pemilihan lokasi dan fasilitas terbaik.
          </p>
        </div>

        {/* BAGIAN GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] place-items-center">
          
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-[2rem] p-[40px] flex flex-col items-start w-full max-w-[384px] min-h-[298px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              {/* WADAH IKON KREM & IKON EMAS */}
              <div className="w-[64px] h-[64px] bg-[#FDF2E3] rounded-2xl flex items-center justify-center text-[#B27C21] mb-[24px]">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-[24px] font-['Manrope']">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-[16px]">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}