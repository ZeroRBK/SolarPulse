// src/components/FeatureCards.jsx - Showcase key features
export default function FeatureCards() {
  const features = [
    {
      title: "Interactive World Map",
      description: "Explore solar energy adoption across 195+ countries with our interactive visualization powered by real-time data.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      comingSoon: false
    },
    {
      title: "Solar Growth Timeline",
      description: "Track the exponential growth of solar installations worldwide with historical data and future projections.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500",
      comingSoon: true
    },
    {
      title: "Country Comparisons",
      description: "Compare solar energy statistics, policies, and growth rates between different countries side by side.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      comingSoon: true
    }
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Powerful Solar Analytics
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Comprehensive tools to understand and visualize the global transition to renewable energy
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-50/50 dark:via-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Coming Soon Badge */}
            {feature.comingSoon && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </div>
            )}
            
            {/* Icon */}
            <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
              {feature.icon}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Action Button */}
              <button className={`inline-flex items-center space-x-2 bg-gradient-to-r ${feature.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 ${feature.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={feature.comingSoon}
              >
                <span>{feature.comingSoon ? 'Coming Soon' : 'Explore'}</span>
                {!feature.comingSoon && (
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Hover Border Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}