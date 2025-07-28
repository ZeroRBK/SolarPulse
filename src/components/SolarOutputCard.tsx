// src/components/SolarOutputCard.tsx - Redesigned with modern styling
"use client";

import { useEffect, useState } from "react";
import { useUserLocation } from "../hooks/useUserLocation";
import GHIChart from "../app/dashboard/components/GHIChart";

interface SolarData {
  locationName: string;
  monthlyGHI: number[];
  avgGHI: number;
}

export default function SolarOutputCard() {
  const { location, loading, error } = useUserLocation();
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [systemSizeKW, setSystemSizeKW] = useState<number>(5);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchSolarEstimate = async () => {
      setIsCalculating(true);
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

        // NASA POWER Monthly API
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
          "01","02","03","04","05","06","07","08","09","10","11","12"
        ];
        const ghiValues = months.map(m => ghiValuesObj[`${lastYear}${m}`] ?? 0);
        const avgGHI = ghiValues.reduce((sum, val) => sum + val, 0) / ghiValues.length;

        setSolarData({
          locationName,
          monthlyGHI: ghiValues,
          avgGHI,
        });
        setDataError(null);
      } catch (err) {
        console.error("Failed to fetch solar data:", err);
        setDataError("Unable to fetch solar data at this time.");
      } finally {
        setIsCalculating(false);
      }
    };

    fetchSolarEstimate();
  }, [location]);

  const estimatedOutput = solarData
    ? solarData.avgGHI * systemSizeKW * 30 * 0.75
    : 0;

  const estimatedSavings = estimatedOutput * 0.12; // Assume $0.12/kWh
  const co2Reduction = estimatedOutput * 0.92; // lbs CO2 per kWh

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-spin">
              <div className="w-6 h-6 bg-white dark:bg-slate-800 rounded-full m-1"></div>
            </div>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              Getting your location and solar data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-red-200 dark:border-red-800 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Location Error</h3>
          <p className="text-slate-600 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-800 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Data Unavailable</h3>
          <p className="text-slate-600 dark:text-slate-400">{dataError}</p>
        </div>
      </div>
    );
  }

  if (!solarData) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              Loading solar data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Your Solar Potential</h2>
            <p className="text-amber-100 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{solarData.locationName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* System Size Input */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Solar System Size
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="number"
                min={0}
                step={0.1}
                value={systemSizeKW}
                onChange={(e) => setSystemSizeKW(parseFloat(e.target.value) || 0)}
                className="w-32 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg font-semibold text-slate-900 dark:text-white"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-slate-500 dark:text-slate-400">kW</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Typical home systems range from 3-10 kW
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Monthly Output</h3>
            </div>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">
              {estimatedOutput.toFixed(1)} <span className="text-lg font-medium">kWh</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Est. Savings</h3>
            </div>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              ${estimatedSavings.toFixed(2)} <span className="text-lg font-medium">/month</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">CO₂ Reduced</h3>
            </div>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {co2Reduction.toFixed(0)} <span className="text-lg font-medium">lbs</span>
            </p>
          </div>
        </div>

        {/* Chart */}
        <GHIChart
          data={solarData.monthlyGHI.map((ghi, i) => ({
            month: new Date(0, i).toLocaleString("default", { month: "short" }),
            ghi,
          }))}
        />
      </div>
    </div>
  );
}