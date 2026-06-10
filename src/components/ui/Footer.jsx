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
              {/* Map Pin Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z"/>
              </svg>
              Jl. Raya Utama No. 88, Bekasi
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* Phone Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M22 16.9664V19.9561C22 20.5084 21.5523 20.9561 21 20.9561C10.5066 20.9561 2 12.4495 2 1.95611C2 1.40383 2.44772 0.956116 3 0.956116H5.97275C6.48003 0.956116 6.90807 1.33418 6.96541 1.83852C7.08639 2.89931 7.33235 3.92641 7.69317 4.90176C7.8465 5.31618 7.74719 5.78363 7.42996 6.10086L5.34007 8.19075C6.96499 11.5173 9.48271 14.035 12.8093 15.6599L14.8991 13.57C15.2164 13.2528 15.6838 13.1535 16.0982 13.3068C17.0736 13.6677 18.1007 13.9136 19.1615 14.0346C19.6658 14.0919 20.0439 14.52 20.0439 15.0272V16.9664H22ZM20 18.9561V15.1158C19.0664 14.9922 18.1633 14.7674 17.2996 14.4495L15.6202 16.1288C15.2778 16.4712 14.7709 16.6025 14.3059 16.4402C10.4578 15.097 7.85906 12.4982 6.51578 8.65013C6.35353 8.18512 6.48483 7.67818 6.82725 7.33576L8.50657 5.65644C8.18874 4.79273 7.96395 3.88965 7.84033 2.95612H4.01358C4.16104 11.5362 11.4199 18.7951 20 18.9561Z"/>
              </svg>
              (021) 555-0123
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* Mail Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"/>
              </svg>
              gegeefiresidence@gmail.com
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <p className="text-sm font-bold text-foreground mb-6">Sosial Media</p>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* Facebook Circle Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 9.5H14V7H13.5C11.567 7 10 8.567 10 10.5V12H8.99542L9.0004 14H10V18H12V14H13.9958L14 12H12V10.5C12 9.94772 12.4477 9.5 13 9.5Z"/>
              </svg>
              <Link href="https://www.facebook.com/aapn.2025/?rdid=ffq92EP59jkYEbPE" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Aapn</Link>
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* Instagram Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M7.8 2H16.2C19.4033 2 22 4.59675 22 7.8V16.2C22 19.4033 19.4033 22 16.2 22H7.8C4.59675 22 2 19.4033 2 16.2V7.8C2 4.59675 4.59675 2 7.8 2ZM7.8 4C5.70135 4 4 5.70135 4 7.8V16.2C4 18.2986 5.70135 20 7.8 20H16.2C18.2986 20 20 18.2986 20 16.2V7.8C20 5.70135 18.2986 4 16.2 4H7.8ZM12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5ZM12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5ZM16.5 6C17.3284 6 18 6.67157 18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6Z"/>
              </svg>
              <Link href="https://www.instagram.com/geefiresidence/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">geefiresidence</Link>
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* TikTok Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M16 8V2H18C18.3224 4.51261 20.3705 6.43598 22 6.8123V9C20.6508 9 19.3496 8.52834 18.3582 7.69741V13.5C18.3582 17.0899 15.448 20 11.8582 20C8.2684 20 5.35822 17.0899 5.35822 13.5C5.35822 9.91015 8.2684 7 11.8582 7V9.5C9.64908 9.5 7.85822 11.2909 7.85822 13.5C7.85822 15.7091 9.64908 17.5 11.8582 17.5C14.0674 17.5 15.8582 15.7091 15.8582 13.5V8H16Z"/>
              </svg>
              <Link href="https://www.tiktok.com/@geefiresidence" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Abyakta Ageng</Link>
            </li>
            <li className="flex gap-2 items-center text-xs text-secondary/80">
              {/* WhatsApp Line - Remix Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="text-primary shrink-0">
                <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.8 3.08 1.22 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a7.896 7.896 0 0 1-1.2-4.25c0-4.36 3.55-7.91 7.91-7.91 2.11 0 4.1.82 5.6 2.32 1.5 1.5 2.32 3.49 2.32 5.6 0 4.36-3.55 7.91-7.91 7.91Zm4.34-5.92c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.64-1.19-1.43-1.33-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.39 1.37.5.57.18 1.09.16 1.5.09.46-.07 1.41-.58 1.61-1.14.2-.56.2-.1.14-.16Z"/>
              </svg>
              <Link href="https://api.whatsapp.com/send/?phone=6288215012059&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">0882-1501-2059</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
    </footer>
  );
}