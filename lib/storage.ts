import type { WizardState, WizardAnswers } from './types';

const STORAGE_KEY = 'nis2-audit-wizard-state';

/** Validate that answers only contain safe value types */
function sanitizeAnswers(raw: unknown): WizardAnswers {
  if (!raw || typeof raw !== 'object') return {};
  const clean: WizardAnswers = {};
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof key !== 'string' || key.length > 50) continue;
    if (typeof val === 'string' && val.length <= 500) clean[key] = val;
    else if (typeof val === 'number' && isFinite(val) && val >= 0 && val <= 999999) clean[key] = val;
  }
  return clean;
}

export function createEmptyState(): WizardState {
  return {
    answers: {},
    grunddaten: { kreisverband: '', adresse: '', vorstand: '' },
    currentStep: 0,
    selectedPreset: null,
    timestamp: Date.now(),
  };
}

export function saveWizardState(state: WizardState): boolean {
  try {
    const serialized = JSON.stringify({ ...state, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}

export function loadWizardState(): WizardState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.currentStep !== 'number') {
      return null;
    }
    return {
      ...parsed,
      answers: sanitizeAnswers(parsed.answers),
      grunddaten: {
        kreisverband: String(parsed.grunddaten?.kreisverband ?? '').slice(0, 200),
        adresse: String(parsed.grunddaten?.adresse ?? '').slice(0, 200),
        vorstand: String(parsed.grunddaten?.vorstand ?? '').slice(0, 200),
        gesamtVzae: typeof parsed.grunddaten?.gesamtVzae === 'number' && isFinite(parsed.grunddaten.gesamtVzae) ? parsed.grunddaten.gesamtVzae : undefined,
        gesamtUmsatz: typeof parsed.grunddaten?.gesamtUmsatz === 'number' && isFinite(parsed.grunddaten.gesamtUmsatz) ? parsed.grunddaten.gesamtUmsatz : undefined,
      },
    } as WizardState;
  } catch {
    return null;
  }
}

export function clearWizardState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}

export function updateAnswers(state: WizardState, answers: Partial<WizardAnswers>): WizardState {
  return {
    ...state,
    answers: { ...state.answers, ...answers },
    timestamp: Date.now(),
  };
}
