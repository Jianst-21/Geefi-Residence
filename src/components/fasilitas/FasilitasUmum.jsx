 import React from "react";
import { Building2, GraduationCap, BriefcaseMedical, ShoppingBag, Banknote } from "lucide-react";

export default function FasilitasUmum() {
  return (
    <div className="max-w-6xl mx-auto px-4 mb-16">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Fasilitas Umum Card (Span 2/3) */}
        <div className="w-full md:w-2/3 bg-white rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col justify-between border border-gray-100">
          <div className="flex justify-between items-start mb-12">
            <h3 className="text-2xl md:text-[28px] font-bold text-[#1A1C1A] uppercase tracking-tight">
              DEKAT DENGAN FASILITAS UMUM
            </h3>
            <div className="text-[#9c7524]">
              <Building2 className="w-8 h-8" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6 mt-4">
            <div className="flex flex-col gap-3">
              <div className="text-[#5F5E5E] mb-1">
                <GraduationCap className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#1A1C1A] mb-1.5">Pendidikan</h4>
                <p className="text-[13px] text-[#8F8F8F]">Sekolah & Kampus Unggulan</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="text-[#5F5E5E] mb-1">
                <BriefcaseMedical className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#1A1C1A] mb-1.5">Kesehatan</h4>
                <p className="text-[13px] text-[#8F8F8F]">Rumah Sakit Internasional</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[#5F5E5E] mb-1">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#1A1C1A] mb-1.5">Belanja</h4>
                <p className="text-[13px] text-[#8F8F8F]">Mall & Pusat Perbelanjaan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Harga Terjangkau Card (Span 1/3) */}
        <div className="w-full md:w-1/3 bg-[#8f6418] rounded-[32px] p-8 md:p-10 shadow-sm flex flex-col justify-center relative overflow-hidden">
          {/* Faint background pattern/icon */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.15] text-white transform rotate-[-15deg]">
            <Banknote className="w-48 h-48" strokeWidth={1} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-center">
            <p className="text-white/80 text-[9px] font-bold tracking-[0.15em] uppercase mb-4">
              EXCLUSIVE OPPORTUNITY
            </p>
            <h3 className="text-[28px] font-bold text-white mb-4 leading-tight">
              HARGA TERJANGKAU
            </h3>
            <p className="text-white/90 text-[14px] mb-8 leading-relaxed font-light">
              Mewujudkan hunian impian dengan nilai investasi tinggi dan skema pembayaran yang fleksibel.
            </p>
            <button className="bg-white text-[#8f6418] font-bold text-[13px] px-6 py-3.5 rounded-full hover:bg-gray-50 transition-colors w-max shadow-sm">
              Cek Simulasi KPR
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
