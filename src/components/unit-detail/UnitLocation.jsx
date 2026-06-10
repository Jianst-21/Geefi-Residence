import { Map } from "lucide-react";

export default function UnitLocation({ location }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 bg-stone-200">
        {/* Map embed */}
        <iframe
          src={location.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi"
          className="w-full h-full"
        />

        {/* Overlay card */}
        <div className="absolute bottom-5 left-5">
          <div className="bg-white rounded-2xl shadow-lg p-5 max-w-xs">
            <p className="font-bold text-base text-foreground mb-1">Lokasi Strategis</p>
            <p className="text-xs text-secondary mb-3 leading-relaxed">
              {location.distance}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/80 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Map size={14} className="shrink-0" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}