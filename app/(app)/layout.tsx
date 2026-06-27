import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 md:pl-0 h-screen md:h-auto overflow-hidden bg-slate-50/50">
        <Topbar title="Greenfinity" />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-4 lg:p-6 pb-20 md:pb-4">
          {children}
        </div>
      </main>
    </div>
  );
}
