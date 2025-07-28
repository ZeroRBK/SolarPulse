import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import LocationCard from "../components/LocationCard";
import SolarOutputCard from "./dashboard/components/SolarOutputCard";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-20 flex flex-col gap-16">
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            ☀️ Track the Solar Revolution
          </h1>
          <p className="text-lg max-w-xl mx-auto text-gray-700 dark:text-gray-300">
            Your dashboard for renewable energy data.
            <br />
            Explore fast-growing solar energy trends around the world.
          </p>
          <button
            type="button"
            className="mt-6 px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold bg-primary hover:bg-primary/80 text-foreground transition-colors duration-200"
          >
            Get Started
          </button>
        </section>


        <section>
          <Card title="Latest Solar Panel Stats" className="max-w-3xl mx-auto">
            <p>Panel A generates 300 kWh per month.</p>
          </Card>
        </section>
      </main>
    </>
  );
}
