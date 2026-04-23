"use client";
import React from "react";
import { GraduationCap, Hospital, Map } from "lucide-react"; 

export default function LocationSection() {
  const accessibilities = [
    {
      id: 1,
      name: "SDIT Al-Irsyad",
      time: "Hanya 3 menit perjalanan",
      icon: <GraduationCap size={20} strokeWidth={2} />,
    },
    {
      id: 2,
      name: "RS Hermina",
      time: "Hanya 5 menit perjalanan",
      icon: <Hospital size={20} strokeWidth={2} />,
    },
    {
      id: 3,
      name: "Tol Plumpung",
      time: "Hanya 10 menit perjalanan",
      // Menggunakan ikon Map/Rute menyilang sesuai gambar
      icon: <Map size={20} strokeWidth={2} />, 
    }
  ];

  return (
    // Background utama #FAF9F6 dengan padding bottom absolut 200px
    <section className="w-full bg-[#FAF9F6] pb-[200px] font-['Manrope']">
      
      {/* Container utama lebar 1216px */}
      <div className="max-w-[1216px] mx-auto px-6 xl:px-0">
        
        {/* WADAH FLEX KIRI-KANAN (Tinggi absolut 500px, Gap persis 48px) */}
        <div className="w-full h-auto lg:h-[500px] flex flex-col lg:flex-row gap-[48px]">
          
          {/* SISI KIRI: PETA (Punya border-radius dan shadow sendiri) */}
          <div className="flex-1 w-full h-[350px] lg:h-full relative bg-gray-200 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 shrink-0">
            {/* Embed Iframe Google Maps */}
            <iframe
              src="https://maps.google.com/maps?q=Sukoharjo,Bendosari&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* SISI KANAN: DAFTAR AKSESIBILITAS (Lebar fixed proporsional, tanpa background putih) */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col justify-between py-[18px]">
            
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1A1C1A] mb-10 leading-tight">
                Aksesibilitas Utama
              </h2>

              <div className="flex flex-col gap-8">
                {accessibilities.map((item) => (
                  <div key={item.id} className="flex items-start gap-5">
                    {/* Wadah Ikon (Background Emas Transparan 10%) */}
                    <div className="w-[48px] h-[48px] rounded-full bg-[#7E5300]/10 flex items-center justify-center shrink-0 text-[#7E5300]">
                      {item.icon}
                    </div>
                    {/* Teks Informasi */}
                    <div className="flex flex-col pt-0.5">
                      <span className="font-bold text-[#1A1C1A] text-[15px] lg:text-[16px] mb-1 leading-none">
                        {item.name}
                      </span>
                      <span className="text-[#5F5E5E] text-[13px] lg:text-[14px]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOMBOL LIHAT ALAMAT */}
            {/* Outline border emas, rounded penuh, text emas */}
            <button className="w-full h-[52px] rounded-full border-[1.5px] border-[#B48832] text-[#7E5300] font-bold text-[14px] tracking-wide hover:bg-[#7E5300] hover:text-white transition-all duration-300 mt-10 lg:mt-0">
              Lihat alamat lengkap
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}