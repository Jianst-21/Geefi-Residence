import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '-7.6882';
  const lng = searchParams.get('lng') || '110.8299';
  const radius = searchParams.get('radius') || '3000';

  const q = `
[out:json][timeout:15];
(
  nwr["amenity"~"school|kindergarten|college|university|hospital|clinic|doctors|pharmacy|fuel|bank|atm|restaurant|cafe|fast_food|place_of_worship"](around:${radius},${lat},${lng});
  nwr["shop"~"supermarket|convenience|mall|department_store"](around:${radius},${lat},${lng});
  nwr["public_transport"~"station|stop_position"](around:${radius},${lat},${lng});
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
  let lastError = null;

  for (const url of ENDPOINTS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "http://localhost:3000/",
          "Origin": "http://localhost:3000"
        },
        body: "data=" + encodeURIComponent(q),
        signal: controller.signal,
        next: { revalidate: 86400 } // Cache data di level Next.js fetch selama 24 jam
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          rawData = await res.json();
          break;
        }
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn(`Gagal memuat dari ${url} di server:`, err.message);
      lastError = err;
    }
  }

  if (!rawData) {
    return NextResponse.json(
      { success: false, error: lastError?.message || "Semua server Overpass sibuk atau error" },
      { status: 500 }
    );
  }

  return NextResponse.json(rawData);
}
