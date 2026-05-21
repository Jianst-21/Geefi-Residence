"use client";

import React, { useState } from 'react';
import { X, Send, MessageCircle, ChevronDown } from 'lucide-react';

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    unit: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const { nama, whatsapp, unit } = formData;
    if (!nama || !whatsapp) return alert("Mohon isi Nama dan Nomor WhatsApp Anda");
    
    let waNumber = whatsapp;
    if (waNumber.startsWith('0')) waNumber = waNumber.substring(1);

    const message = `Halo Admin Geefi Residence,%0A%0ASaya ingin konsultasi mengenai unit:%0A- *Nama:* ${nama}%0A- *WhatsApp:* +62${waNumber}%0A- *Unit:* ${unit || '-'}%0A%0AMohon info lebih lanjut, terima kasih.`;
    const adminNumber = "6288215012059"; 
    window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 top-6 z-[999] flex flex-col justify-end items-end font-sans pointer-events-none">
      
      {/* MODAL CONTAINER */}
      {isOpen && (
        <div className="mb-6 w-[calc(100vw-3rem)] md:w-[420px] max-h-full bg-[#FCFCFD] rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto origin-bottom-right">
          
          {/* HEADER */}
          <div className="bg-[#9C6B1B] px-8 py-6 text-white relative flex-shrink-0">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-[52px] h-[52px] rounded-full bg-white border-2 border-white overflow-hidden shadow-sm">
                  <img src="/logo-geefi.png" alt="Avatar" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=AG&background=F3E5D8&color=9C6B1B"; }} />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-[#9C6B1B] rounded-full"></div>
              </div>
              <div>
                <h3 className="text-[17px] font-bold leading-tight tracking-wide">Asisten Geefi</h3>
                <p className="text-[9px] font-bold text-white/80 tracking-[0.15em] mt-1 uppercase">
                  Online • Premium Support
                </p>
              </div>
            </div>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto px-8 pt-8 pb-4 custom-scrollbar bg-white">
            
            <div className="bg-white p-5 rounded-[24px] rounded-tl-sm shadow-sm border border-[#D4C4B1]/30 mb-2 w-[95%]">
              <p className="text-[14px] text-gray-700 leading-relaxed">
                Halo! Saya asisten Geefi Residence.<br/>
                Mau lihat tipe rumah atau hitung KPR?
              </p>
            </div>
            <p className="text-[10px] text-gray-400 ml-1 mb-6 font-medium">Baru saja</p>

            <div className="flex flex-col gap-3 mb-10 items-start">
              <button className="py-2.5 px-6 bg-transparent border border-[#9C6B1B] rounded-full text-[13px] font-semibold text-[#9C6B1B] hover:bg-[#9C6B1B] hover:text-white transition-all">
                Info Tipe Rumah
              </button>
              <button className="py-2.5 px-6 bg-transparent border border-[#9C6B1B] rounded-full text-[13px] font-semibold text-[#9C6B1B] hover:bg-[#9C6B1B] hover:text-white transition-all">
                Informasi Lokasi
              </button>
              <button className="py-2.5 px-6 bg-transparent border border-[#9C6B1B] rounded-full text-[13px] font-semibold text-[#9C6B1B] hover:bg-[#9C6B1B] hover:text-white transition-all">
                Hubungi Admin
              </button>
            </div>

            <div className="bg-[#FCFCFD] p-7 rounded-[32px] border border-[#D4C4B1]/30 mb-4">
              <div className="mb-6">
                <h4 className="text-gray-900 font-bold text-[15px]">Konsultasi Eksklusif</h4>
                <p className="text-[12px] text-gray-500 mt-1">Lengkapi data untuk terhubung langsung.</p>
              </div>

              <form onSubmit={sendToWhatsApp} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-2">Nama Lengkap</label>
                  <input 
                    name="nama"
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Masukkan nama Anda" 
                    className="w-full px-6 py-3.5 bg-[#F4F4F5] rounded-full text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C6B1B]/30 transition-all border-none" 
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-2">Nomor WhatsApp</label>
                  <div className="flex bg-[#F4F4F5] rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#9C6B1B]/30 transition-all">
                    <div className="pl-6 py-3.5 flex items-center justify-center text-gray-500 text-[13px] font-medium">
                      +62
                    </div>
                    <input 
                      name="whatsapp"
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="812 3456 7890" 
                      className="w-full px-3 py-3.5 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none border-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-2">Pilih Tipe Unit</label>
                  <div className="relative">
                    <select 
                      name="unit"
                      onChange={handleInputChange}
                      defaultValue=""
                      className="w-full px-6 py-3.5 bg-[#F4F4F5] rounded-full text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9C6B1B]/30 transition-all appearance-none cursor-pointer border-none"
                    >
                      <option value="" disabled hidden>Pilih Tipe Unit</option>
                      <option value="Tipe 30/60">Tipe 30/60</option>
                      <option value="Tipe 42/60">Tipe 42/60</option>
                      <option value="Tipe 54/60">Tipe 54/60</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 mt-2 bg-[#9C6B1B] hover:bg-[#855913] text-white rounded-full font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle size={18} className="text-white" /> Hubungkan ke WhatsApp
                </button>
              </form>
            </div>
          </div>

          {/* BOTTOM CHAT INPUT (FOOTER) */}
          <div className="bg-white px-8 py-5 border-t border-[#D4C4B1]/30 flex items-center justify-between flex-shrink-0">
             <input 
                type="text" 
                placeholder="Ketik pesan..." 
                className="w-full bg-transparent text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none"
             />
             <button className="text-[#9C6B1B] hover:text-[#855913] transition-colors p-2">
                <Send size={20} />
             </button>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON - Ikon diperbaiki sesuai Figma */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[104px] h-[104px] flex-shrink-0 bg-[#9C6B1B] hover:bg-[#855913] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(156,107,27,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 relative pointer-events-auto animate-in zoom-in duration-300"
        >
          <div className="flex flex-col items-center">
             {/* Perubahan utama ada di sini: Hapus fill="white" dan ubah size menjadi 28 */}
             <MessageCircle size={28} strokeWidth={2.5} className="text-white" />
          </div>
        </button>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}