// ── Gemeinsame Typen für NIS-2 DRK Self-Audit ──

/** Unterstützte Sprachen */
export type Locale = 'de' | 'en';

// ── Ruleset JSON Types ──

export type OutcomeType = 'A' | 'B' | 'C' | 'D';
export type MaturityBand = 'kritisch' | 'basal' | 'belastbar' | 'fortgeschritten';

/** A visibility condition — can be a simple check or an any/all group */
export interface VisibilityCondition {
  questionId?: string;
  op?: string;
  value?: string | number | boolean;
  any?: VisibilityCondition[];
  all?: VisibilityCondition[];
}

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
  visibleIf?: VisibilityCondition[];
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
  gesamtVzae?: number;
  gesamtUmsatz?: number;
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

/** Sector that triggered NIS-2 applicability */
export type RegulationSector = 'none' | 'health' | 'digital_infrastructure' | 'both';

/** Jurisdiction determination */
export interface JurisdictionResult {
  isRdProvider: boolean;
  isMspProvider: boolean;
  regulationSector: RegulationSector;
  directlyRegulated: boolean;
  classification: string;
  /** True if § 28 Abs. 4 BSIG aggregation of verbundene Unternehmen should be checked */
  mspAggregationWarning: boolean;
  /** True if directlyRegulated was only reached via konsolidierte (Verbund-)Kennzahlen */
  mspAggregationApplied: boolean;
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
  alreadyRegistered: boolean;
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

// ── Modul 1: Kostenrechner Types ──

export type KVGroesse = 'S' | 'M' | 'L';

export interface KostenBereich {
  id: string;
  label: string;
  paragraph: string;
  einmalig: Record<KVGroesse, [number, number]>;
  jaehrlich: Record<KVGroesse, [number, number]>;
  secQuestionIds?: string[];
}

export interface KostenErgebnis {
  groesse: KVGroesse;
  vzae: number;
  einmaligMin: number;
  einmaligMax: number;
  jaehrlichMin: number;
  jaehrlichMax: number;
  bereiche: Array<{
    id: string;
    label: string;
    paragraph: string;
    einmaligMin: number;
    einmaligMax: number;
    jaehrlichMin: number;
    jaehrlichMax: number;
    teilweiseErfuellt: boolean;
    bereitsUmgesetzt: boolean;
  }>;
  kostenProVzaeJahr: number;
  vergleiche: {
    bundesregierungSchätzungEinmalig: number;
    bundesregierungSchätzungJaehrlich: number;
    ransomwareSchadenDurchschnitt: number;
    ransomwareSchadenMaxCaritas: number;
    busseldMaxWichtig: number;
    busseldMaxBesondersWichtig: number;
    busseldNichtRegistrierung: number;
  };
}

export interface RefinanzierungsPfad {
  id: string;
  titel: string;
  rechtsgrundlage: string;
  maxBetrag?: string;
  deckungsgrad: 'hoch' | 'mittel' | 'gering' | 'unbekannt';
  einmalig: boolean;
  voraussetzungen: string[];
  hinweis?: string;
  antragsLink?: string;
}

export interface BundeslandProfil {
  code: string;
  name: string;
  rdGesetz: string;
  rdFinanzierungsModell: 'pauschale' | 'kostenerstattung' | 'mischmodell';
  rdItKostenAnerkannt: boolean;
  rdHinweis: string;
  landesfoerderungIt: boolean;
  landesfoerderungLink?: string;
  pflegesatzPraxis: 'offen' | 'schwierig' | 'unklar';
  pflegesatzHinweis: string;
  pfade: RefinanzierungsPfad[];
}

// ── Modul 2: Compliance-Tracker Types ──

export type AufgabenStatus = 'offen' | 'in_arbeit' | 'erledigt';
export type AufgabenPhase = 1 | 2 | 3 | 4;

export interface TrackerAufgabe {
  id: string;
  phase: AufgabenPhase;
  phaseLabel: string;
  titel: string;
  beschreibung: string;
  rechtsgrundlage: string;
  fristTage: number;
  prioritaet: 'kritisch' | 'hoch' | 'mittel';
  verantwortlich?: string;
  status: AufgabenStatus;
  notiz?: string;
  bsiLink?: string;
}

export interface PflichtDokument {
  id: string;
  nummer: number;
  titel: string;
  beschreibung: string;
  rechtsgrundlage: string;
  verantwortlich?: string;
  status: AufgabenStatus;
  vorhandeneVersion?: string;
  bsiLink?: string;
}

export interface TrackerState {
  aufgaben: Record<string, {
    status: AufgabenStatus;
    verantwortlich: string;
    notiz: string;
    erledigtAm?: string;
  }>;
  dokumente: Record<string, {
    status: AufgabenStatus;
    verantwortlich: string;
    version: string;
  }>;
  startdatum: string;
  letzteAktualisierung: string;
}

// ── Modul 3: Vorstand-Briefing Types ──

export interface VorstandBriefing {
  datum: string;
  kvName: string;
  vorstand: string;
  betroffenheitLabel: string;
  betroffenheitGrund: string;
  einstufung: string;
  pflichten: Array<{
    titel: string;
    status: 'offen' | 'unklar' | 'erledigt';
    frist?: string;
    paragraph: string;
  }>;
  haftungText: string;
  busseldText: string;
  kostenEinmaligMin: number;
  kostenEinmaligMax: number;
  kostenJaehrlichMin: number;
  kostenJaehrlichMax: number;
  naechsteSchritte: Array<{
    schritt: number;
    aktion: string;
    frist: string;
  }>;
  toolUrl: string;
}

// ── Modul 4: Lieferketten-Check Types ──

export interface LieferkettenFrage {
  id: string;
  frage: string;
  erklaerung: string;
  relevanzWennJa: string;
}

export interface LieferkettenAntworten {
  [key: string]: boolean | undefined;
}

export interface LieferkettenAnforderung {
  kategorie: string;
  beschreibung: string;
  wahrscheinlichkeit: 'sehr hoch' | 'hoch' | 'mittel';
  rechtsgrundlage: string;
  gfHinweis: string;
}

export interface LieferkettenErgebnis {
  indirektBetroffen: boolean;
  betroffeheitsgrad: 'hoch' | 'mittel' | 'gering' | 'keiner';
  ausloesendeFragen: string[];
  anforderungen: LieferkettenAnforderung[];
  empfehlung: string;
}
