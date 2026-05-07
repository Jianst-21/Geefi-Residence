"use client";
import React from 'react';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link'; // Import Link dari Next.js

export default function CtaSection() {
  return (
    <section className="w-full bg-[#FAF9F6] pb-[96px] px-4 xl:px-0 font-['Manrope']">
      
      <div 
        // Background dasar kontainer diset solid #1A1C1A
        className="max-w-[1184px] mx-auto relative rounded-[48px] overflow-hidden flex items-center bg-[#1A1C1A]"
      >
        {/* ================= BACKGROUND IMAGE (HANYA DI KANAN) ================= */}
        {/* Gambar dibatasi hanya mengambil 65% area di sebelah kanan layar pada desktop */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[65%]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center md:bg-left"
            style={{ backgroundImage: "url('/images/simulasiKPRs/BgCTA.png')" }}
          ></div>
        </div>

        {/* ================= KONTEN UTAMA ================= */}
        <div className="relative z-10 pt-[100px] md:pt-[144px] pb-[80px] md:pb-[96px] px-[32px] md:px-[96px] w-full flex flex-col">
          
          <div className="max-w-[640px] flex flex-col">
            
            <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-[1.1] mb-[24px]">
              Masih Ragu dengan Perhitungannya?
            </h2>
            
            <p className="text-[16px] md:text-[18px] text-gray-300 leading-relaxed mb-[48px]">
              Konsultasikan rencana pembelian unit Geefi Residence Anda secara langsung dengan Financial Advisor kami untuk mendapatkan penawaran suku bunga khusus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-[16px]">
              
              <button className="flex items-center justify-center gap-2 bg-[#7E5300] hover:bg-[#634200] text-white px-[32px] py-[16px] rounded-full text-[14px] font-bold transition-colors">
                <MessageSquare size={18} />
                Konsultasi KPR via WhatsApp
              </button>
              
              {/* MENGGUNAKAN COMPONENT LINK UNTUK REDIRECT */}
              <Link 
                href="/unit" 
                className="flex items-center justify-center bg-transparent border border-white hover:bg-white/10 text-white px-[32px] py-[16px] rounded-full text-[14px] font-bold transition-colors"
              >
                Lihat Unit Tersedia
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}