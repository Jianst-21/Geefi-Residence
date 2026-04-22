import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center pt-32 pb-16 gap-10 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Bagian Kiri: Teks & Tombol */}
      <div className="flex-1 mt-10 md:mt-0">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
          Hunian <span className="text-[#B48332]">Minimalis</span> di
          <br />
          Jantung Kota
        </h1>
        <p className="mt-6 text-gray-500 text-lg max-w-md">
          Menghadirkan harmoni antara desain arsitektur modern dan ketenangan
          alam. Geefi Residence adalah simbol pencapaian hidup Anda yang
          eksklusif.
        </p>

        <div className="mt-10 flex gap-5 items-center">
          <button className="bg-[#B48332] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#9a6f2a] transition">
            Eksplor Sekarang
          </button>
          <button className="flex items-center gap-2 font-medium text-[#B48332] hover:text-gray-700 transition">
            Lihat Video Tour
            <span className="w-6 h-6 flex items-center justify-center border border-[#B48332] rounded-full text-xs">
              ▶
            </span>
          </button>
        </div>
      </div>

      {/* Bagian Kanan: Gambar Rumah & Badge */}
      <div className="flex-1 relative w-full mt-10 md:mt-0">
        {/* Kotak placeholder untuk gambar (Nanti bisa diganti tag <Image /> Next.js) */}
        <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
          <span className="text-gray-400">Taruh Gambar Rumah di Sini</span>
        </div>

        {/* Floating Badge (Pilihan No. 1) */}
        <div className="absolute top-10 -left-4 md:-left-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3">
          
          {/* BULATAN BINTANG YANG SUDAH DIPERBAIKI (44x43px, warna FFDDB2, shrink-0) */}
          <div className="w-[44px] h-[43px] bg-[#FFDDB2] rounded-full text-[#B48332] flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          
          <div>
            <p className="font-bold text-sm text-gray-800">Pilihan No. 1</p>
            <p className="text-xs text-gray-500">Keluarga Muda Modern</p>
          </div>
        </div>
      </div>
    </section>
  );
}