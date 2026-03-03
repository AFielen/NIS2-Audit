import type { AssessmentResult, WizardAnswers, OutcomeType, RulesetQuestion } from './types';
import { getRulesetQuestions } from './rules/evaluate';

function collectUnknownItems(answers: WizardAnswers): Array<{ questionId: string; label: string }> {
  const questions = getRulesetQuestions() as RulesetQuestion[];
  const unknowns: Array<{ questionId: string; label: string }> = [];
  for (const q of questions) {
    if (answers[q.id] === 'unknown') {
      unknowns.push({ questionId: q.id, label: q.label });
    }
  }
  return unknowns;
}

const OUTCOME_COLORS: Record<OutcomeType, string> = {
  A: 'var(--success)',
  B: 'var(--info)',
  C: 'var(--warning)',
  D: 'var(--drk)',
};

const OUTCOME_BG_COLORS: Record<OutcomeType, string> = {
  A: 'var(--success-bg)',
  B: 'var(--info-bg)',
  C: 'var(--warning-bg)',
  D: 'var(--drk-bg)',
};

export function getOutcomeColor(outcome: OutcomeType): string {
  return OUTCOME_COLORS[outcome];
}

export function getOutcomeBgColor(outcome: OutcomeType): string {
  return OUTCOME_BG_COLORS[outcome];
}

export function exportJSON(result: AssessmentResult, answers: WizardAnswers): string {
  const unknownItems = collectUnknownItems(answers);
  const exportData = {
    version: '1.1.0',
    exportedAt: new Date().toISOString(),
    outcome: result.outcome,
    jurisdiction: result.jurisdiction,
    scope: result.scope,
    scoring: result.scoring,
    roadmapPacks: result.roadmapPacks,
    triggeredRules: result.triggeredRules,
    unknownItems,
    answers,
  };
  return JSON.stringify(exportData, null, 2);
}

export function downloadJSON(result: AssessmentResult, answers: WizardAnswers): void {
  const json = exportJSON(result, answers);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nis2-audit-ergebnis-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
