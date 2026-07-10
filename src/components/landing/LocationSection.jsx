"use client";
import dynamic from "next/dynamic";
import { GraduationCap, Hospital, CarFront, Loader2 } from "lucide-react"; 

const LeafletMap = dynamic(() => import("../lokasi/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-stone-100">
      <Loader2 className="animate-spin text-[#9c7524]" size={32} />
    </div>
  ),
});

export default function LocationSection() {
  const accessibilities = [
    {
      id: 1,
      name: "SDIT Al-Irsyad",
      time: "Hanya 3 menit perjalanan",
      icon: <GraduationCap size={22} />,
    },
    {
      id: 2,
      name: "RS Hermina",
      time: "Hanya 5 menit perjalanan",
      icon: <Hospital size={22} />,
    },
    {
      id: 3,
      name: "Tol Plumpung",
      time: "Hanya 10 menit perjalanan",
      icon: <CarFront size={22} />,
    }
  ];

  return (
    // Padding responsif: Mobile 24px (atas-bawah), Desktop 28px (atas) & 143px (bawah)
    <section className="w-full bg-[#FAF9F6] pt-[24px] pb-[24px] md:pt-[28px] md:pb-[143px] font-['Manrope']">
      
      {/* Wadah Utama dibatasi 1216px */}
      <div className="max-w-[1216px] mx-auto px-6 xl:px-0">
        
        {/* KOTAK KONTEN (Tinggi presisi 500px di Desktop) */}
        <div className="w-full h-auto lg:h-[500px] flex flex-col lg:flex-row bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          
          {/* SISI KIRI: PETA (Lebar ~60%) */}
          <div className="w-full lg:w-[60%] h-[300px] lg:h-full relative z-0 bg-gray-200">
            <LeafletMap activeCategory="Semua" />
          </div>

          {/* SISI KANAN: DAFTAR AKSESIBILITAS (Lebar ~40%) */}
          {/* Padding mobile p-[24px], Desktop xl:p-[56px] */}
          <div className="w-full lg:w-[40%] p-[24px] md:p-10 xl:p-[56px] flex flex-col justify-between">
            
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1A1C1A] mb-6 lg:mb-10 leading-tight">
                Aksesibilitas Utama
              </h2>

              <div className="flex flex-col gap-6 lg:gap-8">
                {accessibilities.map((item) => (
                  <div key={item.id} className="flex items-center gap-5">
                    {/* Wadah Ikon (Background Emas Transparan 10%) */}
                    <div className="w-[48px] h-[48px] rounded-full bg-[#7E5300]/10 flex items-center justify-center shrink-0 text-[#7E5300]">
                      {item.icon}
                    </div>
                    {/* Teks Informasi */}
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A1C1A] text-[15px] lg:text-[16px] mb-0.5">
                        {item.name}
                      </span>
                      <span className="text-[#5F5E5E] text-[13px] lg:text-[14px]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOMBOL (Diubah menjadi tag <a> yang mengarah ke Google Maps) */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Abyakta+Sukoharjo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-10 lg:mt-auto w-full h-[52px] rounded-full border-[1.5px] border-[#B48832] text-[#7E5300] font-bold text-[14px] tracking-wide hover:bg-[#7E5300] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              Lihat alamat lengkap
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}