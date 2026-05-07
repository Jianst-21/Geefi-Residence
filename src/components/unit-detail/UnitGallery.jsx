"use client";

import Image from "next/image";
import { useState } from "react";

export default function UnitGallery({ images, extraPhotos }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[420px] sm:h-[480px]">
          {/* Main image */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setLightbox(images[0])}
          >
            <Image
              src={images[0]}
              alt="Main view"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Side images */}
          <div className="hidden md:grid grid-rows-2 gap-4">
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(images[1])}
            >
              <Image
                src={images[1]}
                alt="Side view"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="25vw"
              />
            </div>
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(images[2])}
            >
              <Image
                src={images[2]}
                alt="Interior view"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="25vw"
              />
              {extraPhotos > 0 && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    +{extraPhotos} Foto Lainnya
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full aspect-video">
            <Image
              src={lightbox}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-6 right-6 text-white text-2xl font-light"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
