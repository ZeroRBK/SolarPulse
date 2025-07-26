"use client";


import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import { useUserLocation } from "../hooks/useUserLocation";

export default function Home() {
  const { location, error, requestLocation } = useUserLocation();

  return (
    <div className="min-h-screen flex flex-col p-8 sm:p-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex flex-col items-center gap-10 mt-16 max-w-4xl mx-auto text-center">
        <Header
          title="Track the Solar Revolution"
          subtitle={
            <>
              Your dashboard for renewable energy data. <br />
              Explore fast-growing solar energy trends around the world.
            </>
          }
        />
        <Button onClick={requestLocation}>Show me my local solar potential!</Button>

        {error && <p className="text-red-500">{error}</p>}

        {location && (
          <Card title="Your Location">
            <p>Latitude: {location.latitude.toFixed(4)}</p>
            <p>Longitude: {location.longitude.toFixed(4)}</p>
          </Card>
        )}

        <Card title="Latest Solar Panel Stats" className="w-full max-w-xl">
          <p>Panel A generates 300 kWh per month.</p>
        </Card>
      </main>
    </div>
  );
}
