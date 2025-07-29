// src/app/about/page.jsx - Showcase your technical background
import Navbar from "../../components/Navbar";

export default function About() {
  const technologies = [
    {
      category: "Frontend",
      skills: ["React", "Next.js 15", "TypeScript", "Tailwind CSS", "Responsive Design"],
      icon: "🎨"
    },
    {
      category: "Backend & Data",
      skills: ["Python", "SQL", "Database Management", "API Integration", "Statistics"],
      icon: "⚡"
    },
    {
      category: "Development Tools",
      skills: ["Git", "Unix", "Project Management", "Information Security"],
      icon: "🛠️"
    },
    {
      category: "Data Sources",
      skills: ["NASA POWER API", "OpenStreetMap", "Real-time Processing", "Data Visualization"],
      icon: "🌐"
    }
  ];

  const features = [
    {
      title: "Real-time Solar Data",
      description: "Integrates with NASA POWER API to fetch accurate solar irradiance data for any location worldwide.",
      technical: "RESTful API integration, error handling, data transformation"
    },
    {
      title: "Interactive Visualizations",
      description: "Dynamic charts and maps using Recharts library with custom styling and responsive design.",
      technical: "Data visualization, responsive UI components, custom chart implementations"
    },
    {
      title: "Location-based Analytics",
      description: "Geolocation API integration with reverse geocoding for precise location identification.",
      technical: "Browser APIs, geolocation services, coordinate transformation"
    },
    {
      title: "Performance Optimized",
      description: "Built with Next.js 15 for optimal performance, SEO, and user experience.",
      technical: "SSR, performance optimization, modern React patterns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            About <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">SolarPulse</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive solar energy analytics platform built with modern web technologies, 
            showcasing full-stack development skills and data visualization expertise.
          </p>
        </div>

        {/* Developer Info */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 mb-16 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              GA
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Gui Andrade</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                Computer Science Student | Western Governors University
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  🇩🇪 German (Fluent)
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  Pt Portuguese (Fluent)
                </span>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                  🇪🇸 Spanish (Intermediate)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Technical Implementation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-slate-600 dark:text-slate-400 text-sm flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Key Features & Implementation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">Technical Details:</span> {feature.technical}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Goals */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Project Vision</h2>
          <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
            SolarPulse demonstrates the intersection of environmental sustainability and modern web development. 
            By combining real-world data with intuitive user experiences, this project showcases technical skills 
            while addressing the critical need for renewable energy awareness and adoption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-bold text-lg mb-2">Global Impact</h3>
              <p className="text-sm opacity-90">Promoting renewable energy awareness through accessible data visualization</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-lg mb-2">Data-Driven</h3>
              <p className="text-sm opacity-90">Leveraging NASA's authoritative solar irradiance data for accurate calculations</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl mb-2">💻</div>
              <h3 className="font-bold text-lg mb-2">Modern Tech</h3>
              <p className="text-sm opacity-90">Built with cutting-edge web technologies and best practices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}