"use client";

export default function UnitFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex justify-center px-6 pb-24">
      <div className="flex flex-wrap justify-center gap-4 rounded-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer border-0 ${
              activeCategory === cat
                ? "bg-gradient-primary text-white font-semibold shadow-sm"
                : "bg-background-secondary text-secondary hover:text-foreground hover:bg-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}