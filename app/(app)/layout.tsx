import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden pb-16 md:pb-0">
        <Topbar title="Plantree" />
        <main className="flex-1 overflow-auto p-4 bg-gradient-to-br from-green-100 via-emerald-200 to-green-300">
          {children}
        </main>
      </div>
    </div>
  );
}
