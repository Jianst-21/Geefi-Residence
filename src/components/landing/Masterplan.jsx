"use client";
import React, { useState } from "react";
import { 
  Bed, 
  Bath, 
  CarFront, 
  Home, 
  ArrowRight, 
  MousePointer2 
} from "lucide-react";

// IMPORT DATA DARI FOLDER CONSTANTS
import { row1Data, row2Data } from "../../constants/masterplan";

export default function Masterplan() {
  const [selectedPlot, setSelectedPlot] = useState(
    row1Data.find((p) => p.id === "B02"),
  );

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
          ${
            isAvailable
              ? isSelected
                ? "bg-gradient-to-b from-[#7E5300] to-[#9D6A0C] text-white shadow-[0_10px_20px_rgba(126,83,0,0.4)] scale-105 border-[3px] md:border-[4px] border-white z-10"
                : "bg-gradient-to-b from-[#7E5300] to-[#9D6A0C] text-white/90 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
              : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span className="block tracking-widest">{item.id}</span>
      </button>
    );
  };

  return (
    <>
      <section className="bg-white pt-[46.5px] lg:pt-[64px] pb-0 lg:pb-[53px] font-['Manrope']">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[48px]">
          
          {/* HEADER */}
          <div className="flex flex-col mb-[48px]">
            <p className="text-[#9D6A0C] text-[14px] md:text-[16px] font-bold tracking-widest uppercase mb-[12px]">
              Unit Terbatas!
            </p>
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#18181B] leading-[1.2] mb-[16px] md:mb-[24px]">
              Wujudkan Hunian Impian di Titik Paling Strategis
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[20px]">
              <p className="text-[#52525B] text-[14px] md:text-[16px] leading-[1.6] max-w-[700px]">
                Pilih masa depan Anda dengan presisi. Temukan unit terbaik yang
                sesuai dengan profil Anda, lengkap dengan informasi spesifikasi
                dan ketersediaan secara real-time.
              </p>
              <div className="flex items-center gap-[24px] text-[12px] md:text-[14px] font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9D6A0C]"></div>
                  <span className="text-[#52525B] tracking-widest uppercase">Tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E4E4E7]"></div>
                  <span className="text-[#A1A1AA] tracking-widest uppercase">Habis</span>
                </div>
              </div>
            </div>
          </div>

          {/* WADAH UTAMA INTERAKTIF */}
          <div className="w-full bg-[#F4F3F1] rounded-[48px] flex flex-col xl:flex-row min-h-[781px] overflow-hidden shadow-sm border border-gray-100">
            
            {/* SISI KIRI: Peta Masterplan */}
            <div className="flex-1 flex flex-col relative overflow-x-auto custom-scrollbar">
              
              <div className="flex-1 flex flex-col justify-center gap-8 lg:gap-12 p-10 pb-24 lg:pb-10">
                <div className="flex items-center gap-4 md:gap-[24px] min-w-max">
                  {row1Data.map(renderSlot)}
                </div>
                <div className="flex items-center gap-4 md:gap-[24px] min-w-max">
                  {row2Data.map(renderSlot)}
                </div>
              </div>

              {/* BAR INSTRUKSI SESUAI FIGMA (Hanya muncul di desktop) */}
              <div className="absolute bottom-0 left-0 ml-[47px] mb-[32px] z-20">
                <div className="hidden lg:flex bg-white px-6 py-4 rounded-full shadow-md text-[11px] md:text-[12px] font-bold tracking-widest text-[#5F5E5E] items-center gap-3 whitespace-nowrap">
                  <div className="p-1.5 bg-[#9D6A0C] rounded-full text-white">
                    <MousePointer2 size={14} fill="currentColor" />
                  </div>
                  KLIK WARNA EMAS UNTUK MELIHAT SPESIFIKASI DETAIL
                </div>
              </div>
            </div>

            {/* SISI KANAN: Panel Detail Unit */}
            <div className="w-full xl:w-[292px] shrink-0 bg-white p-6 md:p-8 flex flex-col border-l border-gray-100">
              <div className="flex items-center gap-3 text-[#7E5300] font-bold text-lg mb-8 border-b border-gray-100 pb-4">
                <Home size={22} />
                <h3>Detail Unit</h3>
              </div>

              {selectedPlot ? (
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">
                      Unit Terpilih
                    </p>
                    <h4 className="text-[28px] md:text-[32px] font-bold text-[#7E5300] mb-6">
                      Plot {selectedPlot.id}
                    </h4>
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
                    <div className="bg-[#F4F3F1] rounded-[16px] py-4 px-2 flex-1 flex flex-col items-center justify-center gap-1.5">
                      <Bed size={20} className="text-gray-500" />
                      <span className="block font-bold text-gray-900 leading-none mt-1">{selectedPlot.beds}</span>
                      <span className="text-[10px] text-gray-500 font-bold">KT</span>
                    </div>
                    <div className="bg-[#F4F3F1] rounded-[16px] py-4 px-2 flex-1 flex flex-col items-center justify-center gap-1.5">
                      <Bath size={20} className="text-gray-500" />
                      <span className="block font-bold text-gray-900 leading-none mt-1">{selectedPlot.baths}</span>
                      <span className="text-[10px] text-gray-500 font-bold">KM</span>
                    </div>
                    <div className="bg-[#F4F3F1] rounded-[16px] py-4 px-2 flex-1 flex flex-col items-center justify-center gap-1.5">
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
      
      {/* GAP BAWAH TAMBAHAN */}
      <div className="w-full h-[28px] bg-[#FAF9F6]"></div>
    </>
  );
}