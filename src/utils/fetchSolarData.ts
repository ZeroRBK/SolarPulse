// This file fetches solar irradiance data from the NASA POWER API
// and returns monthly irradiance values in kWh/m²/day.
// It is used to provide the necessary data for estimating solar energy output.

export interface NasaPowerResponse {
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DWN: {
        [month: string]: number; // month strings "01" to "12"
      };
    };
  };
}

export async function fetchSolarData(
  latitude: number,
  longitude: number
): Promise<number[]> {
  const baseUrl = "https://power.larc.nasa.gov/api/temporal/climatology/point";
  const params = new URLSearchParams({
    parameters: "ALLSKY_SFC_SW_DWN",
    community: "RE",
    longitude: longitude.toString(),
    latitude: latitude.toString(),
    format: "JSON",
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`NASA POWER API error: ${response.statusText}`);
    }

    const data: NasaPowerResponse = await response.json();

    const irradianceObj = data.properties.parameter.ALLSKY_SFC_SW_DWN;

    // Convert Wh/m²/day to kWh/m²/day by dividing by 1000
    const monthlyIrradiance = Object.keys(irradianceObj)
      .sort() // "01"..."12"
      .map((month) => irradianceObj[month] / 1000);

    return monthlyIrradiance;
  } catch (error) {
    console.error("fetchSolarData error:", error);
    throw error;
  }
}
