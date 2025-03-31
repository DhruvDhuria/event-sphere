async function geocodeAddress(
  address: string
): Promise<{ latitude: number; longitude: number } | null> {
  const encodedAddress = encodeURIComponent(address);
  console.log(encodedAddress)
  
  const url = `https://api.olamaps.io/places/v1/geocode?address=${encodedAddress}&api_key=${process.env.OLA_MAPS_API_KEY}`;


  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: any = await response.json();

    if (data) {
      console.log(data.geometry)
      return {
        latitude: parseFloat(data.geocodingResults[0].geometry.location.lat),
        longitude: parseFloat(data.geocodingResults[0].geometry.location.lng),
      };
    } else {
      console.error("Geocoding failed: No results found.", data.geocodingResults[0].geometry.location);
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
