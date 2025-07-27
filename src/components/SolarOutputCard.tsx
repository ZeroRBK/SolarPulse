"use client";

import { useEffect, useState } from "react";
import { useUserLocation } from "../hooks/useUserLocation";
import GHIChart from "./GHIChart";

interface SolarData {
  locationName: string;
  monthlyGHI: number[];
  avgGHI: number;
}

export default function SolarOutputCard() {
  const { location, loading, error } = useUserLocation();
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [systemSizeKW, setSystemSizeKW] = useState<number>(5); // default 5 kW system

  useEffect(() => {
    if (!location) return;

    const fetchSolarEstimate = async () => {
      try {
        const { lat, lon } = location;

        // Reverse geocode for location name
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

        // NASA POWER Monthly API requires start & end year (YYYY)
        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;

        // Fetch monthly GHI data for last year
        const ghiRes = await fetch(
          `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&start=${lastYear}&end=${lastYear}&format=JSON`
        );
        if (!ghiRes.ok) {
          const errText = await ghiRes.text();
          throw new Error(`NASA POWER API error: ${ghiRes.status} - ${errText}`);
        }
        const ghiData = await ghiRes.json();

        // Extract monthly GHI from keys YYYY01 ... YYYY12
        const ghiValuesObj = ghiData.properties.parameter.ALLSKY_SFC_SW_DWN;
        const months = [
          "01","02","03","04","05","06","07","08","09","10","11","12"
        ];
        const ghiValues = months.map(m => ghiValuesObj[`${lastYear}${m}`] ?? 0);

        // Calculate average GHI over 12 months
        const avgGHI = ghiValues.reduce((sum, val) => sum + val, 0) / ghiValues.length;

        setSolarData({
          locationName,
          monthlyGHI: ghiValues,
          avgGHI,
        });
      } catch (err) {
        console.error("Failed to fetch solar data:", err);
        setDataError("Unable to fetch solar data at this time.");
      }
    };

    fetchSolarEstimate();
  }, [location]);

  // Estimate monthly solar output:
  // Assume 75% system performance ratio, output = avgGHI * systemSize * 30 days * 0.75
  // Here avgGHI is kWh/m²/day, systemSize in kW
  // Since avgGHI is monthly average daily irradiance (kWh/m²/day), multiply by days in month and system size:
  const estimatedOutput = solarData
    ? solarData.avgGHI * systemSizeKW * 30 * 0.75
    : 0;

  if (loading) return <div>Loading location and solar data...</div>;
  if (error) return <div>Error fetching location: {error}</div>;
  if (dataError) return <div>{dataError}</div>;
  if (!solarData) return <div>Loading solar data...</div>;

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-2">Solar Output Estimate</h2>

      <label className="block mb-3">
        System Size (kW):
        <input
          type="number"
          min={0}
          step={0.1}
          value={systemSizeKW}
          onChange={(e) => setSystemSizeKW(parseFloat(e.target.value) || 0)}
          className="ml-2 border px-2 py-1 w-24 rounded"
        />
      </label>

      <p className="mb-2">
        Estimated monthly solar output:{" "}
        <strong>{estimatedOutput.toFixed(1)} kWh</strong>
      </p>
      <p className="mb-4">(Location: {solarData.locationName})</p>

      <GHIChart
        data={solarData.monthlyGHI.map((ghi, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          ghi,
        }))}
      />
    </div>
  );
}
