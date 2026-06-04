import { unitDetails } from "@/constants/unitDetail";
import UnitDetailClient from "@/components/unit-detail/UnitDetailClient";

export async function generateStaticParams() {
  return Object.keys(unitDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const unit = unitDetails[slug];
  if (!unit) return {};
  return {
    title: `${unit.name} — Geefi Residence`,
    description: unit.description,
  };
}

export default async function UnitDetailPage({ params }) {
  const { slug } = await params;
  return <UnitDetailClient slug={slug} />;
}

