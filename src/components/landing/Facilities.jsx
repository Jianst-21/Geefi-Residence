import React from "react";

export default function Facilities() {
  const facilities = [
    {
      name: "Kolam Renang",
      // Ikon Orang Berenang & Ombak
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c.6 0 1.2-.2 1.7-.6l.6-.4c.5-.3 1.1-.5 1.7-.5s1.2.2 1.7.5l.6.4c.5.4 1.1.6 1.7.6s1.2-.2 1.7-.6l.6-.4c.5-.3 1.1-.5 1.7-.5s1.2.2 1.7.5l.6.4c.5.4 1.1.6 1.7.6" />
          <path d="M2 12c.6 0 1.2-.2 1.7-.6l.6-.4c.5-.3 1.1-.5 1.7-.5s1.2.2 1.7.5l.6.4c.5.4 1.1.6 1.7.6s1.2-.2 1.7-.6l.6-.4c.5-.3 1.1-.5 1.7-.5s1.2.2 1.7.5l.6.4c.5.4 1.1.6 1.7.6" />
          <path d="M2 18c.6 0 1.2-.2 1.7-.6l.6-.4c.5-.3 1.1-.5 1.7-.5s1.2.2 1.7.5l.6.4c.5.4 1.1.6 1.7.6s1.2-.2 1.7-.6l.6-.4c.5-.3 1.1-.5 1.7-.5s1.2.2 1.7.5l.6.4c.5.4 1.1.6 1.7.6" />
          <circle cx="12" cy="6" r="2" />
        </svg>
      )
    },
    {
      name: "Clubhouse & Gym",
      // Ikon Barbel/Dumbbell
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.4 14.4 9.6 9.6" />
          <path d="M18.6 21.4l-2.8-2.8a2.5 2.5 0 0 0-3.5 0l-2.8 2.8" />
          <path d="M2.6 5.4l2.8 2.8a2.5 2.5 0 0 0 3.5 0l2.8-2.8" />
          <path d="M21.4 18.6l-2.8-2.8a2.5 2.5 0 0 1 0-3.5l2.8-2.8" />
          <path d="M5.4 2.6 2.6 5.4" />
          <path d="M21.4 2.6l-2.8 2.8" />
          <path d="M2.6 21.4l2.8-2.8" />
        </svg>
      )
    },
    {
      name: "Playground",
      // Ikon Wajah Tersenyum
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: "Masjid Modern",
      // Ikon Kubah Masjid
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v5a3 3 0 0 1-3 3H4v8h16v-8h-1a3 3 0 0 1-3-3V6a4 4 0 0 0-4-4Z" />
          <path d="M12 12v6" />
          <path d="M10 14h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* BAGIAN JUDUL */}
        <div className="text-center flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-[32px] font-bold text-[#1A1C1A] mb-4 font-['Manrope']">
            Fasilitas Eksklusif
          </h2>
          <p className="w-full max-w-2xl text-gray-500 text-sm md:text-[16px] leading-[24px]">
            Dirancang untuk memenuhi gaya hidup modern dan memberikan kenyamanan maksimal bagi setiap penghuni.
          </p>
        </div>

        {/* BAGIAN GRID FASILITAS (Max Width 1216px, Gap 24px) */}
        <div className="w-full max-w-[1216px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
          
          {facilities.map((item, index) => (
            <div 
              key={index} 
              // Tinggi dipatok mutlak 130px sesuai Auto Layout Figma
              // Menggunakan border tipis dengan opacity 30% dari warna #D4C4B1
              className="flex flex-col items-center justify-center w-full h-[130px] bg-white border border-[#D4C4B1]/30 rounded-2xl hover:border-[#7E5300]/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group cursor-pointer"
            >
              {/* Wadah Ikon (Warna #7E5300) */}
              <div className="text-[#7E5300] mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              {/* Teks Fasilitas (Warna #1A1C1A) */}
              <span className="font-bold text-[#1A1C1A] text-[14px] lg:text-[15px] font-['Manrope']">
                {item.name}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}