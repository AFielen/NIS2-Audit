import LZString from 'lz-string';
import type { WizardAnswers, Grunddaten } from './types';

export interface EncodedState {
  answers: WizardAnswers;
  grunddaten?: Grunddaten;
}

export function encodeState(state: EncodedState): string {
  const json = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeState(encoded: string): EncodedState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;

    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object' || !parsed.answers) return null;

    // Sanitize answers: only allow string/number values with safe bounds
    const cleanAnswers: WizardAnswers = {};
    for (const [key, val] of Object.entries(parsed.answers as Record<string, unknown>)) {
      if (typeof key !== 'string' || key.length > 50) continue;
      if (typeof val === 'string' && val.length <= 500) cleanAnswers[key] = val;
      else if (typeof val === 'number' && isFinite(val) && val >= 0 && val <= 999999) cleanAnswers[key] = val;
    }

    const state: EncodedState = { answers: cleanAnswers };
    if (parsed.grunddaten && typeof parsed.grunddaten === 'object') {
      state.grunddaten = {
        kreisverband: String(parsed.grunddaten.kreisverband ?? '').slice(0, 200),
        adresse: String(parsed.grunddaten.adresse ?? '').slice(0, 200),
        vorstand: String(parsed.grunddaten.vorstand ?? '').slice(0, 200),
        gesamtVzae: typeof parsed.grunddaten.gesamtVzae === 'number' && isFinite(parsed.grunddaten.gesamtVzae) ? parsed.grunddaten.gesamtVzae : undefined,
        gesamtUmsatz: typeof parsed.grunddaten.gesamtUmsatz === 'number' && isFinite(parsed.grunddaten.gesamtUmsatz) ? parsed.grunddaten.gesamtUmsatz : undefined,
      };
    }
    return state;
  } catch {
    return null;
  }
}

export function buildStateUrl(baseUrl: string, state: EncodedState): string {
  const encoded = encodeState(state);
  return `${baseUrl}?state=${encoded}`;
}
