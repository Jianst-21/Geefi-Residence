import React from "react";
import { MapPin, Network, Compass, ShieldCheck } from "lucide-react";
import { tentangValues } from "@/constants/tentang";

const icons = {
  location: <MapPin size={22} strokeWidth={1.5} />,
  facilities: <Network size={22} strokeWidth={1.5} />,
  design: <Compass size={22} strokeWidth={1.5} />,
  security: <ShieldCheck size={22} strokeWidth={1.5} />,
};

export default function TentangValues() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#9c7524] uppercase mb-4">
            PRINSIP KAMI
          </p>
          <h2 className="text-[40px] md:text-[46px] font-bold text-[#232323] leading-tight tracking-tight">
            Nilai Utama Hunian Kami
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tentangValues.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8F7F4] rounded-[2rem] p-8 md:p-10 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center text-[#9c7524] mb-8 shadow-sm">
                {icons[item.icon]}
              </div>

              <h3 className="text-lg font-bold text-[#232323] mb-4 leading-snug">{item.title}</h3>
              <p className="text-[#6b6b6b] text-[15px] leading-[1.7]">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
