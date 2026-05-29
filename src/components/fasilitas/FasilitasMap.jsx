"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet Map to avoid SSR issues with window object
const MapLeaflet = dynamic(() => import("./MapLeaflet"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-[#EAE8E3] flex items-center justify-center text-gray-400">Loading Map...</div> 
});

export default function FasilitasMap() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* Map Section */}
        <div className="md:col-span-2 h-[450px] rounded-[32px] overflow-hidden relative shadow-sm border border-gray-100 bg-[#EAE8E3] z-0">
          <MapLeaflet />
        </div>

        {/* Area Terdekat List */}
        <div className="md:col-span-1 bg-white rounded-[32px] p-8 md:p-12 flex flex-col justify-center shadow-sm border border-gray-100">
          <p className="text-[11px] font-bold text-[#9c7524] tracking-widest uppercase mb-10">
            AREA TERDEKAT
          </p>
          
          <div className="flex flex-col gap-8">
            <div className="flex gap-6 items-center">
              <span className="text-[44px] font-light text-[#DBCBAD] leading-none">01</span>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-[15px] text-[#1A1C1A] mb-1">Pintu Tol Utama</h4>
                <p className="text-[13px] text-[#8F8F8F]">Hanya 10 Menit</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <span className="text-[44px] font-light text-[#DBCBAD] leading-none">02</span>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-[15px] text-[#1A1C1A] mb-1">Pusat Perbelanjaan</h4>
                <p className="text-[13px] text-[#8F8F8F]">Hanya 5 Menit</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <span className="text-[44px] font-light text-[#DBCBAD] leading-none">03</span>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-[15px] text-[#1A1C1A] mb-1">Kawasan Bisnis</h4>
                <p className="text-[13px] text-[#8F8F8F]">Hanya 15 Menit</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
