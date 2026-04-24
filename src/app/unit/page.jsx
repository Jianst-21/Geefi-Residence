import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UnitHero from "@/components/unit/UnitHero";
import UnitGrid from "@/components/unit/UnitGrid";

export const metadata = {
  title: "Unit — Geefi Residence",
  description:
    "Temukan pilihan hunian impian Anda. Dari Classic Haven hingga Geefi Subsidi.",
};

export default function UnitPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <UnitHero />
      <UnitGrid />
      <Footer />
    </main>
  );
}
