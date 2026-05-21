import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import TentangHero from "@/components/tentang/TentangHero";
import TentangDeveloper from "@/components/tentang/TentangDeveloper";
import TentangValues from "@/components/tentang/TentangValues";
import TentangCTA from "@/components/tentang/TentangCTA";
import ChatbotButton from "@/components/ui/ChatbotButton"; 

export const metadata = {
  title: "Tentang Kami — Geefi Residence",
  description:
    "Kenali lebih dalam visi, misi, dan nilai-nilai yang mendasari Geefi Residence sebagai hunian eksklusif di Surakarta, Jawa Tengah.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <TentangHero />
      <TentangDeveloper />
      <TentangValues />
      <TentangCTA />
      <Footer />
      <ChatbotButton />
    </main>
  );
}
