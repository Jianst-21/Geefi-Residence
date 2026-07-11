import React from "react";
import Image from "next/image";
import Link from "next/link"; // Tambahkan import Link dari next/link

export default function Hero() {
  return (
    <section className="w-full bg-[#FFFFFF] font-['Manrope'] flex justify-center items-center pt-8 pb-0 md:pt-0 md:pb-16 lg:pb-[115px] overflow-hidden">
      <div className="relative w-full max-w-[1220px] flex flex-col md:flex-row items-center md:items-stretch px-[33.5px] md:px-8 lg:px-8 xl:px-0 gap-[24px] md:gap-[32px] lg:gap-[52px] pt-16">
        {/* KOLOM KIRI: Teks & Tombol */}
        <div className="flex flex-col justify-center gap-[24px] md:gap-[31px] w-full md:flex-1 lg:w-[584px] lg:shrink-0">
          <h1 className="text-[36px] sm:text-[44px] md:text-[40px] lg:text-[60px] font-extrabold leading-[1.1] text-[#18181B] tracking-tight">
            Hunian <span className="text-[#B48332]">Minimalis</span> di
            <br />
            Jantung Kota
          </h1>

          <p className="text-[#52525B] text-[14px] md:text-[15px] lg:text-[18px] leading-[1.6]">
            Menghadirkan harmoni antara desain arsitektur modern dan ketenangan
            alam. Abyakta adalah simbol pencapaian hidup Anda yang
            eksklusif.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full mt-2">
            {/* Tombol Eksplor Sekarang diubah menjadi tag Link */}
            <Link 
              href="/unit" 
              className="w-full sm:w-auto px-8 py-[18px] bg-[#936625] text-white rounded-full font-semibold text-[15px] lg:text-[18px] shadow-[0_8px_24px_rgba(147,102,37,0.25)] hover:bg-[#7a551f] transition duration-300 text-center flex justify-center items-center"
            >
              Eksplor Sekarang
            </Link>
            {/* Tombol Lihat Video Tour dihapus */}
          </div>
        </div>

        {/* KOLOM KANAN: Gambar & Floating Badge */}
        <div className="relative w-full max-w-[345px] md:max-w-none md:flex-1 lg:w-[584px] lg:shrink-0 h-[355px] md:h-[360px] lg:h-[500px] mx-auto lg:mx-0">
          <div className="absolute inset-0 w-full h-full rounded-[32px] lg:rounded-[48px] overflow-hidden bg-gray-100">
            {/* GAMBAR DESKTOP & TABLET (Muncul di layar md ke atas) */}
            <Image
              src="/images/landings/Luxury House.png"
              alt="Abyakta Luxury House"
              fill
              className="hidden md:block object-cover"
              priority
            />

            {/* GAMBAR MOBILE (Hanya muncul di layar di bawah md) */}
            <Image
              src="/images/landings/HeroMobile.png" // Sesuaikan nama file ini dengan yang ada di folder Anda
              alt="Abyakta Mobile View"
              fill
              className="block md:hidden object-cover"
              priority
            />
          </div>

          {/* Floating Badge */}
          <div className="flex absolute top-[30%] lg:top-[35%] -left-[16px] md:-left-[24px] lg:-left-[70px] bg-white/95 backdrop-blur-md rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.08)] items-center justify-start gap-3 border border-gray-100 z-10 w-[220px] md:w-[240px] lg:w-[255.78px] h-[80px] lg:h-[92px] pl-4 lg:pl-5 pr-4 lg:pr-6">
            <div className="w-[38px] lg:w-[44px] h-[38px] lg:h-[44px] bg-[#FFF4E5] rounded-full text-[#B48332] flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 lg:w-5 lg:h-5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-bold text-[14px] lg:text-[16px] text-[#18181B] leading-tight mb-0.5">
                Pilihan No. 1
              </p>
              <p className="text-[12px] lg:text-[14px] text-[#52525B] leading-tight">
                Keluarga Muda Modern
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}