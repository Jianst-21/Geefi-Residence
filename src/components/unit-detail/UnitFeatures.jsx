export default function UnitFeatures({ features }) {
  const isBenefitStyle = features[0]?.subtitle !== undefined;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        Benefit Khusus
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className="bg-background-secondary rounded-3xl p-6 flex flex-col h-full">
            <div className="mb-4">
              <h3 className="font-bold text-[#9d6d1b] text-[15px] leading-snug">
                {f.title}
              </h3>
              {f.subtitle && (
                <p className="font-bold text-[#9d6d1b] text-[15px] leading-snug mt-1">
                  {f.subtitle}
                </p>
              )}
            </div>
            <p className="text-sm text-secondary leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
