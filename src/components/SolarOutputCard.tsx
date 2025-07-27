'use client';

import { useEffect, useState } from 'react';
import { fetchSolarData, MonthlyGHI } from '../utils/fetchSolarData';
import useUserLocation from '../hooks/useUserLocation';

interface Output {
  monthly: { [month: string]: number };
  yearly: number;
}

function calculatePVOutput(ghi: MonthlyGHI, systemSize = 5, performanceRatio = 0.75): Output {
  const monthlyOutput: { [month: string]: number } = {};
  let yearlyTotal = 0;

  for (const month in ghi) {
    const monthlyKWh = ghi[month] * 30 * systemSize * performanceRatio;
    monthlyOutput[month] = parseFloat(monthlyKWh.toFixed(1));
    yearlyTotal += monthlyKWh;
  }

  return {
    monthly: monthlyOutput,
    yearly: parseFloat(yearlyTotal.toFixed(1)),
  };
}

export default function SolarOutputCard() {
  const { location, loading: locLoading } = useUserLocation();
  const [data, setData] = useState<Output | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewYearly, setViewYearly] = useState(false);

  useEffect(() => {
    if (!location) return;

    const loadData = async () => {
      const ghi = await fetchSolarData(location.lat, location.lon);
      if (!ghi) {
        setError('Could not fetch solar data.');
        return;
      }

      const output = calculatePVOutput(ghi);
      setData(output);
    };

    loadData();
  }, [location]);

  if (locLoading) return <div className="text-center">📍 Detecting location...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!data) return <div className="text-center">⚡ Loading solar estimate...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        ☀️ Solar Output Estimate (5 kWp)
      </h2>

      {viewYearly ? (
        <p className="text-lg mb-4">
          Estimated annual production: <strong>{data.yearly} kWh</strong>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
          {Object.entries(data.monthly).map(([month, value]) => (
            <li key={month} className="flex justify-between">
              <span>{month}</span>
              <span>{value} kWh</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setViewYearly(!viewYearly)}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
      >
        {viewYearly ? 'View Monthly' : 'View Yearly'}
      </button>
    </div>
  );
}
