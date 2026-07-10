"use client";
import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export default function KprAmortizationTable({ hargaRumah, uangMuka, tenor, bunga }) {
  const [expandedYearIdx, setExpandedYearIdx] = useState(0); // Accordion state for mobile view
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Calculate schedule dynamically
  const pokokPinjaman = hargaRumah - uangMuka;
  const bungaBulanan = bunga / 100 / 12;
  const jumlahBulan = tenor * 12;

  let cicilanBulanan = 0;
  if (pokokPinjaman > 0) {
    if (bungaBulanan > 0) {
      cicilanBulanan = (pokokPinjaman * bungaBulanan) / (1 - Math.pow(1 + bungaBulanan, -jumlahBulan));
    } else {
      cicilanBulanan = pokokPinjaman / jumlahBulan;
    }
  }

  let sisaPokok = pokokPinjaman;
  const yearlyData = [];
  const monthlyData = [];

  for (let month = 1; month <= jumlahBulan; month++) {
    const bungaBulan = sisaPokok * bungaBulanan;
    const pokokBulan = Math.min(sisaPokok, cicilanBulanan - bungaBulan);
    sisaPokok = Math.max(0, sisaPokok - pokokBulan);

    monthlyData.push({
      month,
      pokok: pokokBulan,
      bunga: bungaBulan,
      sisa: sisaPokok,
    });
  }

  for (let year = 1; year <= tenor; year++) {
    const startMonthIdx = (year - 1) * 12;
    const endMonthIdx = Math.min(jumlahBulan, year * 12);
    
    let totalBungaTahun = 0;
    let totalPokokTahun = 0;
    let sisaPokokTahun = 0;

    for (let m = startMonthIdx; m < endMonthIdx; m++) {
      if (monthlyData[m]) {
        totalBungaTahun += monthlyData[m].bunga;
        totalPokokTahun += monthlyData[m].pokok;
        sisaPokokTahun = monthlyData[m].sisa;
      }
    }

    const currentYear = new Date().getFullYear();

    yearlyData.push({
      tahun: `Tahun ${year}`,
      title: getYearLabel(year),
      period: `JAN - DES ${currentYear + year - 1}`,
      sisa: Math.round(sisaPokokTahun),
      bunga: Math.round(totalBungaTahun),
      pokok: Math.round(totalPokokTahun),
      months: monthlyData.slice(startMonthIdx, endMonthIdx),
    });
  }

  // Helpers
  function getYearLabel(yearNum) {
    const labels = {
      1: "Tahun Pertama",
      2: "Tahun Kedua",
      3: "Tahun Ketiga",
      4: "Tahun Keempat",
      5: "Tahun Kelima",
      6: "Tahun Keenam",
      7: "Tahun Ketujuh",
      8: "Tahun Kedelapan",
      9: "Tahun Kesembilan",
      10: "Tahun Kesepuluh"
    };
    return labels[yearNum] || `Tahun Ke-${yearNum}`;
  }

  const formatShortRupiah = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1).replace('.', ',')}jt`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}rb`;
    }
    return Math.round(value).toString();
  };

  const mobileVisibleYears = showAllMobile ? yearlyData : yearlyData.slice(0, 3);

  return (
    <section className="w-full bg-[#FAF9F6] pt-0 pb-[24px] lg:pb-[80px] font-['Manrope']">
      <div className="max-w-[1184px] mx-auto px-4 xl:px-0">

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

          <div className="col-span-8 bg-white rounded-[48px] overflow-hidden border border-gray-100 shadow-sm flex flex-col">
            <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-100 bg-white">
                    <th className="pt-8 pb-6 px-8 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tahun</th>
                    <th className="pt-8 pb-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sisa Pokok</th>
                    <th className="pt-8 pb-6 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Angsuran Bunga</th>
                    <th className="pt-8 pb-6 px-8 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Angsuran Pokok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {yearlyData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-7 px-8 text-[14px] font-bold text-[#1A1C1A]">{row.tahun}</td>
                      <td className="py-7 px-4 text-[14px] font-medium text-gray-500">Rp {formatIDR(row.sisa)}</td>
                      <td className="py-7 px-4 text-[14px] font-medium text-gray-500">Rp {formatIDR(row.bunga)}</td>
                      <td className="py-7 px-8 text-[14px] font-bold text-[#A67B27]">Rp {formatIDR(row.pokok)}</td>
                    </tr>
                  ))}
                  {yearlyData.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-gray-400 text-sm">
                        Masukkan harga rumah dan parameter pinjaman untuk melihat rincian pembayaran.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ================= TAMPILAN MOBILE ================= */}
        <div className="lg:hidden flex flex-col">
          <div className="pt-[40px] pb-[32px] flex flex-col">
            <h2 className="text-[24px] font-bold text-[#1A1C1A]">Rincian Pembayaran Tahunan</h2>
            <p className="text-[12px] text-gray-400 mt-1 mb-[24px]">Berdasarkan Harga Properti Rp {formatIDR(hargaRumah)}</p>

            <div className="flex flex-col gap-[16px]">
              {mobileVisibleYears.map((year, idx) => {
                const isExpanded = expandedYearIdx === idx;
                return (
                  <div key={idx} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setExpandedYearIdx(isExpanded ? null : idx)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F4F3F1] flex items-center justify-center text-[14px] font-bold text-[#9A6D14]">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#1A1C1A]">{year.title}</h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{year.period}</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>

                    {isExpanded && (
                      <div className="mt-6 border-t border-gray-50 pt-5">
                        <div className="grid grid-cols-4 text-[10px] font-bold text-gray-400 mb-4 tracking-wider">
                          <span>BULAN</span>
                          <span>POKOK</span>
                          <span>BUNGA</span>
                          <span className="text-right">SISA</span>
                        </div>
                        <div className="flex flex-col gap-4 text-[12px]">
                          {year.months.map((m, mIdx) => (
                            <MonthlyRow 
                              key={mIdx}
                              month={m.month < 10 ? `0${m.month}` : m.month} 
                              pokok={formatShortRupiah(m.pokok)} 
                              bunga={formatShortRupiah(m.bunga)} 
                              sisa={formatShortRupiah(m.sisa)} 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {yearlyData.length > 3 && (
              <button 
                onClick={() => setShowAllMobile(!showAllMobile)}
                className="mt-6 w-full py-4 rounded-full border border-gray-200 text-[#A67B27] font-bold text-sm bg-white hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                {showAllMobile ? "Lihat Lebih Sedikit" : "Lihat Semua Tahun"}
              </button>
            )}

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
    </div>
  );
}