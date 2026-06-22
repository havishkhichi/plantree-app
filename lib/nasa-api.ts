export interface NasaClimateData {
  currentTemp: number;
  lastYearTemp: number;
  rainfall: number;
}

export async function fetchCityClimateBaseline(lat: number, lng: number): Promise<NasaClimateData | null> {
  try {
    // We calculate dates for a recent 7-day window.
    // POWER has a ~5-day data lag, so we look at 10 days ago.
    const today = new Date();
    const endDate = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const formatDate = (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '');
    
    const startStr = formatDate(startDate);
    const endStr = formatDate(endDate);
    
    // Previous year exact same window
    const lastStartStr = (startDate.getFullYear() - 1).toString() + startStr.substring(4);
    const lastEndStr = (endDate.getFullYear() - 1).toString() + endStr.substring(4);

    // Fetch Current Year
    const url1 = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR&community=RE&longitude=${lng}&latitude=${lat}&start=${startStr}&end=${endStr}&format=JSON`;
    
    const res1 = await fetch(url1, { next: { revalidate: 86400 } }); // Cache for 24h
    if (!res1.ok) throw new Error('NASA POWER API failed');
    const data1 = await res1.json();

    // Fetch Last Year
    const url2 = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=${lng}&latitude=${lat}&start=${lastStartStr}&end=${lastEndStr}&format=JSON`;
    const res2 = await fetch(url2, { next: { revalidate: 86400 } });
    if (!res2.ok) throw new Error('NASA POWER API failed');
    const data2 = await res2.json();

    // Calculate averages ignoring fill values (-999)
    const temps1 = Object.values(data1.properties.parameter.T2M) as number[];
    const rains1 = Object.values(data1.properties.parameter.PRECTOTCORR) as number[];
    const temps2 = Object.values(data2.properties.parameter.T2M) as number[];

    const validTemps1 = temps1.filter(t => t > -50 && t < 60);
    const validRains1 = rains1.filter(r => r >= 0);
    const validTemps2 = temps2.filter(t => t > -50 && t < 60);

    const avgTemp1 = validTemps1.length > 0 ? validTemps1.reduce((a, b) => a + b, 0) / validTemps1.length : 35;
    const avgRain1 = validRains1.length > 0 ? validRains1.reduce((a, b) => a + b, 0) / validRains1.length : 2;
    const avgTemp2 = validTemps2.length > 0 ? validTemps2.reduce((a, b) => a + b, 0) / validTemps2.length : 34;

    return {
      currentTemp: avgTemp1,
      lastYearTemp: avgTemp2,
      rainfall: avgRain1
    };
  } catch (error) {
    console.error("Failed to fetch from NASA POWER:", error);
    return null;
  }
}
