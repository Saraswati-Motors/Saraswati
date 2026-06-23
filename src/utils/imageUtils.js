export const getVehicleImage = (vehicle) => {
  if (!vehicle) return "/placeholder.webp";
  if (vehicle.image_url?.trim()) return vehicle.image_url;
  if (
    Array.isArray(vehicle.images) &&
    vehicle.images.length > 0 &&
    vehicle.images[0]?.trim()
  ) {
    return vehicle.images[0];
  }
  return "/placeholder.webp";
};

export const getVehicleGallery = (vehicle) => {
  if (!vehicle) return ["/placeholder.webp"];
  if (Array.isArray(vehicle.images) && vehicle.images.length > 0) {
    const filtered = vehicle.images.filter(img => img?.trim());
    if (filtered.length > 0) return filtered;
  }
  if (vehicle.image_url?.trim()) {
    return [vehicle.image_url];
  }
  return ["/placeholder.webp"];
};

export const isSupabaseStorageUrl = (url) => {
  if (typeof url !== "string") return false;
  return url.includes(".supabase.co/storage/v1/object/public/");
};
