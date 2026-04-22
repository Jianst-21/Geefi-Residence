import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Hero from "@/components/landing/Hero";
import QuickActions from "@/components/landing/QuickActions";
import PromoBanner  from "@/components/landing/PromoBanner";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import KprCalculator from "@/components/landing/KprCalculator";
import Facilities from "@/components/landing/Facilities";
import Masterplan from "@/components/landing/Masterplan";
import UnitTypes from "@/components/landing/UnitTypes";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <QuickActions/>
      <PromoBanner/>
      <WhyChooseUs/>
      <KprCalculator/>
      <Facilities/>
      <Masterplan/>
      <UnitTypes/>
    </div>
  );
}