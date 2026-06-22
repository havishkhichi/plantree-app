'use client';

import { useState } from 'react';
import { Download, FileJson, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type ExportFormat = 'geojson' | 'csv' | 'pdf';

export function ExportPanel() {
  const [format, setFormat] = useState<ExportFormat>('geojson');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    setDone(false);

    if (format === 'geojson') {
      const city_id = '1';
      const hotspots = (await import('@/lib/mock-data')).MOCK_HOTSPOTS.filter((h) => h.city_id === city_id);
      const data = {
        type: 'FeatureCollection',
        features: hotspots.map((h) => ({
          type: 'Feature',
          geometry: h.geometry,
          properties: {
            id: h.id,
            gdi_score: h.gdi_score,
            heat_score: h.heat_score,
            ndvi_score: h.ndvi_score,
            rank: h.rank,
          },
        })),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'ucip-hotspots.geojson';
      a.click();
      URL.revokeObjectURL(url);
    }

    setLoading(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  const formats: { id: ExportFormat; label: string; icon: React.ElementType }[] = [
    { id: 'geojson', label: 'GeoJSON', icon: FileJson },
    { id: 'csv',     label: 'CSV',     icon: FileText },
    { id: 'pdf',     label: 'PDF Report', icon: FileText },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-white">Export Data</h3>

      <div className="flex flex-col gap-2">
        {formats.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setFormat(id)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-colors',
              format === id
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-700 text-slate-400 hover:border-slate-600',
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {loading ? 'Exporting…' : done ? 'Done ✓' : 'Export'}
      </button>
    </div>
  );
}
