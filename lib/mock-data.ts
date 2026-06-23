import { City, Hotspot, TrendDataPoint } from './types';
import { computeGDI } from './gdi';
import { NasaClimateData, fetchCityClimateBaseline } from './nasa-api';

export const MOCK_CITIES: City[] = [
  { id: '1', name: 'Indore',    country: 'India',  boundary: null, lat: 22.7196, lng: 75.8577 },
  { id: '2', name: 'Delhi',     country: 'India',  boundary: null, lat: 28.613, lng: 77.209 },
  { id: '3', name: 'Bangalore', country: 'India',  boundary: null, lat: 12.971, lng: 77.594 },
  { id: '4', name: 'Chennai',   country: 'India',  boundary: null, lat: 13.082, lng: 80.270 },
  { id: '5', name: 'Mumbai',    country: 'India',  boundary: null, lat: 19.076, lng: 72.877 },
];

export async function getLiveHotspots(count: number = 12, city: City = MOCK_CITIES[0]): Promise<Hotspot[]> {
  const nasaData = await fetchCityClimateBaseline(city.lat, city.lng);
  return generateMockHotspots(city, count, nasaData);
}

export function generateMockHotspots(city: City, count: number = 12, nasaData?: NasaClimateData | null): Hotspot[] {
  // Deterministic pseudo-random generator based on city coordinates and index
  const prng = (seed: number) => {
    const x = Math.sin(city.lat * 12.9898 + city.lng * 78.233 + seed * 137.5) * 43758.5453123;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }, (_, i) => {
    const lngOffset = (prng(i * 1.1) - 0.5) * 0.2;
    const latOffset = (prng(i * 1.2) - 0.5) * 0.2;
    
    const baseLng = city.lng + lngOffset;
    const baseLat = city.lat + latOffset;
    const size = 0.01;

    const heatScore = Math.round(50 + prng(i * 1.4) * 45);
    const ndviScore = parseFloat((0.1 + prng(i * 1.5) * 0.4).toFixed(2));
    const popScore = Math.round(40 + prng(i * 1.6) * 50);
    const aqiScore = Math.round(30 + prng(i * 1.9) * 60);

    let currentTemp = 0;
    let lastYearTemp = 0;
    let rainfallScore = 0;

    if (nasaData) {
      currentTemp = parseFloat((nasaData.currentTemp + prng(i * 3.1) * 3 - 1).toFixed(1));
      lastYearTemp = parseFloat((nasaData.lastYearTemp + prng(i * 3.2) * 3 - 1).toFixed(1));
      const baseRainfallDeficit = Math.max(0, 100 - (nasaData.rainfall * 10));
      rainfallScore = Math.round(Math.min(100, baseRainfallDeficit + prng(i * 2.0) * 20));
    } else {
      rainfallScore = Math.round(20 + prng(i * 2.0) * 70);
      currentTemp = parseFloat((32 + prng(i * 3.1) * 10).toFixed(1));
      lastYearTemp = parseFloat((currentTemp - prng(i * 3.2) * 2.5 - 0.5).toFixed(1));
    }

    const { score, treesNeeded, coolingEffect, co2Absorption, oxygenProduced } = computeGDI({
      heat: heatScore,
      ndvi: ndviScore,
      rainfall: rainfallScore,
      currentTemp,
      lastYearTemp
    });

    return {
      id: `${city.id}-${i + 1}`,
      city_id: city.id,
      geometry: {
        type: 'Polygon',
        coordinates: [[[baseLng, baseLat],
                       [baseLng + size, baseLat],
                       [baseLng + size, baseLat + size],
                       [baseLng, baseLat + size],
                       [baseLng, baseLat]]],
      },
      gdi_score:         score,
      heat_score:        heatScore,
      ndvi_score:        ndviScore,
      population_score:  popScore,
      aqi_score:         aqiScore,
      rainfall_score:    rainfallScore,
      suitability_score: Math.round(30 + prng(i * 1.7) * 60),
      confidence_score:  Math.round(70 + prng(i * 1.8) * 25),
      trees_needed:      treesNeeded,
      cooling_effect:    coolingEffect,
      co2_absorption:    co2Absorption,
      oxygen_produced:   oxygenProduced,
      current_temp:      currentTemp,
      last_year_temp:    lastYearTemp,
      rank:              i + 1,
      created_at:        new Date('2026-01-01').toISOString(), // static date for hydration
    } as Hotspot;
  }).sort((a, b) => b.gdi_score - a.gdi_score);
}

export const MOCK_HOTSPOTS: Hotspot[] = generateMockHotspots(MOCK_CITIES[0], 12);

export function getTrendForCity(city: City): TrendDataPoint[] {
  const prng = (seed: number) => {
    const x = Math.sin(city.lat * 12.9898 + city.lng * 78.233 + seed * 137.5) * 43758.5453123;
    return x - Math.floor(x);
  };
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, i) => {
    // simulated summer peak curve (around June/July)
    const summerPeak = Math.max(0, 1 - Math.pow((i - 5.5) / 3, 2));
    
    // city specific base temp using PRNG
    const baseTemp = 50 + prng(city.lat) * 20; 

    return {
      month,
      heat: Math.round(baseTemp + prng(i * 2.1) * 10 + summerPeak * 20),
      ndvi: Math.round(55 - summerPeak * 15 + prng(i * 2.2) * 10),
      gdi: Math.round(45 + summerPeak * 25 + prng(i * 2.3) * 15),
    };
  });
}

// Fallback exports
export const MOCK_TREND: TrendDataPoint[] = getTrendForCity(MOCK_CITIES[0]);
