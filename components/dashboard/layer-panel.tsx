'use client';

import { Thermometer, Leaf, BarChart2, Users, Wind, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LayerState, LayerType } from '@/lib/types';

interface LayerPanelProps {
  layers: LayerState;
  onToggle: (layer: LayerType) => void;
}

const LAYERS: { id: LayerType; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'heat',       label: 'Heat Map',      icon: Thermometer, color: 'text-red-400'     },
  { id: 'ndvi',       label: 'Vegetation',    icon: Leaf,        color: 'text-green-400'   },
  { id: 'aqi',        label: 'Air Quality',   icon: Wind,        color: 'text-yellow-400'  },
  { id: 'rainfall',   label: 'Rain Deficit',  icon: Droplets,    color: 'text-blue-400'    },
  { id: 'gdi',        label: 'GDI Zones',     icon: BarChart2,   color: 'text-amber-400'   },
  { id: 'population', label: 'Population',    icon: Users,       color: 'text-blue-400'    },
];

export function LayerPanel({ layers, onToggle }: LayerPanelProps) {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur shadow-lg border border-slate-200 rounded-xl p-3 flex flex-col gap-2 min-w-[160px]">
      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Layers</p>
      {LAYERS.map(({ id, label, icon: Icon, color }) => (
        <button
          key={id}
          onClick={() => onToggle(id)}
          className={cn(
            'flex items-center gap-2 text-xs font-medium px-2 py-1.5 rounded-lg transition-colors',
            layers[id] ? 'bg-green-50 text-slate-800' : 'text-slate-500 hover:bg-slate-100',
          )}
        >
          <Icon className={cn('w-3.5 h-3.5', layers[id] ? color : '')} />
          {label}
          <span className={cn(
            'ml-auto w-2 h-2 rounded-full border',
            layers[id] ? 'bg-green-500 border-green-500' : 'border-slate-300',
          )} />
        </button>
      ))}
    </div>
  );
}
