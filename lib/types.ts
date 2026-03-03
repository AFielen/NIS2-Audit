// ── Gemeinsame Typen für NIS-2 DRK Self-Audit ──

/** Unterstützte Sprachen */
export type Locale = 'de' | 'en';

// ── Ruleset JSON Types ──

export type OutcomeType = 'A' | 'B' | 'C' | 'D';
export type MaturityBand = 'kritisch' | 'basal' | 'belastbar' | 'fortgeschritten';

/** A single question from the JSON ruleset */
export interface RulesetQuestion {
  id: string;
  section: string;
  label: string;
  hint?: string;
  type: 'single_select' | 'number';
  options?: Array<{ value: string; label: string }>;
  min?: number;
  required: boolean;
  visibleIf?: Array<{ questionId: string; op: string; value: string }>;
}

/** A single condition in a rule's when clause */
export interface RuleCondition {
  questionId?: string;
  path?: string;
  op: string;
  value?: string | number | boolean | string[];
  any?: RuleCondition[];
  all?: RuleCondition[];
}

/** Compute action in a rule's then clause */
export interface RuleCompute {
  name: string;
  op: string;
  inputs: string[];
}

/** A rule's then clause */
export interface RuleThen {
  set?: Record<string, string | number | boolean>;
  addRoadmapPacks?: string[];
  compute?: RuleCompute;
}

/** A single rule from the JSON ruleset */
export interface Rule {
  id: string;
  description: string;
  when: RuleCondition[];
  then: RuleThen;
}

/** Scoring control from JSON */
export interface ScoringControl {
  id: string;
  points: Record<string, number>;
}

/** Scoring band from JSON */
export interface ScoringBand {
  min: number;
  max: number;
  label: string;
}

/** Roadmap pack from JSON */
export interface RoadmapPackDef {
  id: string;
  title: string;
  items: string[];
}

/** Complete JSON ruleset structure */
export interface Ruleset {
  meta: {
    id: string;
    version: string;
    status: string;
    title: string;
    effectiveDate: string;
    notes: string[];
  };
  enums: Record<string, string[]>;
  questions: RulesetQuestion[];
  rules: Rule[];
  scoring: {
    model: string;
    controls: ScoringControl[];
    bands: ScoringBand[];
  };
  roadmapPacks: RoadmapPackDef[];
}

// ── Wizard & Answer Types ──

/** All wizard answers — dynamic record keyed by question ID */
export type WizardAnswers = Record<string, string | number | undefined>;

/** Grunddaten des Kreisverbands für den Bericht */
export interface Grunddaten {
  kreisverband: string;
  adresse: string;
  vorstand: string;
}

/** Wizard state for localStorage */
export interface WizardState {
  answers: WizardAnswers;
  grunddaten: Grunddaten;
  currentStep: number;
  selectedPreset: string | null;
  timestamp: number;
}

// ── Assessment Result Types ──

/** Jurisdiction determination */
export interface JurisdictionResult {
  isRdProvider: boolean;
  directlyRegulated: boolean;
  classification: string;
}

/** Technical scope determination */
export interface TechnicalScopeResult {
  sharedIdentity: boolean;
  sharedInfrastructure: boolean;
  hardSeparationPossible: boolean;
}

/** Outcome determination */
export interface OutcomeResult {
  type: OutcomeType;
  label: string;
  summary: string;
}

/** Scoring result */
export interface ScoringResult {
  totalPoints: number;
  maxPoints: number;
  bandLabel: string;
  gaps: string[];
}

/** Triggered rule info for display */
export interface TriggeredRuleInfo {
  id: string;
  description: string;
}

/** BSI registration determination */
export interface RegistrationResult {
  required: boolean;
  recommended: boolean;
  deadline: string;
  url: string;
  message: string;
}

/** S/M/L sizing for roadmap templates */
export type SizingType = 'S' | 'M' | 'L';

/** Complete assessment result */
export interface AssessmentResult {
  outcome: OutcomeResult;
  jurisdiction: JurisdictionResult;
  scope: {
    technical: TechnicalScopeResult;
  };
  scoring: ScoringResult;
  registration: RegistrationResult;
  sizingType: SizingType | null;
  roadmapPacks: string[];
  roadmapItems: Array<{ packId: string; title: string; items: string[] }>;
  triggeredRules: TriggeredRuleInfo[];
}

// ── Preset Types ──

export interface Preset {
  id: string;
  title: string;
  description: string;
  answers: WizardAnswers;
}
