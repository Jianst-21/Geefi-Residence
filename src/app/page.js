import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Hero from "@/components/landing/Hero";
import QuickActions from "@/components/landing/QuickActions";
import PromoBanner  from "@/components/landing/PromoBanner";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <QuickActions/>
      <PromoBanner/>
    </div>
  );
}