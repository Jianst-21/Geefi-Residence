"use client";
import React, { useState } from "react";
// Import fungsi yang sudah kita buat di utils
import { formatRupiah, hitungCicilanKPR } from "@/utils/kpr";

export default function KprCalculator() {
  const [hargaRumah, setHargaRumah] = useState(500000000);
  const [dpPercent, setDpPercent] = useState(15);
  const [tenor, setTenor] = useState(15);

  const maxHarga = 500000000; 
  const maxTenor = 25; 

  // PANGGIL FUNGSI HITUNG DARI UTILS (Sangat rapi dan bersih!)
  const { dpAmount, cicilanPerBulan } = hitungCicilanKPR(hargaRumah, dpPercent, tenor);

  // KUMPULAN CLASS TAILWIND KHUSUS UNTUK MEMOLES BULATAN SLIDER
  const sliderThumbClasses = `
    [&::-webkit-slider-thumb]:appearance-none 
    [&::-webkit-slider-thumb]:w-[20px] 
    [&::-webkit-slider-thumb]:h-[20px] 
    [&::-webkit-slider-thumb]:rounded-full 
    [&::-webkit-slider-thumb]:bg-[#B27C21] 
    [&::-webkit-slider-thumb]:cursor-pointer 
    [&::-webkit-slider-thumb]:shadow-[0px_2px_4px_rgba(0,0,0,0.2)] 
    [&::-webkit-slider-thumb]:border-2 
    [&::-webkit-slider-thumb]:border-white 
    [&::-moz-range-thumb]:appearance-none 
    [&::-moz-range-thumb]:w-[20px] 
    [&::-moz-range-thumb]:h-[20px] 
    [&::-moz-range-thumb]:rounded-full 
    [&::-moz-range-thumb]:bg-[#B27C21] 
    [&::-moz-range-thumb]:cursor-pointer 
    [&::-moz-range-thumb]:shadow-[0px_2px_4px_rgba(0,0,0,0.2)] 
    [&::-moz-range-thumb]:border-2 
    [&::-moz-range-thumb]:border-white
  `;

  // CLASS TAILWIND UNTUK MENGHILANGKAN PANAH PADA INPUT ANGKA
  const hideNumberArrows = `
    [&::-webkit-inner-spin-button]:appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:m-0 
    [&::-webkit-outer-spin-button]:m-0
  `;

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 flex justify-center">
        
        <div className="w-full max-w-[1020px] md:h-[515px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row overflow-hidden font-['Manrope']">
          
          <div className="w-full md:w-[576px] h-full p-[32px] md:p-[40px] flex flex-col justify-start items-start">
            
            <h2 className="text-2xl md:text-[32px] leading-[36px] font-bold text-[#1A1A1A] mb-[40px]">
              Simulasi Cicilan KPR
            </h2>

            <div className="w-full md:w-[496px] flex flex-col gap-[32px]">
              
              {/* SLIDER HARGA RUMAH */}
              <div className="w-full relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#1A1A1A] text-[14px] lg:text-[15px]">
                    Harga Rumah
                  </span>
                  <div className="flex items-center">
                    <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">Rp</span>
                    <input 
                      type="number" 
                      value={hargaRumah} 
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val > maxHarga) val = maxHarga;
                        if (val < 0) val = 0;
                        setHargaRumah(val);
                      }}
                      className={`font-bold text-[#B27C21] text-[14px] lg:text-[15px] bg-transparent outline-none w-[100px] text-right appearance-none p-0 m-0 border-none focus:ring-0 ${hideNumberArrows}`}
                      style={{ MozAppearance: 'textfield' }}
                    />
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max={maxHarga} 
                    step="1000000"
                    value={hargaRumah}
                    onChange={(e) => setHargaRumah(Number(e.target.value))}
                    className={`w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none relative z-10 ${sliderThumbClasses}`}
                    style={{
                      background: `linear-gradient(to right, #B27C21 ${(hargaRumah / maxHarga) * 100}%, #E5E7EB ${(hargaRumah / maxHarga) * 100}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Rp 0</span>
                  <span>Rp 500 Juta</span>
                </div>
              </div>

              {/* SLIDER UANG MUKA (DP) */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#1A1A1A] text-[14px] lg:text-[15px]">
                    Uang Muka (DP)
                  </span>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      value={dpPercent} 
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val > 100) val = 100;
                        if (val < 0) val = 0;
                        setDpPercent(val);
                      }}
                      className={`font-bold text-[#B27C21] text-[14px] lg:text-[15px] bg-transparent outline-none w-[24px] text-right appearance-none p-0 m-0 border-none focus:ring-0 ${hideNumberArrows}`}
                      style={{ MozAppearance: 'textfield' }}
                    />
                    <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">%</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="1"
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className={`w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none ${sliderThumbClasses}`}
                  style={{
                    background: `linear-gradient(to right, #B27C21 ${dpPercent}%, #E5E7EB ${dpPercent}%)`
                  }}
                />
              </div>

              {/* SLIDER TENOR PINJAMAN */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#1A1A1A] text-[14px] lg:text-[15px]">
                    Tenor Pinjaman
                  </span>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={tenor} 
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val > maxTenor) val = maxTenor;
                        if (val < 0) val = 0;
                        setTenor(val);
                      }}
                      className={`font-bold text-[#B27C21] text-[14px] lg:text-[15px] bg-transparent outline-none w-[24px] text-right appearance-none p-0 m-0 border-none focus:ring-0 ${hideNumberArrows}`}
                      style={{ MozAppearance: 'textfield' }}
                    />
                    <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">Tahun</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={maxTenor} 
                  step="1"
                  value={tenor}
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className={`w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none ${sliderThumbClasses}`}
                  style={{
                    background: `linear-gradient(to right, #B27C21 ${(tenor / maxTenor) * 100}%, #E5E7EB ${(tenor / maxTenor) * 100}%)`
                  }}
                />
              </div>

            </div>
          </div>

          {/* SISI KANAN: KUNING/EMAS (HASIL) */}
          <div className="w-full md:w-[444px] h-full bg-[#B27C21] p-[32px] md:p-[40px] text-white flex flex-col justify-between items-start shrink-0">
            
            <div className="w-full">
              <div className="w-full mb-[32px]">
                <p className="text-white/80 text-xs uppercase tracking-[0.1em] font-semibold mb-2">
                  Estimasi Cicilan Per Bulan
                </p>
                <div className="w-full font-bold flex flex-col justify-center mt-2">
                  <span className="text-3xl md:text-4xl block mb-1">Rp</span>
                  <span className="text-5xl md:text-[56px] tracking-tight leading-none truncate">
                    {tenor === 0 || hargaRumah === 0 ? "0" : formatRupiah(cicilanPerBulan).replace("Rp", "").trim()}
                  </span>
                </div>
              </div>

              <div className="w-full bg-black/15 rounded-[24px] p-5">
                <p className="text-[13px] text-white/90 leading-relaxed font-medium">
                  *Suku bunga fluktuatif mengikuti <br />
                  kebijakan bank. Perhitungan di atas <br />
                  hanyalah estimasi awal.
                </p>
              </div>
            </div>

            <button className="w-full h-[56px] bg-white text-[#B27C21] font-bold text-[15px] rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg mt-8 md:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Kirim ke WhatsApp
            </button>
            
          </div>
        </div>
      </div>
    </section>
  );
}