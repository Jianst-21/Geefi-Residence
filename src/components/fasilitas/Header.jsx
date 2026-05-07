import React from "react";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 pt-11 pb-12">
      <p className="text-[var(--color-primary)] text-sm font-semibold tracking-widest uppercase mb-4">
        Geefi Residence Excellence
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] leading-tight mb-6">
        Fasilitas Terbaik untuk<br />Keluarga
      </h1>
      <p className="text-[var(--color-secondary)] text-base md:text-lg">
        Kami mengkurasi kenyamanan dan keamanan melalui fasilitas modern<br className="hidden md:block" />
        yang dirancang untuk mendukung gaya hidup urban yang harmonis.
      </p>
    </div>
  );
}
