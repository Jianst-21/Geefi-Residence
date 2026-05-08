"use client";
import React, { useState } from "react";

// Pastikan path ini sesuai dengan struktur folder Anda.
// Sesuaikan import dengan nama file utils dan constants Anda
import { hitungCicilanKPR, formatInputRupiah, parseInputRupiah } from "../../utils/kpr";
import { KPR_DEFAULTS } from "../../constants/kpr";

// Helper function untuk format Rupiah biasa (jika belum ada di utils)
const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

export default function KprCalculator() {
  const [hargaRumah, setHargaRumah] = useState(KPR_DEFAULTS.HARGA_RUMAH);
  const [dpPercent, setDpPercent] = useState(KPR_DEFAULTS.DP_PERCENT);
  const [tenor, setTenor] = useState(KPR_DEFAULTS.TENOR);

  // Batas maksimal untuk slider
  const maxHarga = KPR_DEFAULTS.MAX_HARGA || 500000000;
  const maxTenor = KPR_DEFAULTS.MAX_TENOR || 25;

  // Ambil hasil perhitungan dari Utils
  const { dpAmount, cicilanPerBulan } = hitungCicilanKPR(
    hargaRumah,
    dpPercent,
    tenor
  );

  return (
    <section className="pt-[87px] lg:pt-[215px] pb-[78px] lg:pb-[114px] bg-[#FAF9F6]">
      <style>{`
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #B27C21;
          cursor: pointer;
          box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
          border: 2px solid white;
        }
        .custom-range::-moz-range-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #B27C21;
          cursor: pointer;
          box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
          border: 2px solid white;
        }
        .no-arrows::-webkit-inner-spin-button,
        .no-arrows::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-arrows {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 flex justify-center">
        <div className="w-full max-w-[1020px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col lg:flex-row overflow-hidden font-['Manrope']">
          
          <div className="w-full lg:w-[576px] p-[32px] md:p-[40px] flex flex-col justify-start items-start shrink-0">
            <h2 className="text-[30px] md:text-[30px] leading-[36px] font-bold text-[#1A1A1A] mb-[40px]">
              Simulasi Cicilan <br /> KPR
            </h2>

            <div className="w-full md:w-[496px] flex flex-col gap-[32px]">
              {/* SLIDER HARGA RUMAH */}
              <div className="w-full relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#1A1A1A] text-[16px] lg:text-[16px]">
                    Harga Rumah
                  </span>
                  <div className="flex items-center">
                    <span className="font-bold text-[#B27C21] text-[16px] lg:text-[16px] mr-1">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatInputRupiah(hargaRumah)}
                      onChange={(e) => {
                        let val = parseInputRupiah(e.target.value);
                        if (isNaN(val)) return;
                        if (val > maxHarga) val = maxHarga;
                        if (val < 0) val = 0;
                        setHargaRumah(val);
                      }}
                      className="no-arrows font-bold text-[#B27C21] text-[16px] lg:text-[16px] bg-transparent outline-none w-[120px] text-right p-0 m-0 border-none focus:ring-0"
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
                    className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none relative z-10"
                    style={{
                      background: `linear-gradient(to right, #B27C21 ${(hargaRumah / maxHarga) * 100}%, #E5E7EB ${(hargaRumah / maxHarga) * 100}%)`,
                    }}
                  />
                </div>
              </div>

              {/* SLIDER UANG MUKA (DP) */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#1A1A1A] text-[14px] lg:text-[15px]">
                    Uang Muka (DP)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">
                      {formatRupiah(dpAmount)}
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
                        className="no-arrows font-bold text-[#B27C21] text-[14px] lg:text-[15px] bg-transparent outline-none w-[32px] text-right p-0 m-0 border-none focus:ring-0"
                      />
                      <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none"
                  style={{
                    background: `linear-gradient(to right, #B27C21 ${dpPercent}%, #E5E7EB ${dpPercent}%)`,
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
                      className="no-arrows font-bold text-[#B27C21] text-[14px] lg:text-[15px] bg-transparent outline-none w-[24px] text-right p-0 m-0 border-none focus:ring-0"
                    />
                    <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">
                      Tahun
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxTenor}
                  step="1"
                  value={tenor}
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none"
                  style={{
                    background: `linear-gradient(to right, #B27C21 ${(tenor / maxTenor) * 100}%, #E5E7EB ${(tenor / maxTenor) * 100}%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* SISI KANAN (HASIL & BUTTON) */}
          <div className="w-full lg:flex-1 bg-[#B27C21] p-[32px] md:p-[40px] text-white flex flex-col justify-between items-start gap-[40px] lg:gap-0 shrink-0">
            <div className="w-full">
              <div className="w-full mb-[32px]">
                <p className="text-white/80 text-xs uppercase tracking-[0.1em] font-semibold mb-2">
                  Estimasi Cicilan Per Bulan
                </p>
                <div className="w-full font-bold flex flex-col justify-center mt-2">
                  <span className="text-3xl md:text-4xl block mb-1">Rp</span>
                  <span className="text-5xl md:text-[56px] tracking-tight leading-none truncate">
                    {tenor === 0 || hargaRumah === 0
                      ? "0"
                      : formatRupiah(cicilanPerBulan).replace("Rp", "").trim()}
                  </span>
                </div>
              </div>

              <div className="w-full bg-black/15 rounded-[24px] p-5">
                <p className="text-[14px] text-white/90 leading-relaxed font-regular">
                  *Suku bunga fluktuatif mengikuti <br />
                  kebijakan bank. Perhitungan di atas <br />
                  hanyalah estimasi awal.
                </p>
              </div>
            </div>

            {/* BUTTON KIRIM KE WHATSAPP */}
            <button className="w-full h-[56px] bg-white text-[#B27C21] font-bold text-[15px] rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg mt-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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