"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import { 
  Bed, 
  Bath, 
  CarFront, 
  Home, 
  ArrowRight
} from "lucide-react";

// DATA DUMMY
const unitData = [
  {
    id: "subsidi-plumpung",
    blockRange: "Blok A.1 - B.10",
    name: "Geefi Subsidi Plumpung",
    typeSize: "Tipe 30/60",
    category: "Subsidi",
    slug: "geefi-subsidi-plumpung-30-60", 
    beds: 2,
    baths: 1,
    cars: 1,
    price: "Rp 160 Juta",
    status: "available"
  },
  {
    id: "subsidi-2",
    blockRange: "Blok C.1 - D.5", 
    name: "Geefi Subsidi 2 Plumpung",
    typeSize: "Tipe 30/60",
    category: "Subsidi",
    slug: "geefi-subsidi-2-plumpung", 
    beds: 2,
    baths: 1,
    cars: 1,
    price: "Rp 166 Juta",
    status: "available"
  },
  {
    id: "residence-42",
    blockRange: "Blok E.1 - F.5",
    name: "Geefi Residence",
    typeSize: "Tipe 42/60",
    category: "Premium",
    slug: "geefi-residence-42-60",
    beds: 2,
    baths: 1,
    cars: 1,
    price: "Rp 200 Juta",
    status: "available"
  },
  {
    id: "residence-54",
    blockRange: "Blok G.1 - H.9",
    name: "Geefi Residence",
    typeSize: "Tipe 54/60",
    category: "Premium",
    slug: "geefi-residence-54-60",
    beds: 2,
    baths: 1,
    cars: 1,
    price: "Rp 265 Juta",
    status: "available"
  }
];

export default function Masterplan() {
  const [selectedPlot, setSelectedPlot] = useState(unitData[0]);

  // Logika path gambar
  const selectedFormattedSlug = selectedPlot ? selectedPlot.slug.replaceAll('-', '') : '';
  const selectedImageUnitPath = `/images/units/${selectedFormattedSlug}.png`;

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
            </div>
          </div>

          {/* WADAH UTAMA INTERAKTIF */}
          <div className="w-full bg-[#F4F3F1] rounded-[48px] flex flex-col xl:flex-row min-h-[781px] overflow-hidden shadow-sm border border-gray-100">
            
            {/* SISI KIRI: GRID 2x2 KARTU RUMAH */}
            <div className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {unitData.map((unit) => {
                  const isSelected = selectedPlot?.id === unit.id;
                  
                  const formattedSlug = unit.slug.replaceAll('-', '');
                  const imageUnitPath = `/images/units/${formattedSlug}.png`;
                  
                  return (
                    <div 
                      key={unit.id}
                      onClick={() => setSelectedPlot(unit)}
                      className={`bg-white rounded-[24px] p-4 flex flex-col cursor-pointer transition-all duration-300 border-2 ${
                        isSelected 
                          ? 'border-[#9D6A0C] shadow-lg scale-[1.02]' 
                          : 'border-transparent shadow-sm hover:shadow-md hover:-translate-y-1'
                      }`}
                    >
                      <div className="w-full h-[180px] md:h-[200px] rounded-[16px] overflow-hidden mb-5 relative pointer-events-none">
                        <Image 
                          src={imageUnitPath} 
                          alt={unit.name} 
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#9D6A0C] uppercase tracking-wider shadow-sm">
                          {unit.blockRange}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between px-1 pb-2 pointer-events-none">
                        <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 leading-snug">
                          {unit.name}
                        </h3>
                        
                        <div>
                          <span className="block text-[11px] text-gray-400 mb-0.5 font-medium uppercase tracking-wider">
                            Harga mulai dari
                          </span>
                          <span className="font-bold text-[#9D6A0C] text-[20px]">
                            {unit.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* SISI KANAN: PANEL DETAIL UNIT */}
            <div className="w-full xl:w-[320px] shrink-0 bg-white p-6 md:p-8 flex flex-col border-l border-gray-100">
              <div className="flex items-center gap-3 text-[#7E5300] font-bold text-lg mb-8 border-b border-gray-100 pb-4">
                <Home size={22} />
                <h3>Detail Unit</h3>
              </div>

              {selectedPlot ? (
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">
                      Tipe Terpilih
                    </p>
                    <h4 className="text-[28px] md:text-[32px] font-bold text-[#7E5300] mb-6">
                      {selectedPlot.typeSize}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs md:text-sm">Tipe Unit</span>
                        <span className="font-bold text-gray-900 text-xs md:text-sm">{selectedPlot.category}</span>
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

                  <div className="w-full h-[180px] bg-gray-100 rounded-[20px] mb-8 overflow-hidden relative border border-gray-200 shadow-sm">
                    <Image
                      src={selectedImageUnitPath}
                      alt={selectedPlot.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* 2. Diubah dari <button> menjadi <Link href="..."> */}
                  <Link 
                    href={`/unit/${selectedPlot.slug}`}
                    className="mt-auto w-full bg-[#7E5300] text-white text-sm md:text-base font-bold py-4 rounded-full hover:bg-[#684400] transition-colors shadow-lg flex justify-center items-center gap-2"
                  >
                    Reservasi Sekarang
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ) : null}
            </div>
            
          </div>
        </div>
      </section>
      
      <div className="w-full h-[28px] bg-[#FAF9F6]"></div>
    </>
  );
}