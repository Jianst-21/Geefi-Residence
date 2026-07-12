"use client";
import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { formatIDR } from "../../utils/formatters";

export default function KprCalculator({
  hargaRumah,
  setHargaRumah,
  uangMuka,
  setUangMuka,
  tenor,
  setTenor,
  bunga,
  setBunga
}) {

  // State Cek Kelayakan KPR
  const [penghasilanBulanan, setPenghasilanBulanan] = useState(50000000);
  const [cicilanLainnya, setCicilanLainnya] = useState(0);

  // State Perhitungan Dinamis
  const [cicilanPerBulan, setCicilanPerBulan] = useState(0);
  const [totalPinjaman, setTotalPinjaman] = useState(0);
  const [totalBunga, setTotalBunga] = useState(0);

  // Auto Calculate
  useEffect(() => {
    const pokokPinjaman = hargaRumah - uangMuka;
    const bungaBulanan = bunga / 100 / 12;
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
    setPenghasilanBulanan(50000000);
    setCicilanLainnya(0);
  };

  // Helper untuk mewarnai track slider (kiri emas, kanan abu-abu)
  const getSliderBackground = (value, min, max) => {
    // Math.max dan Math.min memastikan persentase tidak bocor di bawah 0 atau di atas 100 saat diketik manual
    const percentage = Math.max(
      0,
      Math.min(100, ((value - min) / (max - min)) * 100),
    );
    return `linear-gradient(to right, #B27C21 ${percentage}%, #E5E7EB ${percentage}%)`;
  };

  return (
    <section className="w-full bg-[#FAF9F6] pb-[80px] font-['Manrope']">
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
      <div className="max-w-[1280px] mx-auto px-4 md:px-[20px]">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-[48px] pt-[48px] gap-[16px]">
          <h2 className="text-[36px] font-bold leading-[36px] text-[#1A1C1A] tracking-normal">
            Kalkulator KPR
          </h2>
          <div className="w-[60px] h-[3px] bg-[#C5A25D]"></div>
          <p className="text-[16px] font-normal leading-[24px] text-gray-500 max-w-[640px]">
            Kami bekerja sama dengan institusi finansial terpercaya untuk
            memberikan suku bunga rendah dan biaya ringan demi kenyamanan
            finansial Anda.
          </p>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row justify-center gap-[16px] w-full">
          {/* 1. PARAMETER PINJAMAN */}
          <div className="w-full lg:w-[380px] xl:w-[448px] shrink-0 bg-white rounded-[24px] shadow-sm pt-[40px] pb-[60px] px-[32px] md:px-[64px] flex flex-col gap-[40px]">
            <h3 className="text-[20px] font-bold text-[#1A1C1A]">
              Parameter Pinjaman
            </h3>

            <div className="flex flex-col gap-[32px]">
              {/* Harga Rumah */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Harga Rumah
                  </label>
                  <div className="flex items-center">
                    <span className="text-[16px] font-bold text-[#A67B27] mr-1">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatIDR(hargaRumah)}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/\D/g, ""));
                        if (isNaN(val)) return;
                        setHargaRumah(Math.min(265000000, Math.max(0, val)));
                      }}
                      className="no-arrows font-bold text-[#A67B27] text-[16px] bg-transparent outline-none w-[110px] text-right p-0 m-0 border-none focus:ring-0"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="50000000"
                  max="265000000"
                  step="1000000"
                  value={hargaRumah}
                  onChange={(e) => setHargaRumah(Number(e.target.value))}
                  className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none relative z-10"
                  style={{
                    background: getSliderBackground(
                      hargaRumah,
                      50000000,
                      265000000,
                    ),
                  }}
                />
              </div>

              {/* Uang Muka */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Uang Muka (
                    {hargaRumah > 0
                      ? Math.round((uangMuka / hargaRumah) * 100)
                      : 0}
                    %)
                  </label>
                  <div className="flex items-center">
                    <span className="text-[16px] font-bold text-[#A67B27] mr-1">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatIDR(uangMuka)}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/\D/g, ""));
                        if (isNaN(val)) return;
                        setUangMuka(Math.min(hargaRumah, Math.max(0, val)));
                      }}
                      className="no-arrows font-bold text-[#A67B27] text-[16px] bg-transparent outline-none w-[110px] text-right p-0 m-0 border-none focus:ring-0"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={hargaRumah}
                  step="1000000"
                  value={uangMuka}
                  onChange={(e) => setUangMuka(Number(e.target.value))}
                  className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none relative z-10"
                  style={{
                    background: getSliderBackground(uangMuka, 0, hargaRumah),
                  }}
                />
              </div>

              {/* Tenor */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Masa Pinjaman (Tenor)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={tenor}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (isNaN(val)) return;
                        setTenor(Math.min(30, Math.max(0, val)));
                      }}
                      className="no-arrows font-bold text-[#A67B27] text-[16px] bg-transparent outline-none w-[32px] text-right p-0 m-0 border-none focus:ring-0"
                    />
                    <span className="text-[16px] font-bold text-[#A67B27] ml-1">
                      Tahun
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenor}
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none relative z-10"
                  style={{ background: getSliderBackground(tenor, 1, 30) }}
                />
              </div>

              {/* Bunga */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Suku Bunga Efektif
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      step="0.1"
                      value={bunga}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (isNaN(val)) return;
                        setBunga(Math.min(15, Math.max(0, val)));
                      }}
                      className="no-arrows font-bold text-[#A67B27] text-[16px] bg-transparent outline-none w-[44px] text-right p-0 m-0 border-none focus:ring-0"
                    />
                    <span className="text-[16px] font-bold text-[#A67B27] ml-0.5">
                      %
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.1"
                  value={bunga}
                  onChange={(e) => setBunga(Number(e.target.value))}
                  className="custom-range w-full h-[6px] bg-gray-200 rounded-lg appearance-none outline-none relative z-10"
                  style={{ background: getSliderBackground(bunga, 1, 15) }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full h-[58px] flex items-center justify-center gap-2.5 rounded-full bg-[#F4F3F1] text-[16px] font-bold text-[#A67B27] hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer mt-2 group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                width="18"
                height="18"
                className="group-hover:-rotate-45 transition-transform duration-300"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset Simulasi
            </button>
          </div>

          {/* ================= GRUP KANAN ================= */}
          <div className="w-full lg:flex-1 flex flex-col gap-[16px]">
            <div className="flex flex-col md:flex-row gap-[16px]">
              {/* 2. ESTIMASI ANGSURAN */}
              <div className="flex-1 bg-[#F4F3F1] rounded-[24px] flex flex-col overflow-hidden min-h-[360px]">
                <div className="p-[40px]">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Estimasi Angsuran Per Bulan
                  </span>
                  <h4 className="text-[36px] md:text-[44px] font-bold text-[#1A1C1A] mt-2 mb-12 leading-tight tracking-tight">
                    Rp {formatIDR(cicilanPerBulan)}
                  </h4>
                </div>
                <div className="bg-[#9A6D14] p-[40px] flex justify-between items-end mt-auto">
                  <div className="flex flex-col text-white">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                      Total Pinjaman
                    </span>
                    <span className="text-[18px] md:text-[20px] font-bold">
                      Rp {formatIDR(totalPinjaman)}
                    </span>
                  </div>
                  <div className="flex flex-col text-right text-white">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                      Total Bunga
                    </span>
                    <span className="text-[18px] md:text-[20px] font-bold">
                      Rp {formatIDR(totalBunga)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. CEK KELAYAKAN */}
              {(() => {
                const totalDebt = cicilanPerBulan + cicilanLainnya;
                const dti = penghasilanBulanan > 0 ? (totalDebt / penghasilanBulanan) * 100 : 100;

                let statusText = "Sangat Layak";
                let statusColor = "bg-[#E6F4EA] text-[#137333] border-[#137333]/20";
                let statusDesc = "Rasio hutang Anda berada di bawah 30% dari penghasilan.";

                if (dti > 30 && dti <= 50) {
                  statusText = "Cukup Layak";
                  statusColor = "bg-[#FEF7E0] text-[#B06000] border-[#B06000]/20";
                  statusDesc = "Rasio hutang Anda berada di kisaran 30% - 50% dari penghasilan.";
                } else if (dti > 50) {
                  statusText = "Kurang Layak";
                  statusColor = "bg-[#FCE8E6] text-[#C5221F] border-[#C5221F]/20";
                  statusDesc = "Rasio hutang Anda melebihi 50% dari penghasilan. Disarankan memperpanjang tenor atau menaikkan uang muka.";
                }

                return (
                  <div className="w-full md:w-[272px] bg-[#F4F3F1] rounded-[24px] p-[32px] flex flex-col gap-[20px]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={20} className="text-[#A67B27]" />
                      <h5 className="text-[16px] font-bold text-[#1A1C1A]">
                        Cek Kelayakan
                      </h5>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Penghasilan Bulanan
                        </label>
                        <div className="relative h-[44px] bg-white rounded-[12px] border border-gray-200 focus-within:border-[#A67B27] flex items-center px-4 transition-colors">
                          <span className="text-[13px] text-gray-500 mr-1">Rp</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={formatIDR(penghasilanBulanan)}
                            onChange={(e) => {
                              const val = Number(e.target.value.replace(/\D/g, ""));
                              setPenghasilanBulanan(val);
                            }}
                            className="w-full bg-transparent text-[13px] font-medium text-gray-700 focus:outline-none border-none p-0"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Cicilan Lainnya
                        </label>
                        <div className="relative h-[44px] bg-white rounded-[12px] border border-gray-200 focus-within:border-[#A67B27] flex items-center px-4 transition-colors">
                          <span className="text-[13px] text-gray-500 mr-1">Rp</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={formatIDR(cicilanLainnya)}
                            onChange={(e) => {
                              const val = Number(e.target.value.replace(/\D/g, ""));
                              setCicilanLainnya(val);
                            }}
                            className="w-full bg-transparent text-[13px] font-medium text-gray-700 focus:outline-none border-none p-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-[20px] p-4 mt-auto border ${statusColor}`}>
                      <p className="text-[11px] leading-relaxed">
                        <span className="font-bold">
                          Status Anda: {statusText}.
                        </span>{" "}
                        {statusDesc}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 4. TABEL BUNGA */}
            <div className="bg-[#1A1C1A] rounded-[32px] p-[32px] text-white">
              <h3 className="text-[18px] font-bold mb-4">Bunga Bank Rekanan</h3>
              <div className="divide-y divide-white/10 text-[14px]">
                <div className="py-3 flex justify-between items-center">
                  <span className="opacity-70">BRI</span>
                  <span className="font-bold">5.88% (Fixed 3th)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
