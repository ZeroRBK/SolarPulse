/**
 * LocationCard component
 * Displays the user's location
 */

"use client";

import Button from "./Button";
import Card from "./Card";
import { useUserLocation } from "../hooks/useUserLocation";

export default function LocationCard() {
  const { location, error, requestLocation } = useUserLocation();

  return (
    <>
      <Button onClick={requestLocation}>Show me my local solar potential!</Button>

      {error && <p className="text-red-500">{error}</p>}

      {location && (
        <Card title="Your Location">
          <p>Latitude: {location.latitude.toFixed(4)}</p>
          <p>Longitude: {location.longitude.toFixed(4)}</p>
        </Card>
      )}
    </>
  );
}
