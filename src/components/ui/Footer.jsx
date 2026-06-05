import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-14 pb-0">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg text-primary mb-6">Geefi Residence</p>
          <p className="text-xs text-secondary/80 leading-relaxed">
            © 2024 Geefi Residence. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-secondary/80 leading-relaxed">
            Hunian berkualitas untuk masa depan keluarga Anda.
          </p>
        </div>

        {/* Tautan */}
        <div>
          <p className="text-sm font-bold text-foreground mb-6">Tautan</p>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {["Tentang Kami", "Kebijakan Privasi", "Syarat & Ketentuan", "Peta Situs"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs text-secondary/80 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <p className="text-sm font-bold text-foreground mb-6">Hubungi Kami</p>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              <MapPinIcon width={14} className="text-primary" />
              Jl. Raya Utama No. 88, Bekasi
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              <PhoneIcon width={14} className="text-primary" />
              (021) 555-0123
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              <MailIcon width={14} className="text-primary" />
              hello@geefi.com
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <p className="text-sm font-bold text-foreground mb-6">Sosial Media</p>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* Facebook Outline Icon (Circled) */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M14 9h-2a1 1 0 0 0-1 1v2h3l-1 3h-2v5M11 20v-5H9v-3h2v-2a3 3 0 0 1 3-3h2"></path>
              </svg>
              <Link href="#" className="hover:text-primary transition-colors">Aapn</Link>
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* Instagram Outline Icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <Link href="#" className="hover:text-primary transition-colors">geefiresidence</Link>
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* TikTok Outline Icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
              <Link href="#" className="hover:text-primary transition-colors">Abyakta Ageng</Link>
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* WhatsApp Outline Icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                <path d="M9.5 9c-.3-.8-.6-.9-1.4-.9h-1c-.5 0-1.2.3-1.6.8s-1.5 1.5-1.5 3.6 1.6 4.2 1.8 4.5 3.1 4.7 7.5 4.7c4 0 4.8-.8 5.2-1.2s.5-1.1.4-1.3c-.1-.2-.4-.3-.8-.5s-2.4-1.2-2.7-1.3-.6-.2-.8.2-1 1.3-1.2 1.5-.5.3-.9.1-1.7-.6-2.5-1.3c-.6-.5-1-1.2-1.1-1.4s-.1-.3.1-.5c.2-.2.4-.4.6-.7s.3-.4.4-.7c.1-.3 0-.6-.1-.8s-1-2.4-1.4-3.3z"></path>
              </svg>
              <Link href="#" className="hover:text-primary transition-colors">0882-1501-2059</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
    </footer>
  );
}