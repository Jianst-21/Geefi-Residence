import Navbar from "@/components/ui/Navbar";
import KprHero from "@/components/simulasiKPR/KprHero";
import Bankpromo from "@/components/simulasiKPR/Bankpromo";
import KprCalculatorSection from "@/components/simulasiKPR/KprCalculatorSection";
import HousingRecommendations from "@/components/simulasiKPR/HousingRecommendations";
import CtaSection from "@/components/simulasiKPR/CtaSection";
import Footer from "@/components/ui/Footer";
import ChatbotButton from "@/components/ui/ChatbotButton";

export const metadata = {
  title: "Simulasi KPR — Abyakta",
  description:
    "Kalkulator simulasi KPR membantu Anda menghitung cicilan bulanan, DP, dan simulasi tenor KPR dengan berbagai promo bank terkini.",
};

export default function SimulasiKPR() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <KprHero />
      {/* <Bankpromo /> */}
      <KprCalculatorSection />
      <HousingRecommendations />
      <CtaSection />
      <Footer />
      <ChatbotButton />
    </main>
  );
}
