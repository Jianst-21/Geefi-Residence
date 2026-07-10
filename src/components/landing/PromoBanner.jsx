"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    desktop: "/images/landings/Promobannerdesktop.png",
    mobile: "/images/landings/PromobannerMobile.png",
  },
  {
    desktop: "/images/landings/Luxury House.png",
    mobile: "/images/landings/HeroMobile.png",
  },
  {
    desktop: "/images/tentang_hero.png",
    mobile: "/images/landings/HeroMobile.png",
  },
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#FFFFFF] flex justify-center items-center px-[32px] pt-[51px] md:pt-24 pb-[28px]">
      <div className="relative w-full max-w-[345px] md:max-w-[1216px] h-[236px] md:h-[400px] mx-auto rounded-[32px] overflow-hidden flex items-center shadow-2xl">
        {/* Gambar Background Desktop & Mobile */}
        <div className="absolute inset-0 w-full h-full">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.desktop}
                alt={`Abyakta Promo Banner ${index + 1}`}
                fill
                className="hidden md:block object-cover"
                priority={index === 0}
              />
              <Image
                src={slide.mobile}
                alt={`Abyakta Promo Banner Mobile ${index + 1}`}
                fill
                className="block md:hidden object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay: Mengurangi silau di sebelah kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35"></div>

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
            Kesempatan emas memiliki hunian impian dengan keringanan pembayaran
            maksimal khusus bulan ini.
          </p>
          <Link
            href="/simulasi-kpr"
            className="w-[120px] md:w-[132.52px] h-[32px] md:h-[36px] bg-white text-gray-900 rounded-full font-bold text-[14px] md:text-[14px] transition-all hover:bg-gray-200 shadow-lg flex items-center justify-center"
          >
            Klaim Promo
          </Link>
        </div>

        {/* Jarak dari bawah disesuaikan untuk mobile agar tidak menabrak teks */}
        <div className="absolute bottom-[16px] md:bottom-[28px] left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition ${
                index === currentSlide ? "bg-white shadow-md scale-110" : "bg-white/40 hover:bg-white/60"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
