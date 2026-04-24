"use client";
import React from "react";
import { GraduationCap, Hospital, CarFront } from "lucide-react"; 

export default function LocationSection() {
  const accessibilities = [
    {
      id: 1,
      name: "SDIT Al-Irsyad",
      time: "Hanya 3 menit perjalanan",
      icon: <GraduationCap size={22} />,
    },
    {
      id: 2,
      name: "RS Hermina",
      time: "Hanya 5 menit perjalanan",
      icon: <Hospital size={22} />,
    },
    {
      id: 3,
      name: "Tol Plumpung",
      time: "Hanya 10 menit perjalanan",
      icon: <CarFront size={22} />,
    }
  ];

  return (
    // Background sama dengan section Testimoni, ditambah Padding Bottom presisi 200px
    <section className="w-full bg-[#FAF9F6] pb-[200px] font-['Manrope']">
      
      {/* Wadah Utama dibatasi 1216px */}
      <div className="max-w-[1216px] mx-auto px-6 xl:px-0">
        
        {/* KOTAK KONTEN (Tinggi presisi 500px di Desktop) */}
        <div className="w-full h-auto lg:h-[500px] flex flex-col lg:flex-row bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
          
          {/* SISI KIRI: PETA (Lebar ~60%) */}
          <div className="w-full lg:w-[60%] h-[300px] lg:h-full relative bg-gray-200">
            {/* Embed Google Maps interaktif (Area Sukoharjo sesuai gambar) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126497.66268045547!2d110.76569766943187!3d-7.676602324908082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16627cbdc6dd%3A0x4027a76e35308c0!2sSukoharjo%2C%20Sukoharjo%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* SISI KANAN: DAFTAR AKSESIBILITAS (Lebar ~40%) */}
          <div className="w-full lg:w-[40%] p-8 md:p-10 xl:p-[56px] flex flex-col justify-between">
            
            <div>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1A1C1A] mb-8 lg:mb-10 leading-tight">
                Aksesibilitas Utama
              </h2>

              <div className="flex flex-col gap-6 lg:gap-8">
                {accessibilities.map((item) => (
                  <div key={item.id} className="flex items-center gap-5">
                    {/* Wadah Ikon (Background Emas Transparan 10%) */}
                    <div className="w-[48px] h-[48px] rounded-full bg-[#7E5300]/10 flex items-center justify-center shrink-0 text-[#7E5300]">
                      {item.icon}
                    </div>
                    {/* Teks Informasi */}
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A1C1A] text-[15px] lg:text-[16px] mb-0.5">
                        {item.name}
                      </span>
                      <span className="text-[#5F5E5E] text-[13px] lg:text-[14px]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOMBOL (Gaya Outline Presisi dengan margin top otomatis mendorong ke bawah) */}
            <button className="mt-10 lg:mt-auto w-full h-[52px] rounded-full border-[1.5px] border-[#B48832] text-[#7E5300] font-bold text-[14px] tracking-wide hover:bg-[#7E5300] hover:text-white transition-all duration-300">
              Lihat alamat lengkap
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}