export default function LayersPage() {
  const layers = [
    { name: 'Land Surface Temperature (LST)',  source: 'Landsat 8/9',   status: 'active',  updated: '2026-06-01' },
    { name: 'NDVI — Vegetation Health',        source: 'Sentinel-2',    status: 'active',  updated: '2026-06-02' },
    { name: 'Green Deficit Index (GDI)',        source: 'Computed',      status: 'active',  updated: '2026-06-02' },
    { name: 'Population Density',              source: 'WorldPop',      status: 'active',  updated: '2026-05-15' },
    { name: 'Land Cover',                      source: 'Dynamic World', status: 'pending', updated: '—'          },
    { name: 'Protected Areas',                 source: 'WDPA',          status: 'pending', updated: '—'          },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-white">Data Layers</h2>
        <p className="text-xs text-slate-400 mt-0.5">All satellite and computed layers</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-slate-500 border-b border-slate-800 bg-slate-800/50">
              <th className="text-left px-4 py-3 font-medium">Layer</th>
              <th className="text-left px-4 py-3 font-medium">Source</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {layers.map((l) => (
              <tr key={l.name} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="px-4 py-3 text-white font-medium">{l.name}</td>
                <td className="px-4 py-3 text-slate-400">{l.source}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                    l.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${l.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400">{l.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
