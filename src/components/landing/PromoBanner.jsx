import React from "react";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="w-full bg-[#FFFFFF] flex justify-center items-center px-[32px] pt-[51px] md:pt-24 pb-[28px]">
      <div className="relative w-full max-w-[345px] md:max-w-[1216px] h-[236px] md:h-[400px] mx-auto rounded-[32px] overflow-hidden flex items-center shadow-2xl">
        
        {/* Gambar Background Desktop & Mobile */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/landings/Promobannerdesktop.png"
            alt="Geefi Residence Promo Banner"
            fill
            className="hidden md:block object-cover"
            priority
          />
          <Image
            src="/images/landings/PromobannerMobile.png" 
            alt="Geefi Residence Promo Banner Mobile"
            fill
            className="block md:hidden object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        {/* KONTEN TEKS & TOMBOL */}
        {/* Padding mobile diperkecil (px-6) agar pas di lebar 345px */}
        <div className="relative z-10 px-6 md:px-[64px] w-full max-w-[1120px]">
          
          {/* Badge Limited Offer */}
          <div className="w-fit px-[10px] py-[4px] bg-[#B27C21] text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-3 md:mb-5 flex items-center justify-center">
            LIMITED OFFER
          </div>
          
          {/* Judul: Font diperkecil di mobile (text-2xl) */}
          <h2 className="w-full text-[16px] md:text-[44px] font-bold text-white leading-[1.2] mb-2 md:mb-4">
            Promo Bunga 0% & Free Biaya KPR
          </h2>
          
          {/* Deskripsi: Font diperkecil di mobile (text-xs) dan margin bawah dikurangi */}
          <p className="w-full max-w-[448px] text-gray-200 text-xs md:text-base leading-relaxed mb-4 md:mb-8">
            Kesempatan emas memiliki hunian impian dengan keringanan pembayaran maksimal khusus bulan ini.
          </p>
          
          <button className="w-[120px] md:w-[132.52px] h-[32px] md:h-[36px] bg-white text-gray-900 rounded-full font-bold text-[14px] md:text-[14px] transition-all hover:bg-gray-200 shadow-lg flex items-center justify-center">
            Klaim Promo
          </button>

        </div>

        {/* Titik-titik Carousel */}
        {/* Jarak dari bawah disesuaikan untuk mobile agar tidak menabrak teks */}
        <div className="absolute bottom-[16px] md:bottom-[28px] left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10">
          <div className="w-2 h-2 rounded-full bg-white shadow-md"></div>
          <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 cursor-pointer transition"></div>
          <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 cursor-pointer transition"></div>
        </div>

      </div>
    </section>
  );
}