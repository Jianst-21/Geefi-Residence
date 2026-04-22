import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Lokasi Strategis",
      desc: "Berada tepat di akses utama kota dengan kemudahan jangkauan ke fasilitas umum penting.",
      // Ikon Pin Lokasi Custom (Sama persis dengan Figma)
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.5c4.5-5 7.5-9 7.5-12a7.5 7.5 0 1 0-15 0c0 3 3 7 7.5 12z" fill="#FDF2E3" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      )
    },
    {
      title: "Keamanan 24/7",
      desc: "Sistem keamanan satu pintu dengan pengawasan CCTV dan petugas keamanan profesional.",
      // Ikon Shield Sudut Tajam Custom (Sama persis dengan Figma)
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h14v9.5L12 21l-7-7.5V4z" fill="#FDF2E3" />
          <path d="M9 11.5l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Lingkungan Asri",
      desc: "Ruang terbuka hijau yang luas dan taman tematik untuk keseimbangan hidup keluarga Anda.",
      // Ikon Dua Pohon Pinus Custom (Sama persis dengan Figma)
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Pohon Kanan (dirender lebih dulu agar ada di belakang) */}
          <path d="M16 3 L11 11 h3 l-3 6 h12 l-3-6 h3 L16 3 Z" fill="#FDF2E3" />
          <path d="M16 17 v5" />
          
          {/* Pohon Kiri (dirender terakhir agar ada di depan) */}
          <path d="M8 3 L3 11 h3 l-3 6 h12 l-3-6 h3 L8 3 Z" fill="#FDF2E3" />
          <path d="M8 17 v5" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* BAGIAN JUDUL */}
        <div className="text-center flex flex-col items-center mb-16">
          <h2 className="w-full max-w-[616px] md:h-[40px] text-3xl md:text-[32px] leading-[40px] font-bold text-gray-900 mb-4 font-['Manrope'] flex items-center justify-center">
            Mengapa Memilih Geefi Residence?
          </h2>
          <p className="w-full max-w-[672px] md:h-[24px] text-gray-500 text-sm md:text-[16px] leading-[24px] flex items-start justify-center">
            Kami mengedepankan kualitas hidup penghuni melalui pemilihan lokasi dan fasilitas terbaik.
          </p>
        </div>

        {/* BAGIAN GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-[2rem] p-8 lg:p-10 flex flex-col items-start w-full max-w-[384px] min-h-[298px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              {/* WADAH IKON KREM & IKON EMAS (Tepat 64x64px) */}
              <div className="w-[64px] h-[64px] bg-[#FDF2E3] rounded-2xl flex items-center justify-center text-[#B27C21] mb-8">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Manrope']">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}