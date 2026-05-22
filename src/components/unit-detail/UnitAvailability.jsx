"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function UnitAvailability({ blocks, whatsappNumber, unitName }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 font-['Manrope']">
      <div className="text-center mb-12">
        <span className="text-[#9D6A0C] text-xs md:text-sm font-bold tracking-widest uppercase mb-3 block">
          Rencana Blok Kavling
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Ketersediaan Unit
        </h2>
        <p className="text-secondary text-sm max-w-xl mx-auto">
          Pilih dari daftar blok kavling yang tersedia untuk {unitName}. Blok bertanda emas siap untuk dipesan.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {blocks.map((item) => {
          const isAvail = item.is_available === true || item.is_available === "TRUE";
          const waText = encodeURIComponent(`Halo Admin Geefi Residence, saya tertarik untuk memesan unit ${unitName} di Blok ${item.block}. Apakah masih tersedia?`);
          const waLink = `https://wa.me/${whatsappNumber}?text=${waText}`;

          return (
            <div
              key={item.house_id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between items-center text-center transition-all duration-300 border-2 min-h-[160px]
                ${
                  isAvail
                    ? "bg-white border-[#9D6A0C]/20 hover:border-[#9D6A0C] hover:shadow-xl hover:shadow-[#9D6A0C]/5 hover:-translate-y-1"
                    : "bg-gray-50 border-gray-200/60 opacity-70"
                }
              `}
            >
              {/* Status Badge */}
              <span
                className={`absolute top-4 right-4 p-0.5 rounded-full
                  ${isAvail ? "text-emerald-600" : "text-gray-400"}
                `}
              >
                {isAvail ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              </span>

              {/* Block Info */}
              <div className="mt-4">
                <span className="text-xs text-secondary font-medium block mb-1">Kavling</span>
                <span
                  className={`text-xl font-bold block
                    ${isAvail ? "text-[#7E5300]" : "text-gray-400 line-through"}
                  `}
                >
                  Blok {item.block}
                </span>
              </div>

              {/* Action / Status Text */}
              <div className="w-full mt-6">
                {isAvail ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 bg-gradient-primary text-white font-bold text-[10px] tracking-wider uppercase rounded-full hover:shadow-md hover:shadow-primary/20 transition-all"
                  >
                    PESAN UNIT
                  </a>
                ) : (
                  <span className="block w-full py-2 bg-gray-200/50 text-gray-400 font-bold text-[10px] tracking-wider uppercase rounded-full select-none">
                    TERJUAL
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
