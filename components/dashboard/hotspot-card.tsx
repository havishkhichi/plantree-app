import { Hotspot, gdiCategory } from '@/lib/types';
import Image from 'next/image';
import { GDIBadge } from '@/components/ui/badge';
import { ScoreRing } from '@/components/ui/score-ring';
import { cn } from '@/lib/utils';
import { TreePine, Wind, ThermometerSun, Info } from 'lucide-react';
import { KidExplanationModal } from './kid-explanation-modal';
import { useState } from 'react';

interface HotspotCardProps {
  hotspot: Hotspot;
  selected?: boolean;
  onClick?: () => void;
}

export function HotspotCard({ hotspot, selected, onClick }: HotspotCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cat = gdiCategory(hotspot.gdi_score);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all cursor-pointer',
        selected
          ? 'bg-green-50 border-green-400 shadow-green-500/10 shadow-md'
          : 'bg-white border-slate-200 hover:border-green-300 hover:shadow-sm',
      )}
    >
      {/* Rank */}
      <span className="text-xs font-bold text-slate-400 w-5 text-right shrink-0">
        #{hotspot.rank}
      </span>

      {/* Score ring */}
      <ScoreRing score={hotspot.gdi_score} size={48} strokeWidth={5} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 truncate">
            Zone {hotspot.id.split('-').pop()}
          </span>
          <GDIBadge category={cat} />
          {cat === 'critical' && (
            <Image 
              src="/images/critical_alert_icon_1780783900577.png" 
              alt="Critical" 
              width={20} 
              height={20} 
              className="animate-bounce drop-shadow-md"
            />
          )}
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          <Stat label="Heat"  value={hotspot.heat_score} />
          <Stat label="Veg"   value={parseFloat((hotspot.ndvi_score * 100).toFixed(0))} />
          <Stat label="AQI"   value={hotspot.aqi_score} />
          <Stat label="Rain"  value={hotspot.rainfall_score} />
        </div>

        {selected && (
          <div className="mt-3 pt-3 border-t border-green-100 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center bg-green-100/50 p-2 rounded text-xs">
              <span className="flex items-center gap-1 font-medium text-green-800"><TreePine className="w-3.5 h-3.5"/> Plant Trees</span>
              <span className="font-bold text-green-700">{hotspot.trees_needed}</span>
            </div>
            <div className="flex justify-between items-center bg-blue-50 p-2 rounded text-xs">
              <span className="flex items-center gap-1 font-medium text-blue-800"><ThermometerSun className="w-3.5 h-3.5"/> Est. Cooling</span>
              <span className="font-bold text-blue-700">-{hotspot.cooling_effect}°C</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded text-xs">
              <span className="flex items-center gap-1 font-medium text-slate-700"><Wind className="w-3.5 h-3.5"/> CO₂ Absorption</span>
              <span className="font-bold text-slate-700">{hotspot.co2_absorption} t/yr</span>
            </div>
            <div className="flex justify-between items-center bg-emerald-50 p-2 rounded text-xs">
              <span className="flex items-center gap-1 font-medium text-emerald-700"><Wind className="w-3.5 h-3.5"/> Fresh Oxygen</span>
              <span className="font-bold text-emerald-700">{hotspot.oxygen_produced} t/yr</span>
            </div>
            <div className="flex justify-between items-center bg-red-50 p-2 rounded text-xs mt-2">
              <span className="flex items-center gap-1 font-medium text-red-700"><ThermometerSun className="w-3.5 h-3.5"/> Temp Rise vs Last Year</span>
              <span className="font-bold text-red-700">+{(hotspot.current_temp - hotspot.last_year_temp).toFixed(1)}°C</span>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              className="mt-2 w-full py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Info className="w-4 h-4" /> Explain this to me! 🪄
            </button>
          </div>
        )}
      </div>

      <KidExplanationModal 
        hotspot={hotspot} 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span className="text-[10px] text-slate-500 font-medium">
      {label} <span className="text-slate-800 font-bold">{value}</span>
    </span>
  );
}
