// src/components/GHIChart.tsx - Modern chart with better styling
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface GHIChartProps {
  data: {
    month: string;
    ghi: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
        <p className="text-amber-600 dark:text-amber-400">
          <span className="font-medium">{payload[0].value.toFixed(1)} kWh/m²</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function GHIChart({ data }: GHIChartProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Monthly Solar Irradiance
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Global Horizontal Irradiance (GHI) throughout the year at your location
        </p>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ghiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              className="dark:stroke-slate-600"
            />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              fontWeight={500}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="ghi"
              stroke="#f59e0b"
              strokeWidth={3}
              fill="url(#ghiGradient)"
              dot={{ 
                fill: "#f59e0b", 
                strokeWidth: 2, 
                stroke: "#fff",
                r: 4
              }}
              activeDot={{ 
                r: 6, 
                fill: "#f59e0b",
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span>Daily Average Solar Irradiance</span>
        </div>
        <span>Data: NASA POWER API</span>
      </div>
    </div>
  );
}