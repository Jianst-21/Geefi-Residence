import Navbar from "@/components/ui/Navbar";
import KprHero from "@/components/simulasiKPR/KprHero";
import Bankpromo from "@/components/simulasiKPR/Bankpromo";
import KprCalculator from "@/components/simulasiKPR/Kprcalculator";
import KprAmortizationTable from "@/components/simulasiKPR/KprAmortizationTable";
import HousingRecommendations from "@/components/simulasiKPR/HousingRecommendations";
import CtaSection from "@/components/simulasiKPR/CtaSection";
import Footer from "@/components/ui/Footer";
export default function SimulasiKPR() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <KprHero />
      <Bankpromo />
      <KprCalculator />
      <KprAmortizationTable />
      <HousingRecommendations />
      <CtaSection />
      <Footer />
    </main>
  );
}
