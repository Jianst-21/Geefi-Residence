import Image from "next/image";
import { tentangHero } from "@/constants/tentang";

export default function TentangHero() {
  return (
    <section className="pt-24 pb-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          
          {/* ── Left Column ── */}
          <div className="flex-1 lg:pr-10 xl:pr-16 z-10">
            {/* Badge */}
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#9c7524] uppercase mb-5">
              {tentangHero.badge}
            </p>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold text-[#232323] leading-[1.1] mb-6 tracking-tight">
              Tentang <span className="text-[#9c7524]">Geefi</span>
              <br />
              <span className="text-[#9c7524]">Residence</span>
            </h1>

            {/* Description */}
            <p className="text-[#6b6b6b] text-[15px] leading-[1.8] mb-10 max-w-lg">
              {tentangHero.description}
            </p>

            {/* Quote / Divider */}
            <div className="flex items-center gap-4">
              <span className="block w-10 h-[1.5px] bg-[#b18d41]" />
              <p className="text-[13px] font-bold text-[#333333]">
                {tentangHero.quote}
              </p>
            </div>
          </div>

          {/* ── Right Column: Image + Floating Card ── */}
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none mt-12 lg:mt-0">
            {/* House Image */}
            <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] rounded-[2.5rem] overflow-hidden">
              <Image
                src={tentangHero.image}
                alt="Geefi Residence"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating description card */}
            <div className="absolute bottom-10 left-4 right-4 sm:right-auto sm:left-[-30px] lg:left-[-150px] max-w-full sm:max-w-[380px] bg-white/75 backdrop-blur-xl border border-white/40 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 lg:p-7 z-20">
              <p className="text-[14px] text-[#555555] leading-[1.6]">
                {tentangHero.descriptionCard}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
