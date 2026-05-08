"use client";
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROMOS_DATA } from "../../constants/promos"; 

export default function BankPromo() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0];
      const cardWidth = firstChild ? firstChild.offsetWidth : 383; 
      
      const isDesktop = typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true;
      const gap = isDesktop ? 32 : 14.5;
      
      const scrollAmount = cardWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#F2F1EF] pt-[48px] pb-[42px] overflow-hidden font-['Manrope']">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center w-full max-w-[800px] gap-[16px]">
          <h2 className="w-full px-4 md:px-0 text-[30px] md:text-[36px] font-bold leading-[36px] text-[#1A1C1A]">
            Promo Bank Rekanan
          </h2>
          <div className="w-[60px] h-[3px] bg-[#C5A25D]"></div>
          <p className="w-full px-[34.5px] md:px-0 text-[16px] font-normal leading-[24px] text-gray-500">
            Kami bekerja sama dengan institusi finansial terpercaya untuk memberikan suku bunga rendah dan biaya ringan demi kenyamanan finansial Anda.
          </p>
        </div>

        {/* ================= CARDS SLIDER CONTAINER ================= */}
        <div className="relative w-full mt-[48px]">
          <div
            ref={scrollRef}
            className="w-full flex flex-row flex-nowrap overflow-x-auto gap-[14.5px] md:gap-[32px] px-[14.5px] md:px-4 pb-4 md:pb-16 snap-x snap-mandatory scrollbar-hide scroll-smooth md:justify-center items-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PROMOS_DATA.map((promo) => (
              <div
                key={promo.id}
                className="relative flex-none w-[calc(100vw-29px)] md:w-[383px] h-[560px] md:h-[600px] rounded-[24px] md:rounded-[32px] overflow-hidden snap-center group"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${promo.bgImage}')` }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 px-[32px] md:px-[40px] pb-[40px] md:pb-[48px] flex flex-col justify-end">
                  <div className="flex flex-col items-start w-full">
                    <div className={`inline-flex items-center justify-center w-fit px-[12px] py-[4px] rounded-[16px] mb-[16px] ${promo.tagBg}`}>
                      <span className={`text-[10px] font-bold leading-[15px] tracking-[1px] uppercase ${promo.tagText}`}>
                        {promo.bank}
                      </span>
                    </div>

                    <h3 className="text-[28px] md:text-[30px] font-bold leading-[36px] tracking-[-1px] text-white mb-[8px] w-full">
                      {promo.title}
                    </h3>

                    <p className="text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[28px] text-white/80 h-auto md:h-[56px] line-clamp-2 w-full">
                      {promo.desc}
                    </p>
                  </div>

                  {/* PERBAIKAN: Menggunakan flex-row, justify-between, dan flex-nowrap agar selalu satu baris */}
                  <div className="flex flex-row flex-nowrap items-center justify-between w-full mt-[24px] gap-[16px]">
                    <button className="whitespace-nowrap shrink-0 flex items-center justify-center w-fit h-[48px] px-[24px] md:px-[32px] py-[12px] bg-white text-[#1A1C1A] rounded-full text-[14px] md:text-[16px] font-bold leading-[24px] hover:bg-gray-100 transition-colors">
                      {promo.btnText}
                    </button>

                    <span className="whitespace-nowrap text-right text-[10px] md:text-[12px] font-medium leading-[16px] tracking-[1.2px] text-[#A3A3A3] uppercase">
                      {promo.footerText}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* ================= NAVIGATION BUTTONS ================= */}
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

        </div>
      </div>
    </section>
  );
}