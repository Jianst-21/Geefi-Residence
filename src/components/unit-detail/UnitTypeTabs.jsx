"use client";

import { useState } from "react";
import { Home, Layers, BedDouble, Bath, Calendar, MessageCircleMore, X } from "lucide-react";

export default function UnitTypeTabs({ types, children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = types[activeIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: specs */}
        <div className="flex-1">

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {[
              { label: "LUAS BANGUNAN", value: `${active.buildingArea} m²`, Icon: Home },
              { label: "LUAS TANAH", value: `${active.landArea} m²`, Icon: Layers },
              { label: "KAMAR TIDUR", value: `${active.bedrooms} Kamar`, Icon: BedDouble },
              { label: "KAMAR MANDI", value: `${active.bathrooms} Kamar`, Icon: Bath },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[11px] sm:text-xs font-bold text-secondary tracking-widest">{s.label}</span>
                <div className="flex items-center gap-2">
                  <s.Icon size={20} className="text-primary" />
                  <span className="font-bold text-foreground text-xl sm:text-2xl">{s.value}</span>
                </div>
              </div>
            ))}
          </div>

          {children}
        </div>

        {/* Right: pricing sidebar */}
        <div className="lg:w-92 flex-shrink-0">
          <UnitPriceCard unit={active} />
        </div>
      </div>
    </section>
  );
}

const formatIndonesianDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

function UnitPriceCard({ unit }) {
  const wa = `https://wa.me/${unit.whatsappNumber || "6288215012059"}?text=Halo, saya tertarik dengan ${unit.label}`;
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      alert("Silakan pilih tanggal dan jam kunjungan terlebih dahulu.");
      return;
    }
    const formattedDate = formatIndonesianDate(selectedDate);
    const message = `Halo Admin Geefi Residence, saya ingin menjadwalkan kunjungan untuk melihat unit *${unit.label}* pada:\n\n📅 Hari/Tanggal: ${formattedDate}\n⏰ Waktu/Jam: ${selectedTime} WIB\n\nMohon konfirmasi ketersediaan jadwal tersebut. Terima kasih.`;
    const waNumber = unit.whatsappNumber || "6288215012059";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank");
    setShowScheduleModal(false);
  };

  return (
    <div className="relative bg-background-secondary rounded-[48px] p-8 flex flex-col h-full min-h-[400px] overflow-hidden">
      {/* Dynamic Scheduling Modal Overlay inside Card */}
      {showScheduleModal && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-8 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-300 z-20">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-[#936615] text-lg">Atur Kunjungan</h4>
            <button 
              onClick={() => setShowScheduleModal(false)} 
              className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pilih Tanggal</label>
              <input 
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-stone-200 text-stone-700 text-sm focus:outline-none focus:border-[#936615] transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pilih Jam</label>
              <input 
                type="time"
                required
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-stone-200 text-stone-700 text-sm focus:outline-none focus:border-[#936615] transition-colors"
              />
            </div>
          </div>
          
          <button 
            onClick={handleSchedule}
            className="w-full bg-[#936615] hover:bg-[#7e5610] text-white font-semibold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            Jadwalkan
          </button>
        </div>
      )}

      <p className="text-sm text-secondary mb-2">Mulai Dari</p>
      <div className="mb-1">
        <span className="text-[28px] sm:text-[36px] font-bold text-primary leading-none">
          Rp {unit.price}
        </span>
      </div>
      <p className="text-xs text-secondary mb-10">*S&K Berlaku | Harga Estimasi</p>

      <div className="flex flex-col gap-4 mt-auto">
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="w-full bg-[#936615] hover:bg-[#7e5610] text-white font-semibold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar size={20} /> Jadwalkan Kunjungan
        </button>
        
        <div className="mt-8">
          <p className="text-xs text-secondary mb-4 leading-relaxed">
            Ingin konsultasi lebih lanjut mengenai simulasi KPR atau promo bulan ini?
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#936615] font-bold text-sm hover:underline flex items-center gap-2"
          >
            <MessageCircleMore size={18} /> Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
