// src/utils/kpr.js

// Fungsi murni untuk memformat angka menjadi Rupiah (tanpa desimal)
export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// Fungsi murni untuk menghitung cicilan dan DP
export const hitungCicilanKPR = (hargaRumah, dpPercent, tenor) => {
  const dpAmount = (hargaRumah * dpPercent) / 100;
  const plafon = hargaRumah - dpAmount;

  // Asumsi bunga flat 7% per tahun (Bisa kamu ubah jika diperlukan)
  const bungaPerTahun = 0.07;
  const totalBunga = plafon * bungaPerTahun * tenor;
  const totalPinjaman = plafon + totalBunga;
  
  // Mencegah nilai infinity jika tenor 0
  const cicilanPerBulan = tenor > 0 ? totalPinjaman / (tenor * 12) : 0;

  // Mengembalikan data sebagai object agar mudah diambil di komponen
  return { 
    dpAmount, 
    cicilanPerBulan 
  };
};