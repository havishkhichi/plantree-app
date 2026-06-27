'use client';

import { useEffect, useRef, useState } from 'react';
import { Hotspot, LayerState, gdiColor } from '@/lib/types';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const getGibsDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d.toISOString().split('T')[0];
};

interface ClimateMapProps {
  hotspots: Hotspot[];
  layers: LayerState;
  selectedId?: string;
  center: [number, number]; // [lng, lat]
  zoom?: number;
  onAreaDrawn?: (geometry: any) => void;
  onHotspotSelect?: (id: string) => void;
}

export function ClimateMap({ hotspots, layers, selectedId, center, zoom = 11, onAreaDrawn, onHotspotSelect }: ClimateMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const onHotspotSelectRef = useRef(onHotspotSelect);
  const [basemap, setBasemap] = useState<'street' | 'satellite' | 'terrain'>('street');


  useEffect(() => {
    onHotspotSelectRef.current = onHotspotSelect;
  }, [onHotspotSelect]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: any = null;
    import('maplibre-gl').then((ml) => {
      map = new ml.default.Map({
        container: containerRef.current!,
        style: {
          version: 8,
          glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors',
            },
          },
          layers: [{ id: 'osm-tiles', type: 'raster', source: 'osm' }],
        },
        center,
        zoom,
      });

      mapRef.current = map;

      import('@mapbox/mapbox-gl-draw').then((MapboxDrawModule) => {
        const MapboxDraw = MapboxDrawModule.default;

        const theme = (MapboxDraw as any).lib.theme.map((layer: any) => {
          if (layer.id === 'gl-draw-lines') {
            return {
              ...layer,
              paint: {
                ...layer.paint,
                'line-dasharray': [
                  'case',
                  ['==', ['get', 'active'], 'true'],
                  ['literal', [0.2, 2]],
                  ['literal', [2, 0]],
                ],
              }
            };
          }
          return layer;
        });

        const draw = new MapboxDraw({
          displayControlsDefault: false,
          styles: theme,
          controls: {
            polygon: true,
            trash: true
          }
        });

        map!.addControl(draw, 'top-left');

        map!.on('draw.create', (e: any) => {
          if (onAreaDrawn && e.features.length > 0) {
            onAreaDrawn(e.features[0].geometry);
          }
        });

        map!.on('draw.update', (e: any) => {
          if (onAreaDrawn && e.features.length > 0) {
            onAreaDrawn(e.features[0].geometry);
          }
        });
      });

      map.on('load', () => {
        if (!map) return;

        // GDI hotspot polygons
        const features = hotspots.map((h) => ({
          type: 'Feature' as const,
          geometry: h.geometry,
          properties: {
            id: h.id,
            gdi: h.gdi_score,
            color: gdiColor(h.gdi_score),
            selected: h.id === selectedId,
          },
        }));

        map.addSource('hotspots', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features },
        });

        // Add GDI Fill Layer first
        map.addLayer({
          id: 'gdi-fill',
          type: 'fill',
          source: 'hotspots',
          paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': ['case', ['==', ['get', 'selected'], true], 0.8, 0.45],
          },
        });

        // Add basemaps behind the polygons
        const gibsDate = getGibsDate();

        map.addSource('satellite', {
          type: 'raster',
          tiles: [`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${gibsDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`],
          tileSize: 256,
        });
        map.addLayer({ id: 'satellite-tiles', type: 'raster', source: 'satellite', layout: { visibility: 'none' } }, 'gdi-fill');

        map.addSource('terrain', {
          type: 'raster',
          tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
        });
        map.addLayer({ id: 'terrain-tiles', type: 'raster', source: 'terrain', layout: { visibility: 'none' } }, 'gdi-fill');



        map.addLayer({
          id: 'gdi-outline',
          type: 'line',
          source: 'hotspots',
          paint: {
            'line-color': ['case', ['==', ['get', 'selected'], true], '#ffffff', ['get', 'color']],
            'line-width': ['case', ['==', ['get', 'selected'], true], 3, 1.5],
          },
        });

        map.on('click', 'gdi-fill', (e: any) => {
          if (e.features.length > 0 && onHotspotSelectRef.current) {
            onHotspotSelectRef.current(e.features[0].properties.id);
          }
        });

        map.on('mouseenter', 'gdi-fill', () => {
          if (map) map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'gdi-fill', () => {
          if (map) map.getCanvas().style.cursor = '';
        });
      });
    });

    return () => {
      if (map) map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map source when hotspots or selectedId changes
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current as any;

    if (map.getSource('hotspots')) {
      const features = hotspots.map((h) => ({
        type: 'Feature' as const,
        geometry: h.geometry,
        properties: {
          id: h.id,
          gdi: h.gdi_score,
          color: gdiColor(h.gdi_score),
          selected: h.id === selectedId,
        },
      }));
      map.getSource('hotspots').setData({ type: 'FeatureCollection', features });
    }
  }, [hotspots, selectedId]);



  // Fly to selected hotspot
  useEffect(() => {
    if (!mapRef.current || !selectedId) return;

    const hotspot = hotspots.find(h => h.id === selectedId);
    if (hotspot && hotspot.geometry.type === 'Polygon') {
      const coord = hotspot.geometry.coordinates[0]?.[0];
      if (coord && coord.length === 2) {
        (mapRef.current as any).flyTo({
          center: coord,
          zoom: 14,
          speed: 1.5,
          essential: true
        });
      }
    }
  }, [selectedId, hotspots]);

  // Fly to center when city changes
  useEffect(() => {
    if (!mapRef.current || !center) return;
    (mapRef.current as any).flyTo({
      center: [center[0], center[1]],
      zoom: 11,
      speed: 1.5,
      essential: true
    });
  }, [center[0], center[1]]);

  // Toggle basemaps
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current as any;
    if (map.getLayer && map.getLayer('satellite-tiles')) {
      map.setLayoutProperty('satellite-tiles', 'visibility', basemap === 'satellite' ? 'visible' : 'none');
      map.setLayoutProperty('terrain-tiles', 'visibility', basemap === 'terrain' ? 'visible' : 'none');
    }
  }, [basemap]);



  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Map Controls */}
      <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col text-xs font-medium">
          <button
            onClick={() => setBasemap('street')}
            className={`px-3 py-2 text-left transition-colors ${basemap === 'street' ? 'bg-green-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            Map
          </button>
          <button
            onClick={() => setBasemap('satellite')}
            className={`px-3 py-2 text-left border-t border-slate-100 transition-colors ${basemap === 'satellite' ? 'bg-green-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            Satellite
          </button>
          <button
            onClick={() => setBasemap('terrain')}
            className={`px-3 py-2 text-left border-t border-slate-100 transition-colors ${basemap === 'terrain' ? 'bg-green-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            Terrain
          </button>
        </div>


      </div>
    </div>
  );
}
