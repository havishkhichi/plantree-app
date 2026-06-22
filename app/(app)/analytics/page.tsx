'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TrendChart } from '@/components/analytics/trend-chart';
import { getTrendForCity, getLiveHotspots, MOCK_CITIES } from '@/lib/mock-data';
import { gdiCategory, gdiColor, Hotspot } from '@/lib/types';
import { GDIBadge } from '@/components/ui/badge';

function AnalyticsContent() {
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

  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  
  useEffect(() => {
    getLiveHotspots().then(setHotspots);
  }, [city]);
  const trendData = useMemo(() => getTrendForCity(city), [city]);
  const topZones = hotspots.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">Historical trends and city comparisons</p>
      </div>

      {/* 12-month trend */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-800 mb-4">12-Month Climate Trend — {city.name}</p>
        <TrendChart data={trendData} />
      </div>

      {/* Top zones table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-800 mb-4">Top Priority Zones — {city.name}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-3 font-semibold">Rank</th>
                <th className="py-3 font-semibold">Zone</th>
                <th className="py-3 font-semibold">GDI</th>
                <th className="py-3 font-semibold">Heat</th>
                <th className="py-3 font-semibold">NDVI</th>
                <th className="py-3 font-semibold">Pop</th>
                <th className="py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {topZones.map((h) => (
                <tr key={h.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-3 text-slate-500 font-medium">#{h.rank}</td>
                  <td className="py-3 text-slate-800 font-bold">Zone {h.id.split('-').pop()}</td>
                  <td className="py-3 font-bold" style={{ color: gdiColor(h.gdi_score) }}>
                    {h.gdi_score}
                  </td>
                  <td className="py-3 text-slate-600">{h.heat_score}</td>
                  <td className="py-3 text-slate-600">{(h.ndvi_score * 100).toFixed(0)}</td>
                  <td className="py-3 text-slate-600">{h.population_score}</td>
                  <td className="py-3">
                    <GDIBadge category={gdiCategory(h.gdi_score)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading analytics...</div>}>
      <AnalyticsContent />
    </Suspense>
  );
}
