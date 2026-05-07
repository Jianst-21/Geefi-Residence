"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { formatIDR } from '../../utils/formatters'; 

export default function KprCalculator() {
  // State Parameter - Default diatur ke nilai paling minimum (Mentok Kiri)
  const [hargaRumah, setHargaRumah] = useState(50000000); 
  const [uangMuka, setUangMuka] = useState(0); 
  const [tenor, setTenor] = useState(1);
  const [bunga, setBunga] = useState(1);
  
  // State Perhitungan Dinamis
  const [cicilanPerBulan, setCicilanPerBulan] = useState(0);
  const [totalPinjaman, setTotalPinjaman] = useState(0);
  const [totalBunga, setTotalBunga] = useState(0);

  // Auto Calculate
  useEffect(() => {
    const pokokPinjaman = hargaRumah - uangMuka;
    const bungaBulanan = (bunga / 100) / 12;
    const jumlahBulan = tenor * 12;

    if (pokokPinjaman > 0 && bungaBulanan > 0) {
      const rumusCicilan = 
        (pokokPinjaman * bungaBulanan) / 
        (1 - Math.pow(1 + bungaBulanan, -jumlahBulan));
      
      const totalBayar = rumusCicilan * jumlahBulan;
      
      setCicilanPerBulan(Math.round(rumusCicilan));
      setTotalPinjaman(pokokPinjaman);
      setTotalBunga(Math.round(totalBayar - pokokPinjaman));
    } else if (pokokPinjaman > 0 && bungaBulanan === 0) {
      setCicilanPerBulan(Math.round(pokokPinjaman / jumlahBulan));
      setTotalPinjaman(pokokPinjaman);
      setTotalBunga(0);
    } else {
      setCicilanPerBulan(0);
      setTotalPinjaman(0);
      setTotalBunga(0);
    }
  }, [hargaRumah, uangMuka, tenor, bunga]);

  // Efek Proporsi Uang Muka agar tidak melebihi harga rumah
  useEffect(() => {
    if (uangMuka > hargaRumah) {
       setUangMuka(hargaRumah * 0.2); 
    }
  }, [hargaRumah, uangMuka]);

  // FUNGSI RESET: Mengembalikan ke angka minimal seperti di gambar
  const handleReset = () => {
    setHargaRumah(50000000); 
    setUangMuka(0);    
    setTenor(1);             
    setBunga(1);            
  };

  // Helper untuk mewarnai track slider (kiri cokelat, kanan abu-abu)
  const getSliderBackground = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #A67B27 ${percentage}%, #E5E5E5 ${percentage}%)`;
  };

  return (
    <section className="w-full bg-[#FAF9F6] pb-[80px] font-['Manrope']">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[20px]">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-[48px] pt-[48px] gap-[16px]">
          <h2 className="text-[36px] font-bold leading-[36px] text-[#1A1C1A] tracking-normal">
            Kalkulator KPR
          </h2>
          <div className="w-[60px] h-[3px] bg-[#C5A25D]"></div>
          <p className="text-[16px] font-normal leading-[24px] text-gray-500 max-w-[640px]">
            Kami bekerja sama dengan institusi finansial terpercaya untuk memberikan suku bunga rendah dan biaya ringan demi kenyamanan finansial Anda.
          </p>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col xl:flex-row justify-center gap-[16px] w-full">
          
          {/* 1. PARAMETER PINJAMAN */}
          <div className="w-full xl:w-[448px] shrink-0 bg-white rounded-[24px] shadow-sm pt-[40px] pb-[60px] px-[32px] md:px-[64px] flex flex-col gap-[40px]">
            <h3 className="text-[20px] font-bold text-[#1A1C1A]">Parameter Pinjaman</h3>
            
            <div className="flex flex-col gap-[32px]">
              
              {/* Harga Rumah */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Harga Rumah</label>
                  <span className="text-[16px] font-bold text-[#A67B27]">Rp {formatIDR(hargaRumah)}</span>
                </div>
                <input 
                  type="range" min="50000000" max="265000000" step="1000000"
                  value={hargaRumah} onChange={(e) => setHargaRumah(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:bg-[#A67B27] [&::-webkit-slider-thumb]:rounded-full" 
                  style={{ background: getSliderBackground(hargaRumah, 50000000, 265000000) }}
                />
              </div>

              {/* Uang Muka */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Uang Muka ({hargaRumah > 0 ? Math.round((uangMuka/hargaRumah)*100) : 0}%)
                  </label>
                  <span className="text-[16px] font-bold text-[#A67B27]">Rp {formatIDR(uangMuka)}</span>
                </div>
                <input 
                  type="range" min="0" max={hargaRumah} step="1000000"
                  value={uangMuka} onChange={(e) => setUangMuka(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:bg-[#A67B27] [&::-webkit-slider-thumb]:rounded-full" 
                  style={{ background: getSliderBackground(uangMuka, 0, hargaRumah) }}
                />
              </div>

              {/* Tenor */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Masa Pinjaman (Tenor)</label>
                  <span className="text-[16px] font-bold text-[#A67B27]">{tenor} Tahun</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1"
                  value={tenor} onChange={(e) => setTenor(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:bg-[#A67B27] [&::-webkit-slider-thumb]:rounded-full" 
                  style={{ background: getSliderBackground(tenor, 1, 30) }}
                />
              </div>

              {/* Bunga */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Suku Bunga Efektif</label>
                  <span className="text-[16px] font-bold text-[#A67B27]">{bunga}%</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="0.1"
                  value={bunga} onChange={(e) => setBunga(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:bg-[#A67B27] [&::-webkit-slider-thumb]:rounded-full" 
                  style={{ background: getSliderBackground(bunga, 1, 15) }}
                />
              </div>
            </div>

            <button 
              type="button"
              onClick={handleReset}
              className="w-full h-[58px] flex items-center justify-center rounded-full bg-[#F4F3F1] text-[16px] font-bold text-[#A67B27] hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer mt-2"
            >
              Reset Parameter
            </button>
          </div>

          {/* ================= GRUP KANAN ================= */}
          <div className="w-full xl:w-[742px] flex flex-col gap-[16px]">
            <div className="flex flex-col md:flex-row gap-[16px]">
              
              {/* 2. ESTIMASI ANGSURAN */}
              <div className="flex-1 bg-[#F4F3F1] rounded-[24px] flex flex-col overflow-hidden min-h-[360px]">
                <div className="p-[40px]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Estimasi Angsuran Per Bulan</span>
                  <h4 className="text-[36px] md:text-[44px] font-bold text-[#1A1C1A] mt-2 mb-12 leading-tight tracking-tight">
                    Rp {formatIDR(cicilanPerBulan)}
                  </h4>
                </div>
                <div className="bg-[#9A6D14] p-[40px] flex justify-between items-end mt-auto">
                  <div className="flex flex-col text-white">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Total Pinjaman</span>
                    <span className="text-[18px] md:text-[20px] font-bold">Rp {formatIDR(totalPinjaman)}</span>
                  </div>
                  <div className="flex flex-col text-right text-white">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Total Bunga</span>
                    <span className="text-[18px] md:text-[20px] font-bold">Rp {formatIDR(totalBunga)}</span>
                  </div>
                </div>
              </div>

              {/* 3. CEK KELAYAKAN */}
              <div className="w-full md:w-[272px] bg-[#F4F3F1] rounded-[24px] p-[32px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#A67B27]" />
                  <h5 className="text-[16px] font-bold text-[#1A1C1A]">Cek Kelayakan</h5>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Penghasilan Bulanan</label>
                    <div className="h-[44px] bg-white rounded-[12px] px-4 flex items-center text-[13px] text-gray-500 border border-gray-100 italic">
                      Rp 50.000.000
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cicilan Lainnya</label>
                    <div className="h-[44px] bg-white rounded-[12px] px-4 flex items-center text-[13px] text-gray-300 border border-gray-100 italic">
                      Rp 0
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFDDB2] rounded-[20px] p-4 mt-auto">
                  <p className="text-[11px] text-[#A67B27] leading-relaxed">
                    <span className="font-bold">Status Anda: Sangat Layak.</span> Rasio hutang Anda berada di bawah 30% dari penghasilan.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. TABEL BUNGA */}
            <div className="bg-[#1A1C1A] rounded-[32px] p-[32px] text-white">
              <h3 className="text-[18px] font-bold mb-4">Bunga Bank Rekanan</h3>
              <div className="divide-y divide-white/10 text-[14px]">
                <div className="py-3 flex justify-between items-center">
                  <span className="opacity-70">BCA</span>
                  <span className="font-bold">6.25% (Fixed 3th)</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="opacity-70">Mandiri</span>
                  <span className="font-bold">6.50% (Fixed 5th)</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="opacity-70">CIMB Niaga</span>
                  <span className="font-bold">6.10% (Fixed 2th)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}