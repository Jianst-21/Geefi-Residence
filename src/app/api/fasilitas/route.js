import { NextResponse } from 'next/server';
import facilitiesData from '@/constants/facilities.json';

export async function GET(request) {
  // Mengembalikan data fasilitas publik statis yang sudah disimpan secara lokal.
  // Ini menghindari pemanggilan API eksternal secara real-time, mempercepat waktu muat (0ms),
  // dan mencegah error CORS / 406 / 500 di berbagai platform hosting.
  return NextResponse.json(facilitiesData);
}
