"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function UnitGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard controls
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  const isOpen = activeIndex !== null;
  const extraPhotosCount = images.length - 3;

  // Prevent scrolling and hide scrollbar when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 font-['Manrope']">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[420px] sm:h-[480px]">
          {/* Main image */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setActiveIndex(0)}
          >
            <Image
              src={images[0]}
              alt="Main view"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Side images */}
          <div className="hidden md:grid grid-rows-2 gap-4">
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setActiveIndex(1)}
            >
              <Image
                src={images[1]}
                alt="Side view"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="25vw"
              />
            </div>
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setActiveIndex(2)}
            >
              <Image
                src={images[2]}
                alt="Interior view"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="25vw"
              />
              {extraPhotosCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-all group-hover:bg-black/50">
                  <span className="text-white font-bold text-lg tracking-wider">
                    +{extraPhotosCount}
                  </span>
                  <span className="text-white/80 text-[10px] uppercase tracking-widest mt-1">
                    Foto Lainnya
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Slider Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          {/* Top Control Bar */}
          <div className="absolute top-0 inset-x-0 h-20 px-6 flex items-center justify-between text-white z-50">
            <span className="text-sm font-semibold tracking-widest">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setActiveIndex(null)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-6 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>

          {/* Main Slide Image */}
          <div className="relative max-w-5xl w-full h-[60vh] px-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[60vh]">
              <Image
                src={images[activeIndex]}
                alt={`Gallery image ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Thumbnail list at the bottom */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center gap-3 px-6 z-50 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0
                  ${
                    idx === activeIndex
                      ? "border-[#9D6A0C] scale-110 opacity-100 ring-2 ring-[#9D6A0C]/30"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }
                `}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
