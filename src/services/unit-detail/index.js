/**
 * Service to handle data fetching for unit details.
 */
export const unitDetailService = {
  /**
   * Fetches the detail of a unit by mapping its slug to a representative block,
   * fetching from /api/detail-unit/{house_id}, and building the structured page data.
   * Also sorts blocks properly (e.g., A.9, A.10, A.11, B.1...).
   * @param {string} slug - The slug of the house type/model.
   * @returns {Promise<Object>} Mapped details, features, specs, gallery, and block availabilities.
   */
  async getUnitDetailBySlug(slug) {
    try {
      // 1. Fetch all units to find the matching blocks for the slug
      const response = await fetch("/api/unit");
      if (!response.ok) {
        throw new Error(`Failed to fetch units: ${response.statusText}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch units");
      }
      const allHouses = result.data || [];

      // Helper to match slug (same slugification logic as list page)
      const getSlug = (houseName, houseType) => {
        const nameLower = houseName.toLowerCase();
        const typeLower = houseType ? houseType.toLowerCase() : "";
        if (nameLower.includes("classic haven")) {
          if (typeLower.includes("42/65")) return "classic-haven-42-65";
          if (typeLower.includes("100/88")) return "classic-haven-100-88";
        }
        if (nameLower.includes("geefi residence")) {
          if (typeLower.includes("42/60")) return "geefi-residence-42-60";
          if (typeLower.includes("54/60")) return "geefi-residence-54-60";
        }
        if (nameLower.includes("geefi subsidi") && nameLower.includes("2")) {
          return "geefi-subsidi-2-plumpung";
        }
        if (nameLower.includes("geefi subsidi")) {
          return "geefi-subsidi-plumpung-30-60";
        }
        return `${nameLower.replace(/\s+/g, "-")}-${typeLower.replace("/", "-")}`;
      };

      // Filter houses belonging to this slug/type
      const matchingHouses = allHouses.filter(
        (h) => getSlug(h.house_name, h.house_type) === slug
      );

      if (matchingHouses.length === 0) {
        throw new Error(`No houses found for slug: ${slug}`);
      }

      // Pick one block that is not A1/A.1 to query the detail API
      const selectedHouse =
        matchingHouses.find((h) => h.house_id !== "A1" && h.block !== "A.1") ||
        matchingHouses[0];

      // 2. Fetch the detail API for the selected house_id
      const detailResponse = await fetch(`/api/detail-unit/${selectedHouse.house_id}`);
      if (!detailResponse.ok) {
        throw new Error(`Failed to fetch detail: ${detailResponse.statusText}`);
      }
      const detailResult = await detailResponse.json();
      if (!detailResult.success) {
        throw new Error(detailResult.error || "Failed to fetch detail");
      }
      const detailData = detailResult.data;

      // 3. Resolve Gallery Folder and images
      const getGalleryFolder = (houseName, houseType) => {
        const nameLower = houseName.toLowerCase();
        const typeClean = houseType ? houseType.replace("/", "-") : "";
        if (nameLower.includes("geefi residence") && typeClean.includes("42-60")) {
          return "Geefi Residence Silver 42-60";
        }
        if (nameLower.includes("geefi residence") && typeClean.includes("54-60")) {
          return "Geefi Residence 54-60";
        }
        if (nameLower.includes("geefi subsidi") && nameLower.includes("2")) {
          return "Geefi Subsidi 2 Plumpung 30-60";
        }
        if (nameLower.includes("geefi subsidi")) {
          return "Geefi Subsidi Plumpung 30-60";
        }
        return `${houseName} ${typeClean}`;
      };

      const GALLERY_FILES = {
        "Geefi Residence Silver 42-60": ["1.jpg", "2.jpg", "3.jpg"],
        "Geefi Residence 54-60": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpeg"],
        "Geefi Subsidi 2 Plumpung 30-60": ["1.jpeg", "2.jpeg", "3.jpeg"],
        "Geefi Subsidi Plumpung 30-60": ["1.jpg", "2.jpg", "3.jpg"],
      };

      const folderName = getGalleryFolder(detailData.house_name, detailData.house_type);
      const files = GALLERY_FILES[folderName] || ["1.jpg", "2.jpg", "3.jpg"];
      const galleryImages = files.map((file) => `/images/units/${folderName}/${file}`);

      // 4. Format Price
      let formattedPrice = "";
      if (detailData.price) {
        formattedPrice = detailData.price.toLocaleString("id-ID");
      } else {
        formattedPrice = "Hubungi Kami";
      }

      // We include all physical block units to render availability list
      const rawBlocks = matchingHouses.map((h) => ({
        house_id: h.house_id,
        block: h.block,
        is_available: h.is_available,
      }));

      // Sort blocks by block letter and block number (e.g. A.9, A.10, A.11, B.1...)
      const sortedBlocks = [...rawBlocks].sort((a, b) => {
        const matchA = a.block.match(/^([A-Za-z]+)\.?(\d+)$/);
        const matchB = b.block.match(/^([A-Za-z]+)\.?(\d+)$/);
        if (matchA && matchB) {
          const letterA = matchA[1];
          const numberA = parseInt(matchA[2], 10);
          const letterB = matchB[1];
          const numberB = parseInt(matchB[2], 10);

          if (letterA !== letterB) {
            return letterA.localeCompare(letterB);
          }
          return numberA - numberB;
        }
        return a.block.localeCompare(b.block);
      });

      // 5. Structure the complete unit detail object
      return {
        slug: slug,
        collection: detailData.house_name.toUpperCase(),
        name: `${detailData.house_name} Tipe ${detailData.house_type}`,
        house_name: detailData.house_name,
        house_type: detailData.house_type,
        typeBadge: `TIPE ${detailData.house_type}`,
        description: detailData.description || "Hunian modern eksklusif dengan fasilitas memadai.",
        whatsappNumber: "6288215012059",
        images: galleryImages,
        extraPhotos: galleryImages.length,
        types: [
          {
            label: `Tipe ${detailData.house_type}`,
            slug: `tipe-${detailData.house_type.replace("/", "-")}`,
            buildingArea: detailData.building_area,
            landArea: detailData.land_area,
            bedrooms: detailData.bedroom,
            bathrooms: detailData.bathroom,
            price: formattedPrice,
          },
        ],
        features: (detailData.benefits || []).map((b, idx) => ({
          icon: idx % 2 === 0 ? "🏠" : "⚡",
          title: b.benefit_name,
          description: "Fasilitas premium gratis untuk kenyamanan hunian Anda.",
        })),
        floorPlan: {
          title: "Tata Ruang Optimal & Fungsional",
          description: `Dirancang khusus untuk kenyamanan Anda. Memaksimalkan bangunan seluas ${detailData.building_area} m² di atas lahan ${detailData.land_area} m², menawarkan tata letak (layout) yang compact tanpa membuang ruang.`,
          rooms: [
            {
              icon: "bed",
              name: "Kamar Tidur Utama",
              desc: `${detailData.bedroom} Ruangan (Pencahayaan & sirkulasi udara baik)`,
            },
            {
              icon: "utensils",
              name: "Dapur",
              desc: detailData.kitchen ? "Tersedia area dapur fungsional" : "Area dapur fungsional",
            },
            {
              icon: "sofa",
              name: "Ruang Tamu",
              desc: detailData.living_room ? "Tersedia ruang tamu keluarga" : "Ruang tamu",
            },
          ],
          planImage: `/images/floor-plans/${detailData.house_name.toLowerCase()} ${detailData.house_type.toLowerCase().replace("/", "-")}.png`,
        },
        techSpec: {
          landBuilding: {
            title: "Luas Tanah & Bangunan",
            items: [
              { label: "Luas Tanah (LT)", value: `${detailData.land_area} m²` },
              { label: "Luas Bangunan (LB)", value: `${detailData.building_area} m²` },
            ],
          },
          rooms: {
            title: "Denah Ruang",
            items: [
              { label: "Kamar Tidur", value: `${detailData.bedroom} Ruangan` },
              { label: "Ruang Tamu", value: detailData.living_room ? "1 Ruangan" : "Tidak Tersedia" },
              { label: "Dapur", value: detailData.kitchen ? `${detailData.kitchen} Area` : "Tidak Tersedia" },
              { label: "Kamar Mandi", value: `${detailData.bathroom} Ruangan` },
              { label: "Carport", value: detailData.carport ? `Kapasitas ${detailData.carport} Mobil` : "Tidak Tersedia" },
            ],
          },
          installation: {
            title: "Instalasi",
            items: [
              { label: "Listrik", value: `${detailData.electricity} Watt` },
              { label: "Air", value: detailData.water_source || "Sumur Bor" },
              { label: "Tipe Kloset", value: detailData.sanitation || "Toilet Duduk/Jongkok" },
            ],
          },
        },
        masterplan: {
          title: "Masterplan Kawasan & Eksterior",
          subtitle: "THE NEIGHBORHOOD",
          description: "Kawasan hunian terpadu yang dirancang untuk menyeimbangkan antara ruang terbuka hijau dan privasi penghuni.",
          unitName: `${detailData.house_name.toUpperCase()} TIPE ${detailData.house_type}`,
          features: [
            {
              icon: "🔒",
              title: "Gerbang Utama & Keamanan 24/7",
              desc: "Akses satu pintu (One Gate System) dengan pemantauan CCTV dan petugas keamanan profesional selama 24 jam.",
            },
            {
              icon: "🌿",
              title: "Taman Tematik & Playground",
              desc: "Berbagai area hijau dengan tema khusus dan taman bermain anak yang aman dan edukatif.",
            },
            {
              icon: "🛣",
              title: "Row Jalan Luas (Min. 10m)",
              desc: "Infrastruktur jalan utama dan lingkungan yang lebar, memberikan kesan lapang dan kemudahan bermanuver.",
            },
          ],
        },
        blocks: sortedBlocks,
      };
    } catch (error) {
      console.error("Error in unitDetailService.getUnitDetailBySlug:", error);
      throw error;
    }
  },
};
