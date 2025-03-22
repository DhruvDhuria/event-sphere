async function geocodeAddress(
  address: string
): Promise<{ latitude: number; longitude: number } | null> {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: any[] = await response.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    } else {
      console.error("Geocoding failed: No results found.");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error geocoding address:", error.message);
    } else {
      console.error("An unknown error occurred geocoding the address");
    }
    return null;
  }
}

export {geocodeAddress};

// Example usage:
// geocodeAddress("1600 Amphitheatre Parkway, Mountain View, CA").then(
//   (coordinates) => {
//     if (coordinates) {
//       console.log("Latitude:", coordinates.latitude);
//       console.log("Longitude:", coordinates.longitude);
//     }
//   }
// );
