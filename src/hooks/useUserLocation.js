import { useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  function requestLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  }

  return { location, error, requestLocation };
}
