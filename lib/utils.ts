import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function formatArea(sqKm: number): string {
  return sqKm < 1
    ? `${(sqKm * 100).toFixed(0)} ha`
    : `${sqKm.toFixed(1)} km²`;
}
