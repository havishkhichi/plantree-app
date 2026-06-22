'use client';

import { useState, useEffect } from 'react';
import { getLiveHotspots } from '@/lib/mock-data';
import { Hotspot, gdiCategory, gdiColor } from '@/lib/types';
import { GDIBadge } from '@/components/ui/badge';
import { ScoreRing } from '@/components/ui/score-ring';
import { Search } from 'lucide-react';

export default function HotspotsPage() {
  const [query, setQuery] = useState('');
  const [zoneCount, setZoneCount] = useState(12);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getLiveHotspots(zoneCount).then((data) => {
      setHotspots(data);
      setIsLoading(false);
    });
  }, [zoneCount]);

  const filtered = hotspots.filter(
    (h) =>
      query === '' ||
      String(h.gdi_score).includes(query) ||
      `Zone ${h.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Hotspot Registry</h2>
          <p className="text-xs text-slate-400 mt-0.5">{hotspots.length} zones ranked by Green Deficit Index</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <label htmlFor="zoneCount" className="text-xs text-slate-400 font-medium">Zones:</label>
            <input 
              id="zoneCount"
              type="number" 
              min="3" 
              max="15" 
              value={zoneCount}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) setZoneCount(Math.min(15, Math.max(3, val)));
              }}
              className="w-12 bg-slate-900 text-white text-xs text-center border-none focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded py-1"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter zones…"
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-48"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-400 animate-pulse font-medium">Fetching live NASA data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((h) => {
          const cat = gdiCategory(h.gdi_score);
          return (
            <div
              key={h.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:border-slate-600 transition-colors"
            >
              <ScoreRing score={h.gdi_score} size={56} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">Zone {h.id}</span>
                  <GDIBadge category={cat} />
                  <span className="ml-auto text-xs text-slate-500">#{h.rank}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { label: 'Heat',       value: h.heat_score,                      color: '#ef4444' },
                    { label: 'NDVI',       value: (h.ndvi_score * 100).toFixed(0),   color: '#22c55e' },
                    { label: 'Pop',        value: h.population_score,                color: '#60a5fa' },
                    { label: 'Suit.',      value: h.suitability_score,               color: '#a78bfa' },
                    { label: 'Conf.',      value: h.confidence_score + '%',          color: '#94a3b8' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-[10px]">
                      <span className="text-slate-500">{label} </span>
                      <span className="font-semibold" style={{ color }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
