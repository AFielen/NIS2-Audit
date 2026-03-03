import type {
  WizardAnswers,
  PolicyPack,
  AssessmentResult,
  OutcomeType,
  DirectAffectedness,
  TriggeredRule,
  ReviewFlag,
  RiskEntry,
  ScopeInfo,
} from '../types';
import { decisionRules } from './decision-matrix';
import { policyPacks } from './policy-packs';
import { generateRoadmap } from './roadmap';
import { calculateMaturityScore } from '../scoring';

// ── Hard Separation: all 8 criteria ──
const HARD_SEPARATION_CRITERIA: Array<{
  questionId: keyof WizardAnswers;
  requiredValue: string;
  label: { de: string; en: string };
}> = [
  { questionId: 'IT-01', requiredValue: 'NO', label: { de: 'Getrennte Identität (AD/Entra ID/SSO)', en: 'Separated identity (AD/Entra ID/SSO)' } },
  { questionId: 'IT-05', requiredValue: 'NO', label: { de: 'Getrennte privilegierte Administration', en: 'Separated privileged administration' } },
  { questionId: 'IT-03', requiredValue: 'NO', label: { de: 'Getrennte Netzwerksegmente', en: 'Separated network segments' } },
  { questionId: 'IT-04', requiredValue: 'NO', label: { de: 'Getrenntes Backup', en: 'Separated backup' } },
  { questionId: 'IT-07', requiredValue: 'NO', label: { de: 'Getrenntes Endpoint-/MDM-Management', en: 'Separated endpoint/MDM management' } },
  { questionId: 'IT-12', requiredValue: 'YES', label: { de: 'Getrenntes Logging/Monitoring', en: 'Separated logging/monitoring' } },
  { questionId: 'IT-11', requiredValue: 'YES', label: { de: 'Getrennte Asset-Dokumentation', en: 'Separated asset documentation' } },
  { questionId: 'IT-13', requiredValue: 'YES', label: { de: 'Dokumentierter Impact-Nachweis', en: 'Documented impact proof' } },
];

function collectTriggeredRules(answers: WizardAnswers, pack: PolicyPack): TriggeredRule[] {
  const triggered: TriggeredRule[] = [];

  for (const rule of decisionRules) {
    if (rule.policyPack !== 'all' && rule.policyPack !== pack) continue;

    const answer = answers[rule.questionId];
    if (answer && rule.answerCodes.includes(answer as string)) {
      triggered.push({
        ruleId: rule.ruleRef,
        description: rule.effectText,
        questionId: rule.questionId,
        answerCode: answer as string,
        effect: rule.effectCode,
        roadmapPacks: rule.roadmapPacks,
        priority: rule.priority,
      });
    }
  }

  return triggered;
}

function checkSectorTrigger(answers: WizardAnswers, pack: PolicyPack): boolean {
  const rdAnswer = answers['OPS-01'];
  if (rdAnswer !== 'YES') return false;
  return policyPacks[pack].rdIsSectorTrigger;
}

function checkThresholdLevel(answers: WizardAnswers): 'none' | 'important' | 'essential' {
  const staff = answers['THR-01'];
  const revenue = answers['THR-02'];
  const balance = answers['THR-03'];

  // Essential: >=250 FTE OR (>50M revenue AND >43M balance)
  if (staff === '250PLUS') return 'essential';
  if (revenue === 'GT50' && balance === 'GT43') return 'essential';

  // Important: >=50 FTE OR (>=10M revenue AND >=10M balance)
  if (staff === '50_249') return 'important';
  if ((revenue === '10_50' || revenue === 'GT50') && (balance === '10_43' || balance === 'GT43')) return 'important';

  return 'none';
}

function hasComplexStructure(answers: WizardAnswers): boolean {
  if (answers['ORG-02'] === 'SPLIT') return true;
  if (answers['ORG-03'] === 'FOUR_PLUS') return true;
  if (answers['ORG-04'] === 'OTHER' || answers['ORG-04'] === 'MIXED') return true;
  if (answers['ORG-05'] === 'MIXED') return true;
  return false;
}

function hasSharedIT(answers: WizardAnswers): boolean {
  const sharedKeys: Array<keyof WizardAnswers> = [
    'IT-01', 'IT-02', 'IT-03', 'IT-04', 'IT-05', 'IT-06', 'IT-07', 'IT-08',
  ];
  return sharedKeys.some(key => {
    const val = answers[key];
    return val === 'YES' || val === 'PARTIAL';
  });
}

function checkHardSeparation(answers: WizardAnswers): { met: boolean; failed: string[] } {
  const failed: string[] = [];

  for (const criterion of HARD_SEPARATION_CRITERIA) {
    const answer = answers[criterion.questionId];
    if (answer !== criterion.requiredValue) {
      failed.push(criterion.label.de);
    }
  }

  // Also need tested segmentation (IT-09)
  if (answers['IT-09'] !== 'TESTED') {
    failed.push('Dokumentierte und getestete Segmentierung');
  }

  // And separated recovery (IT-10)
  if (answers['IT-10'] !== 'YES') {
    failed.push('Getrennte Wiederanlaufpfade');
  }

  return { met: failed.length === 0, failed };
}

function hasDataQualityIssues(answers: WizardAnswers): boolean {
  return answers['THR-04'] === 'EST'
    || answers['THR-04'] === 'MISS'
    || answers['THR-05'] === 'CONSOL'
    || answers['THR-05'] === 'MIXED';
}

function hasWeakEvidence(answers: WizardAnswers): boolean {
  return answers['EVI-01'] === 'SELF';
}

function determineLegalScope(answers: WizardAnswers): ScopeInfo {
  const rdOrg = answers['ORG-02'];
  const drkType = answers['ORG-01'];

  if (rdOrg === 'NO_RD') {
    return {
      summary: {
        de: 'Kein rettungsdienstlicher Trigger',
        en: 'No EMS trigger',
      },
      details: {
        de: 'Da kein Rettungsdienst betrieben wird, ergibt sich aus diesem Tool kein sektoraler Trigger.',
        en: 'Since no emergency medical service is operated, this tool does not generate a sector trigger.',
      },
      factors: [],
    };
  }

  if (rdOrg === 'EV_ABT') {
    const entityType = drkType === 'LV' ? 'Landesverband' : 'Kreisverband e.V.';
    return {
      summary: {
        de: `Gesamter Rechtsträger (${entityType})`,
        en: `Entire legal entity (${entityType === 'Landesverband' ? 'State Association' : 'District Association'})`,
      },
      details: {
        de: `Der Rettungsdienst ist als Abteilung im ${entityType} organisiert. Juristisch ist voraussichtlich der gesamte Rechtsträger maßgeblich.`,
        en: `The EMS is organized as a department in the ${entityType === 'Landesverband' ? 'state association' : 'district association'}. The entire legal entity is likely the relevant scope.`,
      },
      factors: [
        { de: 'Rettungsdienst als Abteilung im Verein', en: 'EMS as department in association' },
        { de: 'Kein eigener Rechtsträger für den RD', en: 'No separate legal entity for EMS' },
      ],
    };
  }

  if (rdOrg === 'GGMBH') {
    return {
      summary: {
        de: 'Operative Gesellschaft (gGmbH/GmbH)',
        en: 'Operating company (gGmbH/GmbH)',
      },
      details: {
        de: 'Juristisch ist voraussichtlich die Rettungsdienst-gGmbH/GmbH als operative Gesellschaft maßgeblich.',
        en: 'The EMS gGmbH/GmbH as operating company is likely the legally relevant entity.',
      },
      factors: [
        { de: 'Eigener Rechtsträger für den Rettungsdienst', en: 'Separate legal entity for EMS' },
        { de: 'Schwellenwerte an der operativen Gesellschaft prüfen', en: 'Check thresholds against the operating company' },
      ],
    };
  }

  // SPLIT or complex
  return {
    summary: {
      de: 'Komplexe Verbundstruktur – konservative Bewertung',
      en: 'Complex group structure – conservative assessment',
    },
    details: {
      de: 'Der Rettungsdienst ist auf mehrere Einheiten verteilt. Eine klare Zuordnung zu einem einzelnen Rechtsträger ist ohne juristische Review nicht belastbar möglich.',
      en: 'The EMS is distributed across multiple entities. Clear attribution to a single legal entity is not reliably possible without legal review.',
    },
    factors: [
      { de: 'Verteilte Strukturen erfordern juristische Prüfung', en: 'Distributed structures require legal review' },
      { de: 'Konservativ den breitesten Scope annehmen', en: 'Conservatively assume broadest scope' },
    ],
  };
}

function determineTechnicalScope(answers: WizardAnswers, _hasShared: boolean): ScopeInfo {
  const sharedFactors: Array<{ de: string; en: string }> = [];

  if (answers['IT-01'] === 'YES' || answers['IT-01'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsame Identitäts-Infrastruktur (AD/Entra ID/SSO)', en: 'Shared identity infrastructure (AD/Entra ID/SSO)' });
  }
  if (answers['IT-02'] === 'YES' || answers['IT-02'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsamer Cloud-/M365-Tenant', en: 'Shared cloud/M365 tenant' });
  }
  if (answers['IT-03'] === 'YES' || answers['IT-03'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsame Netzwerk-/Firewall-Infrastruktur', en: 'Shared network/firewall infrastructure' });
  }
  if (answers['IT-04'] === 'YES' || answers['IT-04'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsames Backup-System', en: 'Shared backup system' });
  }
  if (answers['IT-05'] === 'YES' || answers['IT-05'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsame privilegierte Administration', en: 'Shared privileged administration' });
  }
  if (answers['IT-06'] === 'YES' || answers['IT-06'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsame Server-/Virtualisierungsplattform', en: 'Shared server/virtualization platform' });
  }
  if (answers['IT-07'] === 'YES' || answers['IT-07'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsames Endpoint-/MDM-Management', en: 'Shared endpoint/MDM management' });
  }
  if (answers['IT-08'] === 'YES' || answers['IT-08'] === 'PARTIAL') {
    sharedFactors.push({ de: 'Gemeinsamer IT-Dienstleister/MSP', en: 'Shared IT service provider/MSP' });
  }

  if (sharedFactors.length === 0) {
    return {
      summary: {
        de: 'Technischer Scope auf RD-IT begrenzbar',
        en: 'Technical scope limitable to EMS IT',
      },
      details: {
        de: 'Es wurden keine wesentlichen Shared-IT-Abhängigkeiten angegeben. Eine Begrenzung des technischen Scopes auf die Rettungsdienst-IT erscheint grundsätzlich möglich.',
        en: 'No significant shared IT dependencies were indicated. Limiting the technical scope to EMS IT appears fundamentally possible.',
      },
      factors: [],
    };
  }

  return {
    summary: {
      de: `Technischer Scope erweitert (${sharedFactors.length} Shared-IT-Faktoren)`,
      en: `Technical scope extended (${sharedFactors.length} shared IT factors)`,
    },
    details: {
      de: 'Die gemeinsame IT-Infrastruktur zwischen Rettungsdienst und restlichem Verband erweitert den technischen Scope. Eine Begrenzung auf reine RD-IT ist derzeit nicht belastbar nachweisbar.',
      en: 'The shared IT infrastructure between EMS and the rest of the association extends the technical scope. Limiting to pure EMS IT is currently not reliably provable.',
    },
    factors: sharedFactors,
  };
}

function deriveTopRisks(triggeredRules: TriggeredRule[], answers: WizardAnswers): RiskEntry[] {
  const risks: RiskEntry[] = [];

  // Check for governance gaps
  if (answers['SEC-01'] === 'NO') {
    risks.push({
      title: { de: 'Keine benannte Verantwortung für Informationssicherheit', en: 'No designated information security responsibility' },
      description: { de: 'Ohne benannte Rolle fehlt die zentrale Steuerung der NIS-2-Umsetzung.', en: 'Without a designated role, central NIS-2 implementation management is missing.' },
      relatedRules: ['REG-050'],
    });
  }

  // Check for shared IT without separation
  const sharedITRules = triggeredRules.filter(r =>
    r.effect.startsWith('TECH_SCOPE_SHARED') || r.effect === 'PRESUME_SHARED_IT' || r.effect === 'PRESUME_SHARED_IT_SUPPLIER'
  );
  if (sharedITRules.length > 0) {
    risks.push({
      title: { de: 'Shared IT erweitert den faktischen Scope', en: 'Shared IT extends the actual scope' },
      description: { de: 'Gemeinsame IT-Infrastruktur zieht den technischen Scope über den juristischen Rechtsträger hinaus.', en: 'Shared IT infrastructure extends the technical scope beyond the legal entity.' },
      relatedRules: ['REG-030', 'REG-031'],
    });
  }

  // Check for data quality issues
  if (hasDataQualityIssues(answers)) {
    risks.push({
      title: { de: 'Datenlage für Schwellenwerte nicht belastbar', en: 'Threshold data not reliable' },
      description: { de: 'Geschätzte oder fehlende Daten verhindern eine belastbare Betroffenheitsentscheidung.', en: 'Estimated or missing data prevent a reliable affectedness decision.' },
      relatedRules: ['REG-023'],
    });
  }

  // Check for incident response gaps
  if (answers['SEC-08'] === 'NO') {
    risks.push({
      title: { de: 'Kein Incident-Response-Prozess', en: 'No incident response process' },
      description: { de: 'Ohne definierten Melde- und Reaktionsprozess können die NIS-2-Meldepflichten (24h/72h) nicht eingehalten werden.', en: 'Without a defined reporting and response process, NIS-2 reporting obligations (24h/72h) cannot be met.' },
      relatedRules: ['REG-050'],
    });
  }

  // Check for backup / BCM gaps
  if (answers['SEC-07'] === 'NO') {
    risks.push({
      title: { de: 'Keine getesteten Offline-Backups', en: 'No tested offline backups' },
      description: { de: 'Ohne Offline-Backups und getestete Wiederherstellung ist die Betriebskontinuität bei Ransomware-Angriffen gefährdet.', en: 'Without offline backups and tested recovery, business continuity during ransomware attacks is at risk.' },
      relatedRules: ['REG-050'],
    });
  }

  // Check for complex structure risks
  if (hasComplexStructure(answers)) {
    risks.push({
      title: { de: 'Komplexe Verbundstruktur erschwert Scope-Abgrenzung', en: 'Complex group structure complicates scope delimitation' },
      description: { de: 'Verteilte Strukturen bei Personal, IT oder Abrechnung erfordern eine konservative Bewertung und juristische Klärung.', en: 'Distributed structures in personnel, IT or billing require conservative assessment and legal clarification.' },
      relatedRules: ['REG-003'],
    });
  }

  // Check for weak evidence
  if (hasWeakEvidence(answers)) {
    risks.push({
      title: { de: 'Nachweisniveau reduziert Verlässlichkeit', en: 'Evidence level reduces reliability' },
      description: { de: 'Reine Selbstauskunft ohne technische oder externe Nachweise begrenzt die Belastbarkeit der Ergebnisse.', en: 'Pure self-assessment without technical or external evidence limits the reliability of results.' },
      relatedRules: ['REG-060'],
    });
  }

  return risks.slice(0, 5);
}

function buildReviewFlags(answers: WizardAnswers, triggeredRules: TriggeredRule[]): ReviewFlag[] {
  const flags: ReviewFlag[] = [];

  if (hasComplexStructure(answers)) {
    flags.push({
      id: 'COMPLEX_STRUCTURE',
      title: { de: 'Komplexe Verbundstruktur', en: 'Complex group structure' },
      description: { de: 'Juristische Review der Scope-Abgrenzung empfohlen.', en: 'Legal review of scope delimitation recommended.' },
      severity: 'high',
    });
  }

  if (hasDataQualityIssues(answers)) {
    flags.push({
      id: 'DATA_QUALITY',
      title: { de: 'Datenqualität unzureichend', en: 'Data quality insufficient' },
      description: { de: 'Schwellenwertdaten fehlen oder sind nur geschätzt.', en: 'Threshold data missing or only estimated.' },
      severity: 'high',
    });
  }

  if (hasWeakEvidence(answers)) {
    flags.push({
      id: 'WEAK_EVIDENCE',
      title: { de: 'Nachweisniveau gering', en: 'Evidence level low' },
      description: { de: 'Nur Selbstauskunft ohne Belege vorhanden.', en: 'Only self-assessment without evidence available.' },
      severity: 'medium',
    });
  }

  const transportReview = triggeredRules.find(r => r.effect === 'FLAG_REVIEW_TRANSPORT');
  if (transportReview) {
    flags.push({
      id: 'TRANSPORT_REVIEW',
      title: { de: 'Krankentransport prüfen', en: 'Review patient transport' },
      description: { de: 'Krankentransport ist kein automatischer Trigger, sollte aber juristisch geprüft werden.', en: 'Patient transport is not an automatic trigger but should be legally reviewed.' },
      severity: 'medium',
    });
  }

  const otherSector = triggeredRules.find(r => r.effect === 'FLAG_OTHER_SECTOR_REVIEW');
  if (otherSector) {
    flags.push({
      id: 'OTHER_SECTOR',
      title: { de: 'Weitere Sektoren prüfen', en: 'Review additional sectors' },
      description: { de: 'Pflege-/weitere Leistungsbereiche können zusätzliche sektorale Prüfungen erfordern.', en: 'Care/additional service areas may require additional sectoral reviews.' },
      severity: 'low',
    });
  }

  return flags;
}

function evaluateForPack(answers: WizardAnswers, pack: PolicyPack): {
  outcome: OutcomeType;
  directAffectedness: DirectAffectedness;
  hasSectorTrigger: boolean;
  thresholdLevel: 'none' | 'important' | 'essential';
  hasSharedITFlag: boolean;
  hardSeparationMet: boolean;
} {
  // Step 1: Sector trigger
  const sectorTrigger = checkSectorTrigger(answers, pack);

  // Step 2: Thresholds
  const thresholdLevel = checkThresholdLevel(answers);

  // Step 3: No RD at all
  if (answers['OPS-01'] === 'NO' && answers['ORG-02'] === 'NO_RD') {
    const sharedITFlag = hasSharedIT(answers);
    if (sharedITFlag) {
      // LV or SG providing shared IT → not directly affected but technical scope
      return {
        outcome: 'A',
        directAffectedness: 'no',
        hasSectorTrigger: false,
        thresholdLevel,
        hasSharedITFlag: sharedITFlag,
        hardSeparationMet: false,
      };
    }
    return {
      outcome: 'A',
      directAffectedness: 'no',
      hasSectorTrigger: false,
      thresholdLevel,
      hasSharedITFlag: false,
      hardSeparationMet: false,
    };
  }

  // Step 4: Determine direct affectedness
  let directlyAffected: DirectAffectedness = 'no';

  if (sectorTrigger && thresholdLevel !== 'none') {
    directlyAffected = 'yes';
  } else if (sectorTrigger && thresholdLevel === 'none') {
    // Sector trigger but below thresholds → depends on data quality
    directlyAffected = hasDataQualityIssues(answers) ? 'unclear' : 'no';
  } else if (!sectorTrigger && thresholdLevel !== 'none') {
    // Above thresholds but no sector trigger under this pack
    directlyAffected = 'unclear';
  }

  // Step 5: Data quality escalation
  if (hasDataQualityIssues(answers) && directlyAffected !== 'no') {
    directlyAffected = 'unclear';
  }

  // Step 6: Shared IT check
  const sharedITFlag = hasSharedIT(answers);

  // Step 7: Hard separation check
  const separation = checkHardSeparation(answers);

  // Step 8: Evidence level
  const weakEvidence = hasWeakEvidence(answers);

  // Step 9: Complex structure
  const complex = hasComplexStructure(answers);

  // ── Derive outcome ──

  // Not directly affected and no shared IT → A
  if (directlyAffected === 'no' && !sharedITFlag) {
    return { outcome: 'A', directAffectedness: 'no', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: false, hardSeparationMet: separation.met };
  }

  // Unclear / data issues / complex + weak evidence → D
  if (directlyAffected === 'unclear') {
    return { outcome: 'D', directAffectedness: 'unclear', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: sharedITFlag, hardSeparationMet: separation.met };
  }

  // Complex structure with unclear implications → D
  if (complex && (weakEvidence || hasDataQualityIssues(answers))) {
    return { outcome: 'D', directAffectedness: directlyAffected, hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: sharedITFlag, hardSeparationMet: separation.met };
  }

  // Directly affected: check scope
  if (directlyAffected === 'yes') {
    // Hard separation met → B (scope limitable)
    if (separation.met && !weakEvidence) {
      return { outcome: 'B', directAffectedness: 'yes', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: sharedITFlag, hardSeparationMet: true };
    }

    // Shared IT or failed separation → C
    if (sharedITFlag) {
      return { outcome: 'C', directAffectedness: 'yes', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: true, hardSeparationMet: false };
    }

    // Directly affected, no shared IT but separation not fully proven
    if (!separation.met) {
      // With weak evidence → D
      if (weakEvidence) {
        return { outcome: 'D', directAffectedness: 'yes', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: false, hardSeparationMet: false };
      }
      return { outcome: 'C', directAffectedness: 'yes', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: false, hardSeparationMet: false };
    }

    // Fallback for directly affected
    return { outcome: 'C', directAffectedness: 'yes', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: sharedITFlag, hardSeparationMet: separation.met };
  }

  // Fallback: not directly affected but shared IT
  if (sharedITFlag) {
    return { outcome: 'C', directAffectedness: 'no', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: true, hardSeparationMet: separation.met };
  }

  return { outcome: 'A', directAffectedness: 'no', hasSectorTrigger: sectorTrigger, thresholdLevel, hasSharedITFlag: false, hardSeparationMet: separation.met };
}

export function evaluateAssessment(answers: WizardAnswers, activePack: PolicyPack): AssessmentResult {
  // Evaluate with active pack
  const activeResult = evaluateForPack(answers, activePack);

  // Evaluate with alternate pack for rule sensitivity detection
  const alternatePack: PolicyPack = activePack === 'verbandslinie-konservativ'
    ? 'public-bsi'
    : 'verbandslinie-konservativ';
  const alternateResult = evaluateForPack(answers, alternatePack);

  // Detect rule sensitivity (REG-012)
  const isRuleSensitive = activeResult.outcome !== alternateResult.outcome;
  const sensitiveRules: string[] = [];

  let finalOutcome = activeResult.outcome;

  if (isRuleSensitive) {
    sensitiveRules.push('REG-012');
    // If outcomes diverge, force D
    if (finalOutcome !== 'D') {
      finalOutcome = 'D';
    }
  }

  // Collect triggered rules
  const triggeredRules = collectTriggeredRules(answers, activePack);

  // Collect all unique roadmap packs
  const roadmapPackIds = new Set<string>();
  for (const rule of triggeredRules) {
    for (const packId of rule.roadmapPacks) {
      roadmapPackIds.add(packId);
    }
  }

  // Add maturity-driven roadmap packs
  const maturity = calculateMaturityScore(answers);
  for (const gap of maturity.gaps) {
    const packMap: Record<string, string[]> = {
      'SEC-01': ['P1', 'P9'],
      'SEC-02': ['P1'],
      'SEC-03': ['P9'],
      'SEC-04': ['P4'],
      'SEC-05': ['P4'],
      'SEC-06': ['P7'],
      'SEC-07': ['P6'],
      'SEC-08': ['P3', 'P7'],
      'SEC-09': ['P6'],
      'SEC-10': ['P8'],
      'SEC-11': ['P9'],
      'SEC-12': ['P3', 'P7'],
    };
    const packs = packMap[gap];
    if (packs) {
      for (const p of packs) roadmapPackIds.add(p);
    }
  }

  // Build roadmap
  const roadmap = generateRoadmap(Array.from(roadmapPackIds).sort());

  // Build scope info
  const legalScope = determineLegalScope(answers);
  const technicalScope = determineTechnicalScope(answers, activeResult.hasSharedITFlag);

  // Build review flags
  const reviewFlags = buildReviewFlags(answers, triggeredRules);

  // Top risks
  const topRisks = deriveTopRisks(triggeredRules, answers);

  return {
    activePolicyPack: activePack,
    alternatePolicyPackOutcome: alternateResult.outcome,
    isRuleSensitive,
    sensitiveRules,
    legalScope,
    technicalScope,
    directAffectedness: activeResult.directAffectedness,
    outcomeType: finalOutcome,
    reviewFlags,
    triggeredRules,
    triggeredRoadmapPacks: Array.from(roadmapPackIds).sort(),
    topRisks,
    maturitySummary: maturity,
    roadmap,
    thresholdLevel: activeResult.thresholdLevel,
    hasSectorTrigger: activeResult.hasSectorTrigger,
    hasSharedIT: activeResult.hasSharedITFlag,
    hardSeparationMet: activeResult.hardSeparationMet,
  };
}
