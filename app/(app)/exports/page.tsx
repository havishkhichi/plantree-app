import { ExportPanel } from '@/components/exports/export-panel';

export default function ExportsPage() {
  return (
    <div className="max-w-lg flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-white">Export</h2>
        <p className="text-xs text-slate-400 mt-0.5">Download hotspot data in your preferred format</p>
      </div>
      <ExportPanel />
    </div>
  );
}
