import { Share2, Heart } from "lucide-react";

export default function UnitDetailHero({ unit }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
      <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">
        {unit.collection}
      </p>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-2">
            {unit.name}
          </h1>
          {unit.typeBadge && (
            <p className="text-sm font-semibold text-foreground text-primary tracking-wide mb-3">
              {unit.typeBadge}
            </p>
          )}
          <p className="text-sm text-secondary leading-relaxed max-w-2xl">
            {unit.description}
          </p>
        </div>
      </div>
    </section>
  );
}
