export default function SettingsPage() {
  return (
    <div className="max-w-lg flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-white">Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">Configure your UCIP instance</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-white">GDI Weights</h3>
        {[
          { label: 'Heat Intensity',    weight: 40 },
          { label: 'Population Exposure', weight: 25 },
          { label: 'Vegetation Deficit', weight: 20 },
          { label: 'Land Suitability',  weight: 10 },
          { label: 'Exclusion Zones',   weight: 5  },
        ].map(({ label, weight }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs text-slate-400 w-44 shrink-0">{label}</span>
            <div className="flex-1 bg-slate-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${weight}%` }} />
            </div>
            <span className="text-xs font-bold text-white w-8 text-right">{weight}%</span>
          </div>
        ))}
        <p className="text-[10px] text-slate-500 mt-1">
          Weight customisation coming in Phase 4.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-white">Supabase Connection</h3>
        <div className="flex flex-col gap-2">
          {['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'].map((key) => (
            <div key={key} className="flex items-center gap-3 bg-slate-800 rounded-lg px-3 py-2">
              <span className="text-[10px] font-mono text-slate-400 flex-1">{key}</span>
              <span className="text-[10px] text-slate-600">set via .env.local</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
