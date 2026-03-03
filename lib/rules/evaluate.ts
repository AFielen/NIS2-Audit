import type {
  WizardAnswers,
  AssessmentResult,
  RegistrationResult,
  RuleCondition,
  Rule,
  OutcomeType,
} from '../types';
import { deriveSizingFromVZAE } from '../config';
import ruleset from './nis2-drk-ruleset.v1.json';

// ── Helpers ──

/** Get a nested value from an object by dot-separated path */
function getPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Set a nested value on an object by dot-separated path */
function setPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] == null || typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

// ── Condition Evaluator ──

function evaluateCondition(
  cond: RuleCondition,
  answers: WizardAnswers,
  result: Record<string, unknown>,
): boolean {
  // Handle any/all groups
  if (cond.any) {
    return cond.any.some(c => evaluateCondition(c, answers, result));
  }
  if (cond.all) {
    return cond.all.every(c => evaluateCondition(c, answers, result));
  }

  // Get the value to compare
  let actual: unknown;
  if (cond.questionId) {
    actual = answers[cond.questionId];
  } else if (cond.path) {
    actual = getPath(result, cond.path);
  } else {
    return false;
  }

  const expected = cond.value;

  switch (cond.op) {
    case 'eq':
      return actual === expected;

    case 'gt':
      if (typeof actual === 'number' && typeof expected === 'number') {
        return actual > expected;
      }
      if (typeof actual === 'string') {
        const num = parseFloat(actual);
        if (!isNaN(num) && typeof expected === 'number') return num > expected;
      }
      return false;

    case 'lte':
      if (typeof actual === 'number' && typeof expected === 'number') {
        return actual <= expected;
      }
      if (typeof actual === 'string') {
        const num = parseFloat(actual);
        if (!isNaN(num) && typeof expected === 'number') return num <= expected;
      }
      return false;

    case 'in':
      if (Array.isArray(expected)) {
        return expected.includes(actual as string);
      }
      return false;

    case 'missing':
      return actual == null || actual === '' || actual === undefined;

    case 'lte_or_missing':
      if (actual == null || actual === '' || actual === undefined) return true;
      if (typeof actual === 'number' && typeof expected === 'number') {
        return actual <= expected;
      }
      if (typeof actual === 'string') {
        const num = parseFloat(actual);
        if (!isNaN(num) && typeof expected === 'number') return num <= expected;
      }
      return true;

    default:
      return false;
  }
}

function evaluateWhen(
  conditions: RuleCondition[],
  answers: WizardAnswers,
  result: Record<string, unknown>,
): boolean {
  return conditions.every(cond => evaluateCondition(cond, answers, result));
}

// ── Rule Executor ──

function executeRule(
  rule: Rule,
  answers: WizardAnswers,
  result: Record<string, unknown>,
  roadmapPacks: Set<string>,
  triggeredRules: Array<{ id: string; description: string }>,
): void {
  if (!evaluateWhen(rule.when, answers, result)) return;

  triggeredRules.push({ id: rule.id, description: rule.description });

  if (rule.then.set) {
    for (const [path, value] of Object.entries(rule.then.set)) {
      setPath(result, path, value);
    }
  }

  if (rule.then.addRoadmapPacks) {
    for (const pack of rule.then.addRoadmapPacks) {
      roadmapPacks.add(pack);
    }
  }

  if (rule.then.compute) {
    const { name, op, inputs } = rule.then.compute;
    if (op === 'allYes') {
      const allYes = inputs.every(qId => answers[qId] === 'yes');
      setPath(result, name, allYes);
    }
  }
}

// ── Scoring ──

function computeScoring(answers: WizardAnswers): {
  totalPoints: number;
  maxPoints: number;
  bandLabel: string;
  gaps: string[];
} {
  let totalPoints = 0;
  const maxPoints = ruleset.scoring.controls.length * 2;
  const gaps: string[] = [];

  for (const control of ruleset.scoring.controls) {
    const answer = answers[control.id];
    const points = (typeof answer === 'string' && control.points[answer as keyof typeof control.points]) || 0;
    totalPoints += points;
    if (points < 2) {
      gaps.push(control.id);
    }
  }

  let bandLabel = 'kritisch';
  for (const band of ruleset.scoring.bands) {
    if (totalPoints >= band.min && totalPoints <= band.max) {
      bandLabel = band.label;
      break;
    }
  }

  return { totalPoints, maxPoints, bandLabel, gaps };
}

// ── BSI Registration ──

const BSI_REGISTRATION_URL =
  'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-Anleitung-Registrierung/Anleitung-Registrierung_node.html';

function computeRegistration(outcomeType: OutcomeType): RegistrationResult {
  switch (outcomeType) {
    case 'C':
      return {
        required: true,
        recommended: false,
        deadline: '2026-03-06',
        url: BSI_REGISTRATION_URL,
        message:
          'Die Registrierung beim BSI ist für Ihre Einrichtung erforderlich. ' +
          'Frist: 06.03.2026. Auch nach diesem Datum ist die Registrierung weiterhin möglich und sinnvoll, ' +
          'verspätetes Handeln kann jedoch Sanktions- und Haftungsrisiken erhöhen.',
      };
    case 'D':
      return {
        required: false,
        recommended: true,
        deadline: '2026-03-06',
        url: BSI_REGISTRATION_URL,
        message:
          'Die Registrierung beim BSI wird dringend empfohlen (konservative Einschätzung), ' +
          'sofern Rettungsdienst erbracht wird und Schwellenwerte nicht belastbar geklärt sind. ' +
          'Frist: 06.03.2026. Auch nach diesem Datum ist die Registrierung weiterhin möglich und sinnvoll, ' +
          'verspätetes Handeln kann jedoch Sanktions- und Haftungsrisiken erhöhen.',
      };
    case 'B':
      return {
        required: false,
        recommended: false,
        deadline: '2026-03-06',
        url: BSI_REGISTRATION_URL,
        message:
          'Voraussichtlich keine Registrierung erforderlich — ' +
          'gilt nur bei belastbarer Schwellenwert- und Rechtsträgerprüfung.',
      };
    case 'A':
    default:
      return {
        required: false,
        recommended: false,
        deadline: '2026-03-06',
        url: BSI_REGISTRATION_URL,
        message: 'Keine Registrierung beim BSI erforderlich.',
      };
  }
}

// ── Main Evaluation ──

export function evaluateAssessment(answers: WizardAnswers): AssessmentResult {
  const result: Record<string, unknown> = {};
  const roadmapPacks = new Set<string>();
  const triggeredRules: Array<{ id: string; description: string }> = [];

  for (const rule of ruleset.rules as Rule[]) {
    executeRule(rule, answers, result, roadmapPacks, triggeredRules);
  }

  const jurisdiction = {
    isRdProvider: (getPath(result, 'jurisdiction.isRdProvider') as boolean) ?? false,
    directlyRegulated: (getPath(result, 'jurisdiction.directlyRegulated') as boolean) ?? false,
    classification: (getPath(result, 'jurisdiction.classification') as string) ?? 'none',
  };

  const technicalScope = {
    sharedIdentity: (getPath(result, 'scope.technical.sharedIdentity') as boolean) ?? false,
    sharedInfrastructure: (getPath(result, 'scope.technical.sharedInfrastructure') as boolean) ?? false,
    hardSeparationPossible: (getPath(result, 'scope.technical.hardSeparationPossible') as boolean) ?? false,
  };

  const outcomeType = (getPath(result, 'outcome.type') as OutcomeType) ?? 'A';
  const outcomeLabel = (getPath(result, 'outcome.label') as string) ?? '';
  const outcomeSummary = (getPath(result, 'outcome.summary') as string) ?? '';

  const scoring = computeScoring(answers);

  // Map security gaps to roadmap packs
  const secGapToRoadmap: Record<string, string[]> = {
    'SEC-01': ['P1_GOV_REG'],
    'SEC-02': ['P1_GOV_REG'],
    'SEC-03': ['P7_DOC_AUDIT'],
    'SEC-04': ['P2_IAM_ADMIN'],
    'SEC-05': ['P2_IAM_ADMIN'],
    'SEC-06': ['P4_NETWORK_SEG'],
    'SEC-07': ['P3_BACKUP_DR'],
    'SEC-08': ['P5_INCIDENT_REPORT'],
    'SEC-09': ['P5_INCIDENT_REPORT'],
    'SEC-10': ['P3_BACKUP_DR'],
    'SEC-11': ['P6_SUPPLY_CHAIN'],
    'SEC-12': ['P7_DOC_AUDIT'],
  };
  for (const gap of scoring.gaps) {
    const packs = secGapToRoadmap[gap];
    if (packs) {
      for (const p of packs) roadmapPacks.add(p);
    }
  }

  const roadmapPackIds = Array.from(roadmapPacks).sort();
  const roadmapItems = roadmapPackIds
    .map(packId => {
      const def = ruleset.roadmapPacks.find(p => p.id === packId);
      if (!def) return null;
      return { packId: def.id, title: def.title, items: def.items };
    })
    .filter((x): x is { packId: string; title: string; items: string[] } => x != null);

  // Compute BSI registration requirement based on outcome
  const registration = computeRegistration(outcomeType);

  // Derive S/M/L sizing from effective VZÄ
  // When ORG-03 = 'ev' (RD is department in e.V.), use ORG-09 (Gesamtverband VZÄ)
  // Otherwise use THR-01 (Rechtsträger VZÄ)
  const effectiveVZAE = answers['ORG-03'] === 'ev' && typeof answers['ORG-09'] === 'number'
    ? answers['ORG-09']
    : typeof answers['THR-01'] === 'number'
      ? answers['THR-01']
      : undefined;
  const sizingType = deriveSizingFromVZAE(effectiveVZAE as number | undefined);

  return {
    outcome: { type: outcomeType, label: outcomeLabel, summary: outcomeSummary },
    jurisdiction,
    scope: { technical: technicalScope },
    scoring,
    registration,
    sizingType,
    roadmapPacks: roadmapPackIds,
    roadmapItems,
    triggeredRules,
  };
}

/** Get the questions from the ruleset */
export function getRulesetQuestions() {
  return ruleset.questions;
}

/** Get the sections defined by questions */
export function getRulesetSections(): string[] {
  const seen = new Set<string>();
  const sections: string[] = [];
  for (const q of ruleset.questions) {
    if (!seen.has(q.section)) {
      seen.add(q.section);
      sections.push(q.section);
    }
  }
  return sections;
}

/** Get ruleset metadata */
export function getRulesetMeta() {
  return ruleset.meta;
}

/** Get roadmap pack definitions */
export function getRoadmapPackDefs() {
  return ruleset.roadmapPacks;
}
