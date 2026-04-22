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

        {/* CONTAINER TOMBOL */}
        <div className="mt-10 flex gap-6 items-center">
          <button className="bg-[#B48332] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#9a6f2a] transition">
            Eksplor Sekarang
          </button>

          {/* TOMBOL LIHAT VIDEO TOUR YANG SUDAH DIPERBAIKI (TIDAK DOUBLE) */}
          <button className="flex items-center gap-2 font-bold text-[#B48332] hover:opacity-80 transition">
            Lihat Video Tour
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[20px] h-[20px]"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon
                points="10 8 16 12 10 16 10 8"
                fill="currentColor"
                stroke="none"
              ></polygon>
            </svg>
          </button>
        </div>
      </div>

      {/* Bagian Kanan: Gambar Rumah & Badge */}
      <div className="flex-1 relative w-full mt-10 md:mt-0">
        {/* Kotak placeholder untuk gambar dengan ukuran presisi 584x500 di desktop */}
        <div className="w-full max-w-[584px] h-[400px] md:h-[500px] bg-gray-200 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden relative mx-auto md:mx-0 md:ml-auto">
          <span className="text-gray-400">Taruh Gambar Rumah di Sini</span>
        </div>

        <div className="absolute top-[35%] -left-6 md:-left-16 lg:-left-22 bg-white/95 backdrop-blur-md rounded-[2rem] shadow-xl flex items-center justify-start gap-4 border border-gray-100 z-10 w-[255.78px] h-[92px] pl-6">
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
            <p className="font-bold text-base text-gray-900 leading-tight">
              Pilihan No. 1
            </p>
            <p className="text-sm text-gray-500 mt-1">Keluarga Muda Modern</p>
          </div>
        </div>
      </div>
    </section>
  );
}
