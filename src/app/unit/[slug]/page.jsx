import { notFound } from "next/navigation";
import { unitDetails } from "@/constants/unitDetail";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import UnitDetailHero from "@/components/unit-detail/UnitDetailHero";
import UnitGallery from "@/components/unit-detail/UnitGallery";
import UnitTypeTabs from "@/components/unit-detail/UnitTypeTabs";
import UnitFeatures from "@/components/unit-detail/UnitFeatures";
import UnitFloorPlan from "@/components/unit-detail/UnitFloorPlan";
import UnitTechSpec from "@/components/unit-detail/UnitTechSpec";
import UnitMasterplan from "@/components/unit-detail/UnitMasterPlan";

export async function generateStaticParams() {
  return Object.keys(unitDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const {slug} = await params;
  const unit = unitDetails[slug];
  if (!unit) return {};
  return {
    title: `${unit.name} — Geefi Residence`,
    description: unit.description,
  };
}

export default async function UnitDetailPage({ params }) {
  const {slug} = await params;
  const unit = unitDetails[slug];
  if (!unit) notFound();

  // Merge whatsapp number into each type for the price card
  const typesWithContact = unit.types.map(t => ({
    ...t,
    whatsappNumber: unit.whatsappNumber,
  }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <UnitDetailHero unit={unit} />
      <UnitGallery images={unit.images} extraPhotos={unit.extraPhotos} />
      <UnitTypeTabs types={typesWithContact}>
        <UnitFeatures features={unit.features} />
      </UnitTypeTabs>
      <UnitFloorPlan floorPlan={unit.floorPlan} />
      <UnitTechSpec techSpec={unit.techSpec} />
      <UnitMasterplan masterplan={unit.masterplan} />
      <Footer />
    </main>
  );
}
