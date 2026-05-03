"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { X, House, Building2, Sprout, Calculator, MapPin, Map } from 'lucide-react';

const menuItems = [
  { id: 1, label: 'Beranda', href: '#', icon: House, isActive: true },
  { id: 2, label: 'Katalog Unit', href: '#', icon: Building2, isActive: false },
  { id: 3, label: 'Fasilitas Eksklusif', href: '#', icon: Sprout, isActive: false }, 
  { id: 4, label: 'Simulasi KPR', href: '#', icon: Calculator, isActive: false },
  { id: 5, label: 'Lokasi Strategis', href: '#', icon: MapPin, isActive: false },
  { id: 6, label: 'Hubungi Kami', href: '#', icon: Map, isActive: false },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* PERUBAHAN: px-[9.5px] diubah menjadi px-[11.5px] */}
      <nav className='h-[68px] lg:h-auto lg:py-[18px] px-[20px] lg:px-[32px] max-w-[1440px] mx-auto w-full flex justify-between items-center bg-[#FAF9F6] relative z-40 font-["Manrope"] border-b border-[#E4E4E7]'>
        
        <div className='flex gap-2 items-center'>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="#B48332" strokeWidth="1.5"/>
            <path d="M12 5.5L7 9.5V17M12 5.5L17 9.5V17M12 5.5V17M9.5 7.5V17M14.5 7.5V17" stroke="#B48332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h5 className='font-bold text-[20px] text-[#B48332]'>Geefi Residence</h5>
        </div>

        <ul className='hidden lg:flex gap-8'>
          {menuItems.filter(item => item.label !== 'Hubungi Kami').map((item) => (
            <li key={item.id} className="flex items-center h-full">
              <Link 
                href={item.href} 
                className={`transition-colors duration-200 text-[14px] font-medium pb-1 border-b-2 ${
                  item.isActive 
                    ? 'text-[#B48332] border-[#B48332]' 
                    : 'text-[#52525B] border-transparent hover:text-[#B48332]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link 
          href={"#"}
          className='hidden lg:flex py-2.5 px-6 font-semibold text-[14px] rounded-full bg-[#B48332] text-white hover:bg-[#9a6f2a] transition-colors duration-200'
        >
          Hubungi Kami
        </Link>

        <button 
          className='lg:hidden text-[#B48332] p-1.5'
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Buka Menu"
        >
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0" width="24" height="2" fill="currentColor"/>
            <rect y="8" width="24" height="2" fill="currentColor"/>
            <rect y="16" width="24" height="2" fill="currentColor"/>
          </svg>
        </button>

      </nav>

      {/* OVERLAY GELAP & SIDEBAR MOBILE MENU */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 h-full w-[320px] bg-[#FAF9F6] rounded-l-[40px] px-8 py-10 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out font-["Manrope"] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="flex justify-between items-start mb-12">
            <div className='flex gap-2 items-center'>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="#B48332" strokeWidth="1.5"/>
                <path d="M12 5.5L7 9.5V17M12 5.5L17 9.5V17M12 5.5V17M9.5 7.5V17M14.5 7.5V17" stroke="#B48332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h5 className='font-bold text-[22px] tracking-wide text-[#B48332] leading-[1.2]'>
                Geefi <br/> Residence
              </h5>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-[34px] h-[34px] flex items-center justify-center bg-[#F4F4F5] hover:bg-[#E4E4E7] rounded-full text-[#A1A1AA] transition-colors mt-1"
              aria-label="Tutup Menu"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <ul className='flex flex-col gap-[30px]'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const strokeWidth = item.isActive ? 2 : 1;
              const iconColor = item.isActive ? "text-[#B48332]" : "text-[#A1A1AA]";
              const textColor = item.isActive ? "text-[#B48332] font-medium" : "text-[#52525B] font-light hover:text-[#B48332]";

              return (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 transition-colors duration-200 group">
                    <div className="flex items-center justify-start w-[24px]">
                      {item.isActive && item.label === 'Beranda' ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={iconColor} xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.709 2.473a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-5.999zM9 21v-8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8H9z" />
                        </svg>
                      ) : (
                        <Icon size={22} strokeWidth={strokeWidth} className={iconColor} fill="none" />
                      )}
                    </div>
                    <span className={`text-[15px] tracking-wide mt-[3px] ${textColor}`}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;