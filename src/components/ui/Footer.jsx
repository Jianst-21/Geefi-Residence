import React from "react";
// PERBAIKAN: Facebook dan Instagram dihapus dari import lucide-react
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Footer() {
  return (
    // Padding responsif. Mobile 16.5px (atas-bawah), Desktop 48px (atas) & 54px (bawah)
    <footer className="w-full bg-[#FAF9F6] border-t border-gray-200 pt-[16.5px] pb-[16.5px] md:pt-[48px] md:pb-[54px] font-['Manrope']">
      
      {/* Gap grid disesuaikan: mobile 16.5px antar kolom, desktop 10 (40px) */}
      <div className="max-w-[1216px] mx-auto px-6 xl:px-0 grid grid-cols-1 md:grid-cols-4 gap-[16.5px] md:gap-10">
        
        {/* KOLOM 1: Brand & Hak Cipta */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* Logo Geefi Residence */}
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="20" cy="20" r="19" stroke="#B48832" strokeWidth="1.5" />
              <path d="M12 26V16L20 10L28 16V26" stroke="#B48832" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 26V14" stroke="#B48832" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 26V14" stroke="#B48832" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 26V10" stroke="#B48832" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-[18px] md:text-[20px] text-[#B48832]">Geefi Residence</span>
          </div>
          <p className="text-[13px] text-[#757575] leading-[1.8] pr-4 mt-2">
            © 2026 Geefi Residence. Hak Cipta<br className="hidden md:block" /> Dilindungi.<br className="hidden md:block" />
            Hunian berkualitas untuk masa depan<br className="hidden md:block" /> keluarga Anda.
          </p>
        </div>

        {/* KOLOM 2: Tautan */}
        <div className="flex flex-col gap-4 md:mt-2">
          <h3 className="font-bold text-[#1A1C1A] text-[14px]">Tautan</h3>
          <ul className="flex flex-col gap-3">
            {["Tentang Kami", "Kebijakan Privasi", "Syarat & Ketentuan", "Peta Situs"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[13px] text-[#757575] hover:text-[#B48832] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* KOLOM 3: Hubungi Kami */}
        <div className="flex flex-col gap-4 md:mt-2">
          <h3 className="font-bold text-[#1A1C1A] text-[14px]">Hubungi Kami</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-2 text-[13px] text-[#757575]">
              <MapPin className="text-[#B48832] w-[16px] h-[16px] shrink-0 mt-[2px]" />
              <span>Sukoharjo, Jawa Tengah 57551</span>
            </li>
            <li className="flex items-center gap-2 text-[13px] text-[#757575]">
              <Phone className="text-[#B48832] w-[16px] h-[16px] shrink-0" />
              <span>0882-1501-2059</span>
            </li>
            <li className="flex items-center gap-2 text-[13px] text-[#757575]">
              <Mail className="text-[#B48832] w-[16px] h-[16px] shrink-0" />
              <span>abyaktaagengpropertindo@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* KOLOM 4: Sosial Media */}
        <div className="flex flex-col gap-4 md:mt-2">
          <h3 className="font-bold text-[#1A1C1A] text-[14px]">Sosial Media</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2 text-[13px] text-[#757575]">
              <FacebookIcon className="text-[#B48832] shrink-0" />
              <span>Aapn</span>
            </li>
            <li className="flex items-center gap-2 text-[13px] text-[#757575]">
              <InstagramIcon className="text-[#B48832] shrink-0" />
              <span>geefiresidence</span>
            </li>
            <li className="flex items-center gap-2 text-[13px] text-[#757575]">
              <TikTokIcon className="text-[#B48832] shrink-0" />
              <span>Abyakta Ageng</span>
            </li>
            <li className="flex items-center gap-2 text-[13px] text-[#757575]">
              <WhatsAppIcon className="text-[#B48832] shrink-0" />
              <span>0882-1501-2059</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}