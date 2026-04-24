"use client";
import React from "react";
// Import icon yang sesuai dari lucide-react
import { MapPin, ShieldCheck, Trees } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Lokasi Strategis",
      desc: "Berada tepat di akses utama kota dengan kemudahan jangkauan ke fasilitas umum penting.",
      // Ikon MapPin menggantikan SVG custom lokasi
      icon: <MapPin size={32} strokeWidth={1.75} />
    },
    {
      title: "Keamanan 24/7",
      desc: "Sistem keamanan satu pintu dengan pengawasan CCTV dan petugas keamanan profesional.",
      // Ikon ShieldCheck menggantikan SVG custom keamanan
      icon: <ShieldCheck size={32} strokeWidth={1.75} />
    },
    {
      title: "Lingkungan Asri",
      desc: "Ruang terbuka hijau yang luas dan taman tematik untuk keseimbangan hidup keluarga Anda.",
      // Ikon Trees menggantikan SVG custom pohon
      icon: <Trees size={32} strokeWidth={1.75} />
    }
  ];

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* BAGIAN JUDUL */}
        <div className="text-center flex flex-col items-center mb-16">
          <h2 className="w-full max-w-[616px] md:h-[40px] text-3xl md:text-[32px] leading-[40px] font-bold text-gray-900 mb-4 font-['Manrope'] flex items-center justify-center">
            Mengapa Memilih Geefi Residence?
          </h2>
          <p className="w-full max-w-[672px] md:h-[24px] text-gray-500 text-sm md:text-[16px] leading-[24px] flex items-start justify-center">
            Kami mengedepankan kualitas hidup penghuni melalui pemilihan lokasi dan fasilitas terbaik.
          </p>
        </div>

        {/* BAGIAN GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-[2rem] p-8 lg:p-10 flex flex-col items-start w-full max-w-[384px] min-h-[298px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              {/* WADAH IKON KREM & IKON EMAS */}
              <div className="w-[64px] h-[64px] bg-[#FDF2E3] rounded-2xl flex items-center justify-center text-[#B27C21] mb-8">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Manrope']">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}