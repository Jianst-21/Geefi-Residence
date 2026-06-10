import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LokasiPage from "@/components/lokasi/LokasiPage";
import ChatbotButton from "@/components/ui/ChatbotButton";

export const metadata = {
  title: "Lokasi Strategis — Geefi Residence",
  description:
    "Temukan kemudahan lokasi Geefi Residence Sukoharjo yang strategis dan aksesibel dari berbagai fasilitas publik penting dalam hitungan menit.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF]">
      <Navbar />
      <LokasiPage />
      <Footer />
      <ChatbotButton />
    </main>
  );
}
