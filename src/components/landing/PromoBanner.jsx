import React from "react";

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 mt-20 md:mt-24 mb-16">
      <div className="relative w-full rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[450px] flex items-center shadow-2xl">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gray-800 bg-[url('/promo-bg.jpg')] bg-cover bg-center">
          <span className="absolute right-10 top-1/2 text-white/20">Taruh Background Di Sini</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        {/* KONTEN TEKS & TOMBOL DENGAN UKURAN PRESISI */}
        {/* Wadah utama dibatasi maksimal 1120px sesuai ukuran Fill di Figma */}
        <div className="relative z-10 px-8 md:px-16 w-full max-w-[1120px] py-12">
          
          {/* Badge Limited Offer: 107.84px x 39px */}
          <div className="w-[107.84px] h-[39px] bg-[#B48332] text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-5 flex items-center justify-center">
            Limited Offer
          </div>
          
          {/* Judul Promo: Fill Width x 96px */}
          <h2 className="w-full md:h-[96px] text-4xl md:text-5xl font-bold text-white leading-tight mb-4 flex items-center">
            <span>Promo Bunga 0% &<br /> Free Biaya KPR</span>
          </h2>
          
          {/* Deskripsi: 448px (Max Width) x 72px */}
          <p className="w-full max-w-[448px] md:h-[72px] text-gray-200 text-sm md:text-base leading-relaxed mb-8 flex items-start">
            Kesempatan emas memiliki hunian impian dengan keringanan pembayaran maksimal khusus bulan ini.
          </p>
          
          {/* Tombol Klaim: 132.52px x 36px */}
          <button className="w-[132.52px] h-[36px] bg-white text-gray-900 rounded-full font-bold text-[13px] transition-all hover:bg-gray-200 shadow-lg flex items-center justify-center">
            Klaim Promo
          </button>

        </div>

        {/* Titik-titik Carousel */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10">
          <div className="w-2 h-2 rounded-full bg-white shadow-md"></div>
          <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 cursor-pointer transition"></div>
          <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 cursor-pointer transition"></div>
        </div>

      </div>
    </section>
  );
}