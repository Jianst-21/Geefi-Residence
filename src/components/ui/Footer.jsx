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

        {/* Newsletter */}
        <div>
          <p className="text-sm font-bold text-foreground mb-6">Newsletter</p>
          <p className="text-xs text-secondary/80 leading-relaxed mb-3">
            Dapatkan info terbaru mengenai promo unit.
          </p>
          <div className="flex border border-stone-300 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-1 px-3 py-2.5 text-xs bg-white text-foreground placeholder-stone-400 outline-none"
            />
            <button
              aria-label="Subscribe"
              className="bg-primary hover:bg-primary/90 px-3 flex items-center justify-center transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M3 7.5h9M9 4l3.5 3.5L9 11"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
    </footer>
  );
}