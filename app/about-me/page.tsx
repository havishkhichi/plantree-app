import { Navbar } from '@/components/landing/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Map, Code, TreePine, Sparkles, Globe2, Cpu, Trophy, Leaf } from 'lucide-react';
import { AnimatedCodeBackground } from '@/components/AnimatedCodeBackground';

export default function AboutMePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-green-100 selection:text-green-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-6 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dynamic Colorful Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 z-0"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-emerald-300/20 blur-[100px] mix-blend-multiply pointer-events-none animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[100px] mix-blend-multiply pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        
        <div className="max-w-5xl w-full relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 text-green-800 text-sm font-bold mb-4 border border-green-200 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              THE MAKER BEHIND THE MISSION
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white flex flex-col lg:flex-row transform transition-all duration-500 hover:shadow-green-500/10 hover:-translate-y-1">
            
            {/* Left Column: Profile Card */}
            <div className="w-full lg:w-2/5 p-6 relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
              <AnimatedCodeBackground />
              
              {/* Decorative rings */}
              <div className="absolute w-64 h-64 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-80 h-80 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

              <div className="relative z-10 w-full max-w-[280px] mb-4 rounded-xl overflow-hidden border-4 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] group cursor-pointer bg-white">
                <Image 
                  src="/images/havish_new.png" 
                  alt="Havish Khichi" 
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <h1 className="relative z-10 text-4xl font-extrabold text-white mb-3 text-center tracking-tight">Havish Khichi</h1>
              
              <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-6">
                <span className="bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                  <Cpu className="w-4 h-4" /> Vibe Coder
                </span>
                <span className="bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-500/30 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                  <Trophy className="w-4 h-4" /> Chess Player
                </span>
              </div>
              
            </div>

            {/* Right Column: Bio Content */}
            <div className="w-full lg:w-3/5 p-6 lg:p-8 bg-white/60 relative">
              <div className="absolute top-6 right-6 opacity-10">
                <Leaf className="w-24 h-24 text-green-600" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4 flex items-center gap-3">
                Hello, Everyone! 👋
              </h2>
              
              <div className="space-y-4 text-base text-slate-600 leading-relaxed relative z-10">
                <p>
                  I am <strong className="text-green-700 font-extrabold">12 years old</strong> and I live in the beautiful city of <strong className="text-green-700 font-extrabold">Indore</strong>. I currently study in <strong className="text-slate-800">Class 6th</strong>, and when I'm not studying, you'll usually find me playing Chess or writing code.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1 h-full bg-emerald-400 group-hover:w-full transition-all duration-500 z-0 opacity-10"></div>
                  <p className="relative z-10">
                    Welcome to <span className="font-extrabold text-emerald-700">Greenfinity!</span> This is a very special project for me because <strong className="text-white bg-emerald-500 px-2 py-0.5 rounded-md shadow-sm">this is my 1st Web App!</strong> Before this, I had only created websites, but I wanted to build something more interactive and meaningful.
                  </p>
                </div>

                <p>
                  I built this platform to help people understand real climate data from satellites, and figure out the best places to plant trees in our cities to make them cooler, greener, and healthier for everyone.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-3 rounded-xl shadow-md">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">The Goal</div>
                    <div className="text-base font-bold text-slate-800 leading-tight">Use Data from Space to Save Earth</div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-emerald-400 to-green-600 text-white p-3 rounded-xl shadow-md">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">The Mission</div>
                    <div className="text-base font-bold text-slate-800 leading-tight">Plant Trees Where They Matter Most</div>
                  </div>
                </div>

              </div>

              <div className="mt-8 flex flex-wrap justify-start gap-4 relative z-10">
                <a 
                  href="https://www.linkedin.com/in/havishkhichi/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Connect on LinkedIn
                </a>
                <Link 
                  href="/about-me/gallery" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  View My Gallery
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
