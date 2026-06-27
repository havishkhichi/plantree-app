'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Leaf } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navLinks: { name: string; href: string; hasDropdown?: boolean }[] = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about-me' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-1">
          <div className="flex items-center gap-3">
            <Link href="/" className="relative w-20 h-20 mix-blend-multiply -ml-2 block hover:opacity-80 transition-opacity">
              <Image 
                src="/images/plantree_logo_v2.png" 
                alt="Greenfinity Logo" 
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
          
          <div className="flex space-x-4 md:space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname !== '/' && link.href !== '/' && pathname?.startsWith(link.href));
              
              if (link.name === 'Home') {
                if (pathname === '/') return null;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-green-700 text-white hover:bg-green-800 shadow-sm' 
                        : 'text-slate-600 hover:text-green-600 bg-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              }

              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-medium flex items-center transition-colors ${
                    isActive ? 'text-green-600 font-semibold' : 'text-slate-600 hover:text-green-600'
                  }`}
                >
                  {link.name} {link.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>
              );
            })}
          </div>

          <div className="w-24 hidden md:block"></div>
        </div>
      </div>
    </nav>
  );
}
