'use client';

import { Navbar } from '@/components/landing/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Play, Camera, Folder, Image as ImageIcon, Zap, Mountain, Search, Code } from 'lucide-react';
import { useState } from 'react';

const ALBUMS = [
  {
    id: 'solana',
    title: 'Solana',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=025',
    photos: [
      '/images/kids_footer_transparent_1780782205565.png',
      '/images/impact_mascot_transparent_1780782193050.png',
    ],
    videos: [
      'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder link
    ]
  },
  {
    id: 'avalanche',
    title: 'Avalanche',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png?v=025',
    photos: [
      '/images/avalanche_speedrun_1.jpg',
      '/images/avalanche_speedrun_2.jpg',
    ],
    videos: []
  },
  {
    id: 'google',
    title: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    photos: [
      '/images/kids_footer_transparent_1780782205565.png',
      '/images/hero_transparent_1780782692839.png',
    ],
    videos: []
  },
  {
    id: 'open-hackathon',
    title: 'Open Hackathon',
    logo: '/images/plantree_logo_v2.png',
    photos: [
      '/images/impact_mascot_transparent_1780782193050.png',
    ],
    videos: [
      'https://www.youtube.com/embed/7HY0gATBZnA',
      'https://www.youtube.com/embed/u-MJp6kq0fE',
    ]
  }
];

export default function GalleryPage() {
  const [activeAlbumId, setActiveAlbumId] = useState(ALBUMS[0].id);

  const activeAlbum = ALBUMS.find(a => a.id === activeAlbumId) || ALBUMS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-green-100 selection:text-green-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center pt-6 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dynamic Colorful Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 z-0"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-emerald-300/20 blur-[100px] mix-blend-multiply pointer-events-none animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[100px] mix-blend-multiply pointer-events-none animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        
        <div className="max-w-6xl w-full relative z-10">
          
          <Link href="/about-me" className="inline-flex items-center gap-2 text-slate-600 hover:text-green-700 font-medium mb-8 transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/60 shadow-sm w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to About Me
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">My Albums</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A collection of my favorite moments, projects, and videos across different events.
            </p>
          </div>

          {/* Album Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {ALBUMS.map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbumId(album.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm border ${
                  activeAlbumId === album.id 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/30 -translate-y-1' 
                    : 'bg-white/70 text-slate-600 border-white/60 hover:bg-white hover:text-emerald-600 backdrop-blur-sm'
                }`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
                  <img src={album.logo} alt={album.title} className="w-4 h-4 object-contain" />
                </div>
                {album.title}
              </button>
            ))}
          </div>

          {/* Active Album Content */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Videos Section */}
            {activeAlbum.videos.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-200/60 pb-4">
                  <div className="bg-red-100 p-2 rounded-lg text-red-600">
                    <Play className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Videos - {activeAlbum.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeAlbum.videos.map((url, i) => (
                    <div key={i} className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-white/40 bg-white/40 backdrop-blur-md p-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={url} 
                          title={`YouTube video ${activeAlbum.title} ${i + 1}`} 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos Section */}
            {activeAlbum.photos.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8 border-b border-slate-200/60 pb-4">
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Photos - {activeAlbum.title}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeAlbum.photos.map((src, i) => (
                    <div key={i} className="group aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/40 bg-white/60 backdrop-blur-sm relative hover:shadow-2xl transition-all duration-300 cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                        <ImageIcon className="text-white w-8 h-8 mb-2" />
                      </div>
                      <Image 
                        src={src}
                        alt={`${activeAlbum.title} Photo ${i + 1}`}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-700 p-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State Fallback */}
            {activeAlbum.photos.length === 0 && activeAlbum.videos.length === 0 && (
              <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm">
                <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-700 mb-2">This album is empty</h3>
                <p className="text-slate-500">More content coming soon!</p>
              </div>
            )}

          </div>
          
        </div>
      </main>
    </div>
  );
}
