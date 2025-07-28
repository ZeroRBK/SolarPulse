// src/app/page.jsx - Complete redesign with modern solar theme
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsGrid from "../components/StatsGrid";
import SolarOutputCard from "../components/SolarOutputCard";
import FeatureCards from "../components/FeatureCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Grid */}
      <StatsGrid />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Solar Output Calculator */}
        <section className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Calculate Your Solar Potential
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get personalized solar energy estimates based on your location's irradiance data
            </p>
          </div>
          <div className="flex justify-center">
            <SolarOutputCard />
          </div>
        </section>

        {/* Feature Cards */}
        <FeatureCards />
        
        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Go Solar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Explore comprehensive solar data from around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-200 hover:scale-105 shadow-lg">
                Explore Countries
              </button>
              <button className="bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-700 transition-all duration-200 hover:scale-105 border-2 border-white/20">
                View Top Performers
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}