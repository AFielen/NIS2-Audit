import type { WizardAnswers, MaturityBand, MaturitySummary, MaturityValue } from './types';

const MATURITY_CONTROLS = [
  'SEC-01', 'SEC-02', 'SEC-03', 'SEC-04', 'SEC-05', 'SEC-06',
  'SEC-07', 'SEC-08', 'SEC-09', 'SEC-10', 'SEC-11', 'SEC-12',
] as const;

const SCORE_MAP: Record<MaturityValue, number> = {
  NO: 0,
  PARTIAL: 1,
  YES: 2,
};

const CONTROL_LABELS: Record<string, { de: string; en: string }> = {
  'SEC-01': { de: 'Verantwortliche Rolle für Informationssicherheit', en: 'Information security responsible role' },
  'SEC-02': { de: 'Geschäftsleitungs-Schulung', en: 'Management training' },
  'SEC-03': { de: 'Dokumentierte Risikoanalyse', en: 'Documented risk analysis' },
  'SEC-04': { de: 'MFA für privilegierte Konten', en: 'MFA for privileged accounts' },
  'SEC-05': { de: 'Rollen- und Berechtigungskonzept', en: 'Role and access management' },
  'SEC-06': { de: 'Zentrales Logging / Monitoring', en: 'Central logging / monitoring' },
  'SEC-07': { de: 'Offline-Backups + Restore getestet', en: 'Offline backups + tested restore' },
  'SEC-08': { de: 'Incident-Response-Prozess', en: 'Incident response process' },
  'SEC-09': { de: 'BCM / Wiederanlaufpläne', en: 'BCM / recovery plans' },
  'SEC-10': { de: 'Dienstleister / Cloud bewertet', en: 'Service providers / cloud assessed' },
  'SEC-11': { de: 'Freigegebene Richtlinien', en: 'Approved policies' },
  'SEC-12': { de: 'Interner Meldeprozess getestet', en: 'Internal reporting process tested' },
};

function getBand(score: number): MaturityBand {
  if (score <= 7) return 'kritisch';
  if (score <= 14) return 'basal';
  if (score <= 19) return 'belastbar';
  return 'fortgeschritten';
}

export function calculateMaturityScore(answers: WizardAnswers): MaturitySummary {
  let score = 0;
  const gaps: string[] = [];

  for (const controlId of MATURITY_CONTROLS) {
    const value = answers[controlId] as MaturityValue | undefined;
    const controlScore = value ? SCORE_MAP[value] : 0;
    score += controlScore;

    if (controlScore < 2) {
      gaps.push(controlId);
    }
  }

  return {
    score,
    maxScore: 24,
    band: getBand(score),
    gaps,
  };
}

export function getControlLabel(controlId: string): { de: string; en: string } {
  return CONTROL_LABELS[controlId] ?? { de: controlId, en: controlId };
}

export { MATURITY_CONTROLS, SCORE_MAP };
