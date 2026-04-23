"use client";
import React from "react";

export default function Testimonials() {
  // Data ulasan penghuni sesuai dengan desain
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Penghuni Tipe 72",
      text: '"Keputusan terbaik yang pernah kami ambil. Lingkungannya sangat tenang dan aman untuk anak-anak bermain di sore hari."',
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      type: "side", // Kartu sisi (384 x 257)
    },
    {
      id: 2,
      name: "Maya Putri",
      role: "Penghuni Tipe 54",
      text: '"Desain minimalisnya sangat modern dan mewah. Akses ke pintu tol sangat dekat, memudahkan mobilitas saya bekerja di Jakarta."',
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      type: "center", // Kartu tengah (384 x 283)
    },
    {
      id: 3,
      name: "Andi Wijaya",
      role: "Penghuni Tipe 72",
      text: '"Kualitas bangunan yang jempolan dan pelayanan purna jual yang ramah. Benar-benar hunian impian keluarga kami."',
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      type: "side", // Kartu sisi (384 x 257)
    }
  ];

  // Komponen Helper untuk merender 5 Bintang Emas
  const StarRating = () => (
    <div className="flex items-center gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#D4A017" stroke="#D4A017" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ))}
    </div>
  );

  return (
    // Background Section menggunakan warna spesifik #FDFCF9
    <section className="w-full bg-[#FDFCF9] font-['Manrope'] pb-24">
      
      {/* Container utama dengan lebar maksimum sesuai auto-layout Figma (1280px) */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-0 flex flex-col items-center">
        
        {/* HEADER SECTION (Padding atas 96px absolut) */}
        <div className="pt-[96px] flex flex-col items-center w-full">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A1A1A] mb-3 text-center">
            Apa Kata Penghuni Kami?
          </h2>
          
          {/* Subtitle Presisi: teks 16px, max-width ~640px, tinggi mutlak h-[24px], dan jarak bawah 64px */}
          <p className="text-[16px] text-gray-500 text-center w-full max-w-[640px] h-[24px] mb-[64px]">
            Pengalaman nyata dari mereka yang telah menemukan kebahagiaan di Geefi Residence.
          </p>
        </div>

        {/* AREA KARTU TESTIMONI (Gap antar elemen persis 32px) */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-[32px] w-full">
          
          {testimonials.map((testi) => (
            <div 
              key={testi.id} 
              className={`
                bg-white rounded-[24px] p-8 flex flex-col justify-between shrink-0
                ${testi.type === "center" 
                  // KARTU TENGAH: Presisi ukuran 384x283 dengan bayangan menonjol
                  ? "w-full lg:w-[384px] h-auto lg:h-[283px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50/50" 
                  // KARTU KIRI & KANAN: Presisi ukuran 384x257
                  : "w-full lg:w-[384px] h-auto lg:h-[257px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-gray-100"
                }
              `}
            >
              
              {/* Bintang & Teks Ulasan */}
              <div>
                <StarRating />
                <p className="text-[#4A4A4A] text-[15px] leading-[24px]">
                  {testi.text}
                </p>
              </div>

              {/* Profil Penghuni (Avatar, Nama, dan Tipe) */}
              <div className="flex items-center gap-4 mt-6">
                <img 
                  src={testi.avatar} 
                  alt={testi.name} 
                  className="w-[48px] h-[48px] rounded-full object-cover bg-gray-200"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-[#1A1A1A] text-[15px] leading-tight">
                    {testi.name}
                  </span>
                  <span className="text-[#8E8E8E] text-[12px] font-medium mt-0.5">
                    {testi.role}
                  </span>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}