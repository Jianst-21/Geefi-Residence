"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Koordinat Geefi Residence Sukoharjo ──────────────────────────────────────
const PERUMAHAN = {
  nama: "Geefi Residence",
  alamat: "Begajah, Sukoharjo, Jawa Tengah",
  lat: -7.6882,
  lng: 110.8299,
};

const RADIUS_METER = 3000; // 3 km radius pencarian (diperkecil karena 5km terlalu berat & memicu limit)

// ─── Kategori & warna marker ─────────────────────────────────────────────────
const KATEGORI_CONFIG = {
  "Pusat Pendidikan": {
    color: "#B45309",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>`
  },
  Kesehatan: {
    color: "#DC2626",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>`
  },
  Perbelanjaan: {
    color: "#16A34A",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>`
  },
  Transportasi: {
    color: "#2563EB",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
      <path d="M3 8h18" />
    </svg>`
  },
  Keuangan: {
    color: "#7C3AED",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>`
  },
  "Tempat Ibadah": {
    color: "#0891B2",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <path d="M12 2L4 8v14h16V8z" />
      <path d="M9 22V12h6v10" />
    </svg>`
  },
  Kuliner: {
    color: "#EA580C",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <path d="M3 2v7c0 2.8 2.2 5 5 5s5-2.2 5-5V2M8 14v8M21 2v4c0 1.6-1 3-2.5 3.5L18 22" />
    </svg>`
  },
  default: {
    color: "#6B7280",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>`
  },
};

// ─── Haversine formula ────────────────────────────────────────────────────────
function hitungJarakKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function deteksiKategori(tags) {
  const amenity = tags.amenity || "";
  const shop = tags.shop || "";
  const pt = tags.public_transport || "";

  if (/school|kindergarten|college|university/.test(amenity))
    return "Pusat Pendidikan";
  if (/hospital|clinic|doctors|pharmacy/.test(amenity)) return "Kesehatan";
  if (/supermarket|convenience|mall|department_store/.test(shop))
    return "Perbelanjaan";
  if (/fuel|station|platform/.test(amenity) || /station|stop_position/.test(pt))
    return "Transportasi";
  if (/bank|atm/.test(amenity)) return "Keuangan";
  if (/place_of_worship/.test(amenity)) return "Tempat Ibadah";
  if (/restaurant|cafe|fast_food/.test(amenity)) return "Kuliner";
  return "Lainnya";
}

// ─── Normalisasi satu elemen Overpass ────────────────────────────────────────
function normalisasi(item) {
  let lat, lng;
  if (item.type === "node") {
    lat = item.lat;
    lng = item.lon;
  } else if (item.center) {
    lat = item.center.lat;
    lng = item.center.lon;
  }
  if (!lat || !lng) return null;

  const tags = item.tags || {};
  const jarakKm = hitungJarakKm(PERUMAHAN.lat, PERUMAHAN.lng, lat, lng);
  const menit = Math.round((jarakKm / 30) * 60); // estimasi 30 km/jam

  return {
    id: item.id,
    nama: tags.name || "Fasilitas",
    kategori: deteksiKategori(tags),
    jarakKm: Math.round(jarakKm * 10) / 10,
    menit: Math.max(1, menit),
    lat,
    lng,
    tags,
  };
}

// ─── Query Overpass Proxy API ─────────────────────────────────────────────────
async function fetchFasilitas(lat, lng, radius) {
  // Cek cache dulu (berlaku 24 jam)
  const cacheKey = `overpass_${lat}_${lng}_${radius}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        if (parsed.data && parsed.data.length > 0) {
          console.log("Menggunakan data cache Overpass");
          return parsed.data;
        }
      }
    }
  } catch (e) {
    console.warn("Cache error:", e);
  }

  let rawData = null;

  try {
    const res = await fetch(`/api/fasilitas?lat=${lat}&lng=${lng}&radius=${radius}`);
    if (res.ok) {
      rawData = await res.json();
    } else {
      console.warn(`API /api/fasilitas error: ${res.status}`);
    }
  } catch (err) {
    console.warn(`Gagal memuat dari /api/fasilitas:`, err.message);
  }

  if (!rawData) {
    console.error("Gagal mendapatkan data fasilitas.");
    return [];
  }

  const result = (rawData.elements || [])
    .map(normalisasi)
    .filter(Boolean)
    .filter((f) => f.nama !== "Fasilitas") // buang yang tanpa nama
    .filter((f) => f.kategori !== "Lainnya") // Hapus kategori Lainnya
    .filter((f) => !/^sukoharjo$/i.test(f.nama.trim())) // buang yang cuma bernama 'sukoharjo'
    .filter((f) => !/^pertamina$/i.test(f.nama.trim())) // buang yang cuma bernama 'pertamina'
    .sort((a, b) => a.jarakKm - b.jarakKm);

  // Simpan ke cache
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: result
    }));
  } catch (e) {
    console.warn("Gagal menyimpan cache:", e);
  }

  return result;
}

// ─── Buat SVG icon marker ─────────────────────────────────────────────────────
function buatIcon(svgMarkup, color) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:34px;height:34px;
        background:${color};
        border:2px solid white;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="transform:rotate(45deg);display:flex;align-items:center;justify-content:center;color:white;">
          ${svgMarkup}
        </div>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────
export default function LeafletMap({ activeCategory, onFasilitasLoaded, onFasilitasClick, highlightId }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerLayerRef = useRef(null);
  const fasilitasDataRef = useRef([]);
  const markersMapRef = useRef({}); // Untuk menyimpan referensi marker berdasarkan ID

  // Inisialisasi peta sekali saja
  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current || mapRef.current._leaflet_id) return;

    // Fix icon default
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(mapRef.current, { zoomControl: false }).setView(
      [PERUMAHAN.lat, PERUMAHAN.lng],
      15
    );

    // OSM tile
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors",
    }).addTo(map);

    // Custom zoom control kanan bawah
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Marker perumahan menggunakan Lucide MapPin Icon
    const homeIcon = L.divIcon({
      className: "",
      html: `<div style="
        width:40px;height:40px;
        background:#8B6914;
        border:3px solid white;
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 12px rgba(0,0,0,0.4);
      ">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -22],
    });

    L.marker([PERUMAHAN.lat, PERUMAHAN.lng], { icon: homeIcon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family:sans-serif;min-width:160px;display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:6px">
            <svg viewBox="0 0 24 24" fill="none" stroke="#8B6914" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="flex-shrink:0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <b style="color:#8B6914;font-size:13px">${PERUMAHAN.nama}</b>
          </div>
          <span style="font-size:12px;color:#555">${PERUMAHAN.alamat}</span>
        </div>`,
        { maxWidth: 220 }
      )
      .openPopup();

    // Layer fasilitas
    markerLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Fetch Overpass via proxy server-side
    fetchFasilitas(PERUMAHAN.lat, PERUMAHAN.lng, RADIUS_METER)
      .then((data) => {
        fasilitasDataRef.current = data;
        renderMarkers(data, "Semua");
        if (onFasilitasLoaded) onFasilitasLoaded(data);
      })
      .catch((err) => {
        console.error("Overpass error:", err);
        if (onFasilitasLoaded) onFasilitasLoaded([]);
      });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render marker saat kategori berubah
  useEffect(() => {
    if (!mapInstanceRef.current || !fasilitasDataRef.current.length) return;
    renderMarkers(fasilitasDataRef.current, activeCategory);
  }, [activeCategory]);

  // Handle highlight marker jika dipilih dari list
  useEffect(() => {
    if (!mapInstanceRef.current || !highlightId || !markersMapRef.current[highlightId]) return;
    
    const marker = markersMapRef.current[highlightId];
    // Fly to marker and open popup
    mapInstanceRef.current.flyTo(marker.getLatLng(), 16, { duration: 1 });
    marker.openPopup();
  }, [highlightId]);

  function renderMarkers(data, kategori) {
    if (!markerLayerRef.current) return;
    markerLayerRef.current.clearLayers();
    markersMapRef.current = {}; // reset mapping marker

    // Jika kategori "Semua", hanya tampilkan gabungan dari 4 kategori berikut
    const allowedSemua = ["Pusat Pendidikan", "Perbelanjaan", "Kesehatan", "Transportasi"];

    const filtered =
      kategori === "Semua" 
        ? data.filter((f) => allowedSemua.includes(f.kategori)) 
        : data.filter((f) => f.kategori === kategori);

    filtered.forEach((f) => {
      const cfg = KATEGORI_CONFIG[f.kategori] || KATEGORI_CONFIG.default;
      const icon = buatIcon(cfg.svg, cfg.color);

      const marker = L.marker([f.lat, f.lng], { icon })
        .addTo(markerLayerRef.current)
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:160px;display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;align-items:center;gap:6px">
              <div style="color:${cfg.color};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                ${cfg.svg.replace('stroke="white"', `stroke="${cfg.color}"`).replace('width="16"', 'width="14"').replace('height="16"', 'height="14"')}
              </div>
              <b style="font-size:13px;color:#1A1C1A">${f.nama}</b>
            </div>
            <span style="font-size:11px;color:#555">${f.kategori}</span>
            <span style="font-size:12px;color:#8B6914;font-weight:600">
              ${f.jarakKm} km · ~${f.menit} menit
            </span>
          </div>`,
          { maxWidth: 220 }
        )
        .on("click", () => {
          if (onFasilitasClick) onFasilitasClick(f);
        });

      // Simpan referensi marker ke map
      markersMapRef.current[f.id] = marker;
    });
  }

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    />
  );
}
