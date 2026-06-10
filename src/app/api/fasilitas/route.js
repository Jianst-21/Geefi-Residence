import { NextResponse } from 'next/server';
import facilitiesData from '@/constants/facilities.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '-7.6882';
  const lng = searchParams.get('lng') || '110.8299';
  const radius = searchParams.get('radius') || '3000';
  const isDynamic = searchParams.get('dynamic') === 'true';

  // Jika parameter radius diubah dari default 3000, koordinat berubah, atau parameter dynamic=true dipicu,
  // maka lakukan pencarian dinamis (real-time) ke OpenStreetMap menggunakan paralel fetch (Promise.any).
  if (radius !== '3000' || lat !== '-7.6882' || lng !== '110.8299' || isDynamic) {
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

    const fetchPromise = (url) => new Promise(async (resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 detik timeout per request

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
          next: { revalidate: 86400 } // Cache di level Next.js fetch selama 24 jam
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            resolve(data);
            return;
          }
        }
        reject(new Error(`Status ${res.status} dari ${url}`));
      } catch (err) {
        clearTimeout(timeoutId);
        reject(err);
      }
    });

    try {
      const rawData = await Promise.any(ENDPOINTS.map(fetchPromise));
      return NextResponse.json(rawData);
    } catch (err) {
      console.error("Semua server Overpass gagal, menggunakan data lokal sebagai fallback:", err);
      // Fallback ke data lokal jika semua server Overpass bermasalah
      return NextResponse.json(facilitiesData);
    }
  }

  // Secara default (radius 3km di Geefi), gunakan data lokal instan (0ms)
  return NextResponse.json(facilitiesData);
}
