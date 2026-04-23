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
import Testimonials from "@/components/landing/Testimonials";
import LocationSection from "@/components/landing/LocationSection";

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
      <div className="w-full h-[28px] bg-[#FAF9F6]"></div>
      <Testimonials/>
      <div className="w-full h-[28px] bg-[#FAF9F6]"></div>
      <LocationSection/>
    </div>
  );
}