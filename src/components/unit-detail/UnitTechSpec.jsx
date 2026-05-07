export default function UnitTechSpec({ techSpec }) {
  const columns = Object.values(techSpec);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-foreground text-center mb-10">
        Spesifikasi Teknis
      </h2>
      <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          {columns.map((col) => (
            <div key={col.title} className="p-7">
              <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-5 pb-3 border-b border-stone-100 relative">
                <span className="absolute left-0 top-0 bottom-3 w-0.5 bg-primary"></span>
                <span className="ml-3">{col.title}</span>
              </p>
              <div className="flex flex-col gap-4">
                {col.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <p className="text-xs text-secondary">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
