import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Hero from "@/components/landing/Hero";
import PromoBanner from "@/components/landing/PromoBanner";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import KprCalculator from "@/components/landing/KprCalculator";
import Facilities from "@/components/landing/Facilities";
import Masterplan from "@/components/landing/Masterplan";
import UnitTypes from "@/components/landing/UnitTypes";
import Testimonials from "@/components/landing/Testimonials";
import LocationSection from "@/components/landing/LocationSection";
import Footer from "@/components/ui/Footer";
import ChatbotButton from "@/components/ui/ChatbotButton";

export const metadata = {
  title: "Geefi Residence",
  description:
    "Geefi Residence menawarkan hunian modern minimalis dengan fasilitas lengkap dan lokasi strategis di Sukoharjo.",
};

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <PromoBanner />
      <WhyChooseUs />
      <KprCalculator />
      <Facilities />
      <Masterplan />
      <UnitTypes />
      <Testimonials />
      <LocationSection />
      <Footer />
  
      <ChatbotButton /> 
    </div>
  );
}