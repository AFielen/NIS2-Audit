import type { WizardState, WizardAnswers } from './types';

const STORAGE_KEY = 'nis2-audit-wizard-state';

export function createEmptyState(): WizardState {
  return {
    answers: {},
    currentStep: 0,
    selectedPreset: null,
    timestamp: Date.now(),
  };
}

export function saveWizardState(state: WizardState): void {
  try {
    const serialized = JSON.stringify({ ...state, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // localStorage full or unavailable
  }
}

export function loadWizardState(): WizardState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WizardState;
    if (typeof parsed.answers !== 'object' || typeof parsed.currentStep !== 'number') {
      return null;
    }
    return parsed;
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
