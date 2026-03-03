// ── Gemeinsame Typen für DRK-Apps ──

/** Unterstützte Sprachen */
export type Locale = 'de' | 'en';

/** API Health Response */
export interface HealthResponse {
  status: 'ok' | 'error';
  version: string;
  timestamp: string;
}

/** Standard API Error */
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

// ── NIS-2 Self-Audit Typen ──

export type PolicyPack = 'public-bsi' | 'verbandslinie-konservativ';

export type DrkType = 'KV' | 'LV' | 'TG' | 'SG';

export type RdOrganisation = 'EV_ABT' | 'GGMBH' | 'SPLIT' | 'NO_RD';

export type EntityCount = 'ONE' | 'TWO_THREE' | 'FOUR_PLUS';

export type PersonnelSource = 'SAME' | 'OTHER' | 'MIXED';

export type ITResponsibility = 'CENTRAL_EV' | 'CENTRAL_MSP' | 'DECENTRAL' | 'MIXED';

export type CentralIT = 'YES' | 'PARTIAL' | 'NO';

export type TriState = 'YES' | 'PARTIAL' | 'NO';

export type StaffBand = 'LT50' | '50_249' | '250PLUS';

export type RevenueBand = 'LT10' | '10_50' | 'GT50';

export type BalanceBand = 'LT10' | '10_43' | 'GT43';

export type DataReliability = 'DOC' | 'EST' | 'MISS';

export type DataGranularity = 'ENTITY' | 'CONSOL' | 'MIXED';

export type SegmentationLevel = 'NONE' | 'BASIC' | 'TESTED';

export type EvidenceLevel = 'SELF' | 'INTERNAL' | 'TECH' | 'EXTERNAL';

export type OutcomeType = 'A' | 'B' | 'C' | 'D';

export type MaturityValue = 'NO' | 'PARTIAL' | 'YES';

export type MaturityBand = 'kritisch' | 'basal' | 'belastbar' | 'fortgeschritten';

export type DirectAffectedness = 'yes' | 'no' | 'unclear';

/** Alle Antworten des Wizards */
export interface WizardAnswers {
  // Block A – Organisation
  'ORG-01'?: DrkType;
  'ORG-02'?: RdOrganisation;
  'ORG-03'?: EntityCount;
  'ORG-04'?: PersonnelSource;
  'ORG-05'?: ITResponsibility;
  'ORG-06'?: CentralIT;
  // Block B – Leistungen
  'OPS-01'?: TriState;
  'OPS-02'?: TriState;
  'OPS-03'?: TriState;
  'OPS-04'?: TriState;
  'OPS-05'?: TriState;
  'OPS-06'?: TriState;
  'OPS-07'?: TriState;
  // Block C – Schwellenwerte
  'THR-01'?: StaffBand;
  'THR-02'?: RevenueBand;
  'THR-03'?: BalanceBand;
  'THR-04'?: DataReliability;
  'THR-05'?: DataGranularity;
  // Block D – IT-Kopplung
  'IT-01'?: TriState;
  'IT-02'?: TriState;
  'IT-03'?: TriState;
  'IT-04'?: TriState;
  'IT-05'?: TriState;
  'IT-06'?: TriState;
  'IT-07'?: TriState;
  'IT-08'?: TriState;
  'IT-09'?: SegmentationLevel;
  'IT-10'?: TriState;
  'IT-11'?: TriState;
  'IT-12'?: TriState;
  'IT-13'?: TriState;
  // Block E – Sicherheitsreife
  'SEC-01'?: MaturityValue;
  'SEC-02'?: MaturityValue;
  'SEC-03'?: MaturityValue;
  'SEC-04'?: MaturityValue;
  'SEC-05'?: MaturityValue;
  'SEC-06'?: MaturityValue;
  'SEC-07'?: MaturityValue;
  'SEC-08'?: MaturityValue;
  'SEC-09'?: MaturityValue;
  'SEC-10'?: MaturityValue;
  'SEC-11'?: MaturityValue;
  'SEC-12'?: MaturityValue;
  // Block F – Nachweisniveau
  'EVI-01'?: EvidenceLevel;
}

export type QuestionId = keyof WizardAnswers;

/** Wizard-Zustand für localStorage */
export interface WizardState {
  answers: WizardAnswers;
  currentStep: number;
  policyPack: PolicyPack;
  selectedPreset: string | null;
  timestamp: number;
}

/** Einzelne Antwortoption */
export interface AnswerOption {
  code: string;
  label: { de: string; en: string };
  hint?: { de: string; en: string };
}

/** Einzelne Frage */
export interface Question {
  id: QuestionId;
  block: string;
  text: { de: string; en: string };
  options: AnswerOption[];
  conditionalOn?: {
    questionId: QuestionId;
    values: string[];
  };
}

/** Fragenblock */
export interface QuestionBlock {
  id: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  questions: Question[];
}

/** Preset für typische DRK-Verbundstrukturen */
export interface Preset {
  id: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  answers: Partial<WizardAnswers>;
}

/** Ausgelöste Regel */
export interface TriggeredRule {
  ruleId: string;
  description: { de: string; en: string };
  questionId?: QuestionId;
  answerCode?: string;
  effect: string;
  roadmapPacks: string[];
  priority: 'Hoch' | 'Mittel' | 'Niedrig';
}

/** Review-Flag */
export interface ReviewFlag {
  id: string;
  title: { de: string; en: string };
  description: { de: string; en: string };
  severity: 'high' | 'medium' | 'low';
}

/** Einzelnes Roadmap-Pack */
export interface RoadmapPack {
  id: string;
  title: { de: string; en: string };
  owner: { de: string; en: string };
  content: { de: string; en: string };
  horizonStart: number;
  horizonEnd: number;
}

/** Roadmap-Phase (0-30, 31-60, 61-90) */
export interface RoadmapPhase {
  label: { de: string; en: string };
  startDay: number;
  endDay: number;
  packs: RoadmapPack[];
}

/** Reifegrad-Zusammenfassung */
export interface MaturitySummary {
  score: number;
  maxScore: number;
  band: MaturityBand;
  gaps: string[];
}

/** Risikoeintrag */
export interface RiskEntry {
  title: { de: string; en: string };
  description: { de: string; en: string };
  relatedRules: string[];
}

/** Scope-Information */
export interface ScopeInfo {
  summary: { de: string; en: string };
  details: { de: string; en: string };
  factors: Array<{ de: string; en: string }>;
}

/** Gesamtergebnis der Bewertung */
export interface AssessmentResult {
  activePolicyPack: PolicyPack;
  alternatePolicyPackOutcome: OutcomeType;
  isRuleSensitive: boolean;
  sensitiveRules: string[];
  legalScope: ScopeInfo;
  technicalScope: ScopeInfo;
  directAffectedness: DirectAffectedness;
  outcomeType: OutcomeType;
  reviewFlags: ReviewFlag[];
  triggeredRules: TriggeredRule[];
  triggeredRoadmapPacks: string[];
  topRisks: RiskEntry[];
  maturitySummary: MaturitySummary;
  roadmap: RoadmapPhase[];
  thresholdLevel: 'none' | 'important' | 'essential';
  hasSectorTrigger: boolean;
  hasSharedIT: boolean;
  hardSeparationMet: boolean;
}
