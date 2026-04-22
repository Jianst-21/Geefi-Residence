"use client";
import React, { useState } from "react";
import { Bed, Bath, CarFront, Home, Trees, Waves, ArrowRight } from "lucide-react"; 

export default function Masterplan() {
  // DATA BARIS 1 (Tepat 8 Slot sebelum fasilitas)
  const row1Data = [
    { type: "plot", id: "A02", status: "sold" },
    { type: "plot", id: "A03", status: "available", unitType: "Standard 45/60", price: "IDR 1.8B", beds: 2, baths: 1, cars: 1 },
    { type: "plot", id: "A04", status: "available", unitType: "Standard 45/60", price: "IDR 1.8B", beds: 2, baths: 1, cars: 1 },
    { type: "plot", id: "A05", status: "available", unitType: "Premium 54/60", price: "IDR 2.4B", beds: 3, baths: 2, cars: 1 },
    { type: "empty", id: "gap1" }, 
    { type: "plot", id: "B01", status: "available", unitType: "Premium 54/60", price: "IDR 2.4B", beds: 3, baths: 2, cars: 1 },
    { type: "plot", id: "B02", status: "available", unitType: "Premium 54/60", price: "IDR 2.4B", beds: 3, baths: 2, cars: 1 },
    { type: "plot", id: "B03", status: "sold" },
  ];

  // DATA BARIS 2 (Tepat 8 Slot sebelum fasilitas)
  const row2Data = [
    { type: "empty", id: "gap2" }, 
    { type: "plot", id: "C02", status: "available", unitType: "Exclusive 72/90", price: "IDR 3.2B", beds: 4, baths: 3, cars: 2 },
    { type: "empty", id: "gap3" }, 
    { type: "plot", id: "C03", status: "available", unitType: "Exclusive 72/90", price: "IDR 3.2B", beds: 4, baths: 3, cars: 2 },
    { type: "plot", id: "C04", status: "sold" },
    { type: "plot", id: "C05", status: "sold" },
    { type: "plot", id: "C06", status: "available", unitType: "Exclusive 72/90", price: "IDR 3.2B", beds: 4, baths: 3, cars: 2 },
    { type: "empty", id: "gap4" }, 
  ];

  const [selectedPlot, setSelectedPlot] = useState(row1Data.find(p => p.id === "B02"));

  const renderSlot = (item) => {
    if (item.type === "empty") {
      return <div key={item.id} className="w-[60px] md:w-[76px] flex-shrink-0"></div>; 
    }

    const isSelected = selectedPlot?.id === item.id;
    const isAvailable = item.status === "available";

    return (
      <button
        key={item.id}
        onClick={() => isAvailable && setSelectedPlot(item)}
        disabled={!isAvailable}
        className={`
          relative flex-shrink-0 w-[60px] md:w-[76px] h-[160px] md:h-[200px] rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-300
          ${isAvailable 
            ? isSelected
              ? "bg-gradient-to-b from-[#7E5300] to-[#9D6A0C] text-white shadow-[0_10px_20px_rgba(126,83,0,0.4)] scale-105 border-[3px] md:border-[4px] border-white z-10" 
              : "bg-gradient-to-b from-[#7E5300] to-[#9D6A0C] text-white/90 hover:-translate-y-2 hover:shadow-lg cursor-pointer" 
            : "bg-gray-200/50 text-gray-400 cursor-not-allowed" 
          }
        `}
      >
        <span className="-rotate-90 block tracking-widest">{item.id}</span>
      </button>
    );
  };

  return (
    <section className="py-20 bg-white">
      {/* Menggunakan max-w-[1280px] sesuai ukuran frame di Figma */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-0"> 
        
        {/* HEADER DIPERBAIKI (Layout Baru & Margin Bawah 48px Presisi) */}
        <div className="mb-[48px] font-['Manrope']">
          <p className="text-[#9D6A0C] text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase mb-4">
            UNIT TERBATAS!
          </p>
          
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold text-[#1A1A1A] leading-[1.2] mb-6">
            Wujudkan Hunian Impian di Titik Paling Strategis
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed max-w-[800px]">
              Pilih masa depan Anda dengan presisi. Temukan unit terbaik yang sesuai dengan profil Anda, lengkap dengan informasi spesifikasi dan ketersediaan secara real-time.
            </p>
            
            {/* Legend (Tersedia / Habis) diletakkan di sebelah kanan sejajar deskripsi */}
            <div className="flex items-center gap-6 text-[12px] md:text-[13px] font-bold tracking-widest shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#9D6A0C]"></div>
                <span className="text-[#7E5300]">TERSEDIA</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#E5E5E5]"></div>
                <span className="text-gray-400">HABIS</span>
              </div>
            </div>
          </div>
        </div>

        {/* WADAH UTAMA INTERAKTIF */}
        {/* Padding Presisi Figma: py-[48px] px-[64px] (ditulis sebagai py-12 px-16 di Tailwind) */}
        <div className="w-full bg-[#F4F3F1] rounded-[48px] py-[48px] px-[32px] lg:px-[64px] flex flex-col xl:flex-row min-h-[781px] overflow-hidden shadow-sm border border-gray-100 gap-[48px]">
          
          {/* SISI KIRI: Peta Masterplan */}
          <div className="flex-1 flex flex-col justify-center gap-8 lg:gap-[48px] relative overflow-x-auto custom-scrollbar">
            
            {/* BARIS 1 */}
            <div className="flex items-center gap-4 md:gap-[24px] min-w-max">
              {row1Data.map(renderSlot)}
              <div className="w-4 md:w-[24px] flex-shrink-0"></div>
              <div className="flex-shrink-0 w-[272px] h-[167px] bg-[#EBE8E3] rounded-[80px] flex items-center justify-center gap-3 text-[#7E5300]">
                <Trees size={22} />
                <span className="text-sm font-bold tracking-widest uppercase">Zengarden</span>
              </div>
            </div>

            {/* BARIS 2 */}
            <div className="flex items-center gap-4 md:gap-[24px] min-w-max">
              {row2Data.map(renderSlot)}
              <div className="w-4 md:w-[24px] flex-shrink-0"></div>
              <div className="flex-shrink-0 w-[272px] h-[167px] bg-[#EBE8E3] rounded-[80px] flex items-center justify-center gap-3 text-[#7E5300]">
                <Waves size={22} />
                <span className="text-sm font-bold tracking-widest uppercase">Residence</span>
              </div>
            </div>

            <div className="mt-4 flex justify-start sticky left-0">
              <div className="bg-white px-6 py-4 rounded-full shadow-sm text-[11px] md:text-xs font-bold tracking-widest text-[#9D6A0C] flex items-center gap-3">
                <div className="p-1.5 bg-[#9D6A0C]/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                </div>
                KLIK WARNA EMAS UNTUK MELIHAT SPESIFIKASI DETAIL
              </div>
            </div>
          </div>

          {/* SISI KANAN: Panel Detail Unit (Lebar Presisi 292px) */}
          <div className="w-full xl:w-[292px] shrink-0 bg-white p-6 md:p-8 flex flex-col font-['Manrope'] border border-gray-100 rounded-[32px] xl:rounded-none xl:rounded-l-[32px] xl:border-y-0 xl:border-r-0 xl:-my-[48px] xl:-mr-[64px] xl:py-[48px] xl:px-[32px] shadow-xl xl:shadow-[-20px_0_50px_-15px_rgba(0,0,0,0.05)]">
            
            <div className="flex items-center gap-3 text-[#7E5300] font-bold text-lg mb-8 border-b border-gray-100 pb-4">
              <Home size={22} />
              <h3>Detail Unit</h3>
            </div>

            {selectedPlot ? (
              <div className="flex flex-col h-full">
                
                <div className="mb-8">
                  <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Unit Terpilih</p>
                  <h4 className="text-[28px] md:text-[32px] font-bold text-[#7E5300] mb-6">Plot {selectedPlot.id}</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs md:text-sm">Tipe Unit</span>
                      <span className="font-bold text-gray-900 text-xs md:text-sm">{selectedPlot.unitType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs md:text-sm">Harga Mulai dari</span>
                      <span className="font-bold text-[#7E5300] text-xs md:text-sm">{selectedPlot.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 mb-8">
                  <div className="bg-[#F4F3F1] rounded-full py-4 px-2 flex-1 flex flex-col items-center justify-center gap-1.5">
                    <Bed size={20} className="text-gray-500" />
                    <span className="block font-bold text-gray-900 leading-none mt-1">{selectedPlot.beds}</span>
                    <span className="text-[10px] text-gray-500 font-bold">KT</span>
                  </div>
                  <div className="bg-[#F4F3F1] rounded-full py-4 px-2 flex-1 flex flex-col items-center justify-center gap-1.5">
                    <Bath size={20} className="text-gray-500" />
                    <span className="block font-bold text-gray-900 leading-none mt-1">{selectedPlot.baths}</span>
                    <span className="text-[10px] text-gray-500 font-bold">KM</span>
                  </div>
                  <div className="bg-[#F4F3F1] rounded-full py-4 px-2 flex-1 flex flex-col items-center justify-center gap-1.5">
                    <CarFront size={20} className="text-gray-500" />
                    <span className="block font-bold text-gray-900 leading-none mt-1">{selectedPlot.cars}</span>
                    <span className="text-[10px] text-gray-500 font-bold">Mobil</span>
                  </div>
                </div>

                <div className="w-full h-[180px] bg-gray-100 rounded-[20px] mb-8 overflow-hidden relative group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt={`Tipe ${selectedPlot.unitType}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <button className="mt-auto w-full bg-[#7E5300] text-white text-sm md:text-base font-bold py-4 rounded-full hover:bg-[#684400] transition-colors shadow-lg flex justify-center items-center gap-2">
                  Reservasi Sekarang
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : null}

          </div>

        </div>
      </div>
    </section>
  );
}