/**
 * Service to handle data fetching for general units catalog.
 */
export const unitService = {
  /**
   * Fetches units from the API, groups them by house_name and house_type,
   * and maps the attributes to fit the UnitCard component interface.
   * @returns {Promise<Array>} A promise that resolves to the array of mapped unit data.
   */
  async getUnits() {
    try {
      const response = await fetch("/api/unit");
      if (!response.ok) {
        throw new Error(`Failed to fetch units: ${response.statusText}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch units");
      }

      const rawData = result.data || [];

      // Group by house_name and house_type to display unique models/designs in the catalog
      const uniqueTypes = {};
      rawData.forEach((house) => {
        if (!house.house_name || !house.house_type) return;
        const key = `${house.house_name}_${house.house_type}`;
        if (!uniqueTypes[key]) {
          uniqueTypes[key] = house;
        }
      });

      const groupedData = Object.values(uniqueTypes);

      // Map Supabase schema fields to the structure expected by the frontend cards
      return groupedData.map((house) => {
        // Resolve slug based on the house name and type
        const nameLower = house.house_name.toLowerCase();
        const typeLower = house.house_type ? house.house_type.toLowerCase() : "";
        let slug = "";

        if (nameLower.includes("classic haven")) {
          if (typeLower.includes("42/65")) slug = "classic-haven-42-65";
          else if (typeLower.includes("100/88")) slug = "classic-haven-100-88";
          else slug = `classic-haven-${typeLower.replace("/", "-")}`;
        } else if (nameLower.includes("geefi residence")) {
          if (typeLower.includes("42/60")) slug = "geefi-residence-42-60";
          else if (typeLower.includes("54/60")) slug = "geefi-residence-54-60";
          else slug = `geefi-residence-${typeLower.replace("/", "-")}`;
        } else if (nameLower.includes("geefi subsidi") && nameLower.includes("2")) {
          slug = "geefi-subsidi-2-plumpung";
        } else if (nameLower.includes("geefi subsidi")) {
          slug = "geefi-subsidi-plumpung-30-60";
        } else {
          // Dynamic fallback slugification
          slug = `${nameLower.replace(/\s+/g, "-")}-${typeLower.replace("/", "-")}`;
        }

        // Format numeric price (e.g. 265000000 -> "Rp 265 Juta", 1200000000 -> "Rp 1,2 M")
        let formattedPrice = "";
        if (house.price) {
          if (house.price >= 1000000000) {
            const priceInM = house.price / 1000000000;
            formattedPrice = `Rp ${priceInM.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })} M`;
          } else {
            const priceInJuta = house.price / 1000000;
            formattedPrice = `Rp ${priceInJuta.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })} Juta`;
          }
        } else {
          formattedPrice = "Hubungi Kami";
        }

        return {
          id: house.house_id,
          name: `${house.house_name} ${house.house_type}`,
          house_name: house.house_name,
          category: house.house_name, // Mapping filter category to house_name
          badge: house.house_name.toUpperCase(),
          bedrooms: house.bedroom || 0,
          bathrooms: `${house.bathroom || 0} KM`,
          price: formattedPrice,
          slug: slug,
          is_available: house.is_available,
        };
      });
    } catch (error) {
      console.error("Error in unitService.getUnits:", error);
      throw error;
    }
  },
};
