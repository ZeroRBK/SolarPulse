// /app/dashboard/page.tsx

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import LocationCard from "../../components/LocationCard";
import SolarOutputCard from "../../components/SolarOutputCard";
import Card from "../../components/Card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col p-8 sm:p-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex flex-col items-center gap-10 mt-16 max-w-4xl mx-auto text-center">
        <Header
          title="Your Dashboard"
          subtitle={
            <>
              Explore your personalized solar data and trends.
            </>
          }
        />

        {/* Location and solar data */}
        <LocationCard />
        <SolarOutputCard />
        
      </main>
    </div>
  );
}
