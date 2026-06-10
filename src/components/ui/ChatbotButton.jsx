"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, ChevronDown, Loader2, Trash2 } from "lucide-react";

const WEBHOOK_URL =
  "https://n8n-cf24fjssasmm.jkt5.sumopod.my.id/webhook/5e377ec0-5fc6-43fa-924a-bc8edd43c93a/chat";
const WEBHOOK_KEY = "sk-WZb3f8jGAbNJlYh1XIDLcg";

const QUICK_REPLIES = ["Info Tipe Rumah", "Informasi Lokasi", "Hubungi Admin"];

const INITIAL_MESSAGE = {
  role: "assistant",
  text: "Halo! Saya asisten Geefi Residence.\nAda yang bisa saya bantu?",
  time: "Baru saja",
};

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    unit: "",
  });
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const formatTime = () => {
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInputText("");
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const { nama, whatsapp, unit } = formData;
    if (!nama || !whatsapp)
      return alert("Mohon isi Nama dan Nomor WhatsApp Anda");

    let waNumber = whatsapp;
    if (waNumber.startsWith("0")) waNumber = waNumber.substring(1);

    const message = `Halo Admin Geefi Residence,%0A%0ASaya ingin konsultasi mengenai unit:%0A- *Nama:* ${nama}%0A- *WhatsApp:* +62${waNumber}%0A- *Unit:* ${unit || "-"}%0A%0AMohon info lebih lanjut, terima kasih.`;
    const adminNumber = "6288215012059";
    window.open(`https://wa.me/${adminNumber}?text=${message}`, "_blank");
  };

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": WEBHOOK_KEY,
        },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: "geefi-chat",
          chatInput: text,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const rawText = await res.text();
      console.log("n8n raw:", rawText);
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        // response bukan JSON
      }

      const reply =
        data?.output ||
        data?.text ||
        data?.message ||
        data?.response ||
        (Array.isArray(data) && (data[0]?.output || data[0]?.text || data[0]?.message)) ||
        (typeof data === "string" ? data : null) ||
        rawText ||
        "Maaf, tidak ada respons dari asisten.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: String(reply), time: formatTime() },
      ]);
    } catch (err) {
      console.error("Webhook error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin langsung.",
          time: formatTime(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 top-6 z-[999] flex flex-col justify-end items-end font-sans pointer-events-none">
      {/* MODAL CONTAINER */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] md:w-[360px] max-h-[calc(100vh-5rem)] bg-[#FCFCFD] rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto origin-bottom-right">
          {/* HEADER */}
          <div className="bg-[#9C6B1B] px-6 py-4 text-white relative flex-shrink-0">
            <div className="absolute top-4 right-5 flex items-center gap-3">
              <button
                onClick={clearChat}
                className="text-white/60 hover:text-white transition-colors"
                title="Bersihkan chat"
              >
                <Trash2 size={15} strokeWidth={2} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-[42px] h-[42px] rounded-full bg-white border-2 border-white overflow-hidden shadow-sm">
                  <img
                    src="/images/logo.png"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=AG&background=F3E5D8&color=9C6B1B";
                    }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-[#9C6B1B] rounded-full"></div>
              </div>
              <div>
                <h3 className="text-[15px] font-bold leading-tight tracking-wide">
                  Asisten Geefi
                </h3>
                <p className="text-[9px] font-bold text-white/80 tracking-[0.15em] mt-0.5 uppercase">
                  Online • Premium Support
                </p>
              </div>
            </div>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-3 custom-scrollbar bg-white flex flex-col gap-1">
            {/* MESSAGES */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} mb-3`}
              >
                {msg.role === "assistant" ? (
                  <div
                    className={`bg-white p-4 rounded-[20px] rounded-tl-sm shadow-sm border ${msg.isError ? "border-red-200 bg-red-50" : "border-[#D4C4B1]/30"} w-[95%]`}
                  >
                    <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#9C6B1B] p-3.5 rounded-[20px] rounded-tr-sm max-w-[85%]">
                    <p className="text-[13px] text-white leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 mx-1 mt-1 font-medium">
                  {msg.time}
                </p>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isLoading && (
              <div className="flex items-start mb-3">
                <div className="bg-white p-4 rounded-[20px] rounded-tl-sm shadow-sm border border-[#D4C4B1]/30 flex items-center gap-2">
                  <Loader2 size={14} className="text-[#9C6B1B] animate-spin" />
                  <p className="text-[12px] text-gray-400">
                    Asisten sedang mengetik...
                  </p>
                </div>
              </div>
            )}

            {/* QUICK REPLY BUTTONS — only shown after first assistant message */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-col gap-2.5 mb-8 items-start mt-2">
                {QUICK_REPLIES.map((label) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(label)}
                    className="py-2 px-5 bg-transparent border border-[#9C6B1B] rounded-full text-[12px] font-semibold text-[#9C6B1B] hover:bg-[#9C6B1B] hover:text-white transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* CONSULTATION FORM */}
            <div className="mb-4">
              <button
                onClick={() => setShowForm((v) => !v)}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#9C6B1B] mb-3 hover:underline"
              >
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${showForm ? "" : "-rotate-90"}`}
                />
                {showForm
                  ? "Sembunyikan Form Konsultasi"
                  : "Isi Form Konsultasi"}
              </button>

              {showForm && (
                <div className="bg-[#FCFCFD] p-5 rounded-[28px] border border-[#D4C4B1]/30">
                  <div className="mb-5">
                    <h4 className="text-gray-900 font-bold text-[14px]">
                      Konsultasi Eksklusif
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Lengkapi data untuk terhubung langsung.
                    </p>
                  </div>

                  <form onSubmit={sendToWhatsApp} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-2">
                        Nama Lengkap
                      </label>
                      <input
                        name="nama"
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Masukkan nama Anda"
                        className="w-full px-5 py-3 bg-[#F4F4F5] rounded-full text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C6B1B]/30 transition-all border-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-2">
                        Nomor WhatsApp
                      </label>
                      <div className="flex bg-[#F4F4F5] rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#9C6B1B]/30 transition-all">
                        <div className="pl-5 py-3 flex items-center justify-center text-gray-500 text-[12px] font-medium">
                          +62
                        </div>
                        <input
                          name="whatsapp"
                          onChange={handleInputChange}
                          type="tel"
                          placeholder="812 3456 7890"
                          className="w-full px-3 py-3 bg-transparent text-[12px] text-gray-800 placeholder-gray-400 focus:outline-none border-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-2">
                        Pilih Tipe Unit
                      </label>
                      <div className="relative">
                        <select
                          name="unit"
                          onChange={handleInputChange}
                          defaultValue=""
                          className="w-full px-5 py-3 bg-[#F4F4F5] rounded-full text-[12px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9C6B1B]/30 transition-all appearance-none cursor-pointer border-none"
                        >
                          <option value="" disabled hidden>
                            Pilih Tipe Unit
                          </option>
                          <option value="Tipe 30/60">Tipe 30/60</option>
                          <option value="Tipe 42/60">Tipe 42/60</option>
                          <option value="Tipe 54/60">Tipe 54/60</option>
                        </select>
                        <ChevronDown
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 mt-1 bg-[#9C6B1B] hover:bg-[#855913] text-white rounded-full font-bold text-[12px] flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <MessageCircle size={16} className="text-white" />{" "}
                      Hubungkan ke WhatsApp
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* BOTTOM CHAT INPUT */}
          <div className="bg-white px-6 py-4 border-t border-[#D4C4B1]/30 flex items-center gap-2 flex-shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              disabled={isLoading}
              className="w-full bg-transparent text-[12px] text-gray-600 placeholder-gray-400 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(inputText)}
              disabled={isLoading || !inputText.trim()}
              className="text-[#9C6B1B] hover:text-[#855913] transition-colors p-1.5 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Send size={17} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[72px] h-[72px] flex-shrink-0 bg-[#9C6B1B] hover:bg-[#855913] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(156,107,27,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 relative pointer-events-auto animate-in zoom-in duration-300"
        >
          <div className="flex flex-col items-center">
            <MessageCircle size={22} strokeWidth={2.5} className="text-white" />
          </div>
        </button>
      )}
    </div>
  );
}