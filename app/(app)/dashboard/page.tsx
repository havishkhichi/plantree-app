'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Thermometer, Zap, BarChart3, Users } from 'lucide-react';
import { ClimateMap } from '@/components/dashboard/climate-map';
import { LayerPanel } from '@/components/dashboard/layer-panel';
import { HotspotCard } from '@/components/dashboard/hotspot-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { getLiveHotspots } from '@/lib/mock-data';
import { LayerState, LayerType } from '@/lib/types';

import { Hotspot } from '@/lib/types';
import { MOCK_CITIES } from '@/lib/mock-data';

function DashboardContent() {
  const zoneCount = 5;
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const searchParams = useSearchParams();
  const cityId = searchParams.get('cityId');
  const cityName = searchParams.get('name');
  const cityLat = searchParams.get('lat');
  const cityLng = searchParams.get('lng');

  const city = useMemo(() => {
    return (cityName && cityLat && cityLng) 
      ? { id: cityId || 'dynamic', name: cityName, country: 'Selected Location', boundary: null, lat: parseFloat(cityLat), lng: parseFloat(cityLng) }
      : MOCK_CITIES.find((c) => c.id === cityId) || MOCK_CITIES[0];
  }, [cityId, cityName, cityLat, cityLng]);
  
  useEffect(() => {
    getLiveHotspots(zoneCount, city).then(data => {
      setHotspots(data);
      if (data.length > 0) setSelectedId(data[0].id);
    });
  }, [city, zoneCount]);
  
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const [layers, setLayers] = useState<LayerState>({
    heat: true,
    ndvi: true,
    gdi: true,
    population: false,
    aqi: false,
    rainfall: false,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [drawnAreaStats, setDrawnAreaStats] = useState<{ heat: number, gdi: number } | null>(null);

  const handleAreaDrawn = (geometry: any) => {
    setIsAnalyzing(true);
    setDrawnAreaStats(null);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setDrawnAreaStats({
        heat: Math.round(50 + Math.random() * 40),
        gdi: Math.round(40 + Math.random() * 50)
      });
    }, 2000);
  };

  const toggleLayer = (l: LayerType) =>
    setLayers((prev) => ({ ...prev, [l]: !prev[l] }));

  const avgGDI = hotspots.length > 0 ? Math.round(
    hotspots.reduce((s, h) => s + h.gdi_score, 0) / hotspots.length,
  ) : 0;
  const avgHeat = hotspots.length > 0 ? Math.round(
    hotspots.reduce((s, h) => s + h.heat_score, 0) / hotspots.length,
  ) : 0;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Hotspots Identified" value={hotspots.length} icon={Zap}        color="text-amber-400"  trend={4}  />
        <StatCard label="Avg GDI Score"        value={avgGDI}              icon={BarChart3}  color="text-orange-400" trend={2}  />
        <StatCard label="Avg Heat Score"       value={avgHeat}             icon={Thermometer} color="text-red-400"   trend={-1} />
        <StatCard label="City"                 value={city.name}           sub={city.country} icon={Users} color="text-blue-400" />
      </div>

      {/* Map + hotspot list */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0 lg:h-[520px]">
        {/* Map */}
        <div className="relative h-[60vh] min-h-[450px] lg:h-auto flex-1 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm shrink-0 lg:shrink">
          <ClimateMap
            hotspots={hotspots}
            layers={layers}
            selectedId={selectedId}
            center={[city.lng, city.lat]}
            onAreaDrawn={handleAreaDrawn}
          />
          <LayerPanel layers={layers} onToggle={toggleLayer} />

          {/* Analysis Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-bold text-slate-800 shadow-white drop-shadow-md">Analyzing Custom Area...</p>
              <p className="text-sm text-slate-600 font-medium bg-white/80 px-3 py-1 rounded-full mt-2">Calculating heat index and vegetation density</p>
            </div>
          )}

          {/* Analysis Results Card */}
          {!isAnalyzing && drawnAreaStats && (
            <div className="absolute bottom-4 left-4 z-20 bg-white rounded-xl shadow-xl border border-green-200 p-4 w-72 animate-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800">Custom Area Analysis</h3>
                <button onClick={() => setDrawnAreaStats(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center">×</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="text-xs text-red-600 font-semibold mb-1">Avg Heat</p>
                  <p className="text-2xl font-bold text-red-700">{drawnAreaStats.heat}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-600 font-semibold mb-1">Avg GDI</p>
                  <p className="text-2xl font-bold text-amber-700">{drawnAreaStats.gdi}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 font-medium">Results generated from drawn boundaries.</p>
            </div>
          )}
        </div>

        {/* Hotspot sidebar */}
        <div className="w-full lg:w-72 flex flex-col gap-2 overflow-y-auto shrink-0 lg:h-full">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Priority Zones
            </p>
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-slate-200">
              <span className="text-[10px] text-slate-500 font-medium">Limit: 5</span>
            </div>
          </div>
          {hotspots.map((h) => (
            <HotspotCard
              key={h.id}
              hotspot={h}
              selected={h.id === selectedId}
              onClick={() => setSelectedId(h.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
