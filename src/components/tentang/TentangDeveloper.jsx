import React from "react";
import Image from "next/image";
import { tentangDeveloper, tentangStats } from "@/constants/tentang";

export default function TentangDeveloper() {
  return (
    <section className="py-24 bg-[#F8F7F4] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

          {/* ── Left Column: Overlapping Images ── */}
          <div className="flex-1 w-full max-w-[500px] relative">
            {/* Aspect ratio container to hold the absolute images */}
            <div className="relative w-full aspect-square md:aspect-[4/3.5] lg:aspect-[4/4]">
              {/* Image 1 (Left, Lower) */}
              <div className="absolute left-0 top-[50%] -translate-y-[50%] w-[48%] h-[65%] rounded-[2rem] overflow-hidden shadow-lg z-10">
                <Image
                  src={tentangDeveloper.image2}
                  alt="Geefi Residence Developer"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image 2 (Right, Higher) */}
              <div className="absolute right-0 top-[50%] -translate-y-[75%] w-[48%] h-[65%] shadow-xl z-10 rounded-[2.5rem] overflow-hidden">
                <Image
                  src={tentangDeveloper.image1}
                  alt="Geefi Residence Developer Area"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Developer Badge */}
              <div className="absolute bottom-[25%] md:right-[-10%] right-[-6%] transform translate-y-4 bg-[#7A5612] rounded-[1.5rem] px-8 py-6 shadow-xl z-20 md:w-[240px] w-[220px]">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden">

                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {tentangDeveloper.developerName}
                </p>
                <p className="text-[10px] font-semibold tracking-widest text-white/80 uppercase">
                  {tentangDeveloper.developerTitle}
                </p>
              </div>

            </div>
          </div>

          {/* ── Right Column: Text + Stats ── */}
          <div className="flex-1 lg:pl-4">
            <h2 className="text-4xl md:text-[48px] font-bold text-[#232323] leading-[1.2] mb-8 tracking-tight md:text-start text-center text-[42px]">
              {tentangDeveloper.sectionTitle} <br />
              <span className="text-[#9c7524]">{tentangDeveloper.sectionTitleAccent}</span>{" "}
              {tentangDeveloper.sectionSubtitle}
            </h2>

            <p className="text-[#6b6b6b] text-[15px] leading-[1.8] mb-6">
              {tentangDeveloper.description}
            </p>

            <p className="text-[#6b6b6b] text-[15px] leading-[1.8] mb-12">
              {tentangDeveloper.descriptionExtra}
            </p>

            {/* Stats Row */}
            <div className="md:flex md:flex-wrap grid grid-cols-3 md:gap-x-12 gap-x-8 gap-y-8">
              {tentangStats.map((stat) => (
                <div key={stat.id} className="flex flex-col">
                  <span className="text-3xl md:text-[34px] font-bold text-[#232323] leading-none mb-2">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.05em] text-[#9c7524] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
