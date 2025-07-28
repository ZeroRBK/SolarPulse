"use client";

import { useEffect, useState } from "react";
import { useUserLocation } from "../../../hooks/useUserLocation";
import GHIChart from "./GHIChart";

interface SolarData {
  monthlyGHI: number[];
  avgGHI: number;
}

export default function SolarOutputCard() {
  const { location, locationName, loading, error } = useUserLocation();
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [systemSizeKW, setSystemSizeKW] = useState<number>(5);

  useEffect(() => {
    if (!location) return;

    const fetchSolarEstimate = async () => {
      try {
        const { lat, lon } = location;
        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;

        const ghiRes = await fetch(
          `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&start=${lastYear}&end=${lastYear}&format=JSON`
        );
        if (!ghiRes.ok) {
          const errText = await ghiRes.text();
          throw new Error(`NASA POWER API error: ${ghiRes.status} - ${errText}`);
        }
        const ghiData = await ghiRes.json();

        const ghiValuesObj = ghiData.properties.parameter.ALLSKY_SFC_SW_DWN;
        const months = [
          "01", "02", "03", "04", "05", "06",
          "07", "08", "09", "10", "11", "12"
        ];
        const ghiValues = months.map(m => ghiValuesObj[`${lastYear}${m}`] ?? 0);

        const avgGHI = ghiValues.reduce((sum, val) => sum + val, 0) / ghiValues.length;

        setSolarData({ monthlyGHI: ghiValues, avgGHI });
        setDataError(null);
      } catch (err) {
        console.error("Failed to fetch solar data:", err);
        setDataError("Unable to fetch solar data at this time.");
      }
    };

    fetchSolarEstimate();
  }, [location]);

  if (loading) return <div>Loading location and solar data...</div>;
  if (error) return <div>Error fetching location: {error}</div>;
  if (dataError) return <div>{dataError}</div>;
  if (!solarData) return <div>Loading solar data...</div>;

  const estimatedOutput = solarData.avgGHI * systemSizeKW * 30 * 0.75;

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
      <p className="mb-4">(Location: {locationName})</p>

      <GHIChart
        data={solarData.monthlyGHI.map((ghi, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          ghi,
        }))}
      />
    </div>
  );
}
