import React from "react";
import Link from "next/link";
import { tentangCTA } from "@/constants/tentang";

export default function TentangCTA() {
  return (
    <section className="py-12 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="relative bg-[#9D6A0C] rounded-[3rem] px-8 py-20 md:py-24 overflow-hidden shadow-sm">
          
          {/* Decorative Circles */}
          <div className="absolute top-[-25%] right-[-10%] w-64 h-64 md:w-80 md:h-80 bg-black/5 rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-25%] left-[-10%] w-48 h-48 md:w-64 md:h-64 bg-black/5 rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Title */}
            <h2 className="text-3xl md:text-[40px] font-bold text-white mb-6 text-center leading-tight tracking-tight">
              {tentangCTA.title}
            </h2>
            
            {/* Description */}
            <p className="text-white/80 text-[15px] md:text-[18px] text-center max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              {tentangCTA.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <a
                href={tentangCTA.primaryButton.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-[#9D7621] font-bold rounded-full text-[14px] md:text-[15px] text-center hover:bg-stone-50 transition-colors duration-200"
              >
                {tentangCTA.primaryButton.label}
              </a>
              <a
                href={tentangCTA.secondaryButton.href}
                download="Poster_Geefi_Residence.jpeg"
                className="px-8 py-4 bg-transparent border border-white/40 text-white font-bold rounded-full text-[14px] md:text-[15px] text-center hover:bg-white/10 transition-colors duration-200"
              >
                {tentangCTA.secondaryButton.label}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
