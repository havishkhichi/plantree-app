// ─── Core domain types ────────────────────────────────────────────────────────

export interface City {
  id: string;
  name: string;
  country: string;
  boundary: GeoJSON.Polygon | null;
  lat: number;
  lng: number;
}

export interface Hotspot {
  id: string;
  city_id: string;
  geometry: GeoJSON.Polygon;
  gdi_score: number;      // 0–100
  heat_score: number;     // 0–100  (LST-derived)
  ndvi_score: number;     // 0–1    (vegetation health)
  population_score: number;
  aqi_score: number;      // 0-100  (Air Quality Index normalized)
  rainfall_score: number; // 0-100  (NASA rain deficit normalized)
  suitability_score: number;
  confidence_score: number;
  trees_needed: number;   // AI recommendation
  cooling_effect: number; // in Celsius
  co2_absorption: number; // in tons
  oxygen_produced: number; // in tons
  current_temp: number; // in Celsius
  last_year_temp: number; // in Celsius
  rank: number;
  created_at: string;
}

export type GDICategory = 'low' | 'moderate' | 'high' | 'severe' | 'critical';

export function gdiCategory(score: number): GDICategory {
  if (score <= 20) return 'low';
  if (score <= 40) return 'moderate';
  if (score <= 60) return 'high';
  if (score <= 80) return 'severe';
  return 'critical';
}

export function gdiColor(score: number): string {
  if (score <= 20) return '#22c55e';   // green
  if (score <= 40) return '#84cc16';   // lime
  if (score <= 60) return '#f59e0b';   // amber
  if (score <= 80) return '#f97316';   // orange
  return '#ef4444';                    // red
}

export type LayerType = 'heat' | 'ndvi' | 'gdi' | 'population' | 'aqi' | 'rainfall';

export interface LayerState {
  heat: boolean;
  ndvi: boolean;
  gdi: boolean;
  population: boolean;
  aqi: boolean;
  rainfall: boolean;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  value: number;
}

export interface TrendDataPoint {
  month: string;
  heat: number;
  ndvi: number;
  gdi: number;
}
