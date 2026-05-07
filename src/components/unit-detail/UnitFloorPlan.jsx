"use client";

import { useState } from "react";
import Image from "next/image";
import { BedDouble, Utensils, Sofa, Maximize2 } from "lucide-react";

const iconMap = [
  {icon: BedDouble},
  {icon: Utensils},
  {icon: Sofa},
];

export default function UnitFloorPlan({ floorPlan }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Denah Lantai
      </h2>

      <div className="bg-[#FAFAFA] rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-14 border border-stone-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Info */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {floorPlan.title || "Tata Ruang Optimal & Fungsional"}
            </h3>
            <p className="text-base text-secondary leading-relaxed mb-8">
              {floorPlan.description}
            </p>

            <div className="flex flex-col gap-2">
              {floorPlan.rooms.map((room, index) => {
                const IconComponent = iconMap[index].icon || null;
                const isActive = activeIndex === index;

                return (
                  <div
                    key={room.name}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex items-start gap-5 p-5 rounded-3xl cursor-pointer transition-all duration-300 ${
                      isActive ? "bg-[#F1EFEA]" : "hover:bg-stone-100/50"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-5 bottom-5 w-1.5 bg-[#B48832] rounded-r-lg"></div>
                    )}
                    
                    <div className="flex-shrink-0 mt-0.5"> 
                      <IconComponent size={20} className="text-[#B48832]" />
                    </div>

                    <div>
                      <p className="font-bold text-[15px] text-foreground mb-1">
                        {room.name}
                      </p>
                      <p className="text-[13px] text-secondary leading-relaxed">
                        {room.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Floor plan image */}
          <div className="flex flex-col w-full max-w-xl mx-auto lg:max-w-none">
            <div className="bg-white border-[20px] sm:border-[24px] border-[#1C1C1C] rounded-[40px] sm:rounded-[48px] overflow-hidden aspect-[4/3] flex items-center justify-center p-4 sm:p-6 shadow-2xl relative">
              {floorPlan.planImage ? (
                <Image
                  src={floorPlan.planImage}
                  alt="Floor plan"
                  width={800}
                  height={600}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400">
                  Image Not Available
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-6 px-2 sm:px-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-secondary">
                {floorPlan.scale || "SCALE 1:100 @ A3"}
              </span>
              <button className="text-[#B48832] font-bold text-[13px] sm:text-sm flex items-center gap-1.5 hover:underline cursor-pointer">
                <Maximize2 size={16} /> Perbesar Denah
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
