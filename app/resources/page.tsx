import { Navbar } from '@/components/landing/navbar';
import { Construction } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-green-100 selection:text-green-900 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-green-50/50 to-white">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner ring-4 ring-green-50">
          <Construction className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Resources</h1>
        <p className="text-lg text-slate-500 max-w-lg mb-8">
          We are currently building this section. Check back soon for exciting updates and features!
        </p>
      </div>
    </div>
  );
}
