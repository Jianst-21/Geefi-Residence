"use client";
import React, { useState } from "react";

export default function KprCalculator() {
  const [hargaRumah, setHargaRumah] = useState(500000000);
  const [dpPercent, setDpPercent] = useState(15);
  const [tenor, setTenor] = useState(15);

  const dpAmount = (hargaRumah * dpPercent) / 100;
  const plafon = hargaRumah - dpAmount;

  const bungaPerTahun = 0.07;
  const totalBunga = plafon * bungaPerTahun * tenor;
  const totalPinjaman = plafon + totalBunga;
  const cicilanPerBulan = totalPinjaman / (tenor * 12);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-center">
        {/* WADAH UTAMA CARD (1020px x 515px) */}
        <div className="w-full max-w-[1020px] md:h-[515px] bg-white rounded-[2rem] shadow-xl border border-gray-100 flex flex-col md:flex-row overflow-hidden font-['Manrope']">
          {/* SISI KIRI: PUTIH */}
          <div className="w-full md:w-[576px] h-full p-[40px] flex flex-col justify-start items-start">
            <h2 className="text-2xl md:text-[32px] leading-[36px] font-bold text-gray-900 mb-[40px]">
              Simulasi Cicilan KPR
            </h2>

            <div className="w-full md:w-[496px] md:h-[208px] flex flex-col gap-[32px]">
              <div className="w-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-800 text-[14px] lg:text-[15px]">
                    Harga Rumah
                  </span>
                  <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">
                    {formatRupiah(hargaRumah)}
                  </span>
                </div>
                <div className="w-full h-[6px] bg-[#EEEEEE] rounded-full"></div>
              </div>

              <div className="w-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-800 text-[14px] lg:text-[15px]">
                    Uang Muka (DP) {dpPercent}%
                  </span>
                  <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">
                    {formatRupiah(dpAmount)}
                  </span>
                </div>
                <div className="w-full h-[6px] bg-[#EEEEEE] rounded-full"></div>
              </div>

              <div className="w-full">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-800 text-[14px] lg:text-[15px]">
                    Tenor Pinjaman
                  </span>
                  <span className="font-bold text-[#B27C21] text-[14px] lg:text-[15px]">
                    {tenor} Tahun
                  </span>
                </div>
                <div className="w-full h-[6px] bg-[#EEEEEE] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: KUNING/EMAS */}
          {/* Menggunakan justify-between agar kelompok teks (atas) dan tombol (bawah) saling menjauh */}
          <div className="w-full md:w-[444px] h-full bg-[#B27C21] p-[40px] text-white flex flex-col justify-between items-start">
            {/* KELOMPOK ATAS: Harga & Disclaimer */}
            <div className="w-full">
              {/* Blok Harga */}
              <div className="w-full mb-[32px]">
                <p className="text-white/80 text-xs uppercase tracking-widest font-semibold mb-2">
                  Estimasi Cicilan Per Bulan
                </p>
                <div className="w-full font-bold flex flex-col justify-center">
                  <span className="text-3xl md:text-4xl block mb-1">Rp</span>
                  <span className="text-5xl md:text-[56px] tracking-tight leading-none">
                    {formatRupiah(cicilanPerBulan).replace("Rp", "").trim()}
                  </span>
                </div>
              </div>

              {/* Blok Disclaimer (Menempel di bawah harga dengan jarak 32px) */}
              {/* Blok Disclaimer */}
              <div className="w-full md:max-w-[364px] bg-black/15 rounded-[32px] p-5">
                <p className="text-sm text-white/90 leading-relaxed font-light">
                  *Suku bunga fluktuatif mengikuti <br />
                  kebijakan bank. Perhitungan di atas <br />
                  hanyalah estimasi awal.
                </p>
              </div>
            </div>

            {/* KELOMPOK BAWAH: Tombol (Akan otomatis terdorong mentok ke bawah) */}
            <button className="w-full md:max-w-[363px] h-[56px] bg-white text-[#B27C21] font-bold rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg mt-8 md:mt-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
