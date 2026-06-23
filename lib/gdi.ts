/**
 * Enhanced Green Deficit Index (GDI) Engine
 * 
 * Score Formula:
 * GDI = (Temperature Score * 30%) + (Tree Cover Deficit * 30%) + (AQI Score * 15%) + (Rainfall Deficit * 15%) + (Population Density * 10%)
 */

export interface GDIInputs {
  heat: number;        // 0-100 (Temperature anomaly)
  ndvi: number;        // 0-1 (Vegetation)
  rainfall: number;    // 0-100 (Rainfall Deficit)
  currentTemp: number;
  lastYearTemp: number;
}

export interface GDIOutputs {
  score: number;
  treesNeeded: number;
  coolingEffect: number; // in Celsius
  co2Absorption: number; // in tons per year
  oxygenProduced: number; // in tons per year
}

export function computeGDI(inputs: GDIInputs): GDIOutputs {
  const vegDeficit = (1 - Math.max(0, Math.min(1, inputs.ndvi))) * 100;

  const rawScore = 
    (inputs.heat * 0.40) +
    (vegDeficit * 0.40) +
    (inputs.rainfall * 0.20);

  const score = Math.round(Math.max(0, Math.min(100, rawScore)));
  
  // AI Estimations based on score and density
  let treesNeeded = 0;

  if (score < 20) {
    // Optimal: No urgent plantation needed
    treesNeeded = 0;
  } else if (score < 40) {
    // Normal: Light maintenance planting
    treesNeeded = Math.round(score * 5);
  } else {
    // High, Severe, Critical: Aggressive plantation required
    treesNeeded = score * 25;

    // Temperature anomaly modifier (Comparing current year to last year)
    const tempDiff = inputs.currentTemp - inputs.lastYearTemp;
    if (tempDiff > 0) {
      // Add 10% more trees for every 1°C increase to combat warming trends
      const warmingModifier = 1 + (tempDiff * 0.1);
      treesNeeded = Math.round(treesNeeded * warmingModifier);
    } else {
      treesNeeded = Math.round(treesNeeded);
    }
  }
  
  // 100 trees roughly cool by 0.25 C
  const coolingEffect = parseFloat(((treesNeeded / 100) * 0.25).toFixed(1));
  
  // 1 tree absorbs ~0.021 tons of CO2 per year
  const co2Absorption = parseFloat((treesNeeded * 0.021).toFixed(1));
  
  // 1 tree produces ~0.118 tons of Oxygen per year
  const oxygenProduced = parseFloat((treesNeeded * 0.118).toFixed(1));

  return {
    score,
    treesNeeded,
    coolingEffect,
    co2Absorption,
    oxygenProduced
  };
}
