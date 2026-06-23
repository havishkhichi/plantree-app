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
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard',   icon: Map,      label: 'Map'       },
  { href: '/',            icon: Home,     label: 'Home'      },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 w-full md:relative md:w-56 h-16 md:h-auto md:min-h-screen bg-white border-t md:border-t-0 md:border-r border-slate-200 py-1 md:py-4 gap-1 shrink-0 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-sm flex flex-row md:flex-col justify-around md:justify-start items-center md:items-stretch">
      {/* Logo */}
      <Link href="/" className="hidden md:flex items-center justify-center pb-6 hover:opacity-80 transition-opacity mt-2">
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

      {NAV.map(({ href, icon: Icon, label, disabled }) => {
        const active = path.startsWith(href);
        return (
          <Link
            key={href}
            href={disabled ? '#' : href}
            className={cn(
              'flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 mx-1 md:mx-2 rounded-lg text-[10px] md:text-sm font-medium transition-colors w-full md:w-auto',
              active
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-500 hover:text-green-600 hover:bg-slate-50',
              disabled && 'opacity-50 pointer-events-none cursor-not-allowed'
            )}
            onClick={(e) => disabled && e.preventDefault()}
          >
            <Icon className="w-5 h-5 md:w-4 md:h-4 shrink-0" />
            <span className="block md:block leading-tight text-center">{label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
