"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, ArrowLeft, ArrowRight } from "lucide-react";

// DATA SUDAH DISESUAIKAN 100% DENGAN GAMBAR SCREENSHOT
const units = [
  {
    id: "subsidi-plumpung",
    name: "Geefi Subsidi Plumpung 30/60",
    badge: "Geefi Subsidi Plumpung",
    slug: "geefi-subsidi-plumpung-30-60", 
    image: "/images/units/Geefi Subsidi Plumpung 30-60/3.jpg",
    beds: 2,
    baths: 1,
    price: "Rp 160 Juta",
  },
  {
    id: "subsidi-2",
    name: "Geefi Subsidi 2 Plumpung 30/60",
    badge: "Geefi Subsidi 2 Plumpung",
    slug: "geefi-subsidi-2-plumpung", 
    image: "/images/units/Geefi Subsidi 2 Plumpung 30-60/1.jpeg",
    beds: 2,
    baths: 1,
    price: "Rp 166 Juta",
  },
  {
    id: "residence-42",
    name: "Geefi Residence 42/60",
    badge: "Geefi Residence Silver",
    slug: "classic-haven-42-65", 
    image: "/images/units/Geefi Residence Silver 42-60/3.jpg",
    beds: 2,
    baths: 1,
    price: "Rp 200 Juta",
  },
  {
    id: "residence-54",
    name: "Geefi Residence 54/60",
    badge: "Geefi Residence",
    slug: "geefi-residence-54-60",
    image: "/images/units/Geefi Residence 54-60/3.jpg",
    beds: 2,
    baths: 1,
    price: "Rp 265 Juta",
  }
];

export default function UnitTypes() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0];
      const cardWidth = firstChild ? firstChild.offsetWidth : 363; 
      
      const isDesktop = typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true;
      const gap = isDesktop ? 32 : 18; 
      
      const scrollAmount = cardWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section className="bg-[#F4F3F1] pt-[48.17px] pb-[48.17px] md:pt-[60px] md:pb-[96px] overflow-hidden">
        <div className="max-w-[1184px] mx-auto flex flex-col items-center">
          
          {/* HEADER SECTION */}
          <div className="text-center mb-[32px] md:mb-[50px] flex flex-col items-center w-full px-6 xl:px-0">
            <h2 className="text-[36px] md:text-[36px] font-extrabold text-[#1A1A1A] font-['Manrope']">
              Pilihan Tipe Unit
            </h2>
          </div>

          {/* SLIDER KARTU UNIT */}
          <div className="relative w-full">
            <div
              ref={scrollRef}
              className="w-full flex flex-row flex-nowrap overflow-x-auto gap-[18px] lg:gap-[32px] px-6 xl:px-0 pb-4 snap-x snap-mandatory scroll-smooth items-center lg:justify-start"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {units.map((unit) => {
                return (
                  <div
                    key={unit.id}
                    className="flex-none w-[calc(100vw-48px)] md:w-[363px] flex flex-col font-['Manrope'] snap-center"
                  >
                    {/* GAMBAR RUMAH */}
                    <div className="relative w-full h-[453px] rounded-[48px] overflow-hidden mb-6 group cursor-pointer bg-gray-200">
                      <Image
                        src={unit.image}
                        alt={unit.name}
                        fill
                        className="object-cover scale-[1.20] group-hover:scale-[1.25] transition-transform duration-700 ease-in-out"
                      />

                      <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm px-4 h-[28px] flex items-center justify-center rounded-full shadow-sm">
                        <span className="text-[#8E6319] text-[10px] font-bold tracking-widest uppercase leading-none pt-[1px]">
                          {unit.badge}
                        </span>
                      </div>
                    </div>

                    {/* INFORMASI UNIT */}
                    <div className="flex flex-col px-1">
                      <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-2 leading-tight">
                        {unit.name}
                      </h3>

                      <div className="flex items-center gap-5 text-[#757575] mb-5 text-[13px]">
                        <div className="flex items-center gap-1.5">
                          <Bed size={16} strokeWidth={1.5} />
                          <span>{unit.beds} KT</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath size={16} strokeWidth={1.5} />
                          <span>{unit.baths} KM</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-6">
                        <span className="text-[22px] font-bold text-[#9D6A0C]">
                          {unit.price}
                        </span>
                        <span className="text-[11px] text-[#A3A3A3]">mulai dari</span>
                      </div>

                      {/* TOMBOL AKSI */}
                      <div className="flex items-center gap-[16px] mt-auto">
                        <Link 
                          href={`/unit/${unit.slug}`}
                          className="flex-1 flex items-center justify-center h-[50px] bg-[#9D6A0C] text-white font-bold text-[12px] tracking-[0.05em] uppercase rounded-full hover:bg-[#7E5300] transition-colors"
                        >
                          LIHAT DETAIL
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NAVIGATION BUTTONS */}
            {units.length > 3 && (
              <div className="flex justify-center gap-[16px] mt-[24px] md:mt-[14px]">
                <button
                  onClick={() => scroll("left")}
                  className="w-fit h-fit p-[11px] rounded-full bg-transparent border border-[#D4C4B1]/80 flex items-center justify-center hover:bg-[#D4C4B1]/20 transition-colors cursor-pointer group"
                  aria-label="Previous"
                >
                  <ArrowLeft
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#1A1C1A] group-hover:-translate-x-0.5 transition-transform"
                  />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-fit h-fit p-[11px] rounded-full bg-transparent border border-[#D4C4B1]/80 flex items-center justify-center hover:bg-[#D4C4B1]/20 transition-colors cursor-pointer group"
                  aria-label="Next"
                >
                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#1A1C1A] group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Div background tambahan untuk mobile */}
      <div className="w-full h-[24px] bg-[#FAF9F6]"></div>
    </>
  );
}