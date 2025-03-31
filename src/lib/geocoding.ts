async function geocodeAddress(
  address: string
): Promise<{ latitude: number; longitude: number } | null> {
  const encodedAddress = encodeURIComponent(address);
  
  const url = `https://api.olamaps.io/places/v1/geocode?address=${encodedAddress}&api_key=${process.env.OLA_MAPS_API_KEY}`;


  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: any = await response.json();

    if (data) {
      return {
        latitude: parseFloat(data.geocodingResults[0].geometry.location.lat),
        longitude: parseFloat(data.geocodingResults[0].geometry.location.lng),
      };
    } else {
      console.error("Geocoding failed: No results found.", data);
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
