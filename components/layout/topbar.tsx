'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { MOCK_CITIES } from '@/lib/mock-data';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <header className="h-14 flex items-center gap-4 px-4 border-b border-slate-200 bg-white shadow-sm z-10">
      <h1 className="text-slate-800 font-bold text-sm hidden md:block">{title}</h1>

      {/* Search */}
      <div className="relative ml-auto w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results.length > 0) {
              const c = results[0];
              const shortName = c.name || c.display_name.split(',')[0];
              setQuery(shortName);
              setOpen(false);
              router.push(`/dashboard?cityId=${c.place_id}&name=${encodeURIComponent(shortName)}&lat=${c.lat}&lng=${c.lon}`);
            }
          }}
          placeholder="Search any city…"
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-inner"
        />
        {open && results.length > 0 && (
          <ul className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
            {results.map((c) => (
              <li
                key={c.place_id}
                className="px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer truncate"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur
                  const shortName = c.name || c.display_name.split(',')[0];
                  setQuery(shortName);
                  setOpen(false);
                  router.push(`/dashboard?cityId=${c.place_id}&name=${encodeURIComponent(shortName)}&lat=${c.lat}&lng=${c.lon}`);
                }}
                title={c.display_name}
              >
                {c.name || c.display_name.split(',')[0]} <span className="text-slate-500 text-[10px] ml-1">{c.display_name.split(',').slice(1).join(',')}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="relative text-slate-400 hover:text-green-600 transition-colors">
        <Bell className="w-4 h-4" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-400 border border-white" />
      </button>
    </header>
  );
}
