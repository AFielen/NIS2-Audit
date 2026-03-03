import type { AssessmentResult, WizardAnswers, OutcomeType, Locale } from './types';
import { policyPacks } from './rules/policy-packs';

const OUTCOME_LABELS: Record<OutcomeType, { de: string; en: string }> = {
  A: { de: 'Nicht direkt betroffen und kein technischer Mit-Scope', en: 'Not directly affected and no technical co-scope' },
  B: { de: 'Direkt betroffen, Scope plausibel begrenzbar', en: 'Directly affected, scope plausibly limitable' },
  C: { de: 'Direkt betroffen und Shared IT zieht den technischen Scope hoch', en: 'Directly affected and shared IT extends technical scope' },
  D: { de: 'Regelstandssensitiv oder strukturell/technisch unklar; konservative Umsetzung empfohlen', en: 'Rule-sensitive or structurally/technically unclear; conservative implementation recommended' },
};

export function getOutcomeLabel(outcome: OutcomeType, locale: Locale = 'de'): string {
  return OUTCOME_LABELS[outcome][locale];
}

export function getOutcomeColor(outcome: OutcomeType): string {
  switch (outcome) {
    case 'A': return 'var(--success)';
    case 'B': return 'var(--info)';
    case 'C': return 'var(--warning)';
    case 'D': return 'var(--drk)';
  }
}

export function getOutcomeBgColor(outcome: OutcomeType): string {
  switch (outcome) {
    case 'A': return 'var(--success-bg)';
    case 'B': return 'var(--info-bg)';
    case 'C': return 'var(--warning-bg)';
    case 'D': return 'var(--drk-bg)';
  }
}

export function generateSummaryText(result: AssessmentResult, locale: Locale = 'de'): string {
  const parts: string[] = [];
  const packName = policyPacks[result.activePolicyPack].name[locale];

  parts.push(locale === 'de'
    ? `Ergebnis ${result.outcomeType}: ${OUTCOME_LABELS[result.outcomeType][locale]}`
    : `Outcome ${result.outcomeType}: ${OUTCOME_LABELS[result.outcomeType][locale]}`
  );

  parts.push(locale === 'de'
    ? `Aktiver Regelstand: ${packName}`
    : `Active policy: ${packName}`
  );

  if (result.isRuleSensitive) {
    const altPackName = policyPacks[result.activePolicyPack === 'verbandslinie-konservativ' ? 'public-bsi' : 'verbandslinie-konservativ'].name[locale];
    parts.push(locale === 'de'
      ? `Regelstandssensitiv: Unter ${altPackName} wäre das Ergebnis ${result.alternatePolicyPackOutcome}.`
      : `Rule-sensitive: Under ${altPackName} the outcome would be ${result.alternatePolicyPackOutcome}.`
    );
  }

  parts.push(locale === 'de'
    ? `Juristischer Scope: ${result.legalScope.summary[locale]}`
    : `Legal scope: ${result.legalScope.summary[locale]}`
  );

  parts.push(locale === 'de'
    ? `Technischer Scope: ${result.technicalScope.summary[locale]}`
    : `Technical scope: ${result.technicalScope.summary[locale]}`
  );

  const maturityLabel = locale === 'de'
    ? { kritisch: 'kritisch', basal: 'basal', belastbar: 'belastbar', fortgeschritten: 'fortgeschritten' }
    : { kritisch: 'critical', basal: 'basic', belastbar: 'solid', fortgeschritten: 'advanced' };

  parts.push(locale === 'de'
    ? `Reifegrad: ${result.maturitySummary.score}/${result.maturitySummary.maxScore} (${maturityLabel[result.maturitySummary.band]})`
    : `Maturity: ${result.maturitySummary.score}/${result.maturitySummary.maxScore} (${maturityLabel[result.maturitySummary.band]})`
  );

  return parts.join('\n');
}

export function exportJSON(result: AssessmentResult, answers: WizardAnswers): string {
  const exportData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    activePolicyPack: result.activePolicyPack,
    outcomeType: result.outcomeType,
    alternatePolicyPackOutcome: result.alternatePolicyPackOutcome,
    isRuleSensitive: result.isRuleSensitive,
    directAffectedness: result.directAffectedness,
    thresholdLevel: result.thresholdLevel,
    hasSectorTrigger: result.hasSectorTrigger,
    hasSharedIT: result.hasSharedIT,
    hardSeparationMet: result.hardSeparationMet,
    legalScope: result.legalScope.summary.de,
    technicalScope: result.technicalScope.summary.de,
    maturityScore: result.maturitySummary.score,
    maturityBand: result.maturitySummary.band,
    maturityGaps: result.maturitySummary.gaps,
    reviewFlags: result.reviewFlags.map(f => ({ id: f.id, title: f.title.de, severity: f.severity })),
    triggeredRules: result.triggeredRules.map(r => ({ ruleId: r.ruleId, effect: r.effect, questionId: r.questionId })),
    triggeredRoadmapPacks: result.triggeredRoadmapPacks,
    topRisks: result.topRisks.map(r => ({ title: r.title.de })),
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
