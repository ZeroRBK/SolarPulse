// src/app/countries/page.jsx - Showcase data analysis and statistics skills
"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Countries() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("capacity");

  // Sample data showcasing your statistics and data analysis skills
  const solarData = [
    {
      country: "China",
      region: "Asia",
      capacity: 261.0, // GW
      growth: 85.3,
      efficiency: 22.5,
      investment: 90.2, // Billion USD
      flag: "🇨🇳"
    },
    {
      country: "United States",
      region: "North America", 
      capacity: 95.2,
      growth: 19.2,
      efficiency: 24.1,
      investment: 73.8,
      flag: "🇺🇸"
    },
    {
      country: "Germany",
      region: "Europe",
      capacity: 58.4,
      growth: 7.4,
      efficiency: 25.3,
      investment: 12.4,
      flag: "🇩🇪"
    },
    {
      country: "Brazil",
      region: "South America",
      capacity: 13.9,
      growth: 92.1,
      efficiency: 21.8,
      investment: 6.2,
      flag: "🇧🇷"
    },
    {
      country: "Spain",
      region: "Europe",
      capacity: 18.4,
      growth: 38.7,
      efficiency: 23.9,
      investment: 8.9,
      flag: "🇪🇸"
    },
    {
      country: "Japan",
      region: "Asia",
      capacity: 78.8,
      growth: 6.8,
      efficiency: 26.1,
      investment: 16.5,
      flag: "🇯🇵"
    }
  ];

  const regions = ["all", "Asia", "Europe", "North America", "South America"];

  const filteredData = solarData.filter(country => 
    selectedRegion === "all" || country.region === selectedRegion
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch(sortBy) {
      case "capacity": return b.capacity - a.capacity;
      case "growth": return b.growth - a.growth;
      case "efficiency": return b.efficiency - a.efficiency;
      case "investment": return b.investment - a.investment;
      default: return 0;
    }
  });

  const totalCapacity = filteredData.reduce((sum, country) => sum + country.capacity, 0);
  const avgGrowth = filteredData.reduce((sum, country) => sum + country.growth, 0) / filteredData.length;
  const avgEfficiency = filteredData.reduce((sum, country) => sum + country.efficiency, 0) / filteredData.length;

  const regionData = regions.slice(1).map(region => ({
    name: region,
    value: solarData.filter(country => country.region === region)
      .reduce((sum, country) => sum + country.capacity, 0)
  }));

  const COLORS = ['#f59e0b', '#f97316', '#ea580c', '#dc2626'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Global Solar <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Analytics</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Comprehensive statistical analysis of solar energy adoption across major economies
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Filter by Region
            </label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === "all" ? "All Regions" : region}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Sort by Metric
            </label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
            >
              <option value="capacity">Solar Capacity (GW)</option>
              <option value="growth">Growth Rate (%)</option>
              <option value="efficiency">Panel Efficiency (%)</option>
              <option value="investment">Investment (Billion USD)</option>
            </select>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">Σ</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Total Capacity</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {totalCapacity.toFixed(1)} GW
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Selected regions combined
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">μ</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Avg Growth Rate</h3>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {avgGrowth.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Year-over-year increase
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">η</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Avg Efficiency</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {avgEfficiency.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Panel conversion efficiency
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Solar Capacity by Country
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="country" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="capacity" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Regional Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedData.map((country, index) => (
            <div key={country.country} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{country.country}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{country.region}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Capacity</span>
                  <span className="font-bold text-slate-900 dark:text-white">{country.capacity} GW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Growth Rate</span>
                  <span className="font-bold text-green-600 dark:text-green-400">+{country.growth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Efficiency</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{country.efficiency}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Investment</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">${country.investment}B</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Note */}
        <div className="mt-16 bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
            📊 Statistical Analysis & Data Management
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            This page demonstrates proficiency in data analysis, statistical calculations, and database management principles. 
            Features include dynamic filtering, sorting algorithms, statistical aggregation (sum, mean), and interactive data visualization.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">SQL Concepts</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">Statistical Analysis</span>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">Data Visualization</span>
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm">Algorithm Implementation</span>
          </div>
        </div>
      </main>
    </div>
  );
}