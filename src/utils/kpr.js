// src/utils/kprUtils.js

// Fungsi pembantu untuk memformat input angka dengan titik (misal: 500.000.000)
export const formatInputRupiah = (value) => {
  if (!value) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Fungsi pembantu untuk mengembalikan string berformat ke number
export const parseInputRupiah = (value) => {
  if (!value) return 0;
  return Number(value.toString().replace(/\./g, ""));
};

// Asumsi Anda punya fungsi hitungCicilanKPR di file yang sama sebelumnya, pindahkan juga ke sini:
export const hitungCicilanKPR = (hargaRumah, dpPercent, tenorTahun, bungaPerTahun = 5) => {
  const dpAmount = hargaRumah * (dpPercent / 100);
  const pokokPinjaman = hargaRumah - dpAmount;
  
  const bungaPerBulan = bungaPerTahun / 100 / 12;
  const tenorBulan = tenorTahun * 12;

  let cicilanPerBulan = 0;
  if (bungaPerBulan > 0) {
    cicilanPerBulan =
      (pokokPinjaman * bungaPerBulan) /
      (1 - Math.pow(1 + bungaPerBulan, -tenorBulan));
  } else {
    cicilanPerBulan = pokokPinjaman / tenorBulan;
  }

  return { 
    dpAmount, 
    cicilanPerBulan: Math.round(cicilanPerBulan) 
  };
};