'use client';

import React from 'react';
import { useUserLocation } from '../hooks/useUserLocation';

export default function LocationCard() {
  const { locationName, loading, error } = useUserLocation();

  if (loading) return <div>📍 Detecting your location...</div>;
  if (error) return <div className="text-red-500">Error fetching location: {error}</div>;
  if (!locationName) return <div>Location not available</div>;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-1">Your Location</h3>
      <p>📍 {locationName}</p>
    </div>
  );
}
