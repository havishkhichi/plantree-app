"use client";

import React from "react";
import HeatIslandGame from "@/components/HeatIslandGame";
import { Navbar } from "@/components/landing/navbar";
import Link from "next/link";
import { ArrowLeft, Leaf, ThermometerSun } from "lucide-react";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-100 selection:text-green-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-green-200/40 blur-3xl mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-slate-500 hover:text-green-600 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-4 border border-orange-200 uppercase tracking-widest">
              <ThermometerSun className="w-4 h-4" /> Code Red: Urban Heat
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Defeat the <span className="text-orange-500">Urban Oven</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our cities are heating up due to the Green Deficit. Step up as a Planet Hero, break through the concrete, and plant trees to bring the Green Deficit Index (GDI) back to safe levels!
            </p>
          </div>

          <HeatIslandGame />

          <div className="mt-16 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Did You Know?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The real-world <strong>Green Deficit Index (GDI)</strong> uses satellite data to measure Heat Intensity, Population Exposure, and Vegetation Deficit. Just like in the game, adding green infrastructure in the right spots can significantly lower temperatures and save lives!
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
