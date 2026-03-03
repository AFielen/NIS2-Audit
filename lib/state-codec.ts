import LZString from 'lz-string';
import type { WizardAnswers, PolicyPack } from './types';

export interface EncodedState {
  answers: WizardAnswers;
  policyPack: PolicyPack;
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

    // Validate basic structure
    if (!parsed || typeof parsed !== 'object' || !parsed.answers) return null;

    // Ensure policyPack is valid
    const validPacks: PolicyPack[] = ['public-bsi', 'verbandslinie-konservativ'];
    if (!validPacks.includes(parsed.policyPack)) {
      parsed.policyPack = 'verbandslinie-konservativ';
    }

    return {
      answers: parsed.answers as WizardAnswers,
      policyPack: parsed.policyPack as PolicyPack,
    };
  } catch {
    return null;
  }
}

export function buildStateUrl(baseUrl: string, state: EncodedState): string {
  const encoded = encodeState(state);
  return `${baseUrl}?state=${encoded}`;
}
