import React from "react";
import { DoorOpen, ShieldEllipsis, Building2, MapPin } from "lucide-react";

export default function Facilities() {
  const facilitiesData = [
    {
      title: "One Gate System",
      icon: <DoorOpen className="w-full h-full" strokeWidth={1.5} />,
    },
    {
      title: "Pos Satpam",
      icon: <ShieldEllipsis className="w-full h-full" strokeWidth={1.5} />,
    },
    {
      title: "Dekat dengan Fasilitas Umum",
      icon: <Building2 className="w-full h-full" strokeWidth={1.5} />,
    },
    {
      title: "Masuk Wilayah Perkotaan",
      icon: <MapPin className="w-full h-full" strokeWidth={1.5} />,
    },
  ];

  return (
    <>
      {/* Ubah pt-[102px] menjadi pt-[46.5px] untuk mobile, lg:pt-[96px] untuk desktop */}
      <section className="w-full bg-[#FFFFFF] pt-[46.5px] lg:pt-[96px] pb-20 font-['Manrope']">
        
        <div className="w-full max-w-[1280px] mx-auto px-[32px] flex flex-col gap-[64px] items-center">
          
          <div className="flex flex-col items-center text-center gap-[16px] max-w-[500px]">
            <h2 className="text-[24px] md:text-[36px] font-bold text-[#18181B] leading-tight">
              Fasilitas Eksklusif
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#52525B] leading-[1.6]">
              Dirancang untuk memenuhi gaya hidup modern dan memberikan kenyamanan maksimal bagi setiap penghuni.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px]">
            {facilitiesData.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-[24px] rounded-[16px] border border-[#D4C4B1]/30 gap-[16px] hover:shadow-lg hover:border-[#D4C4B1]/60 transition-all duration-300 bg-white group"
              >
                <div className="text-[#B27C21] w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-[14px] md:text-[15px] font-bold text-[#1A1A1A] text-center leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="w-full h-[28px] bg-[#FAF9F6]"></div>
    </>
  );
}