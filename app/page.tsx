import Image from 'next/image';
import Link from 'next/link';
import { 
  Globe2, Leaf, BarChart3, Users, ChevronDown, 
  PlayCircle, ThermometerSun, Map as MapIcon, 
  Wind, Droplets, UserCog, CheckCircle2,
  TreePine, Building2
} from 'lucide-react';

import { Navbar } from '@/components/landing/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white pt-4 pb-24 lg:pt-8 lg:pb-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-200/30 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-6 border border-green-200">
                DATA FROM SPACE. IMPACT ON EARTH. <Leaf className="w-3 h-3" />
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mb-6">
                <span className="block text-slate-800">A Greener Tomorrow</span>
                <span className="block text-green-600 mt-2">Starts with Smart</span>
                <span className="block text-green-600 mt-2">Decisions Today</span>
              </h1>
              <p className="mt-3 text-base text-slate-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl mb-8 max-w-lg">
                We use the power of satellites and AI to find the best places to plant trees, cool our cities and create a healthier planet for future generations.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 md:text-lg shadow-xl shadow-green-600/30 transition-all hover:scale-105">
                  Explore Live Map <MapIcon className="ml-2 w-5 h-5" />
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center justify-center px-8 py-3 border-2 border-slate-200 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 md:text-lg transition-all hover:border-green-300 hover:text-green-700">
                  See How It Works <PlayCircle className="ml-2 w-5 h-5" />
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4 sm:justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                      <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="User" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-500 max-w-xs">
                  Trusted by changemakers worldwide for a cooler, greener Earth <Globe2 className="inline w-4 h-4 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl lg:max-w-md">
                
                <div className="relative block w-full z-10">
                  <Image 
                    src="/images/hero_transparent_1780782692839.png" 
                    alt="Kids using smart technology for a greener earth" 
                    width={800} 
                    height={800} 
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>

                {/* Floating Stat Cards */}
                <div className="absolute top-10 -right-12 sm:-right-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="text-xs font-semibold text-slate-500 mb-1">Heat Reduction Potential</div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-full">
                      <ThermometerSun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">2.4°C</div>
                      <div className="text-xs text-green-600 flex items-center gap-1">Avg. Cooling Impact <BarChart3 className="w-3 h-3" /></div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 -right-16 sm:-right-24 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style={{animationDuration: '4s'}}>
                  <div className="text-xs font-semibold text-slate-500 mb-1">Priority Green Zones</div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">356</div>
                      <div className="text-xs text-green-600 flex items-center gap-1">High Impact Areas <BarChart3 className="w-3 h-3" /></div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 -right-12 sm:-right-16 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style={{animationDuration: '3.5s'}}>
                  <div className="text-xs font-semibold text-slate-500 mb-1">People Who Can Benefit</div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">245K+</div>
                      <div className="text-xs text-green-600 flex items-center gap-1">From Cooler Neighborhoods <BarChart3 className="w-3 h-3" /></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl inline-flex items-center gap-3 justify-center mb-16">
            <span className="text-green-300">〰</span> How We Make An Impact <span className="text-green-300">〰</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-green-200 z-0"></div>
            
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:-translate-y-2 duration-300">
                <Image src="/images/impact_1_satellite_1780782706877.png" alt="Space Intelligence" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 text-center leading-tight">Space<br/>Intelligence</h3>
              <p className="text-slate-500 text-xs px-2 text-center">Satellites monitor our planet and collect data.</p>
            </div>
            
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:-translate-y-2 duration-300">
                <Image src="/images/impact_2_layers_1780782719364.png" alt="AI-Powered Analysis" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 text-center leading-tight">AI-Powered<br/>Analysis</h3>
              <p className="text-slate-500 text-xs px-2 text-center">Our AI finds hotspots and best places to plant.</p>
            </div>
            
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:-translate-y-2 duration-300">
                <Image src="/images/impact_3_pin_1780782729184.png" alt="Smart Prioritization" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 text-center leading-tight">Smart<br/>Prioritization</h3>
              <p className="text-slate-500 text-xs px-2 text-center">We rank areas based on community need.</p>
            </div>
            
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:-translate-y-2 duration-300">
                <Image src="/images/impact_4_kids_1780782740292.png" alt="Community Action" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 text-center leading-tight">Community<br/>Action</h3>
              <p className="text-slate-500 text-xs px-2 text-center">Kids and families come together to plant.</p>
            </div>

            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:-translate-y-2 duration-300">
                <Image src="/images/impact_5_chart_1780782756132.png" alt="Lasting Impact" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 text-center leading-tight">Lasting<br/>Impact</h3>
              <p className="text-slate-500 text-xs px-2 text-center">We track progress for cooler, greener cities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Measurable Change Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
          {/* Decorative stars */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] animate-pulse"></div>
          <div className="absolute top-20 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_1px_rgba(255,255,255,0.8)] animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10 p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-10 lg:mb-0 w-full lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Big Impact.<br/>Measurable Change.</h2>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-16 w-full lg:w-1/2">
              <div className="text-center">
                <div className="text-green-400 mb-2 flex justify-center"><Globe2 className="w-8 h-8" /></div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">10M+</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">Sq. Km Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 mb-2 flex justify-center"><Building2 className="w-8 h-8" /></div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">Cities Mapped</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 mb-2 flex justify-center"><TreePine className="w-8 h-8" /></div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">1M+</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">Trees Can<br/>Be Planted</div>
              </div>
              <div className="text-center hidden md:block">
                <div className="text-green-400 mb-2 flex justify-center"><Wind className="w-8 h-8" /></div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">CO₂</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">Tons of CO₂<br/>Reduction Potential</div>
              </div>
            </div>

            <div className="w-48 h-48 lg:w-64 lg:h-64 mt-10 lg:mt-0 relative hidden md:block shrink-0">
               <Image 
                  src="/images/impact_mascot_transparent_1780782193050.png" 
                  alt="Cute plant mascot" 
                  width={300} height={300} 
                  className="object-contain drop-shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:scale-110 transition-transform duration-500"
               />
               <div className="absolute top-1/2 -left-32 bg-yellow-50 text-slate-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg border border-yellow-200">
                  Every tree<br/>makes a<br/>difference!
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl inline-flex items-center gap-3 justify-center">
              <Leaf className="text-green-500 w-6 h-6" /> Explore Your City&apos;s Climate Intelligence <Leaf className="text-green-500 w-6 h-6 transform scale-x-[-1]" />
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              See heat hotspots, green deficits and priority zones in an interactive map designed just for you!
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 p-8 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white z-10 relative">
              
              <div className="relative mb-8">
                <input 
                  type="text" 
                  defaultValue="Indore"
                  placeholder="Search your city..." 
                  className="w-full pl-10 pr-12 py-4 bg-slate-50 border-none rounded-full text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-green-500 shadow-inner"
                />
                <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-10">
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
                    <ThermometerSun className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Heat Map</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 ring-2 ring-green-500 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Green Cover</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-2 group-hover:bg-yellow-500 group-hover:text-white transition-colors shadow-sm">
                    <Wind className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Air Quality</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Water Bodies</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-sm">
                    <UserCog className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Population</span>
                </div>
              </div>

              <Link href="/dashboard" className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-green-700 hover:bg-green-800 shadow-xl shadow-green-700/20 transition-all hover:-translate-y-1 group">
                Explore Live Map <MapIcon className="ml-2 w-5 h-5 group-hover:animate-bounce" />
              </Link>
            </div>

            {/* Map Area */}
            <div className="w-full lg:w-2/3 bg-slate-200 relative min-h-[400px]">
              <Image 
                src="/images/map_preview_1780782015699.png" 
                alt="Interactive map preview" 
                fill
                className="object-cover"
              />
              
              {/* Overlay Legend */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-white/20 z-10 w-64">
                <h4 className="font-bold text-slate-800 text-sm mb-4 border-b pb-2">Green Deficit Index (GDI)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">0 - 20</span>
                    <span className="text-xs text-slate-400 ml-auto">Very Low</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">20 - 40</span>
                    <span className="text-xs text-slate-400 ml-auto">Low</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-orange-400 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">40 - 60</span>
                    <span className="text-xs text-slate-400 ml-auto">Moderate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">60 - 80</span>
                    <span className="text-xs text-slate-400 ml-auto">High</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-rose-700 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">80 - 100</span>
                    <span className="text-xs text-slate-400 ml-auto font-bold text-rose-700">Critical</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Hey Kids Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="w-full md:w-1/3 order-2 md:order-1 flex justify-center">
              <Image 
                src="/images/kids_footer_transparent_1780782205565.png" 
                alt="Kids learning about climate" 
                width={350} height={350} 
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-3xl"
              />
            </div>
            
            <div className="w-full md:w-2/3 order-1 md:order-2 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Hey Kids!</h2>
              <h3 className="text-2xl font-bold text-green-600 mb-8">You Can Be a Planet Hero!</h3>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 shadow-inner">
                    <Globe2 className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-slate-800">Learn</div>
                  <div className="text-xs text-slate-500">Fun Climate<br/>Lessons</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600 shadow-inner">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-slate-800">Plant</div>
                  <div className="text-xs text-slate-500">Trees & Cool<br/>Your City</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 text-purple-600 shadow-inner">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-slate-800">Track</div>
                  <div className="text-xs text-slate-500">Your Impact<br/>Over Time</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3 text-yellow-600 shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-slate-800">Earn</div>
                  <div className="text-xs text-slate-500">Badges & Be<br/>a Hero!</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                <div className="text-sm font-medium text-slate-600 text-center sm:text-left max-w-xs">
                  Join thousands of young changemakers building a better tomorrow.
                </div>
                <Link href="/game" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 flex items-center gap-2 hover:-translate-y-1">
                  Join the Mission <Leaf className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
          </div>
          
          <div className="mt-10 text-center text-green-800 font-medium flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4" /> Together, let&apos;s grow cooler cities and a happier planet.
          </div>
        </div>
      </section>
      
    </div>
  );
}
