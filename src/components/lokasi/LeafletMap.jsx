"use client";

import { useEffect, useRef } from "react";

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
  "Pusat Pendidikan": { color: "#B45309", emoji: "🎓" },
  Kesehatan: { color: "#DC2626", emoji: "🏥" },
  Perbelanjaan: { color: "#16A34A", emoji: "🛒" },
  Transportasi: { color: "#2563EB", emoji: "🚉" },
  Keuangan: { color: "#7C3AED", emoji: "🏦" },
  "Tempat Ibadah": { color: "#0891B2", emoji: "🕌" },
  Kuliner: { color: "#EA580C", emoji: "🍴" },
  default: { color: "#6B7280", emoji: "📍" },
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

// ─── Query Overpass ───────────────────────────────────────────────────────────
async function fetchFasilitas(lat, lng, radius) {
  // Cek cache dulu (berlaku 24 jam)
  const cacheKey = `overpass_${lat}_${lng}_${radius}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        console.log("Menggunakan data cache Overpass");
        return parsed.data;
      }
    }
  } catch (e) {
    console.warn("Cache error:", e);
  }

  const q = `
[out:json][timeout:25];
(
  node["amenity"~"school|kindergarten|college|university"](around:${radius},${lat},${lng});
  way["amenity"~"school|kindergarten|college|university"](around:${radius},${lat},${lng});
  node["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng});
  way["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng});
  node["shop"~"supermarket|convenience|mall|department_store"](around:${radius},${lat},${lng});
  way["shop"~"supermarket|convenience|mall|department_store"](around:${radius},${lat},${lng});
  node["amenity"~"fuel|bank|atm|restaurant|cafe|fast_food"](around:${radius},${lat},${lng});
  way["amenity"~"fuel|bank|atm|restaurant|cafe|fast_food"](around:${radius},${lat},${lng});
  node["amenity"~"place_of_worship"](around:${radius},${lat},${lng});
  way["amenity"~"place_of_worship"](around:${radius},${lat},${lng});
  node["public_transport"~"station|stop_position"](around:${radius},${lat},${lng});
  way["public_transport"~"station"](around:${radius},${lat},${lng});
);
out center tags;
`;

  const ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://lz4.overpass-api.de/api/interpreter",
    "https://z.overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter"
  ];

  let rawData = null;

  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "data=" + encodeURIComponent(q),
      });

      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        rawData = await res.json();
        break; // berhasil, keluar dari loop
      } else {
        console.warn(`Overpass API ${url} sibuk atau error. Mencoba server lain...`);
      }
    } catch (err) {
      console.warn(`Gagal memuat dari ${url}:`, err.message);
    }
  }

  if (!rawData) {
    console.error("Semua server Overpass API sedang sibuk atau di limit (429).");
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
function buatIcon(L, emoji, color) {
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
        <span style="transform:rotate(45deg);font-size:14px;line-height:1">${emoji}</span>
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
    if (mapInstanceRef.current) return;

    // Import Leaflet dinamis (agar tidak error saat SSR)
    import("leaflet").then((L) => {
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

      // Marker perumahan
      const homeIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:40px;height:40px;
          background:#8B6914;
          border:3px solid white;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 12px rgba(0,0,0,0.4);
        "><span style="font-size:18px">📍</span></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });

      L.marker([PERUMAHAN.lat, PERUMAHAN.lng], { icon: homeIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:160px">
            <b style="color:#8B6914;font-size:13px">📍 ${PERUMAHAN.nama}</b>
            <br><span style="font-size:12px;color:#555">${PERUMAHAN.alamat}</span>
          </div>`,
          { maxWidth: 220 }
        )
        .openPopup();

      // Layer fasilitas
      markerLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Fetch Overpass
      fetchFasilitas(PERUMAHAN.lat, PERUMAHAN.lng, RADIUS_METER)
        .then((data) => {
          fasilitasDataRef.current = data;
          renderMarkers(L, data, "Semua");
          if (onFasilitasLoaded) onFasilitasLoaded(data);
        })
        .catch((err) => {
          console.error("Overpass error:", err);
          if (onFasilitasLoaded) onFasilitasLoaded([]);
        });
    });

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

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
    import("leaflet").then((L) => {
      renderMarkers(L, fasilitasDataRef.current, activeCategory);
    });
  }, [activeCategory]);

  // Handle highlight marker jika dipilih dari list
  useEffect(() => {
    if (!mapInstanceRef.current || !highlightId || !markersMapRef.current[highlightId]) return;
    
    const marker = markersMapRef.current[highlightId];
    // Fly to marker and open popup
    mapInstanceRef.current.flyTo(marker.getLatLng(), 16, { duration: 1 });
    marker.openPopup();
  }, [highlightId]);

  function renderMarkers(L, data, kategori) {
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
      const icon = buatIcon(L, cfg.emoji, cfg.color);

      const marker = L.marker([f.lat, f.lng], { icon })
        .addTo(markerLayerRef.current)
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:160px">
            <b style="font-size:13px">${cfg.emoji} ${f.nama}</b>
            <br><span style="font-size:11px;color:#555">${f.kategori}</span>
            <br><span style="font-size:12px;color:#8B6914;font-weight:600">
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
