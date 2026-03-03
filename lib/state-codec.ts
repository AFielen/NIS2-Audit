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

    const state: EncodedState = { answers: parsed.answers as WizardAnswers };
    if (parsed.grunddaten) {
      state.grunddaten = parsed.grunddaten as Grunddaten;
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
