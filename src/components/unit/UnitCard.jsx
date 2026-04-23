import Link from "next/link";
import Image from "next/image";
import { BathIcon, BedDouble, Calculator } from "lucide-react";

export default function UnitCard({ unit }) {
  const formattedSlug = unit.slug.replaceAll('-', '');
  const imageUnitPath = `/images/units/${formattedSlug}.png`;
 
  return (
    <div className="bg-white rounded-b-2xl rounded-t-[48px] overflow-hidden  hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6">
      {/* Image */}
      <div className="relative w-full h-100 overflow-hidden rounded-[48px]">
        <span className="absolute top-6 left-6 z-10 bg-white/80 text-foreground text-[10px] font-bold tracking-wider px-4 py-2 rounded-full text-primary">
          {unit.badge}
        </span>
        <Image
          src={imageUnitPath}
          alt={unit.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="py-5">
        <h3 className="text-lg font-bold text-foreground mb-2.5 leading-snug">
          {unit.name}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-2.5">
          <span className="flex items-center gap-1.5 text-xs text-secondary">
            <BedDouble width={14} className="text-secondary"  />
            {unit.bedrooms} KT
          </span>
          <span className="flex items-center gap-1.5 text-xs text-secondary">
            <BathIcon width={14} className="text-secondary" />
            {unit.bathrooms}
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-primary mb-4">
          {unit.price}{" "}
          <span className="text-xs font-normal text-secondary/60">mulai dari</span>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/unit/${unit.slug}`}
            className="flex-1 text-center bg-gradient-primary text-white text-xs font-bold tracking-wider py-3 rounded-full transition-colors "
          >
            LIHAT DETAIL
          </Link>
          <button
            aria-label="Bandingkan"
            className="w-11 h-11 flex-shrink-0 rounded-full border border-stone-200 bg-white text-primary hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all cursor-pointer"
          >
            <Calculator width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}