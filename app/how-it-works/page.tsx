import { Navbar } from '@/components/landing/navbar';
import Link from 'next/link';
import { 
  Search, Map, Layers, Zap, ThermometerSun, 
  Wind, Droplets, TreePine, CloudRain, ShieldCheck, PlayCircle
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-green-50 to-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none -mb-20 -ml-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-6 border border-green-200 shadow-sm">
            STEP-BY-STEP GUIDE <ShieldCheck className="w-3 h-3" />
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl mb-6">
            Master the <span className="text-green-600">Climate Map</span>
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Our platform combines satellite imagery, AI, and environmental data to help you identify the perfect places to plant trees and cool down cities. Here is how you can use it.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-24">
            
            {/* Step 1: Search Your City */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-sm bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl relative">
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm rotate-[-5deg]">1</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <div className="text-slate-400 font-medium">Search any location...</div>
                    <div className="ml-auto bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold">Search</div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Map className="w-32 h-32 text-blue-200 drop-shadow-md" strokeWidth={1} />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Find Your Focus Area</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Start by using the powerful <strong className="text-slate-800">Place Search</strong>. You can search for your neighborhood, your city, or any region across the globe. Plantree will instantly center the interactive map on your location and load the local climate profiles.
                </p>
              </div>
            </div>

            {/* Step 2: Priority Zones */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-sm bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm rotate-[5deg] z-10">2</div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-slate-800 to-slate-900"></div>
                  <div className="relative z-10 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`bg-slate-800 p-3 rounded-lg border flex items-center gap-4 ${i === 1 ? 'border-red-500/50' : 'border-slate-700'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i === 1 ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}>#{i}</div>
                        <div>
                          <div className="text-white font-bold text-sm">Priority Zone {i}</div>
                          <div className="text-slate-400 text-xs">High Heat Exposure</div>
                        </div>
                        <div className="ml-auto"><Zap className={`w-4 h-4 ${i === 1 ? 'text-red-400' : 'text-slate-500'}`} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Analyze Priority Zones</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  We calculate a <strong className="text-slate-800">Green Deficit Index (GDI)</strong> for every area. The platform automatically identifies and ranks "Hotspots" or Priority Zones. These are the exact neighborhoods that suffer most from urban heat and desperately need more trees.
                </p>
              </div>
            </div>

            {/* Step 3: API Data Layers */}
            <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm mb-6">3</div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Toggle Rich API Data Layers</h2>
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                Dive deep into the environmental metrics that make up our analysis. Plantree pulls live satellite and API data to let you visualize specific factors directly on the map.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ThermometerSun className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Heat (LST)</h3>
                <p className="text-slate-500 text-sm">Visualize Land Surface Temperature to see exactly which blocks are trapping the most urban heat.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <TreePine className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Vegetation (NDVI)</h3>
                <p className="text-slate-500 text-sm">Check the health and density of current green cover. Spot areas completely devoid of plant life.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <Wind className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Air Quality</h3>
                <p className="text-slate-500 text-sm">Layer real-time air pollution and particulate matter data to prioritize planting where lungs need it most.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CloudRain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Rainfall</h3>
                <p className="text-slate-500 text-sm">Analyze historical and forecasted precipitation levels to determine the viability of sapling survival.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Weather Patterns</h3>
                <p className="text-slate-500 text-sm">Current weather APIs provide wind direction and humidity, helping calculate cooling corridors.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">And More...</h3>
                <p className="text-slate-500 text-sm">Combine all these layers to create a comprehensive understanding of your local climate ecosystem.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to Explore?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Now that you know how it works, dive into the dashboard and see the data for yourself. Identify a hotspot and plan your first tree!
          </p>
          <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-slate-900 bg-green-400 hover:bg-green-300 shadow-xl shadow-green-500/20 transition-all hover:scale-105">
            Launch the Interactive Map <PlayCircle className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}
