import Image from "next/image";
import { IdCard, TreePine, Map } from "lucide-react";

const icons = [
  IdCard,
  TreePine,
  Map,
];

export default function UnitMasterPlan({ masterplan }) {
  return (
    <section className="bg-[#FAFAFA] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-bold tracking-widest uppercase mb-4">
            {masterplan.subtitle || "THE NEIGHBORHOOD"}
          </p>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-foreground mb-4">
            {masterplan.title || "Masterplan Kawasan & Eksterior"}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-secondary max-w-2xl mx-auto leading-relaxed">
            {masterplan.description}
          </p>
        </div>

        {/* Masterplan Image Container */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-[640px] bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-4 sm:p-8">
            <div className="relative w-full aspect-[2/3] sm:aspect-square md:aspect-[3/5]">
              <Image
                src={"/images/Denah CH 1.png"}
                alt="Masterplan"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Block Info */}
          <p className="text-center text-[13px] text-secondary mb-16 max-w-2xl mx-auto">
            {masterplan.blockInfo || "Untuk unit Tipe 30/60 berlokasi secara eksklusif hanya di Blok C (Kavling C1 - C10)."}
          </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {masterplan.features.map((f, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div key={f.title} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-[#F9F4EA] flex items-center justify-center flex-shrink-0">
                  <IconComponent size={20} className="text-[#B48832]" />
                </div>
                <div className="pt-1">
                  <p className="font-bold text-[15px] text-foreground mb-2 leading-snug">
                    {f.title}
                  </p>
                  <p className="text-[13px] text-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
