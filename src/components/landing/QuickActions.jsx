import React from "react";

export default function QuickActions() {
  return (
    // PERBAIKAN DI SINI:
    // Mengganti -mt-[54px] menjadi mt-8 md:mt-12 agar ada jarak yang pas dari Hero section
    <div className="flex justify-center mt-8 md:mt-12 relative z-20 px-4">
      
      {/* Wadah Utama: Ukuran presisi max 832px dan tinggi 108px */}
      <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]  p-2 flex flex-col md:flex-row items-center justify-between gap-2 w-full max-w-[832px] md:h-[108px]">
        
        {/* Tombol 1: Unit Tersedia (Solid Gold) */}
        <button className="bg-[#B48332] text-white flex-1 w-full h-full min-h-[90px] rounded-[45px] flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-[#9a6f2a]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <path d="M9 22v-4h6v4"></path>
            <path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path>
            <path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path>
            <path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path>
          </svg>
          <span className="font-semibold text-[15px]">Unit Tersedia</span>
        </button>

        {/* Tombol 2: Simulasi KPR (Outline Transparan) */}
        <button className="bg-white border border-[#B48332] text-[#B48332] flex-1 w-full h-full min-h-[90px] rounded-[45px] flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-orange-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2"></rect>
            <line x1="8" x2="16" y1="6" y2="6"></line>
            <line x1="16" x2="16" y1="14" y2="18"></line>
            <path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>
          <span className="font-semibold text-[15px]">Simulasi KPR</span>
        </button>

        {/* Tombol 3: Konsultasi (Solid Gold) */}
        <button className="bg-[#B48332] text-white flex-1 w-full h-full min-h-[90px] rounded-[45px] flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-[#9a6f2a]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="font-semibold text-[15px]">Konsultasi</span>
        </button>

      </div>
    </div>
  );
}