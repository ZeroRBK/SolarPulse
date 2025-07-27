"use client";

import { useEffect, useState } from "react";
import { useUserLocation } from "../hooks/useUserLocation";

interface SolarData {
  outputEstimate: number;
  locationName: string;
}

export default function SolarOutputCard() {
  const { location, loading, error } = useUserLocation();
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchSolarEstimate = async () => {
      try {
        const { lat, lon } = location;

        // 1. Reverse geocode for a readable location name
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        if (!geoRes.ok) throw new Error("Failed to fetch location name");
        const geoData = await geoRes.json();

        const locationName =
          geoData.address?.city ||
          geoData.address?.town ||
          geoData.address?.village ||
          geoData.address?.state ||
          `Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`;

        // 2. Fetch NASA POWER API for solar irradiance (GHI)
        const ghiRes = await fetch(
          `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&format=JSON`
        );
        if (!ghiRes.ok) throw new Error("Failed to fetch solar irradiance data");

        const ghiData = await ghiRes.json();

        console.log("NASA POWER API response:", ghiData);

        const ghiValues = ghiData?.properties?.parameter?.ALLSKY_SFC_SW_DWN;

        if (!ghiValues || Object.keys(ghiValues).length === 0) {
          throw new Error("No GHI data found in NASA POWER API response");
        }

        const ghiArray = Object.values(ghiValues) as number[];
        const avgGHI = ghiArray.reduce((a, b) => a + b, 0) / ghiArray.length;

        // 3. Calculate estimated monthly solar output
        const days = 30;
        const panelArea = 1.6; // m² typical panel
        const efficiency = 0.20; // 20% efficiency

        const outputEstimate = avgGHI * days * panelArea * efficiency;

        // Update React state
        setSolarData({
          outputEstimate,
          locationName,
        });
        setDataError(null);
      } catch (err) {
        console.error("Failed to fetch solar data:", err);
        setDataError("Unable to fetch solar data at this time.");
        setSolarData(null);
      }
    };

    fetchSolarEstimate();
  }, [location]);

  if (loading) return <div>Loading location and solar data...</div>;
  if (error) return <div>Error fetching location: {error}</div>;
  if (dataError) return <div>{dataError}</div>;
  if (!location) return <div>Location not available.</div>;
  if (!solarData) return <div>Loading solar data...</div>;

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-2">Solar Output Estimate</h2>
      <p>
        Your estimated solar energy output is{" "}
        <strong>{solarData.outputEstimate.toFixed(1)} kWh/month</strong>.
      </p>
      <p>(Based on your location: {solarData.locationName})</p>
    </div>
  );
}
