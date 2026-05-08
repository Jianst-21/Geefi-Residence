"use client";
import React from 'react';
import { Info, ArrowRight, ChevronDown } from 'lucide-react';
import { AMORTIZATION_YEARS, DESKTOP_AMORTIZATION_DATA } from '../../constants/amortization';

export default function KprAmortizationTable() {

  return (
    <section className="w-full bg-[#FAF9F6] pt-0 pb-[24px] lg:pb-[80px] font-['Manrope']">
      <div className="max-w-[1184px] mx-auto">
        
        {/* ================= TAMPILAN DESKTOP ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-[48px] pt-[40px] px-0">
          
          <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-bold leading-tight text-[#1A1C1A]">Rincian Pembayaran Tahunan</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                Kami memecah pinjaman Anda menjadi rincian transparan. Lihat bagaimana saldo pokok pinjaman berkurang secara signifikan seiring berjalannya waktu.
              </p>
            </div>
            <ProTipBox />
          </div>

          <div className="col-span-8 bg-white rounded-[48px] overflow-hidden border border-gray-100 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pt-8 pb-6 px-8 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tahun</th>
                  <th className="pt-8 pb-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sisa Pokok</th>
                  <th className="pt-8 pb-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Angsuran Bunga</th>
                  <th className="pt-8 pb-6 px-8 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Angsuran Pokok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DESKTOP_AMORTIZATION_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-7 px-8 text-[14px] font-bold text-[#1A1C1A]">{row.tahun}</td>
                    <td className="py-7 px-4 text-[14px] font-medium text-gray-500">Rp {row.sisa}</td>
                    <td className="py-7 px-4 text-[14px] font-medium text-gray-500">Rp {row.bunga}</td>
                    <td className="py-7 px-8 text-[14px] font-bold text-[#A67B27]">Rp {row.pokok}</td>
                  </tr>
                ))}
                <tr><td colSpan="4" className="h-4"></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= TAMPILAN MOBILE ================= */}
        <div className="lg:hidden flex flex-col">
          <div className="pt-[40px] px-[32px] pb-[32px] flex flex-col">
            <h2 className="text-[24px] font-bold text-[#1A1C1A]">Rincian Pembayaran Tahunan</h2>
            <p className="text-[12px] text-gray-400 mt-1 mb-[24px]">Berdasarkan Harga Properti Rp 2.500.000.000</p>

            <div className="flex flex-col gap-[16px]">
              {AMORTIZATION_YEARS.map((year, idx) => (
                <div key={idx} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50">
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F4F3F1] flex items-center justify-center text-[14px] font-bold text-[#9A6D14]">{year.id}</div>
                      <div>
                        <h4 className="text-[16px] font-bold text-[#1A1C1A]">{year.title}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{year.period}</p>
                      </div>
                    </div>
                    <ChevronDown size={20} className="text-gray-400" />
                  </div>
                  
                  {idx === 0 && (
                    <div className="mt-6 border-t border-gray-50 pt-5">
                      <div className="grid grid-cols-4 text-[10px] font-bold text-gray-400 mb-4 tracking-wider">
                        <span>BULAN</span>
                        <span>POKOK</span>
                        <span>BUNGA</span>
                        <span className="text-right">SISA</span>
                      </div>
                      <div className="flex flex-col gap-4 text-[12px]">
                        <MonthlyRow month="01" pokok="7.7M" bunga="7.5M" sisa="1.99M" />
                        <MonthlyRow month="02" pokok="7.8M" bunga="7.4M" sisa="1.98M" />
                        <MonthlyRow month="03" pokok="7.1M" bunga="7M" sisa="1.8M" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-[24px]">
              <ProTipBox />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function MonthlyRow({ month, pokok, bunga, sisa }) {
  return (
    <div className="grid grid-cols-4 font-medium items-center">
      <span className="text-gray-900">{month}</span>
      <span className="text-gray-500">{pokok}</span>
      <span className="text-[#A67B27]">{bunga}</span>
      <span className="text-gray-500 text-right">{sisa}</span>
    </div>
  );
}

function ProTipBox() {
  return (
    <div className="bg-[#F4F3F1] rounded-[24px] p-6 flex flex-col gap-5 w-full">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full border border-[#9A6D14] flex items-center justify-center shrink-0 mt-0.5">
          <Info size={14} className="text-[#9A6D14]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[14px] font-bold text-[#1A1C1A]">Pro Tip: Biaya Admin</h4>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            Jangan lupa persiapkan dana sekitar 1-2% dari plafon untuk biaya provisi dan asuransi jiwa.
          </p>
        </div>
      </div>
      
      {/* PERUBAHAN DI SINI: Menggunakan tag <a> agar bisa mengunduh file */}
      <a 
        href="/dokumen/Laporan_Simulasi_KPR_Geefi.pdf" 
        download="Laporan_KPR_Geefi_Residence.pdf"
        className="flex items-center gap-2 text-[14px] font-bold text-[#A67B27] hover:text-[#8a651f] transition-colors w-fit group cursor-pointer"
      >
        Unduh Laporan PDF 
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}