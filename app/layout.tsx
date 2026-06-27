import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Greenfinity — Plan a Tree. Plant a Future.',
  description: 'Use satellite data and AI to find the best places to plant trees and cool our cities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-green-100 selection:text-green-900">
        {children}
      </body>
    </html>
  );
}
