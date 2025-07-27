"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface GHIChartProps {
  data: {
    month: string;
    ghi: number;
  }[];
}

export default function GHIChart({ data }: GHIChartProps) {
  return (
    <div className="w-full h-64 mt-6">
      <h3 className="text-lg font-semibold mb-2">Monthly GHI (Global Horizontal Irradiance)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis unit=" kWh/m²" />
          <Tooltip formatter={(value) => `${value} kWh/m²`} />
          <Line type="monotone" dataKey="ghi" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
