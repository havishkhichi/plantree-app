'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Map,
  BarChart3,
  Layers,
  Download,
  Settings,
  Zap,
  TreePine,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard',   icon: Map,      label: 'Map'       },
  { href: '/analytics',   icon: BarChart3, label: 'Analytics' },
  { href: '/hotspots',    icon: Zap,       label: 'Hotspots'  },
  { href: '/layers',      icon: Layers,    label: 'Layers'    },
  { href: '/exports',     icon: Download,  label: 'Export'    },
  { href: '/settings',    icon: Settings,  label: 'Settings'  },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="flex flex-col w-16 md:w-56 min-h-screen bg-white border-r border-slate-200 py-4 gap-1 shrink-0 z-10 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center pb-6 hover:opacity-80 transition-opacity mt-2">
        <div className="relative w-20 h-20 mix-blend-multiply overflow-hidden">
          <Image 
            src="/images/plantree_logo_v2.png" 
            alt="Plantree Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {NAV.map(({ href, icon: Icon, label }) => {
        const active = path.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 mx-2 rounded-lg text-sm font-medium transition-colors',
              active
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-500 hover:text-green-600 hover:bg-slate-50',
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="hidden md:block">{label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
