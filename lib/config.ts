// ── S/M/L Sizing Constants for Roadmap Templates ──

export type SizingType = 'S' | 'M' | 'L';

/** VZÄ-Schwellenwerte für die Sizing-Ableitung */
export const SIZING_THRESHOLDS = {
  S_MAX: 99,   // ≤ 99 VZÄ → Small
  M_MAX: 499,  // 100–499 VZÄ → Medium
  // ≥ 500 VZÄ → Large
} as const;

/** Leite den Sizing-Typ aus dem VZÄ-Wert ab */
export function deriveSizingFromVZAE(vzae: number | undefined): SizingType | null {
  if (vzae == null || vzae <= 0) return null;
  if (vzae <= SIZING_THRESHOLDS.S_MAX) return 'S';
  if (vzae <= SIZING_THRESHOLDS.M_MAX) return 'M';
  return 'L';
}

export const SIZING_LABELS: Record<SizingType, string> = {
  S: 'Klein (< 100 VZÄ)',
  M: 'Mittel (100–499 VZÄ)',
  L: 'Groß (≥ 500 VZÄ)',
};
