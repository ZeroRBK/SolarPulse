// This is the main entry point for the SolarPulse application. 

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button"; 
import LocationCard from "../components/LocationCard";
import SolarOutputCard from "../components/SolarOutputCard";


export default function Home() {

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
        <LocationCard />
        <SolarOutputCard />
        <Card title="Latest Solar Panel Stats" className="w-full max-w-xl">
          <p>Panel A generates 300 kWh per month.</p>
        </Card>
      </main>
    </div>
  );
}
