// src/constants/masterplan.js

export const row1Data = [
  { type: "plot", id: "A02", status: "sold" },
  {
    type: "plot", id: "A03", status: "available",
    unitType: "Standard 45/60", price: "IDR 1.8B",
    beds: 2, baths: 1, cars: 1,
  },
  {
    type: "plot", id: "A04", status: "available",
    unitType: "Standard 45/60", price: "IDR 1.8B",
    beds: 2, baths: 1, cars: 1,
  },
  {
    type: "plot", id: "A05", status: "available",
    unitType: "Premium 54/60", price: "IDR 2.4B",
    beds: 3, baths: 2, cars: 1,
  },
  { type: "empty", id: "gap1" },
  {
    type: "plot", id: "B01", status: "available",
    unitType: "Premium 54/60", price: "IDR 2.4B",
    beds: 3, baths: 2, cars: 1,
  },
  {
    type: "plot", id: "B02", status: "available",
    unitType: "Premium 54/60", price: "IDR 2.4B",
    beds: 3, baths: 2, cars: 1,
  },
  { type: "plot", id: "B03", status: "sold" },
];

export const row2Data = [
  { type: "empty", id: "gap2" },
  {
    type: "plot", id: "C02", status: "available",
    unitType: "Exclusive 72/90", price: "IDR 3.2B",
    beds: 4, baths: 3, cars: 2,
  },
  { type: "empty", id: "gap3" },
  {
    type: "plot", id: "C03", status: "available",
    unitType: "Exclusive 72/90", price: "IDR 3.2B",
    beds: 4, baths: 3, cars: 2,
  },
  { type: "plot", id: "C04", status: "sold" },
  { type: "plot", id: "C05", status: "sold" },
  {
    type: "plot", id: "C06", status: "available",
    unitType: "Exclusive 72/90", price: "IDR 3.2B",
    beds: 4, baths: 3, cars: 2,
  },
  { type: "empty", id: "gap4" },
];