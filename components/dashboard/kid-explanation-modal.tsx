'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Hotspot } from '@/lib/types';
import { X, Sparkles, TreePine, ThermometerSun, Wind } from 'lucide-react';
import Image from 'next/image';

interface KidExplanationModalProps {
  hotspot: Hotspot;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KidExplanationModal({ hotspot, isOpen, onOpenChange }: KidExplanationModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[90vw] max-w-lg max-h-[90vh] translate-x-[-50%] translate-y-[-50%] rounded-[2.5rem] bg-gradient-to-b from-white to-green-50 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-300 overflow-y-auto border-4 border-green-300/50 ring-8 ring-white/50">
          
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
            <X className="h-5 w-5" />
          </Dialog.Close>

          <div className="flex flex-col items-center text-center mt-2">
            <div className="w-24 h-24 relative mb-4">
               <Image 
                  src="/images/impact_mascot_transparent_1780782193050.png" 
                  alt="Plant Mascot" 
                  fill
                  className="object-contain drop-shadow-md animate-bounce"
                  style={{ animationDuration: '3s' }}
               />
            </div>
            
            <Dialog.Title className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-yellow-400 w-6 h-6" /> 
              Zone {hotspot.id.split('-').pop()} Superhero Mission! 
              <Sparkles className="text-yellow-400 w-6 h-6" />
            </Dialog.Title>
            
            <Dialog.Description className="text-slate-600 mt-2 font-medium">
              Here is what the satellites discovered about this neighborhood and how YOU can save the day!
            </Dialog.Description>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">The Clues We Found 🔍</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm">
                  <span>☀️ Heat:</span> <strong className="text-red-500">{hotspot.heat_score}/100</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm">
                  <span>🌡️ Warming:</span> <strong className="text-red-600">+{parseFloat((hotspot.current_temp - hotspot.last_year_temp).toFixed(1))}°C</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm">
                  <span>🌱 Greenery:</span> <strong className="text-green-500">{parseFloat((hotspot.ndvi_score * 100).toFixed(0))}/100</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm">
                  <span>💨 Air Quality:</span> <strong className="text-yellow-600">{hotspot.aqi_score}/100</strong>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-4 border border-green-200 shadow-inner">
              <h4 className="font-bold text-green-800 mb-3 text-sm uppercase tracking-wider">Your Superpowers ⚡</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><TreePine className="w-5 h-5"/></div>
                  <div className="text-left">
                    <div className="text-xs text-slate-500 font-bold">MISSION GOAL</div>
                    <div className="text-sm font-bold text-slate-800">Plant <span className="text-green-600 text-lg">{hotspot.trees_needed}</span> Trees</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600"><ThermometerSun className="w-5 h-5"/></div>
                  <div className="text-left">
                    <div className="text-xs text-slate-500 font-bold">SUPER COOLING</div>
                    <div className="text-sm font-bold text-slate-800">Cool down area by <span className="text-blue-600 text-lg">{hotspot.cooling_effect}°C</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="bg-slate-100 p-2 rounded-full text-slate-600"><Wind className="w-5 h-5"/></div>
                  <div className="text-left">
                    <div className="text-xs text-slate-500 font-bold">CLEAN AIR MAGIC</div>
                    <div className="text-sm font-bold text-slate-800">Absorb <span className="text-slate-600 text-lg">{hotspot.co2_absorption}</span> tons of CO₂</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="bg-emerald-100 p-2 rounded-full text-emerald-600"><Wind className="w-5 h-5"/></div>
                  <div className="text-left">
                    <div className="text-xs text-emerald-600 font-bold">FRESH BREEZE</div>
                    <div className="text-sm font-bold text-slate-800">Provide <span className="text-emerald-600 text-lg">{hotspot.oxygen_produced}</span> tons of Oxygen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
