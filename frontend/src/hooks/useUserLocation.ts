// src/hooks/useUserLocation.ts
import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

interface UseUserLocationResult {
  location: Location | null;
  locationName: string | null;
  loading: boolean;
  error: string | null;
}

export function useUserLocation(): UseUserLocationResult {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLocation({ lat, lon });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          if (!res.ok) throw new Error("Failed to fetch location name");
          const data = await res.json();

          const name =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state ||
            `Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`;

          setLocationName(name);
        } catch {
          setLocationName(`Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`);
        }

        setLoading(false);
      },
      (geoError) => {
        setError(geoError.message);
        setLoading(false);
      }
    );
  }, []);

  return { location, locationName, loading, error };
}
