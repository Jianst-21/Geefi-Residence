import React from "react";
import { ArrowRight } from "lucide-react";

export default function FasilitasCTA() {
  return (
    <div className="relative w-full py-24 bg-[#EBEBEB] overflow-hidden flex flex-col items-center justify-center text-center px-4 mt-8">
      {/* Optional faint background image layer could go here */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
      
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-6">
          Siap Menjadi Bagian dari Geefi Residence?
        </h2>
        <p className="text-[var(--color-secondary)] text-sm md:text-base mb-10 max-w-2xl leading-relaxed">
          Kunjungi unit contoh kami hari ini dan rasakan kenyamanan fasilitas yang kami tawarkan secara langsung.
        </p>
        
        <div className="flex justify-center items-center">
          <a
            href="https://wa.me/6288215012059?text=Halo%20Admin%20Geefi%20Residence%2C%20saya%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20unit%20yang%20tersedia.%20Terima%20kasih."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-semibold text-sm px-8 py-4 rounded-full transition-colors w-full sm:w-auto justify-center shadow-sm"
          >
            Hubungi WhatsApp Marketing
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
